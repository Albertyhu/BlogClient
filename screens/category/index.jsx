import React, { useCallback, useContext, useEffect, useState, lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavigationHooks } from '../../hooks/navigation.jsx';
import { AppContext } from '../../util/contextItem.jsx';
import { CategoryHooks } from '../../hooks/categoryHooks.jsx';
import PlusIcon from '../../assets/icons/white_plus_icon.png'; 

const CategoryPage = props => {
    const navigate = useNavigate();
    const { GoCreateCategory } = NavigationHooks(navigate);
    const { FetchCategories } = CategoryHooks(navigate); 
    const { user,
        apiURL,
        categoryList, 
        setCategoryList, 
    } = useContext(AppContext);


    const dispatchFunctions = {
        setCategoryList
    }

    useEffect(() => {
        FetchCategories(apiURL, dispatchFunctions); 
    },[])

    useEffect(() => {
        console.log("list: ", categoryList)
        if (categoryList != null && categoryList.length > 0) {
            console.log("list: ", categoryList)
        }
    }, [categoryList])

    return (
        <div
            className="w-full text-center text-lg text-black"
        >
            <h1 className="text-center mx-auto mt-[20px] text-2xl">Categories</h1>
            <div className="[&>*]:inline-block grid [&>*]:my-10 ">
                <button
                    className="btn-add"
                    onClick={GoCreateCategory}
                >Create a new category
                    <img
                        src={PlusIcon}
                        alt="Add Icon"
                        className="buttonIcons"
                    />
                </button>
            </div>
        </div>)
}

export default CategoryPage; 