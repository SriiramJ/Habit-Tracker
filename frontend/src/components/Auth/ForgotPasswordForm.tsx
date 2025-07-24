import { useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import { useAuthStore } from "@/store/authStore";

export default function ForgotPasswordForm(){
    const [email, setEmail] = useState("")
    const [sent, setSent] = useState(false)
    const [error,setError] = useState<string |null>(null)
    const loading = useAuthStore((s)=> s.loading)
    const forgotPassword = useAuthStore((s)=> s.forgotPassword)


    const handleSubmit = async (e :React.FormEvent)=>{
        e.preventDefault()
        setError(null)
        try {
            await forgotPassword(email)
            setSent(true)
        } catch (err: any) {
            setError(err?.message || "Failed to send reset link")
        }
    }

    return(
        <form 
        onSubmit={handleSubmit}
        className={cn("bg-white rounded-lg shadow p-6 w-full max-w-md mx-auto")}
        >
            <h2 className="text-2xl font-bold mb-6 text-blue-600 text-center">Forgot Password</h2>
            <div className="mb-4">
                <label className="block mb-1 font-medium text-gray-700">Email</label>
                <input type="email"
                name="email"
                value={email}
                onChange={e=> setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded focus:ring focus: ring-blue-500"
                required
                autoComplete="email"
                />
                {error &&(
                    <div className="mb-4 text-red-600 text-sm text-center">{error}</div>
                )}
                {sent ? (
                    <div className="mb-4 text-green-600 text-sm text-center">
                        Reset link sent! Check your email.
                    </div>
                ):(
                    <Button 
                    type="submit"
                    variant="default"
                    size="md"
                    className="w-full flex items-center justify-center"
                    disabled={loading}
                    >
                        {loading? <Loader className="animate-spin w-5 h-5 mr-2"/>: null}
                    </Button>
                    
                )}
                <div className="mt-4 text-center">
                    <a href="/login" className="text-blue-500 hover:underline text-sm">Back to Login</a>
                </div>
            </div>
        </form>
    )
}