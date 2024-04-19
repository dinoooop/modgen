
export const validateForm = (key, value) => {
    switch (key) {
        case "title":
            if (value.length === 0) {
                return "Name equired"
            } else {
                return (value.length >= 20) ? "Maximum charecters cannot exceed 20" : false
            }
        case "description":
            return (value.length === 0) ? "Description required" : false
        case "zip":
            
            if (!value) {
                return "File is required";
            }
            if (value.size > 10 * 1024 * 1024) {
                return "File size cannot exceed 10MB";
            }
            if (!value.name.endsWith(".zip")) {
                return "Only .zip files are allowed";
            }
            return false;
        default:
            return false;

    }

}