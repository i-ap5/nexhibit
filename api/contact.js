
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    // Google Forms Configuration (Kept entirely server-side so user never sees it)
    const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLScTWHW9BYuKbV3jNTKABXPk3WCr3hdL1wm7rzKtqeN4ACLoyg/formResponse";
    const ENTRY_IDS = {
        NAME: "entry.1115928667",
        EMAIL: "entry.231630604",
        PHONE: "entry.1037531179",
        ORG: "entry.691703741",
        MESSAGE: "entry.875187078"
    };

    try {
        const { name, email, phone, organization, message } = req.body;

        if (!name || !email || !phone || !message) {
            return res.status(400).json({ error: "Missing required fields." });
        }

        const formData = new URLSearchParams();
        formData.append(ENTRY_IDS.NAME, name);
        formData.append(ENTRY_IDS.EMAIL, email);
        formData.append(ENTRY_IDS.PHONE, phone);
        formData.append(ENTRY_IDS.ORG, organization || '');
        formData.append(ENTRY_IDS.MESSAGE, message);

        const response = await fetch(GOOGLE_FORM_URL, {
            method: "POST",
            body: formData,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        });

        if (!response.ok) {
            throw new Error(`Google Form returned status: ${response.status}`);
        }

        return res.status(200).json({ success: true, message: "Form submitted successfully" });

    } catch (error) {
        console.error("Contact Form Submission Error:", error);
        return res.status(500).json({ error: "Failed to submit form." });
    }
}
