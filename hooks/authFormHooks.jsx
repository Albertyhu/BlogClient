import { checkEmail } from './checkEmail.jsx'; 

const RegistrationHooks = props => {

    function HandleSignUpSubmit(evt, elements, existingUsers, apiURL) {
        evt.preventDefault();
        const {
            RegistrationForm,
            NameInput,
            EmailInput,
            PasswordInput,
            ConfirmInput } = elements; 
        var isValid = true; 
        var errMessage = "Error: ";
        //if (existingUsers.some(person => person.username == NameInput.value.trim())) {
        //    errMessage += "The username you wrote is already in use. \n";
        //    isValid = false; 

        //}
        //if (!checkEmail(EmailInput.value.trim())) {
        //    errMessage += "Your email must be in the format of john@email.com. \n"; 
        //    isValid = false; 
        //}
        //if (existingUsers.some(person => person.email == EmailInput.value.trim())) {
        //    errMessage += "The email you wrote is already in use. \n";
        //    isValid = false; 
        //}
        //if (PasswordInput.value.trim().length < 4) {
        //    errMessage += "Your password must be at least 4 characters long. \n";
        //    isValid = false; 
        //}
        //if (PasswordInput.value.trim() != ConfirmInput.value.trim()) {
        //    errMessage += "Your confirmation password must match your password. \n";
        //    isValid = false;
        //}
        if (isValid) {
            const data = {
                username: NameInput.value, 
                email: EmailInput.value,
                password: PasswordInput.value,
                confirm_password: ConfirmInput.value
            }
            //console.log("apiURL: ", apiURL)
            //RegistrationForm.submit(); 
            SubmitRegistration(data, apiURL) 
        }
        else
            console.log(errMessage)
    }

    async function SubmitRegistration(data, apiURL) {
        console.log("SubmitRegistration executed")
        const {
            username, 
            email,
            password, 
            confirm_password,
            profilepicture, 
        } = data; 
        await fetch("http://localhost:80/auth/register", {
            method: "POST", 
            body: JSON.stringify({
                username: username, 
                email: email, 
                password: password
            })
        })
            .then(response => {

                const result = response.json()
                if (result.ok) {
                    console.log("Registration is successful.")
                }
                else {
                    console.log("Registration failed with status code: ", result.status)
                }
            })
            .then(date => {
                console.log("Registration successful", data)

            })
            .catch(error => {
                console.log("error: ", error)
            })
    }

    function DisplayMessage(MessageElement) {

    }

    function onChangeHandler(evt, dispatch) {
        dispatch(evt.target.value)
    }

    return { HandleSignUpSubmit, onChangeHandler, SubmitRegistration } 
}

export { RegistrationHooks }; 