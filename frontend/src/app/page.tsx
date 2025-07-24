import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">Habit Tracker AI</h1>
      <p className="text-lg text-gray-700 mb-8 text-center max-w-xl">
        Track your habits, set goals, earn rewards, and get motivated by our AI chatbot. Start your journey to a better you!
      </p>
      <div className="flex gap-4">
        <Link href="/login">
          <Button variant="default" size="lg">Login</Button>
        </Link>
        <Link href="/register">
          <Button variant="secondary" size="lg">Register</Button>
        </Link>
      </div>
    </div>
  );
}