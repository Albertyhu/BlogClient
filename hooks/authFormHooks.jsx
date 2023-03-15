import { checkEmail } from './checkEmail.jsx'; 

const RegistrationHooks = props => {

    function HandleSignUpSubmit(evt, elements, existingUsers) {
        evt.preventDefault();
        console.log(existingUsers)
        const { NameInput,
            EmailInput,
            PasswordInput,
            ConfirmInput } = elements; 
        var isValid = true; 
        var errMessage = "Error: ";
        if (existingUsers.some(person => person.username == NameInput.value.trim())) {
            errMessage += "The username you wrote is already in use. \n";
            isValid = false; 

        }
        if (!checkEmail(EmailInput.value.trim())) {
            errMessage += "Your email must be in the format of john@email.com. \n"; 
            isValid = false; 
        }
        if (existingUsers.some(person => person.email == EmailInput.value.trim())) {
            errMessage += "The email you wrote is already in use. \n";
            isValid = false; 
        }
        if (PasswordInput.value.trim().length < 4) {
            errMessage += "Your password must be at least 4 characters long. \n";
            isValid = false; 
        }
        if (PasswordInput.value.trim() != ConfirmInput.value.trim()) {
            errMessage += "Your confirmation password must match your password. \n";
            isValid = false;
        }
        if (isValid) {
            console.log('success!')
        }
        else
            console.log(errMessage)
    }

    function DisplayMessage(MessageElement) {

    }

    function onChangeHandler(evt, dispatch) {
        dispatch(evt.target.value)
    }

    return { HandleSignUpSubmit, onChangeHandler} 
}

export { RegistrationHooks }; 