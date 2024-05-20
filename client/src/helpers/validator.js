import {basic} from "./Basic";

export default class Validator {

	validate(e, validateForm, formValues = null) {

		

		const { name, value, type, checked, files, options, multiple } = e.target;

		if (multiple) {
			// Handle multi-select change
			const selectedValues = [];
			for (let i = 0; i < options.length; i++) {
				if (options[i].selected) {
					selectedValues.push(options[i].value);
				}
			}

			return {
				formValues: { [name]: selectedValues },
				error: { [name]: validateForm(name, selectedValues) }
			}
		}

		if (type === 'checkbox') {

			// Special conditions by name, for single checkbox
			if (name === 'status') {
				return {
					formValues: { [name]: checked },
					error: { [name]: validateForm(name, value) }
				}
			}


			const error = validateForm(name, value)
			const newFormValues = { ...formValues }

			newFormValues[name] = basic.toggleArrayItem(newFormValues[name], value);
			return { formValues: newFormValues, error: { [name]: error } }

		} else if (type === 'file') {
			const file = files[0]
			const error = validateForm(name, file)
			return {
				formValues: { [name]: file },
				error: { [name]: error }
			}
		} else {
			const error = validateForm(name, value, formValues)
			return {
				formValues: { [name]: value },
				error: { [name]: error }
			}
		}
	}

	submit(formValues, validateForm) {
		const updatedErrors = {}
		Object.entries(formValues).forEach(([key, value]) => {
			updatedErrors[key] = validateForm(key, value, formValues)
		})
		const allErrorsFalse = Object.values(updatedErrors).every(error => error === false)

		if (allErrorsFalse) {
			return formValues
		}

		return { errors: updatedErrors }
	}

	submitFile(formValues, validateField) {

		const updatedErrors = Object.fromEntries(
			Object.entries(formValues).map(([key, value]) => [key, validateField(key, value)])
		)

		const allErrorsFalse = Object.values(updatedErrors).every((error) => error === false)

		if (allErrorsFalse) {
			const newFormData = new FormData()
			Object.entries(formValues).forEach(([key, value]) => {
				newFormData.append(key, value)
			});

			return newFormData
		}

		return { errors: updatedErrors }
	}

	

}