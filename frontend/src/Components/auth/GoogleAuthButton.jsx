import { useGoogleLogin } from "@react-oauth/google"
import { useNavigate } from "react-router-dom"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

function GoogleAuthButton() {
    const navigate = useNavigate();

    const login = useGoogleLogin({
        flow: "implicit",
        onSuccess: async (tokenResponse) => {
            const response = await fetch(`${API_BASE_URL}/users/auth/google`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    credential: tokenResponse.id_token
                })
            })

            const data = await response.json()

            if (!response.ok) {
                console.log(data.message)
                return
            }

            console.log("Google login successful")
            navigate("/")
        },

        onError: () => {
            console.log("Google Login Failed")
        }
    })


    return (
        <button
            onClick={() => login()}
            className="
                cursor-pointer
                w-full
                flex
                items-center
                justify-center
                gap-3
                border
                border-neutral-300
                rounded-full
                py-3
                text-sm
                font-medium
                transition
                hover:bg-neutral-50
            "
        >
            <img
                src="/logo-google.png"
                alt=""
                className="w-4 h-4"
            />
            Continue with Google
        </button>
    )
}

export default GoogleAuthButton
