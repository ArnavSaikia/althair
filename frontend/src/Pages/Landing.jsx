import Navbar from '../Components/Navbar.jsx';

function Landing(){
    return(
        <>
            <Navbar/>
            <div className='size-max'>
                <img src='../../public/hero.png' className='w-screen h-[40vh] object-cover'></img>
                <div className='w-screen p-4'>
                    <span className='text-lg'>Shop By Category</span>
                    <div className='grid grid-cols-2 gap-4 '>
                        <div className='flex flex-col gap-4'>
                            <img src='../../public/upperwear_landing.jpg' className='h-[50%] flex-none aspect-2/3'/>
                            <img src='../../public/bottomwear_landing.jpg' className='h-[50%] grow aspect-2/3'/>
                        </div>
                        <img src='../../public/footwear_landing.jpg' className='h-[100%] flex-none aspect-2/3'/>
                    </div>
                </div>
            </div>
        </> 
    )
}

export default Landing;