import Navbar from '../Components/Navbar.jsx';

function Landing(){
    return(
        <>
            <Navbar/>
            <div className='size-max'>
                <img src='../../public/hero.png' className='w-screen h-[40vh] object-cover'></img>
                <div className='w-screen p-4'>
                    <span className='text-lg'>Shop By Category</span>
                    <div className='flex'>
                        <img src={null}/>
                        <img src={null}/>
                        <img src={null}/>
                    </div>
                </div>
            </div>
        </> 
    )
}

export default Landing;