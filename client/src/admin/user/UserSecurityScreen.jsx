import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { show, update } from './userSlice'
import { validateSecurityForm } from './userValidation'
import Validator from '../../helpers/Validator'
import ProtectedLayout from '../layouts/ProtectedLayout'

export default function () {

    const dispatch = useDispatch()
    const validator = new Validator()

    const fields = { old_password: '', password: '', password_confirmation: '' }
    const authUser = useSelector(state => state.auth.user)
    const { success, error } = useSelector(state => state.user)
    const [formValues, setFormValues] = useState(fields)
    const [errors, setErrors] = useState({})

    useEffect(() => {
        dispatch(show(authUser.id));
    }, [dispatch, authUser]);

    const onChangeForm = (e) => {
        const validated = validator.validate(e, validateSecurityForm, formValues)
        setFormValues(prev => ({ ...prev, ...validated.formValues }))
        setErrors(prev => ({ ...prev, ...validated.error }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const newFormData = validator.submit(formValues, validateSecurityForm)
        if (typeof newFormData.errors != 'undefined') {
            setErrors(newFormData.errors)
        } else {
            newFormData.security = true
            newFormData.id = authUser.id
            setFormValues(fields)
            dispatch(update(newFormData))
        }
    }

    return (

        <ProtectedLayout roles="all">
            <div className="page-header">
                <h1>Security</h1>
            </div>

            <div className='row'>
                <div className='col-md-6'>
                    <div className="cardbody">
                        <form onSubmit={handleSubmit}>

                            {success && <p className='green-alert'>{success}</p>}
                            {error && <p className='red-alert'>{error}</p>}

                            <div className="form-group">
                                <label htmlFor="old_password">Old Password</label>
                                <input type="password"
                                    className="form-control input-field"
                                    id="old_password"
                                    value={formValues.old_password}
                                    name="old_password"
                                    onChange={onChangeForm}
                                />
                                <div className="color-red">{errors.old_password}</div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">New Password</label>
                                <input type="password"
                                    className="form-control input-field"
                                    id="password"
                                    value={formValues.password}
                                    name="password"
                                    onChange={onChangeForm}
                                />
                                <div className="color-red">{errors.password}</div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password_confirmation">Confirm New Password</label>
                                <input type="password"
                                    className="form-control input-field"
                                    id="password_confirmation"
                                    value={formValues.password_confirmation}
                                    name="password_confirmation"
                                    onChange={onChangeForm}
                                />
                                <div className="color-red">{errors.password_confirmation}</div>
                            </div>

                            <button type='submit' className="btn submit">Submit</button>
                            <Link to="/admin/modules" className="btn">Cancel</Link>
                        </form>
                    </div>

                </div>
            </div>
        </ProtectedLayout>

    )
}
