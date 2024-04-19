
export const validateLoginForm = (key, value) => {
    switch (key) {
        case "email":
            if (value.length === 0) {
                return "Email required";
            } else {
                const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
                return !regex.test(value) ? "Email not valid" : false;
            }
        case "password":
            return value.length === 0 ? "Password required" : false;
        default:
            return false;
    }
};


export const validateRegisterForm = (key, value, formData) => {
    switch (key) {
        case 'name':
            return value.length === 0 ? 'Name is required' : false;
        case 'email':
            if (value.length === 0) {
                return 'Email is required';
            } else {
                const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
                return !regex.test(value) ? 'Email is not valid' : false;
            }
        case 'password':
            return value.length === 0 ? 'Password is required' : false;
        case 'password_confirmation':
            return value !== formData.password ? 'Passwords not matching' : false;
        default:
            return false;
    }
};