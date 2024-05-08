import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { show, update } from './userSlice'
import { validateForm } from './userValidation'
import Validator from '../../helpers/Validator'
import ProtectedLayout from '../layouts/ProtectedLayout'
import { unwrapResult } from '@reduxjs/toolkit'

export default function () {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()
    const validator = new Validator()

    const { item, error } = useSelector(state => state.user)
    const [formValues, setFormValues] = useState(item || {})
    const [errors, setErrors] = useState({})

    useEffect(() => {
        dispatch(show(params.id))
    }, [dispatch, params.id])

    useEffect(() => {
        setFormValues(item)
    }, [item])

    const onChangeForm = (e) => {
        const validated = validator.validate(e, validateForm, formValues)
        setFormValues(prev => ({ ...prev, ...validated.formValues }))
        setErrors(prev => ({ ...prev, ...validated.error }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newFormData = validator.submit(formValues, validateForm)
        if (typeof newFormData.errors != 'undefined') {
            setErrors(newFormData.errors)
        } else {
            try {
                const resultAction = await dispatch(update(newFormData))
                unwrapResult(resultAction)
                navigate('/admin/users')
            } catch (error) {
                console.error(error)
            }
        }
    }

    return (

        <ProtectedLayout roles="admin">
            <div className="page-header">
                <h1>Edit User</h1>
            </div>

            <div className="row">
                <div className='cardbody col-lg-6'>
                    <form onSubmit={handleSubmit}>

                        {
                            error &&
                            <p className='red-alert'>{error}</p>
                        }

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
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password"
                                className="form-control input-field"
                                id="password"
                                value={formValues.password}
                                name="password"
                                onChange={onChangeForm}
                            />
                            <div className="color-red">{errors.password}</div>
                        </div>

                        <button type='submit' className="btn submit">Submit</button>
                        <Link to="/admin/users" className="btn">Cancel</Link>

                    </form>
                </div>
            </div>
        </ProtectedLayout>

    )
}
