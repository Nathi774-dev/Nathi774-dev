import crypto from "node:crypto";

export const isPayfastSandbox = process.env.PAYFAST_SANDBOX === "true";
export const payfastHost = isPayfastSandbox 
    ? "sandbox.payfast.co.za"
    : "www.payfast.co.za";

export const payfastProcessUrl = `https://${payfastHost}/eng/process`;
export const payfastValidateUrl = `https://${payfastHost}/eng/query/validate`

// payfast custom signature
// field order is the same as the form fields
export const generatePayfastSignature = (data) => {
    const fields = Object.entries(data).filter(
        ([, value]) => value !== undefined && value !== null && value !== ""
    ).map(([key, value]) => {
        return `${key}=${encodeURIComponent(String(value).trim()).replace("/%20/g", "+")}`;
    });

    if (process.env.PAYFAST_PASSPHRASE) {
        fields.push(
            `passphrase=${encodeURIComponent(process.env.PAYFAST_PASSPHRASE.trim()).replace("/%20/g", "+")}`
        )
    }

    return crypto.createHash("md5").update(fields.join("&")).digest("hex")
}

// compare the two signatures without string comparison
export const safeCompare = (a, b) => {
    if (typeof a !== "string" || typeof b !== "string") {
        return false
    }

    const first = Buffer.from(a, "utf-8");
    const second = Buffer.from(b, "utf-8");

    return first.length === second.length && crypto.timingSafeEqual(first, second);
}