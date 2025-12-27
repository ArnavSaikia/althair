function AuthDivider() {
    return (
        <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-neutral-200" />
            <span className="text-xs text-neutral-500 tracking-wide">
                or continue with email
            </span>
            <div className="flex-1 h-px bg-neutral-200" />
        </div>
    )
}

export default AuthDivider
