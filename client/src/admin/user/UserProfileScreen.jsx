import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { show, update } from './userSlice'
import { validateForm } from './userValidation'
import Validator from '../../helpers/Validator'
import ProtectedLayout from '../layouts/ProtectedLayout'

export default function () {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const validator = new Validator()
    const authUser = useSelector(state => state.auth.user)

    const { item, error, success } = useSelector(state => state.user)
    const [formValues, setFormValues] = useState(item || {})
    const [errors, setErrors] = useState({})

    useEffect(() => {
        dispatch(show(authUser.id));
    }, [dispatch, authUser]);

    useEffect(() => {
        if (item) {
            setFormValues(item);
        }
    }, [item]);

    const onChangeForm = (e) => {
        setFormValues(prev => ({ ...prev, ...validator.validate(e, validateForm).formValues }))
        setErrors(prev => ({ ...prev, ...validator.validate(e, validateForm).error }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const newFormData = validator.submit(formValues, validateForm)
        if (typeof newFormData.errors != 'undefined') {
            setErrors(newFormData.errors)
        } else {
            dispatch(update(newFormData))
        }
    }

    return (
        <ProtectedLayout roles="all">
            <div className="page-header">
                <h1>My Profile</h1>
            </div>

            <div className='row'>
                <div className='col-md-8'>
                    <div className="cardbody">
                        <form onSubmit={handleSubmit}>

                            {success && <p className='green-alert'>{success}</p>}
                            {error && <p className='red-alert'>{error}</p>}

                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input type="text"
                                    className="form-control input-field"
                                    id="name"
                                    value={formValues.name || ''}
                                    name="name"
                                    onChange={onChangeForm}
                                />
                                <div className="color-red">{errors.name}</div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="text"
                                    className="form-control input-field"
                                    id="email"
                                    value={formValues.email || ''}
                                    name="email"
                                    onChange={onChangeForm}
                                />
                                <div className="color-red">{errors.email}</div>
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
