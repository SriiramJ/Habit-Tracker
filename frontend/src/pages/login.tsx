import LoginForm from "@/components/Auth/LoginForm";
import { SignIn } from "@clerk/nextjs";

export default function LoginPage(){
    return(
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <LoginForm />
            <div className="mt-8 w-full max-w-md">
                <h3 className="text-center text-gray-500 mb-2">Or login with Clerk</h3>
                <SignIn/>
            </div>
        </div>
    )
}