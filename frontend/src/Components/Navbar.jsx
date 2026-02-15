import '../Styles/Navbar.css';
import NavbarMobileDrawer from './NavbarMobileDrawer';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import MenuIcon from '@mui/icons-material/Menu';
import { useState, useEffect, useRef} from 'react';
import { useNavigate } from 'react-router-dom';


export default function Navbar() {
    const navigate = useNavigate();
    const [searchIsOpen, setSearchIsOpen] = useState(false);
    const [isOpen, setisOpen] = useState(false);
    const searchRef = useRef(null);
    const drawerRef = useRef(null);
    const [searchQuery , setSearchQuery] = useState("");
    const [addModalOpen, setAddModalOpen] = useState(false);

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


    return (
        <div className="sticky top-0 bg-white z-[100] h-[10vh] w-[100vw] lg:w-full flex justify-between items-center border-b border-gray-400 font-[inter] px-4">
            <span className='font-["Elsie_Swash_Caps"] text-2xl cursor-pointer' onClick={() => navigate('/')}>Althair</span>
            <div className="hidden flex gap-[1rem] justify-between items-center pl-[1rem] pr-[1rem]">
                <a href="" className="navbar-link group" onClick={() => navigate('/')}>Home<span></span></a>
                <a href="" className="navbar-link group" onClick={() => navigate('/curated')}>Curated Collection<span></span></a>
                <a href="" className="navbar-link group" onClick={() => navigate('/wardrobe')}>My Wardrobe<span></span></a>
                <a href="" className="navbar-link group" onClick={() => navigate('/outfits')}>Outfit<span></span></a>
            </div>

            <div className='flex justify-between items-center gap-[0rem]'>
                <button
                    className='bg-transparent p-2 rounded-4xl h-full flex hover:bg-black/5 transition-colors'
                    onClick={() => setAddModalOpen(true)}
                >
                    <AddIcon sx={{ fontSize: 24, color: "#333" }}/>
                    <span className='hidden'>Add Item</span>
                </button>

                <button ref={searchRef} className={`p-2 rounded-4xl h-full flex ${searchIsOpen? "border border-gray-300 bg-gray-300/20" : "bg-transparent border border-transparent"}`}>
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

                <button className='bg-transparent p-2 rounded-4xl h-full flex' onClick={() => setisOpen(true)}>
                    <MenuIcon sx={{ fontSize: 24, color: "#333" }} />
                </button>
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
                                navigate('wardrobe/new');
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
                                navigate('outfits/build');
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