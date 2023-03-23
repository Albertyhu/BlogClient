

const RenderProfilePic = props => {
    const { profile_pic } = props;
    const ImageStyle = `select-none w-[270px] h-[270px] object-cover rounded-full mx-auto`;
    const ImageWrapperStyle = `m-auto overflow-hidden relative z-[1]`; 
    console.log("profile_pic: ", profile_pic)
    //const binaryData = new Uint8Array(profile_pic.data);
    //const base64Image = btoa(String.fromCharCode.apply(null, binaryData));
    //const base64Image = toBase64(profile_pic.data)
   // const base64Image = profile_pic.data.toString('base64');

    //const dataURL = `data:${profile_pic.contentType};base64,${base64Image}`;

    const dataURL = `data:${profile_pic.contentType};base64,${profile_pic.data}`;

    try {
        return (
            <div
                id="ImageWrapper"
                className={ImageWrapperStyle}
            >
                <img src={dataURL} alt="Profile Picture" className={`${ImageStyle}`} />
            </div>
        )
    } catch (e) {
        console.log("error in rendering image: ", e)
    }
}

export default RenderProfilePic; 