import { useEffect } from 'react';
import { RenderTagField } from '../tagComponent.jsx'; 
import { useNavigate } from 'react-router-dom'; 
import { PostNavigationHooks } from "../../hooks/navigation.jsx"
const SearchResultItem = props => {
    const {
        index, 
        _id, 
        title, 
        content, 
        tag, 
    } = props; 
    const navigate = useNavigate(); 
    const {
        GoToPost,
    } = PostNavigationHooks(navigate)
    useEffect(() => {
        if(tag && tag.length > 0)
        console.log("tag: ", tag)
    }, [tag])
    return (
        <div
            id="SearchResultItem"
            className="rounded-[15px] bg-[#ffffff] mx-auto my-10 p-5 cursor-pointer"
            onClick={() => GoToPost(title, _id) }
        >
            <div
                id="Wrapper"
                className="w-11/12 mx-auto grid">
                {title && <h3 className="font-bold text-2xl">{title}</h3>}
                {content &&
                    <p
                        dangerouslySetInnerHTML={{ __html: content }}
                    ></p>}
                {tag && tag.length > 0 &&
                    <RenderTagField tag={tag} />
                }
            </div>
        </div>
        )
}

export default SearchResultItem; 