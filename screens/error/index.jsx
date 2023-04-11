const RenderErrorPage = props => {
    const { message, error } = props; 
    
    return (
        <div
            className="w-full text-center text-lg text-black"
        >
            {error ?
                <h1 className= "H1Style">{error}</h1>
                :
                <h1 className="H1Style">404 Error</h1> 

                }
            {message &&
                <p>{message}</p>
            }
        </div>
        )
}

export default RenderErrorPage