import Order from "../models/orders.js";
import crypto from "node:crypto";
import ippaddr from "ipaddr.js";

import {
    generatePayfastSignature,
    payfastHost,
    payfastValidateUrl,
    safeCompare
} from "../utils/payfast.js";

const PAYFAST_IP_RANGES = [
    "197.97.145.144/28",
    "41.74.179.192/27",
    "102.216.36.0/28",
    "102.216.36.128/28",
    "144.126.193.139/32",
];

const isPayFastIp = (ip) => {
    try {
        const normalizedZip = ip?.replace(/^::ffff:/, "");
        if (!normalizedZip || !ippaddr.isValid(normalizedZip)) {
            return false;
        }

        const address = ippaddr.parse(normalizedZip);
        return PAYFAST_IP_RANGES.some((range) => {
            const [rangeAddress, prefix] = ippaddr.parseCIDR(range);
            return address.kind() === rangeAddress.kind() && 
                address.match(rangeAddress, prefix);
        })
    } catch {
        return false;
    }
}

const buildNotificationString = (data) => {
    return Object.entries(data)
        .filter(([key, value]) => 
            key !== "signature" &&
            value !== undefined && 
            value !== null && 
            value !== ""
        )
        .map(([key, value]) => {
            return `${key}=${encodeURIComponent(String(value).trim()).replace(/%20/g, "+")}`
        }).join("&");
}

export const recievePayfastNotification = async (req, res) => {
    try {
        const data = req.body;
        if (!data || !data.m_payment_id || !data.signature) {
            return res.status(400).send("Invalid notification.");
        }

        // verify notification signature
        const expectedSignature = generatePayfastSignature(
            Object.fromEntries(
                Object.entries(data).filter(([key]) => key !== "signature")
            )
        );

        if (!safeCompare(data.signature, expectedSignature)) {
            return res.status(400).send("Invalid signature");
        }

        // verify the source IP
        // ensure your hosting platform preserves the actual client IP
        if (!isPayFastIp(req.ip)) {
            return res.status(403).send("Untrusted source");
        }

        // find the other order using our own payment reference
        const order = await Order.findByOne(data.m_payment_id);
        if (!order) {
            return res.status(404).send("Order not found.")
        }

        // verify amount
        const expectedAmount = Number(order.total);
        const recievedAmount = Number(data.amount_gross);

        if (!Number.isFinite(recievedAmount) || Math.abs(expectedAmount - recievedAmount) > 0.01) {
            return res.status(400).send("Amount mismatch");
        }

        // verify the merchant ID
        if (data.merchant_id !== process.env.PAYFAST_MERCHANT_ID) {
            return res.status(400).send("Merchant mismatch");
        }

        // Ask payfast to validate the notification
        const validateBody = buildNotificationString(data);
        const validateResponse = await fetch(payfastValidateUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: validateBody
        });
        const validateResult = (await validateResponse.text()).trim();
        if (!validateResponse.ok || validateResult !== "VALID") {
            console.error("Payfast ITN validation failed: ", validateResult);
            return res.status(400).send("Payfast validation failed");
        }

        // only complete transactions can mark the order paid
        if (data.payment_status !== "COMPLETE") {
            return res.status(200).send("Notification was recieved");
        }

        // In case Payfast sends the ITN more than once
        if (order.paymentStatus === "paid") {
            return res.status(200).send("Payment already processed.");
        }

        // only if the payment was successful
        order.paymentStatus = "paid";
        order.status = "paid";
        order.payfastPaymentId = data.pf_payment_id || null;
        order.paidAt = new Date();
        await order.save();

        return res.status(200).send("Payment confirmed");
    } catch (error) {
        console.error("Payfast ITN error: ", error);
        return res.status(500).send("Notification failed to process");
    }
}