import uuid from 'react-uuid'; 

const RenderPanel = props => {
    const {
        title, 
        itemList, 
        RenderListItem, 
    } = props;  
    return (
        <div
            id={`${title} panel`}
            className= "hidden md:block w-full h-fit text-center text-lg text-black rounded-lg bg-[#ffffff] py-10 mr-10 box_shadow mb-5"
        >
            <div
                id={`${title} list wrapper`}
                className="w-11/12 mx-auto"
            >
            {title &&
                <h2 className="text-2xl text-center font-bold">{title}</h2>}

            {itemList && itemList.length > 0 &&
                <ul className = "">
                        {itemList.map((item, index) =>
                            <li
                                key={`popular-${item._id}`}
                                className={`cursor-pointer my-5 text-left ${index % 2 == 1 ? "bg-[#ffffff]" : "bg-[#dedede]"}`}
                            >
                                {RenderListItem(item, item._id, index)}
                            </li>)}
                </ul>
                }
            </div>
        </div>
        )

}



export default RenderPanel 