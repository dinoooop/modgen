export const validateForm = (key, value, formData) => {
    console.log(key, value);
    switch (key) {
        case 'name':
            return value.length === 0 ? 'Name is required' : false

        case 'email':
            if (value.length === 0) {
                return 'Email is required'
            } else {
                const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
                return !regex.test(value) ? 'Email is not valid' : false
            }

        case 'password':
            return value.length === 0 ? 'Password is required' : false

        case 'password_confirmation':
            return value !== formData.password ? 'Passwords not matching' : false

        case 'old_password':
            return value.length === 0 ? 'Old Password is required' : false
            
        default:
            return false
    }
}