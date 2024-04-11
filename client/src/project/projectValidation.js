
export const validateForm = (key, value) => {
    switch (key) {
        case "name":
            if (value.length === 0) {
                return "Name equired"
            } else {
                return (value.length >= 20) ? "Maximum charecters cannot exceed 20" : false
            }
        case "description":
            return (value.length === 0) ? "Description required" : false

    }
    return false
}