import Order from "../models/orders.js";
import User from "../models/user.js";
import { generatePayfastSignature, payfastProcessUrl } from "../utils/payfast.js";

export const createPayfastCheckout = async (req, res) => {
    try {
        const { orderId } = req.body || {}
        if (!orderId) {
            return res.status(400).json({
                message: "Order ID is required"
            })
        }

        const order = await Order.findOne({
            _id: orderId,
            user: req.user.id
        })

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            })
        }

        if (order.paymentStatus === "paid") {
            return res.status(409).json({
                message: "This order has already been paid"
            })
        }

        if (order.status === "cancelled") {
            return res.status(409).json({
                message: "This order has been cancelled"
            })
        }

        if (
            !process.env.FRONTEND_URL || 
            !process.env.BACKEND_URL || 
            !process.env.PAYFAST_MERCHANT_KEY || 
            !process.env.PAYFAST_MERCHANT_ID
        ) {
            return res.status(500).json({
                message: "PayFast configuration is incomplete"
            })
        }

        const user = User.findOne(req.user.id);

        const amount = Number(order.total).toFixed(2);

        if (!Number.isFinite(Number(amount)) || Number((amount)) <= 0) {
            return res.status(400).json({
                message: "Invalid order item"
            })
        }

        const namedParts = (user.name || "").trim().split(/\s+/);
        const firstName = namedParts.shift() || "Customer";
        const lastName = namedParts.join(" ") || "Customer";

        const paymentData = {
            merchant_id: process.env.PAYFAST_MERCHANT_ID,
            merchant_key: process.env.PAYFAST_MERCHANT_KEY,
            return_url: `${process.env.FRONTEND_URL}/payment/success?orderId=${order._id}`,
            cancel_url: `${process.env.FRONTEND_URL}/payment/cancel?orderId=${order._id}`,
            notify_url: `${process.env.BACKEND_URL}/api/payments/notify`,
            first_name: firstName,
            last_name: lastName,
            email_address: user.email,
            m_payment_id: order._id.toString(),
            item_name: `Fenzotti Foods Order ${order._id}`,
            description: "Fenzotti foods online order"
        };

        const signature = generatePayfastSignature(paymentData);

        return res.status(200).json({
            message: "Payfast checkout created",
            paymentUrl: payfastProcessUrl,
            paymentData: {
                ...paymentData,
                signature
            }
        })
    } catch (error) {
        console.error("PayFast checkout error: ", error)
        return res.status(500).json({
            message: "Unable to create payfast checkout"
        })
    }
}