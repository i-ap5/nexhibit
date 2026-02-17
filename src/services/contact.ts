
// This service simulates a "small API" client-side.
// It handles the submission directly to the Google Form endpoint without needing a backend server.

interface ContactFormData {
    name: string;
    email: string;
    phone: string;
    organization: string;
    message: string;
}

// Google Forms Entry IDs (Public structure)
const FORM_ENTRIES = {
    NAME: "entry.1115928667",
    EMAIL: "entry.231630604",
    PHONE: "entry.1037531179",
    ORG: "entry.691703741",
    MESSAGE: "entry.875187078"
};

// Obfuscated Form URL Construction
// This prevents web scrapers and casual inspection from seeing the URL in plain text.
const getFormUrl = (): string => {
    const p1 = "aHR0cHM6Ly9kb2NzLmdvb2dsZS5jb20vZm9ybXMvZC9lLw=="; // "https://docs.google.com/forms/d/e/"
    const p2 = "MUZBSXBRTFNjVFdIVzlCWXVLYlYzak5US0FCWFBrM1dDcjNoZEwxd203cnpLdHFlTjRBQ0xveWc="; // Form ID
    const p3 = "Zm9ybVJlc3BvbnNl"; // "formResponse"

    const decode = (str: string) => atob(str);
    return `${decode(p1)}${decode(p2)}/${decode(p3)}`;
};

export const submitContactForm = async (data: ContactFormData): Promise<void> => {
    const GOOGLE_FORM_URL = getFormUrl();

    const formData = new URLSearchParams();
    formData.append(FORM_ENTRIES.NAME, data.name);
    formData.append(FORM_ENTRIES.EMAIL, data.email);
    formData.append(FORM_ENTRIES.PHONE, data.phone);
    formData.append(FORM_ENTRIES.ORG, data.organization);
    formData.append(FORM_ENTRIES.MESSAGE, data.message);

    try {
        await fetch(GOOGLE_FORM_URL, {
            method: "POST",
            mode: "no-cors", // Required for direct Google Forms submission
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: formData,
        });

        // With 'no-cors', we get an opaque response (status 0).
        // We cannot read the true status, so we assume success if the network request didn't throw.
        return;

    } catch (error) {
        console.error("Form submission error:", error);
        throw new Error("Failed to submit form");
    }
};
