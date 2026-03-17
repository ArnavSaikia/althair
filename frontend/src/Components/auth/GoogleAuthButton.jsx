import { GoogleLogin } from "@react-oauth/google"
import { useRef } from "react";
import { useNavigate } from "react-router-dom"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

function GoogleAuthButton() {
    const navigate = useNavigate();
    const googleBtnRef = useRef(null);

    const handleSuccess = async (credentialResponse) => {
        const response = await fetch(`${API_BASE_URL}/users/auth/google`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                credential: credentialResponse.credential
            })
        });

        const data = await response.json();

        if (!response.ok) {
            console.log(data.message);
            return;
        }

        console.log("Google login successful");
        navigate("/");
    };


    return (
        <>
            <div style={{ display: "none" }} ref={googleBtnRef}>
                <GoogleLogin
                    onSuccess={handleSuccess}
                    onError={() => console.log("Google Login Failed")}
                />
            </div>
            <button
                onClick={() => {
                    googleBtnRef.current.querySelector("div[role=button]").click();
                }}
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
        </>
    )
}

export default GoogleAuthButton
