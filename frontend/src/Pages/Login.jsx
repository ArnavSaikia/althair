import AuthLayout from "@/Components/auth/AuthLayout"
import GoogleAuthButton from "@/Components/auth/GoogleAuthButton"
import AuthDivider from "@/Components/auth/AuthDivider"
import { useState } from "react"

function Login() {
    const diaryInputClass = `
        w-[85vw]
        max-w-md
        bg-transparent
        border-b
        border-[#3b3a36]/45
        py-2
        font-['Cormorant_Garamond']
        text-[18px]
        text-[#2f2e2b]/90
        placeholder:text-[#3b3a36]/45
        focus:outline-none
        focus:border-[#2f2e2b]/80
    `

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const isLoginValid = email.trim() !== "" && password.trim() !== ""


    return (
        <AuthLayout title="Welcome back">
            <GoogleAuthButton />

            <AuthDivider />

            <form className="space-y-4 flex flex-col items-center">
                <input
                    type="email"
                    placeholder="Email"
                    className={diaryInputClass}
                    onChange={(e) => {
                        setEmail(e.target.value)
                    }}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className={diaryInputClass}
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                />

                <button
                    disabled={!isLoginValid}
                    className={`
                        w-full
                        bg-neutral-800
                        text-white
                        rounded-full
                        py-3
                        text-sm
                        mt-4
                        transition
                        ${isLoginValid
                            ? "hover:bg-neutral-700"
                            : "opacity-40 cursor-not-allowed"}
                    `}
                >
                    Log in
                </button>
            </form>

            <p className="
                mt-8
                text-[14px]
                font-['Cormorant_Garamond']
                text-[#6f6c66]
                text-center
            ">
                New here?{" "}
                <span
                    onClick={() => navigate("/signup")}
                    className="
                        cursor-pointer
                        text-[#2f2e2b]
                        hover:opacity-70
                        transition
                    "
                >
                    Create an account
                </span>
            </p>

        </AuthLayout>
    )
}

export default Login
