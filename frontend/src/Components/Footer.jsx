import { ArrowUpIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';

function Footer(){
    return(
        <>
            <div className="w-screen p-4 flex flex-col bg-[#f2f0ec] pt-8">
                <div className="">
                    <span className='font-["Elsie_Swash_Caps"] text-3xl'>Althair</span>
                    <p className="my-4 font-[inter]">
                        Curate your personal style. Build outfits that reflect who you are. Your wardrobe, reimagined.
                    </p>
                    <Button variant="outline" size="icon" className="rounded-full mr-3">
                        <InstagramIcon />
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full">
                        <XIcon />
                    </Button>
                    
                </div>

                <div>
                    <h1>Quick Links</h1>
                    <ul>
                        <li><a>About</a></li>
                        <li><a>Shop</a></li>
                        <li><a>Contact</a></li>
                        <li><a>Subscribe</a></li>
                        <li><a>Terms & Conditions</a></li>
                    </ul>
                </div>
            </div>

            <hr className="w-screen bg-black"/>

            <div className="w-screen p-4 flex flex-start">
                <span>
                    © FASHIONESE. ALL RIGHTS RESERVED
                </span>
            </div>
        </>
    )
}

export default Footer;