import { useEffect, lazy, useCallback, useState, Suspense, useRef} from 'react';
import { ErrorMessageHooks } from "../hooks/errorHooks.jsx";
import { RegistrationHooks } from '../hooks/authFormHooks.jsx';
import { useNavigate } from 'react-router-dom'; 
import '../src/index.css'; 
import DeleteIcon from '../assets/icons/cancel.png'; 
import uuid from 'react-uuid';
import { searchTag } from '../hooks/tagHooks.jsx';
import {
    HandleFileChange,
    AttachImagesToArray,
} from '../hooks/imageHooks.jsx';
import { wait } from '../hooks/wait.jsx'
const RenderProfilePic = lazy(() => import('./user/profilePicture.jsx'));
const RenderCoverPhoto = lazy(() => import("./imageRendering/coverPhoto.jsx"));
import PropTypes from 'prop-types';
const AddButton = lazy(() => import('./addButton.jsx'));
import { NavigationHooks } from '../hooks/navigation.jsx';
//import RenderPreviewImages from "./imageRendering/mainImage.jsx";
const RenderPreviewImages = lazy(() => import("./imageRendering/previewImage.jsx")); 

const { RenderError, AnimateErrorMessage } = ErrorMessageHooks();
const BasicInputStyle = `px-1 text-lg border-black border-[1px] rounded bg-transparent`;
const BasicLabelStyle = `text-lg`;
const BasicTextAreaStyle = `resize-none rounded-lg w-full p-1 bg-[rgba(0,0,0,0)] border-[1px] 
                            border-white placeholder:text-[#545454] text-lg`

export const FormButtons = props => {
    const navigate = useNavigate(); 
    const UniversalStyle = `rounded-full px-[10px] py-1 sm:px-[12px] active:translate-x-[5px] text-xl
    active:translate-y-[5px] select-none  cursor-pointer sm:w-[150px] text-center w-fit my-5`

    const SubmitStyle = `!active:bg-[#C6C6C6] border-[#dbdbdb] border-2 
    text-black mx-auto hover:bg-gray-300 !bg-[#dbdbdb] ${UniversalStyle}`;

    const CancelStyle = `!active:bg-[#4B4B4B] border-white border-2 
    text-white mx-auto hover:bg-gray-300 !bg-[#333333] ${UniversalStyle}`; 

    return (
        <div id="ButtonWrapper"
            className = "flex"
        >
            <button
                type="submit"
                className={SubmitStyle}
                value="Submit"
            >Submit</button>
            <button
                type="button"
                className={CancelStyle}
                value="Cancel"
                onClick={useCallback(()=>navigate(-1))}
            >Cancel</button>
        </div>
        )
}

export const PostFormElements = (navigate) => {
    const { GoCreateCategory } = NavigationHooks(navigate); 

    const SelectCategory = props => {
        const {
            categoryList,
            currentOption,
            label = "Category",
            setData,
            dataError,
            labelStyle = "text-xl", 
            categorySelectRef, 
        } = props;

        const errorRef = useRef(); 
        useEffect(() => {
            if (dataError.length > 0) {
                for (var child of errorRef.current.children) {
                    AnimateErrorMessage(child)
                }
            }
        }, [dataError])

        return (
            <>
                <label className={labelStyle}>{label}</label>
                <select
                    name="category"
                    className="w-full text-sm md:text-lg rounded-md"
                    ref={categorySelectRef}
                    defaultValue={currentOption ? currentOption : ""}
                >
                    {categoryList && categoryList.map(opt =>
                        <option
                            key={opt._id}
                            value={opt._id}
                            className="text-sm"
                        >{opt.name}</option>
                    
                    )}
                </select>
                <p className = "text-sm md:text-lg mt-[10px]">Don't see a desired category?</p>
                <Suspense fallback={<p>Loading...</p>}>
                    <div><AddButton
                        title="Create a new category"
                        dispatchFunction={GoCreateCategory}
                        altText="Add a new category"
                    /></div>
                </Suspense>
                <div
                    id="dataError"
                    className="ErrorDiv"
                    ref={errorRef}>
                    {dataError != null && dataError.length > 0 && RenderError(dataError)}
                </div>
            </>
        )
    }

    SelectCategory.propTypes = {
        label: PropTypes.string,
        name: PropTypes.string,
    }
    return { SelectCategory }
}
