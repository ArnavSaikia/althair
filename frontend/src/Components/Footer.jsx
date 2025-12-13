import { ArrowUpIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

function Footer(){
    return(
        <>
            <div className="w-screen p-4 flex flex-col bg-[#f2f0ec]">
                <div className="">
                    <h1>Deserunt occaecat ex duis minim eu minim exercitation tempor.</h1>
                    <p>
                        Cillum aliqua anim ullamco sit pariatur ipsum est adipisicing ex reprehenderit in reprehenderit mollit exercitation. Esse occaecat ea in voluptate consectetur irure labore incididunt cupidatat eu. Minim consectetur cillum anim est velit culpa laborum quis commodo sunt magna anim ea ipsum.
                    </p>
                    <Button variant="outline" size="icon" className="rounded-full">
                        <ArrowUpIcon />
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full">
                        <ArrowUpIcon />
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full">
                        <ArrowUpIcon />
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full">
                        <ArrowUpIcon />
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full">
                        <ArrowUpIcon />
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