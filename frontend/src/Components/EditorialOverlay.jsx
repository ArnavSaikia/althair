export function TitleOverlay({outfit}) {
    console.log(outfit)
    return(
        <div className="
            absolute
            left-4
            top-6
            max-w-[70%]
        ">
            <h1 className="
                font-['Cormorant_Garamond']
                text-white/80
                text-[2.25rem]
                font-light
                leading-[1.1]
                tracking-wide
            ">
                {outfit.name}
            </h1>
        </div>

    )
}

export function DateOverlay({outfit}) {
    return(
        <div className="
            absolute
            bottom-5
            right-5
            text-[11px]
            tracking-[0.25em]
            text-white/60
            
        ">
            {outfit.createdAt}
        </div>

    )
}

export function DateOverlay2({outfit}){
    return(
        <div className="
            absolute
            bottom-5
            right-5
            text-[11px]
            tracking-[0.25em]
            text-white/60
            px-4
            py-2.5
            bg-[#f6f3ee]/40
            backdrop-blur-[2px]
        ">
            {outfit.createdAt}
        </div>
    )
}

export function DescriptionOverlay({outfit}){
    const i = Math.random() > 0.5 ? 1 : 0;
    return(
        <div className="
            absolute
            left-0
            bottom-0
            w-full
            bg-[rgba(245,241,234,0.92)]
            px-6
            py-4
            
        ">
            <p className="
                font-['Cormorant_Garamond']
                text-[17px]
                text-[#2c2b28]
                leading-[1.45]
                text-center
                tracking-[0.015em]
                text-[#2a2824]
            ">
                {i === 1 ? "Assembled with care, " : "Made with care · "}{outfit.createdAt}
            </p>
        </div>


    )
}

export default {DescriptionOverlay, TitleOverlay, DateOverlay};