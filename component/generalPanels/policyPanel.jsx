import { useNavigate } from 'react-router-dom';
import { NavigationHooks } from '../../hooks/navigation.jsx';

const Panel = props => {
    const navigate = useNavigate();
    const {
        GoPrivacyPolicy,
        GoTermsAndConditions, 
    } = NavigationHooks(navigate);
    return (
        <div
            id="GuestPanel"
            className="w-full hidden md:block bg-[#ffffff] rounded-[15px] py-10 mx-auto box_shadow mb-5"
        >
            <div
                className="w-11/12 mx-auto justify-center [&>*]:mx-auto"
            >
                <div className="[&>button]:my-5 grid">
                    <button
                        type="button"
                        onClick={GoPrivacyPolicy}
                        className="btn-primary"
                    >
                        <span className="[&>*]:inline-block">Privacy Policy</span>
                    </button>
                    <button
                        type="button"
                        onClick={GoTermsAndConditions}
                        className="btn-add"
                    >
                        <span className="[&>*]:inline-block text-sm md-2:text-base">Terms and Conditions</span>
                    </button>

                </div>
            </div>
        </div>
    )
}

export default Panel; 