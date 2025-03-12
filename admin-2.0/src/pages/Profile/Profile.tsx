import { useAuth, useUser } from "@clerk/clerk-react";

export default function Profile() {
    const { user } = useUser();
    const { signOut } = useAuth();
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="max-w-sm mx-auto bg-white shadow-lg rounded-2xl overflow-hidden p-6 border border-gray-200">
                <div className="flex items-center space-x-4">
                    <img
                        className="w-16 h-16 rounded-full border-2 border-blue-500"
                        src={user?.imageUrl}
                        alt="User Profile"
                    />
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800">
                            {user?.firstName} {user?.lastName}
                        </h2>
                        <p className="text-gray-500 text-sm">{user?.primaryEmailAddress?.emailAddress}</p>
                    </div>
                </div>
                <p className="text-center my-4 font-bold text-blue-500">Admin</p>
                <button className="bg-red-500 mt-4 text-white font-bold px-4 py-2 rounded-md cursor-pointer" onClick={() => signOut()}>Logout</button>
            </div>
        </div>
    );
}
