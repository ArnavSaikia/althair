import '../Styles/Navbar.css';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';

export default function Navbar() {
    return (
        <div className="h-[7vh] w-[100vw] flex justify-between items-center border-b border-gray-400 font-[inter]">
            <img src={null} className="hidden"></img>
            <div className="flex gap-[1rem] justify-between items-center pl-[1rem] pr-[1rem]">
                <a href="" className="navbar-link group">Home<span></span></a>
                <a href="" className="navbar-link group">Categories<span></span></a>
                <a href="" className="navbar-link group">My Wardrobe<span></span></a>
                <a href="" className="navbar-link group">Outfit<span></span></a>
            </div>
            <div className='flex justify-between items-center gap-[0rem]'>
                <button className='shadow-md p-2 rounded-4xl h-1/2 flex '>
                    <AddIcon style={{ fontSize: "inherit", color: "#333"}} />
                    <span className='hidden'>Add Item</span>
                </button>
                <button className='shadow-md p-2 rounded-4xl h-1/2 flex'>
                    <SearchIcon style={{ fontSize: "inherit", color: "#333"}} />
                    <span className='hidden'>Search</span>
                </button>
            </div>
        </div>
    )
}