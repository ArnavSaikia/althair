import AuthLayout from "@/Components/auth/AuthLayout"
import GoogleAuthButton from "@/Components/auth/GoogleAuthButton"
import AuthDivider from "@/Components/auth/AuthDivider"

function Login() {
    return (
        <AuthLayout title="Welcome back">
            <GoogleAuthButton />

            <AuthDivider />

            <form className="space-y-4">
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full border rounded-md px-4 py-3 text-sm"
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full border rounded-md px-4 py-3 text-sm"
                />

                <button
                    className="
                        w-full
                        bg-neutral-800
                        text-white
                        rounded-full
                        py-3
                        text-sm
                        mt-4
                        hover:bg-neutral-700
                        transition
                    "
                >
                    Log in
                </button>
            </form>

            <div className="text-center mt-6 text-xs text-neutral-600">
                <a href="#" className="hover:underline">
                    Forgot password?
                </a>
            </div>
        </AuthLayout>
    )
}

export default Login
