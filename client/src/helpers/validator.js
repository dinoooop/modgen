class Validator {
	validate(e, validateForm) {
		if (e.target.type === 'file') {
			const file = e.target.files[0];
			const error = validateForm(e.target.name, file);
			return {
				formData: { [e.target.name]: file },
				error: { [e.target.name]: error }
			};
		} else {
			const error = validateForm(e.target.name, e.target.value);
			return {
				formData: { [e.target.name]: e.target.value },
				error: { [e.target.name]: error }
			};
		}
	}

	submit(formData, validateForm) {
		const updatedErrors = {}
		Object.entries(formData).forEach(([key, value]) => {
			updatedErrors[key] = validateForm(key, value)
		})

		const allErrorsFalse = Object.values(updatedErrors).every(error => error === false)
		if (allErrorsFalse) {
			const newFormData = new FormData()
			Object.entries(formData).forEach(([key, value]) => {
				newFormData.append(key, value)
			})

			return newFormData;

			// navigate('/admin/projects')
		}

		return { errors: updatedErrors };


	}
}

const validator = new Validator();
export default validator;
