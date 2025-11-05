function Card({image, title}){

    return(
        <div className="relative aspect-3/4">
            <img className="w-[100%] h-[70%]" src={image}></img>
            <div className="absolute w-[100%] h-[30%] bottom-0">
                <span>{title}</span>
            </div>
        </div>
    )
}

export default Card;