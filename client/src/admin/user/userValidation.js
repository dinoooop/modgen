
export const validateForm = (key, value) => {
    switch (key) {
        case "name":
            if (value.length === 0) {
                return "Name equired"
            } else {
                return (value.length >= 20) ? "Maximum charecters cannot exceed 20" : false
            }
        case "status":
            if (value.length === 0) {
                return "Status required"
            } else {
                return false
            }
        case "email":
            if (value.length === 0) {
                return "Email required";
            } else {
                const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
                return !regex.test(value) ? "Email not valid" : false;
            }

        default:
            return false;

    }

}


export const validateSecurityForm = (key, value, formData) => {
    switch (key) {
        case 'old_password':
            return value.length === 0 ? 'Old Password is required' : false;
        case 'password':
            return value.length === 0 ? 'Password is required' : false;
        case 'password_confirmation':
            return value !== formData.password ? 'Passwords not matching' : false;
        default:
            return false;
    }
};