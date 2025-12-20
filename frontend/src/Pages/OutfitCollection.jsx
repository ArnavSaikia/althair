import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import CollectionHeader from "../Components/CollectionHeader"
import OutfitGrid from "@/Components/OutiftGrid"

function OutfitCollection() {
    // later this comes from backend
    const outfits = [
        {
            id: 1,
            name: "Evening neutrals",
            preview: "/upperwear_landing3.jpg",
            createdAt: "12 Dec 2025"
        },
        {
            id: 2,
            name: "Monochrome work fit",
            preview: "/accessories_landing1.jpg",
            createdAt: "25 Dec 2025"
        },
        {
            id: 3,
            name: "Casual weekend vibes",
            preview: "/upperwear_landing1.jpg",
            createdAt: "8 Jan 2026"
        },
        {
            id: 4,
            name: "Minimalist chic",
            preview: "/accessories_landing2.jpg",
            createdAt: "15 Jan 2026"
        },
        {
            id: 5,
            name: "Urban street style",
            preview: "/upperwear_landing2.jpg",
            createdAt: "3 Feb 2026"
        },
        {
            id: 6,
            name: "Summer pastels",
            preview: "/accessories_landing3.jpg",
            createdAt: "10 Feb 2026"
        },
        {
            id: 7,
            name: "Classic office look",
            preview: "/upperwear_landing3.jpg",
            createdAt: "18 Feb 2026"
        },
        {
            id: 8,
            name: "Bohemian dreams",
            preview: "/accessories_landing1.jpg",
            createdAt: "22 Feb 2026"
        },
        {
            id: 9,
            name: "Edgy leather jacket",
            preview: "/upperwear_landing1.jpg",
            createdAt: "1 Mar 2026"
        },
        {
            id: 10,
            name: "Soft romantic",
            preview: "/accessories_landing2.jpg",
            createdAt: "7 Mar 2026"
        }
    ]

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-[#f2f0ec] px-4 pb-20 pt-14">
                <CollectionHeader count={outfits.length} />

                <OutfitGrid outfits={outfits} />
            </div>
            <Footer/>
        </>
    )
}

export default OutfitCollection
