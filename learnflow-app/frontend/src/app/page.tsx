import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-primary-50 to-white flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          LearnFlow
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          AI-powered Python tutoring platform. Learn to code with personalized AI agents.
        </p>
        
        <div className="flex gap-4 justify-center">
          <Link href="/auth/login" className="btn-primary max-w-xs">
            Sign In
          </Link>
          <Link href="/auth/register" className="btn-secondary max-w-xs">
            Create Account
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="card">
            <h3 className="text-lg font-semibold mb-2">Chat with AI Tutors</h3>
            <p className="text-gray-600">Get personalized explanations for Python concepts</p>
          </div>
          <div className="card">
            <h3 className="text-lg font-semibold mb-2">Write & Run Code</h3>
            <p className="text-gray-600">Practice with embedded code editor and sandbox</p>
          </div>
          <div className="card">
            <h3 className="text-lg font-semibold mb-2">Track Progress</h3>
            <p className="text-gray-600">Monitor mastery levels across 8 Python modules</p>
          </div>
        </div>
      </div>
    </main>
  );
}
