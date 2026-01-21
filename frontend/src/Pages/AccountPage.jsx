import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

function AccountPage() {
    const API_URL = import.meta.env.VITE_API_BASE_URL;
    const [details , setDetails] = useState(null);

    async function fetchDetails() {
        const response = await fetch(`${API_URL}/users/profile`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
        });
        const data = await response.json();
        if(response.ok){
            setDetails(data);
            return;
        }
        setDetails({
            name: "Anonymous Archivist",
            email: "identity unavailable",
            outfitsCount: "—",
            clothingCount: "—",
            archiveStarted: "Date unknown",
        });

    }

    fetchDetails();

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
                        {details ? (
                                <>
                                    <h1 className="font-['Cormorant_Garamond'] text-3xl">
                                        {details.name}
                                    </h1>
                                    <p className="font-['Cormorant_Garamond'] text-[15px] text-[#6f6c66]">
                                        {details.email}
                                    </p>
                                </>
                            ) : (
                                <div className="flex flex-col gap-2">
                                    <Skeleton className="h-8 w-48" />
                                    <Skeleton className="h-4 w-64" />
                                </div>
                        )}

                    </div>

                    <div className="border-t border-[#3b3a36]/30" />

                    {/* Archive Metadata */}
                    <div className="flex flex-col gap-4">
                        <p className="font-['Cormorant_Garamond'] text-[16px] text-[#3b3a36]">
                            <button
                                type="button"
                                className="
                                    font-['Cormorant_Garamond']
                                    hover:opacity-70
                                    transition
                                    underline-offset-4
                                    mr-1
                                "
                            >
                                {details ? (
                                    details.outfitCount
                                ) : (
                                    <Skeleton className="inline-block h-4 w-6" />
                                )}
                            </button>{" "}
                            Outfits
                        </p>

                        <p className="font-['Cormorant_Garamond'] text-[16px] text-[#3b3a36]">
                            <button
                                type="button"
                                className="
                                    font-['Cormorant_Garamond']
                                    hover:opacity-70
                                    transition
                                    underline-offset-4
                                    mr-1
                                "
                            >
                                {details ? (
                                    details.wardrobeCount
                                ) : (
                                    <Skeleton className="inline-block h-4 w-6" />
                                )}
                            </button>{" "}
                            Garments
                        </p>

                        <p className="font-['Cormorant_Garamond'] text-[14px] text-[#6f6c66]">
                            Archive started ·{" "}
                            {details ? (
                                new Date(details.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
                            ) : (
                                <Skeleton className="inline-block h-4 w-24 ml-1" />
                            )}
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
