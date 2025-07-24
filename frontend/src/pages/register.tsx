import RegisterForm from "@/components/Auth/RegisterForm";
import { SignUp } from "@clerk/nextjs";

export default function RegisterPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <RegisterForm />
      <div className="mt-8 w-full max-w-md">
        <h3 className="text-center text-gray-500 mb-2">Or register with Clerk</h3>
        <SignUp />
      </div>
    </div>
  );
}