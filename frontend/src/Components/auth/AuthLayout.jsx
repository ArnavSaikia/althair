import Navbar from "../Navbar"
import Footer from "../Footer"

function AuthLayout({ title, children }) {
    return (
        <>
            <Navbar/>
            <div className="min-h-[90vh] flex items-center justify-center px-4">
                <div className="w-full max-w-sm">
                    <h1
                        className="
                        text-3xl
                        text-center
                        mb-10
                        font-['Cormorant_Garamond']
                        font-light
                        tracking-wide
                        text-neutral-800
                    "
                    >
                        {title}
                    </h1>

                    {children}
                </div>
            </div>
            <Footer/>
        </>     
    )
}

export default AuthLayout
