import '../Styles/Navbar.css';
import NavbarMobileDrawer from './NavbarMobileDrawer';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import MenuIcon from '@mui/icons-material/Menu';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { useState, useEffect, useRef} from 'react';
import { useNavigate , useLocation } from 'react-router-dom';


export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchIsOpen, setSearchIsOpen] = useState(false);
    const [isOpen, setisOpen] = useState(false);
    const searchRef = useRef(null);
    const drawerRef = useRef(null);
    const [searchQuery , setSearchQuery] = useState("");
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [currentPage , setCurrentPage] = useState(location.pathname);

    useEffect(() => {
        function handleClickOutside(event) {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setSearchIsOpen(false);
            }

            if (drawerRef.current && !drawerRef.current.contains(event.target)) {
                setisOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        function handleScroll() {
            setScrolled(window.scrollY > 40);
        }

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className={`
            sticky top-0 z-[100]
            w-[100vw] lg:w-full

            flex justify-between items-center
            px-4 lg:px-10

            h-[10vh] lg:h-[72px]

            transition-all duration-500 ease-in-out

            relative  border-b border-black/5
            shadow-[0_4px_24px_rgba(0,0,0,0.06)]
        `}>
            <div className="
                absolute inset-0
                bg-white/80 backdrop-blur-md
                border-b border-black/5
                shadow-[0_4px_24px_rgba(0,0,0,0.06)]
                z-[-1]
            " />
            <div className="flex items-center justify-between lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center w-full max-w-[1200px] mx-auto">
                <span className='font-["Elsie_Swash_Caps"] text-2xl cursor-pointer ' onClick={() => navigate('/')}>Althair</span>
                <div className="hidden lg:flex gap-10 items-center">
                    <button className={`inline-block text-sm tracking-wide transition-colors duration-500 cursor-pointer font-['Cormorant_Garamond'] tracking-wide text-lg md:text-xl lg:text-lg ${location.pathname == '/' ? "text-black font-semibold" : "transition-transform duration-[300ms] ease-out hover:-translate-y-[2px]"}`} onClick={() => navigate('/')}>Home<span></span></button>
                    <button className={`inline-block text-sm tracking-wide transition-colors duration-200 cursor-pointer font-['Cormorant_Garamond'] tracking-wide text-lg md:text-xl lg:text-lg ${location.pathname == '/curated' ? "text-black font-semibold" : "transition-transform duration-[300ms] ease-out hover:-translate-y-[2px]"}`} onClick={() => navigate('/curated')}>Collections<span></span></button>
                    <button className={`inline-block text-sm tracking-wide transition-colors duration-200 cursor-pointer font-['Cormorant_Garamond'] tracking-wide text-lg md:text-xl lg:text-lg ${location.pathname == '/wardrobe' ? "text-black font-semibold" : "transition-transform duration-[300ms] ease-out hover:-translate-y-[2px]"}`} onClick={() => navigate('/wardrobe')}>Wardrobe<span></span></button>
                    <button className={`inline-block text-sm tracking-wide transition-colors duration-200 cursor-pointer font-['Cormorant_Garamond'] tracking-wide text-lg md:text-xl lg:text-lg ${location.pathname == '/outfits' ? "text-black font-semibold" : "transition-transform duration-[300ms] ease-out hover:-translate-y-[2px]"}`} onClick={() => navigate('/outfits')}>Outfits<span></span></button>
                </div>

                <div className='flex justify-end items-center gap-1 lg:gap-3'>
                    <button
                        className='cursor-pointer bg-transparent p-2 rounded-4xl h-full flex hover:scale-110 active:scale-95'
                        onClick={() => setAddModalOpen(true)}
                    >
                        <AddIcon sx={{ fontSize: 24, color: "#333" }}/>
                        <span className='hidden'>Add Item</span>
                    </button>

                    <button ref={searchRef} className={`hover:scale-110 active:scale-95 cursor-pointer p-2 rounded-4xl h-full flex ${searchIsOpen? "border border-gray-300 bg-gray-300/20" : "bg-transparent border border-transparent"}`}>
                        <SearchIcon onClick={()=> setSearchIsOpen(!searchIsOpen)} sx={{ fontSize: 24, color: "#333" }} />
                        {/* <span className={`${searchIsOpen ? "" : "hidden"}`}>Search</span> */}
                        <input
                            type="text"
                            placeholder="Search..."
                            className={`
                                transition-all duration-300 ease-out
                                outline-none
                                bg-transparent
                                ${searchIsOpen ? "w-40 opacity-100 px-2 ml-2" : "w-0 opacity-0 p-0"}
                            `}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && searchQuery.trim()) {
                                    navigate(`/search?q=${searchQuery.trim()}`)
                                }
                            }}
                        />
                    </button>

                    <button className='bg-transparent p-2 rounded-4xl h-full flex lg:hidden' onClick={() => setisOpen(true)}>
                        <MenuIcon sx={{ fontSize: 24, color: "#333" }} />
                    </button>

                    <button className='hidden hover:scale-110 active:scale-95 lg:bg-transparent lg:p-2 lg:rounded-4xl lg:h-full lg:flex cursor-pointer' onClick={() => navigate('/account')}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 16 16">
                            <g fill="none" stroke="#333" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.25}>
                                <circle cx={8} cy={6} r={3.25}></circle>
                                <path d="m2.75 14.25c0-2.5 2-5 5.25-5s5.25 2.5 5.25 5"></path>
                            </g>
                        </svg>
                    </button>
                </div>
            </div>

            <div className={`
                fixed inset-0 bg-black/20 backdrop-blur-sm z-[101]
                transition-opacity duration-300
                ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
            `} />

            {/* mobile drawer html....not to be shown in desktop mode */}
            <NavbarMobileDrawer ref={drawerRef} isOpen={isOpen} setisOpen={setisOpen}/>

            {/* Add modal */}
            <div
                className={`
                    fixed inset-0 z-[200]
                    flex items-center justify-center
                    transition-opacity duration-200
                    ${addModalOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
                `}
            >

                {/* backdrop */}
                <div
                    className="absolute inset-0 bg-black/30 backdrop-blur-sm"
                    onClick={() => setAddModalOpen(false)}
                />

                {/* modal box */}
                <div
                    className={`
                        relative
                        bg-white
                        w-[85vw]
                        max-w-[340px]
                        rounded-2xl
                        shadow-[0_20px_60px_rgba(0,0,0,0.25)]
                        border border-black/10
                        p-6
                        transform transition-all duration-200
                        ${addModalOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-2"}
                    `}
                >

                    {/* title */}
                    <h2 className="
                        font-['Cormorant_Garamond']
                        text-2xl
                        text-black/90
                        mb-5
                    ">
                        Add New
                    </h2>

                    {/* options */}
                    <div className="flex flex-col gap-3">

                        <button
                            onClick={() => {
                                setAddModalOpen(false);
                                navigate('/wardrobe/new');
                            }}
                            className="
                                w-full
                                text-left
                                px-4 py-3
                                rounded-xl
                                border border-black/10
                                hover:bg-black/5
                                transition-colors
                            "
                        >
                            <div className="font-medium">Clothing</div>
                            <div className="text-sm text-black/50">
                                Upload a single clothing item
                            </div>
                        </button>

                        <button
                            onClick={() => {
                                setAddModalOpen(false);
                                navigate('/outfits/build');
                            }}
                            className="
                                w-full
                                text-left
                                px-4 py-3
                                rounded-xl
                                border border-black/10
                                hover:bg-black/5
                                transition-colors
                            "
                        >
                            <div className="font-medium">Outfit</div>
                            <div className="text-sm text-black/50">
                                Create a full outfit
                            </div>
                        </button>

                    </div>

                </div>

            </div>

        </div>
    )
}