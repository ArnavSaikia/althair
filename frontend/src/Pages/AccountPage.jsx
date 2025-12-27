import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import { Link } from "react-router-dom"

function AccountPage() {
    const user = {
        name: "Arnav Saikia",
        email: "arnav@email.com",
        outfitsCount: 17,
        clothingCount: 42,
        archiveStarted: "March 2025",
    }

    return (
        <div className="min-h-screen flex flex-col text-[#2f2e2b]">
            <Navbar />

            <main className="flex-1 px-4">
                <section className="w-full max-w-md py-20 flex flex-col gap-14">
                    {/* Identity */}
                    <div className="flex flex-col gap-1">
                        <h1 className="font-['Cormorant_Garamond'] text-3xl">
                            {user.name}
                        </h1>
                        <p className="font-['Cormorant_Garamond'] text-[15px] text-[#6f6c66]">
                            {user.email}
                        </p>
                    </div>

                    <div className="border-t border-[#3b3a36]/30" />

                    {/* Archive Metadata */}
                    <div className="flex flex-col gap-4">
                        <p className="font-['Cormorant_Garamond'] text-[16px] text-[#3b3a36]">
                            <button
                                type="button"
                                onClick={() => {
                                    // TODO: replace with router navigation later
                                    console.log("Navigate to outfits")
                                }}
                                className="
                                    font-['Cormorant_Garamond']
                                    hover:opacity-70
                                    transition
                                    underline-offset-4
                                    mr-1
                                "
                                >
                                {user.outfitsCount}
                            </button>{" "}
                            Outfits
                        </p>

                        <p className="font-['Cormorant_Garamond'] text-[16px] text-[#3b3a36]">
                            <button
                                type="button"
                                onClick={() => {
                                    console.log("Navigate to wardrobe")
                                }}
                                className="
                                    font-['Cormorant_Garamond']
                                    hover:opacity-70
                                    transition
                                    underline-offset-4
                                    mr-1
                                "
                                >
                                {user.clothingCount}
                            </button>{" "}
                            Garments
                        </p>

                        <p className="font-['Cormorant_Garamond'] text-[14px] text-[#6f6c66]">
                            Archive started · {user.archiveStarted}
                        </p>
                    </div>

                    <div className="border-t border-[#3b3a36]/30" />

                    {/* Logout */}
                    <button
                        className="
                        w-full
                        border
                        border-[#3b3a36]/40
                        py-3
                        font-['Cormorant_Garamond']
                        text-[15px]
                        text-[#2f2e2b]
                        hover:opacity-70
                        transition
                        rounded-full
                    "
                    >
                        Log out
                    </button>
                </section>
            </main>

            <Footer />
        </div>
    )
}

export default AccountPage;
