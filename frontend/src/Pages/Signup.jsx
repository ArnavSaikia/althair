import AuthLayout from "@/Components/auth/AuthLayout"
import GoogleAuthButton from "@/Components/auth/GoogleAuthButton"
import AuthDivider from "@/Components/auth/AuthDivider"

function Signup() {
    return (
        <AuthLayout title="Create your account">
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

                <input
                    type="password"
                    placeholder="Confirm password"
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
                    Sign up
                </button>
            </form>
        </AuthLayout>
    )
}

export default Signup
