import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { validateForm } from './userValidation'
import Validator from '../../helpers/Validator'
import ProtectedLayout from '../layouts/ProtectedLayout'
import { unwrapResult } from '@reduxjs/toolkit'
import { store } from './userSlice'

export default function () {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const validator = new Validator()

    const [errors, setErrors] = useState({})
    const [formValues, setFormValues] = useState({
        title: "",
        content: "",
        yellow: "",
        zip: "",
    })

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
                const resultAction = await dispatch(store(newFormData))
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
                <h1>Create User</h1>
            </div>

            <div className="row">
                <div className='cardbody col-lg-6'>
                    <form onSubmit={handleSubmit}>

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
