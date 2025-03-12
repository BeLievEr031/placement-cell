import { SignIn } from "@clerk/clerk-react"

const Auth = () => {
    return (
        <div className="h-[100vh] flex justify-center items-center">
            <SignIn />
        </div>
    )
}

export default Auth;
