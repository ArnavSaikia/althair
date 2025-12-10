import '../Styles/Navbar.css';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import MenuIcon from '@mui/icons-material/Menu';
import { useState, useEffect, useRef} from 'react';


export default function Navbar() {
    const [searchIsOpen, setSearchIsOpen] = useState(false);
    const [isOpen, setisOpen] = useState(false);
    const searchRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
            setSearchIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    return (
        <div className="sticky top-0 bg-white z-[100] h-[10vh] w-[100vw] flex justify-between items-center border-b border-gray-400 font-[inter] px-4">
            <span className='font-["Elsie_Swash_Caps"] text-2xl'>Althair</span>
            <div className="hidden flex gap-[1rem] justify-between items-center pl-[1rem] pr-[1rem]">
                <a href="" className="navbar-link group">Home<span></span></a>
                <a href="" className="navbar-link group">Categories<span></span></a>
                <a href="" className="navbar-link group">My Wardrobe<span></span></a>
                <a href="" className="navbar-link group">Outfit<span></span></a>
            </div>

            <div className='flex justify-between items-center gap-[0rem]'>
                <button className='bg-transparent p-2 rounded-4xl h-full flex '>
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
                    />
                </button>

                <button className='bg-transparent p-2 rounded-4xl h-full flex'>
                    <MenuIcon sx={{ fontSize: 24, color: "#333" }} />
                </button>
            </div>

        </div>
    )
}