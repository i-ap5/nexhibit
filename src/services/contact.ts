
// This service simulates a "small API" client-side.
// It handles the submission directly to the Google Form endpoint without needing a backend server.

interface ContactFormData {
    name: string;
    email: string;
    phone: string;
    organization: string;
    message: string;
}

// Configuration
const API_URL = "http://localhost:3001/api/contact";

/**
 * Submits the contact form data to the local proxy server.
 * This completely hides the Google Forms logic from the client.
 */
export const submitContactForm = async (data: ContactFormData): Promise<void> => {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.statusText}`);
        }
    } catch (error) {
        console.error("Form submission error:", error);
        throw new Error("Failed to submit form");
    }
};
