import { Button } from "@/components/ui/button"
import InstagramIcon from "@mui/icons-material/Instagram"
import XIcon from "@mui/icons-material/X"

function Footer() {
    return (
        <>
            <footer className="
                w-screen
                px-4
                pt-10
                pb-8
                bg-[#141414]
            ">
                {/* Brand */}
                <div className="max-w-xl">
                    <span className="
                        block
                        font-['Elsie_Swash_Caps']
                        text-2xl
                        text-neutral-100
                    ">
                        Althair
                    </span>

                    <p className="
                        mt-3
                        max-w-[38ch]
                        font-sans
                        text-[13px]
                        font-normal
                        leading-relaxed
                        tracking-tight
                        text-neutral-400
                    ">
                        Curate your personal style. Build outfits that reflect who you are.
                        Your wardrobe, reimagined.
                    </p>

                    <div className="mt-5 flex gap-3">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="
                                rounded-full
                                text-neutral-400
                                hover:text-neutral-100
                                hover:bg-white/5
                                transition
                            "
                        >
                            <InstagramIcon />
                        </Button>

                        <Button
                            variant="ghost"
                            size="icon"
                            className="
                                rounded-full
                                text-neutral-400
                                hover:text-neutral-100
                                hover:bg-white/5
                                transition
                            "
                        >
                            <XIcon />
                        </Button>
                    </div>
                </div>

                {/* Footnotes */}
                <div className="mt-5">
                    <span className="
                        block
                        font-['Cormorant_Garamond']
                        text-lg
                        tracking-wide
                        text-neutral-200
                    ">
                        Footnotes
                    </span>

                    <ul className="
                        mt-4
                        space-y-2
                        font-sans
                        text-[13px]
                        tracking-tight
                        text-neutral-400
                    ">
                        {[
                            "Inspiration",
                            "Technology Behind",
                            "Design Notes",
                            "Site In Numbers",
                            "To the Users"
                        ].map((item) => (
                            <li key={item}>
                                <a className="
                                    cursor-pointer
                                    transition
                                    hover:text-neutral-200
                                ">
                                    {item}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </footer>

            {/* Bottom line */}
            <div className="
                w-screen
                px-4
                py-4
                bg-[#141414]
                text-xs
                text-neutral-500
            ">
                © <span className="font-['Elsie_Swash_Caps']">Althair</span>{" "}
                <i>Made with love</i>
            </div>
        </>
    )
}

export default Footer
