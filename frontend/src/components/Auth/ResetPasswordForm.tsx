import { useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import { useRouter } from "next/router";
import { useAuthStore } from "@/store/authStore";

export default function ReserPasswordForm(){
    const [newPassword, setNewPassword] = useState("")
    const [error, setError] = useState<string |null>(null)
    const [success, setSuccess] = useState(false)
    const loading = useAuthStore((s)=> s.loading)
    const resetPassword = useAuthStore((s)=> s.resetPassword)
    const router = useRouter()
    const {token} = router.query

    const handleSubmit = async(e: React.FormEvent)=>{
        e.preventDefault()
        setError(null)
        try {
            if(typeof token === "string"){
                await resetPassword({token, newPassword})
                setSuccess(true)
                setTimeout(()=> router.replace("/login"),2000)

            }else{
                setError("Invalid reset token")
            }
        } catch (err:any) {
            setError(err?.message || "Failed to reset password")
        }
    }

    return(
        <form 
        onSubmit={handleSubmit}
        className={cn("bg-white rounded-lg shadow p-6 w-full max-w-md mx-auto")}
        >
            <h2 className="text-2xl font-bold mb-6 text-blue-600 text-center">Reset Password</h2>
            <div className="mb-4">
                <label className="block mb-1 font-medium text-gray-700">New Password</label>
                <input type="password"
                name="password"
                value={newPassword}
                onChange={e=> setNewPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded focus: ring focus:ring-blue-500"
                required
                autoComplete="new-password"
                />
            </div>
            {error&&(
                <div className="mb-4 text-red-600 text-sm text-center">{error}
                </div>
            )}
            {success ? (
                 <div className="mb-4 text-green-600 text-sm text-center">
          Password reset! Redirecting to login...
        </div>
            ):(
                <Button
          type="submit"
          variant="default"
          size="md"
          className="w-full flex items-center justify-center"
          disabled={loading}
          >
            {loading ? <Loader className="animate-spin w-5 h-5 mr-2"/>: null}
            Reset Password
          </Button>
            )}
            <div className="mt-4 text-center">
                <a href="/login" className="text-blue-500 hover:underline text-sm">
          Back to Login
        </a>
            </div>
        </form>
    )
}