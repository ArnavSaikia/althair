import { ArrowUpIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';

function Footer(){
    return(
        <>
            <div className="w-screen p-4 flex flex-col bg-[#f2f0ec] pt-8">
                <div className="mb-4">
                    <span className='font-["Elsie_Swash_Caps"] text-3xl'>Althair</span>
                    <p className="my-4 font-[inter]">
                        Curate your personal style. Build outfits that reflect who you are. Your wardrobe, reimagined.
                    </p>
                    <Button variant="outline" size="icon" className="rounded-full mr-3">
                        <InstagramIcon />
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full ">
                        <XIcon />
                    </Button>
                    
                </div>

                <div>
                    <h1 className="font-['Cormorant_Garamond'] text-2xl">Footnotes</h1>
                    <ul>
                        <li><a>Inspiration</a></li>
                        <li><a>Technology Behind</a></li>
                        <li><a>Design Notes</a></li>
                        <li><a>Site In Numbers</a></li>
                        <li><a>To the Users</a></li>
                    </ul>
                </div>
            </div>

            <hr className="w-screen bg-black"/>

            <div className="w-screen p-4 flex flex-start">
                <span>
                    © <span className='font-["Elsie_Swash_Caps"] mr-2'>Althair</span> <i>Made With Love</i>
                </span>
            </div>
        </>
    )
}

export default Footer;