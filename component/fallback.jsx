import { Levels, Dots } from "react-activity";

const SubstituteCoverPhoto = props => {
    const { title } = props;

    const containerStyle = `object-fit w-full h-[150px] md:h-[250px] relative select-none bg-no-repeat overflow-hidden`
    const beforeStyle = `before:opacity-40 before:w-full before:h-full before:bg-black`
    return (
        <div
            className={`${containerStyle}`}
        >
            <div
                className="absolute left-0 right-0 top-[50%] !z-[20] translate-y-[-50%] text-black"
            >{title}</div>
        </div>
        )
} 

const SubstitutePanel = props => {
    const { title } = props; 
    const divStyle = `relative w-11/12 mx-auto h-[350px] box-shadow bg-cover bg-center
        before:opacity-40 before:w-full before:h-full before:bg-black rounded-lg before:rounded-lg
        before:z-10 before:absolute before:top-0 before:left-0 before:right-0 before:bg-center before:bg-cover 
        cursor-pointer select-none bg-no-repeat overflow-hidden mb-[20px] cursor-pointer`; 

    return (
        <div
            id="panel"
            className={`${divStyle} backgroundTransition NormalPosition`}
        >
            <div
                id="contentWrapper"
                className="absolute left-0 right-0 top-[50%] !z-[20] translate-y-[-50%] text-white"
            >
                <h2 className="mx-auto text-3xl md:text-5xl font-bold capitalize mb-5 w-fit wrapperChild">{title}</h2>
            </div>
        </div>
    )
}

export {
    SubstituteCoverPhoto,
    SubstitutePanel
}