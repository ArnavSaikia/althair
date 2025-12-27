import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

function AuthCallback() {
    const navigate = useNavigate()

    useEffect(() => {
        // backend will set httpOnly cookie or redirect with token
        navigate("/wardrobe")
    }, [])

    return (
        <div className="min-h-screen flex items-center justify-center">
            <p className="text-sm text-neutral-600">
                Signing you in…
            </p>
        </div>
    )
}

export default AuthCallback
