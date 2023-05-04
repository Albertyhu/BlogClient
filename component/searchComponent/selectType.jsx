import { useContext } from 'react';
import { SearchBarContext } from '../../util/contextItem.jsx'; 
import uuid from 'react-uuid';

const RenderSelection = props => {
    const {
        searchTypes, 
    } = props; 

    return (
        <>
        <h3 className ="font-bold text-center text-2xl my-1">Search by:</h3>
        <div
            id="SearchSelectionField"
            className="[&>*]:inline-block [&>*]:mx-1 [&>*]:md:mx-5 [&>*]:my-1 mx-auto justify-center my-1 text-center" 
            >
            {searchTypes && searchTypes.length > 0 && 
                searchTypes.map(type => <Button
                    searchType={type}
                    key={uuid()}
                />)
            }
            </div>
        </>
        )
}

const Button = props => {
    const {
        searchType,
    } = props;

    const {
        setType, 
        selectedSearchType, 
    } = useContext(SearchBarContext)

    return (
        <button
            type="button"
            className={`rounded-[15px] w-fit px-[10px] py-1 text-base text-black box_shadow cursor-pointer font-bold ${selectedSearchType === searchType ? "bg-[#dedede]" : "bg-white"}`}
            id={`${searchType} switch button`}
            onClick={() => {setType(searchType)}}
        >{searchType}</button>
    )
}

export default RenderSelection; 