import '../Styles/Navbar.css';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';

export default function Navbar() {
    return (
        <div className="h-[7vh] w-[100vw] flex justify-between items-center border-b border-gray-400 font-[inter]">
            <img src={null} className="hidden"></img>
            <div className="flex gap-[1rem] justify-between items-center pl-[1rem] pr-[1rem]">
                <a href="" className="navbar-link">Home</a>
                <a href="" className="navbar-link">Categories</a>
                <a href="" className="navbar-link">My Wardrobe</a>
                <a href="" className="navbar-link">Outfit</a>
            </div>
            <div className='flex justify-between items-center'>
                <button>
                    <AddIcon style={{ fontSize: 28, color: "#333" }} />
                    <span className='hidden'>Add Item</span>
                </button>
                <button>
                    <SearchIcon style={{ fontSize: 28, color: "#333" }} />
                    <span className='hidden'>Search</span>
                </button>
            </div>
        </div>
    )
}