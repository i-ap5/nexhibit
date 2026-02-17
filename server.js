
import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Real Google Form Configuration (Hidden from frontend)
const GOOGLE_FORM_URL = "https://docs.google.com/forms/u/0/d/e/1FAIpQLScTWHW9BYuKbV3jNTKABXPk3WCr3hdL1wm7rzKtqeN4ACLoyg/formResponse";
const ENTRY_IDS = {
    NAME: "entry.1115928667",
    EMAIL: "entry.231630604",
    PHONE: "entry.1037531179",
    ORG: "entry.691703741",
    MESSAGE: "entry.875187078"
};

// API Route
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, phone, organization, message } = req.body;

        // Validation (Basic Server-Side)
        if (!name || !email || !phone || !message) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Construct Form Data matching Google Forms
        const formData = new URLSearchParams();
        formData.append(ENTRY_IDS.NAME, name);
        formData.append(ENTRY_IDS.EMAIL, email);
        formData.append(ENTRY_IDS.PHONE, phone);
        formData.append(ENTRY_IDS.ORG, organization || '');
        formData.append(ENTRY_IDS.MESSAGE, message);

        // Send to Google
        const googleResponse = await fetch(GOOGLE_FORM_URL, {
            method: 'POST',
            body: formData,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        if (googleResponse.ok || googleResponse.status === 200) {
            res.status(200).json({ success: true, message: 'Form submitted successfully' });
        } else {
            // Google Forms might return 200 even on error sometimes, but usually 200 is OK for submission
            // If it fails (e.g. 400), we log it
            console.error('Google Form Error:', googleResponse.status, googleResponse.statusText);
            res.status(500).json({ error: 'Failed to submit form to Google' });
        }

    } catch (error) {
        console.error('Server Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
