import { forwardRef } from "react";

const NavbarMobileDrawer = forwardRef((props, ref) => {
    return (
        <div
            ref={ref}
            className={`
                fixed top-0 right-0 h-full w-[70vw] bg-white shadow-xl z-[102]
                transform transition-transform duration-300
                ${props.isOpen ? "translate-x-0" : "translate-x-[100%]"}
            `}
        >
            <div className="flex justify-end p-4">
                <button onClick={() => props.setisOpen(false)}>
                    <span className="text-3xl">&times;</span>
                </button>
            </div>

            <div className="pb-4">
                <span className="px-6 text-2xl block">Arnav Saikia</span>
                <span className="px-6 text-gray-400">4 Outifts</span>
                <span className="text-gray-400">20 Clothing</span>
            </div>
            <div className="flex justify-center">
                <div className="border-b border-gray/350 w-[90%] px-6"></div>
            </div>

            <div className="flex flex-col gap-6 p-6 text-lg font-[inter]">
                <a className="navbar-link">Home</a>
                <a className="navbar-link">Categories</a>
                <a className="navbar-link">My Wardrobe</a>
                <a className="navbar-link">Outfit</a>
            </div>
        </div>
    );
});

export default NavbarMobileDrawer;
