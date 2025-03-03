import { useState } from "react";
// import { FiSend } from "react-icons/fi";

const recruiters = [
    { id: 1, name: "Swissmote, Inc.", lastMessage: "Join our Telegram community!", date: "01/03/2025" },
    { id: 2, name: "Tutedude", lastMessage: "Sure, I will submit", date: "27/02/2025" },
    { id: 3, name: "Super Assistant", lastMessage: "Assignment pending!", date: "03/12/2024" },
    { id: 3, name: "Super Assistant", lastMessage: "Assignment pending!", date: "03/12/2024" },
    { id: 3, name: "Super Assistant", lastMessage: "Assignment pending!", date: "03/12/2024" },
    { id: 3, name: "Super Assistant", lastMessage: "Assignment pending!", date: "03/12/2024" },
    { id: 3, name: "Super Assistant", lastMessage: "Assignment pending!", date: "03/12/2024" },
    { id: 3, name: "Super Assistant", lastMessage: "Assignment pending!", date: "03/12/2024" },
    { id: 3, name: "Super Assistant", lastMessage: "Assignment pending!", date: "03/12/2024" },
    { id: 3, name: "Super Assistant", lastMessage: "Assignment pending!", date: "03/12/2024" },
    { id: 3, name: "Super Assistant", lastMessage: "Assignment pending!", date: "03/12/2024" },
    { id: 3, name: "Super Assistant", lastMessage: "Assignment pending!", date: "03/12/2024" },
];

const messages = [
    { sender: "recruiter", text: "Join our Telegram Community!", time: "8:41 PM" },
    { sender: "user", text: "Thanks, I will check it out.", time: "9:00 PM" },
    { sender: "recruiter", text: "First to complete gets onboarded!", time: "9:10 PM" },
    { sender: "recruiter", text: "First to complete gets onboarded!", time: "9:10 PM" },
];

export default function ChatUI() {
    const [selectedRecruiter, setSelectedRecruiter] = useState(recruiters[0]);
    const [chatMessages, setChatMessages] = useState(messages);
    const [newMessage, setNewMessage] = useState("");

    const sendMessage = () => {
        if (!newMessage.trim()) return;
        setChatMessages([...chatMessages, { sender: "user", text: newMessage, time: "Now" }]);
        setNewMessage("");
    };

    return (
        <div className="flex h-[88vh] bg-red-900">
            {/* Left Sidebar */}
            <div className="w-1/3 bg-white border-r p-4 h-full overflow-y-auto">
                <h2 className="text-lg font-semibold mb-4">Messages</h2>
                {recruiters.map((recruiter) => (
                    <div
                        key={recruiter.id}
                        className={`p-3 cursor-pointer border-b ${selectedRecruiter.id === recruiter.id ? "bg-gray-200" : ""
                            }`}
                        onClick={() => setSelectedRecruiter(recruiter)}
                    >
                        <h3 className="font-semibold">{recruiter.name}</h3>
                        <p className="text-sm text-gray-600">{recruiter.lastMessage}</p>
                        <span className="text-xs text-gray-400">{recruiter.date}</span>
                    </div>
                ))}
            </div>

            {/* Right Chat Box */}
            <div className="flex-1 flex flex-col bg-white h-full overflow-y-auto">
                <div className="p-4 border-b font-semibold">{selectedRecruiter.name}</div>
                <div className="flex-1 p-4 overflow-auto">
                    {chatMessages.map((msg, index) => (
                        <div key={index} className={`mb-2 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
                            <div
                                className={`inline-block p-2 rounded-lg max-w-xs ${msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-200"
                                    }`}
                            >
                                {msg.text}
                            </div>
                            <div className="text-xs text-gray-500">{msg.time}</div>
                        </div>
                    ))}
                </div>
                <div className="p-4 border-t flex ">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="flex-1 p-2 border rounded-lg"
                        placeholder="Type a message..."
                    />
                    <button onClick={sendMessage} className="ml-2 p-2 bg-blue-500 text-white rounded-lg">
                        {/* <FiSend />
                         */}
                        send
                    </button>
                </div>
            </div>
        </div>
    );
}
