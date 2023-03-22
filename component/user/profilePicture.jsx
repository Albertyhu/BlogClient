
const RenderProfilePic = props => {
    const { profile_pic } = props;
    const ImageStyle = `select-none w-[270px] h-[270px] object-cover rounded-full mx-auto`;
    const ImageWrapperStyle = `m-auto overflow-hidden relative z-[1]`; 
    console.log("profile_pic: ", typeof profile_pic.data)
    const base64Image = profile_pic.data.toString('base64');
    const dataURL = `data:${profile_pic.contentType};base64,${base64Image}`;

    return (
        <div
            id = "ImageWrapper"
            className={ImageWrapperStyle}
        >
            <img src={dataURL} alt="Profile Picture" className={`${ImageStyle}`} />
        </div>
        )
}

export default RenderProfilePic; 