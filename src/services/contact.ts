
// This service simulates a "small API" client-side.
// It handles the submission directly to the Google Form endpoint without needing a backend server.

interface ContactFormData {
    name: string;
    email: string;
    phone: string;
    organization: string;
    message: string;
}

// This service now simply calls our Serverless Function.
// No sensitive URLs or IDs are stored in the client bundle.

export const submitContactForm = async (data: ContactFormData): Promise<void> => {
    try {
        const response = await fetch('/api/contact', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `Server error: ${response.status}`);
        }

    } catch (error) {
        console.error("Form submission error:", error);
        throw new Error("Failed to submit form");
    }
};
