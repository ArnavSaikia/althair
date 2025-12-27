const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

function GoogleAuthButton() {
    return (
        <button
            onClick={() => {
                window.location.href = `${API_BASE_URL}/auth/google`
            }}
            className="
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
