
export const validateForm = (key, value) => {
    switch (key) {
        case "title":
            if (value.length === 0) {
                return "Name equired"
            } else {
                return (value.length >= 20) ? "Maximum charecters cannot exceed 20" : false
            }
        case "content":
            return (value.length === 0) ? "Description required" : false
            
        default:
            return false;

    }

}