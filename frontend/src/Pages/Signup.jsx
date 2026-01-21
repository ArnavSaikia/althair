import AuthLayout from "@/Components/auth/AuthLayout"
import GoogleAuthButton from "@/Components/auth/GoogleAuthButton"
import AuthDivider from "@/Components/auth/AuthDivider"
import { useState } from "react"

function Signup() {
    const API_URL = import.meta.env.VITE_API_BASE_URL;

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
    const [confirmPassword, setConfirmPassword] = useState("")
    const [name, setName] = useState("")
    const [statusMessage, setStatusMessage] = useState("");

    const passwordsMatch =
        password !== "" &&
        confirmPassword !== "" &&
        password === confirmPassword;

    const isSignupValid =
        email.trim() !== "" &&
        password.trim() !== "" &&
        confirmPassword.trim() !== "" &&
        passwordsMatch;

    async function performSignUp(name, email, password) {
        if (!isSignupValid) return null;
        const response = await fetch(`${API_URL}/users/register`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                password
            })
        });

        const data = await response.json();
        if (response.status >= 500) {
            setStatusMessage("An internal error occurred");
        } else if (response.status >= 400) {
            setStatusMessage(data.message);
        }
        if(response.ok) console.log("Success signing in")
        
        //need to add navigation to home page after this when react router has been set up
    }

    return (
        <AuthLayout title="Create your account">
            <GoogleAuthButton />

            <AuthDivider />

            <form className="space-y-4 flex flex-col items-center">
                <input
                    type="text"
                    placeholder="Name"
                    className={diaryInputClass}
                    onChange={(e) => {
                        setName(e.target.value)
                    }}
                />

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

                <input
                    type="password"
                    placeholder="Confirm password"
                    className={diaryInputClass}
                    onChange={(e) => {
                        setConfirmPassword(e.target.value)
                    }}
                />

                {confirmPassword && !passwordsMatch && (
                    <p className="
                        mt-1
                        text-[12px]
                        font-['Cormorant_Garamond']
                        text-[#8a877f]
                        text-center
                    ">
                        Passwords don't match
                    </p>
                )}

                {statusMessage && (
                    <span
                        className="
                        mt-2
                        max-w-md
                        text-center
                        font-['Cormorant_Garamond']
                        text-[14px]
                        tracking-wide
                        text-[#8a877f]
                        leading-relaxed
                    "
                    >{statusMessage}</span>
                )}

                <button
                    onClick={() => performSignUp(name, email, password)}
                    disabled={!isSignupValid}
                    type="button"
                    className={`
                        w-full
                        bg-neutral-800
                        text-white
                        rounded-full
                        py-3
                        text-sm
                        mt-4
                        transition
                        ${isSignupValid
                            ? "hover:bg-neutral-700"
                            : "opacity-40 cursor-not-allowed"}
                    `}
                >
                    Sign up
                </button>

            </form>

            <p className="
                mt-8
                text-[14px]
                font-['Cormorant_Garamond']
                text-[#6f6c66]
                text-center
            ">
                Already have an account?{" "}
                <span
                    onClick={() => navigate("/login")}
                    className="
                        cursor-pointer
                        text-[#2f2e2b]
                        hover:opacity-70
                        transition
                    "
                >
                    Sign in
                </span>
            </p>

        </AuthLayout>
    )
}

export default Signup
