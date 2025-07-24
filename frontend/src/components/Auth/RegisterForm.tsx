import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";

export default function RegisterForm(){
    const {register, loading} = useAuth()
    const [form, setForm] = useState({
        username: "",
        fullname: "",
        email: "",
        password: ""
    })
    const [error, setError] = useState<string| null>(null)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setForm({...form, [e.target.name]: e.target.value})
        setError(null)
    }
    const handleSubmit = async(e:React.FormEvent)=>{
        e.preventDefault()
        try {
            await register(form)
        } catch (err: any) {
            setError(err?.message || "Registration failed")
        }
    }
    return(
        <form 
        onSubmit={handleSubmit}
        className={cn("bg-white rounded-lg shadow p-6 w-full max-w-md mx-auto")}
        >
            <h2 className="text-2xl font-bold mb-6 text-blue-600 text-center">Register</h2>
            <div className="mb-4">
                <label className="block mb-1 font-medium text-gray-700">Username</label>
                <input 
                name="username"
                value={form.username}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:ring focus:ring-blue-500"
                required
                autoComplete="username"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-1 font-medium text-gray-700">Full Name</label>
                <input 
                name="fullname"
                value={form.fullname}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:ring focus:ring-blue-500"
                required
                autoComplete="name"
                />
            </div> 
            <div className="mb-4">
                <label className="block mb-1 font-medium text-gray-700">Email</label>
                <input 
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:ring focus:ring-blue-500"
                required
                autoComplete="email"
                />
            </div> 
            <div className="mb-4">
                <label className="block mb-1 font-medium text-gray-700">Password</label>
                <input 
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:ring focus:ring-blue-500"
                required
                autoComplete="new-password"
                />
            </div>
            {error &&(
                <div className="mb-4 text-red-600 text-sm text-center">{error}</div>
            )}
            <Button
            type="submit"
            variant="default"
            size="md"
            className="w-full flex items-center justify-center"
            disabled={loading}
            >
                {loading ? <Loader className="animate-spin w-5 h-5 mr-2"/>: null}
                Register
            </Button>
            <div className="mt-4 text-center">
                <a href="/login" className="text-blue-500 hover:underline text-sm">
                Already have an accounnt? Login</a>
            </div>
        </form>
    )
}