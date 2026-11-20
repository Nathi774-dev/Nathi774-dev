const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
export const payWithPayfast = async (orderId, token) => {
    const response = await fetch(`${API_URL}/api/payments/checkout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ orderId })
    });

    const result = await response.json();
    if (!response.ok) {
        throw new Error(result.message || "Unable to start payment");
    }

    // create a form and submit the customer to Payfast
    // for testing purposes
    const form = document.createElement("form");
    form.method = 'POST';
    form.action = result.paymentUrl;

    Object.entries(result.paymentData).forEach(([name, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = name;
        input.value = value;

        form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
}