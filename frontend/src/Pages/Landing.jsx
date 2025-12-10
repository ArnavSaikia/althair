import Navbar from '../Components/Navbar.jsx';
import Card from '../Components/Card.jsx'
import Footer from '../Components/Footer.jsx';

function Landing(){
    return(
        <>
            <Navbar/>
            <div className='size-max'>
                <img src='/hero.png' className='w-screen h-[80vh] object-cover' alt="hero" />
                <div className='w-screen p-4'>
                    <span className='text-lg'>Shop By Category</span>
                    <div className='grid grid-cols-2 gap-4 '>
                        <div className='flex flex-col gap-4'>
                            <img src='/upperwear_landing.jpg' className='h-[auto] flex-none aspect-2/3' alt="upperwear" />
                            <img src='/bottomwear_landing.jpg' className='h-[auto] grow aspect-2/3' alt="bottomwear" />
                        </div>
                        <img src='/footwear_landing.jpg' className='h-[100%] flex-none aspect-2/3' alt="footwear" />
                    </div>
                </div>

                <div className='w-screen p-4'>
                    <span className='text-lg'>Featured Outfits</span>
                    <div className='h-[35vh] flex gap-[1rem] overflow-scroll'>
                        <Card image="/upperwear_landing.jpg" title={"template"} />
                        <Card image="/upperwear_landing.jpg" title={"template"} />
                        <Card image="/upperwear_landing.jpg" title={"template"} />
                        <Card image="/upperwear_landing.jpg" title={"template"} />
                    </div>
                </div>

                <div className='w-screen p-4'>
                    <span className='text-lg'>Featured Clothing</span>
                    <div className='h-[35vh] flex gap-[1rem] overflow-scroll'>
                        <Card image="/upperwear_landing.jpg" title={"template"} />
                        <Card image="/upperwear_landing.jpg" title={"template"} />
                        <Card image="/upperwear_landing.jpg" title={"template"} />
                        <Card image="/upperwear_landing.jpg" title={"template"} />
                    </div>
                </div>

                <Footer/>
            </div>
        </> 
    )
}

export default Landing;