import React, { useState } from "react";

const EmailForm: React.FC = () => {
    const [message, setMessage] = useState<string>("");
    const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Simulate sending an email (replace with your actual email sending logic)
        try {
            // Example: Send the message to your backend or email service
            console.log("Message sent:", message);

            // Show the success popup
            setIsPopupVisible(true);

            // Clear the message field
            setMessage("");

            // Hide the popup after 3 seconds
            setTimeout(() => {
                setIsPopupVisible(false);
            }, 3000);
        } catch (error) {
            console.error("Failed to send message:", error);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <form onSubmit={handleSubmit}>
                <textarea
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={5}
                    placeholder="Write your message here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
                >
                    Send Message
                </button>
            </form>

            {/* Success Popup */}
            {isPopupVisible && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <p className="text-green-600 font-semibold">
                            Your message has been sent successfully!
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmailForm;