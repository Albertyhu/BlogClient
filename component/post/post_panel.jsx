import RenderThumbnail from './renderThumbnail.jsx'; 

const RenderPostPanel = props => {
    const { title,
        content, 
        datePublished, 
        author,
        thumbnail,
        abstract, 
        category,
        tag,
        likes, 
        comments, 
        _id
    } = props; 

    return (
        <div className="PostPanel box-shadow">
            <div
                id="ContentWrapper"
                className="ContentWrapper">
                <h2 className="">{title}</h2>
                {author && <h3>author.username</h3>}
                <span>{datePublished}</span>
                {thumbnail && <RenderThumbnail image={thumbnail} altText={title} />}
                <h3></h3>
                {abstract &&
                    <p>{abstract}</p>}
            </div>

        </div>
        )
}  