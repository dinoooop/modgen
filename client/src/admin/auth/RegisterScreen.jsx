import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import BlankLayout from '../layouts/BlankLayout'
import Validator from '../../helpers/Validator'
import { unwrapResult } from '@reduxjs/toolkit'
import { register, reset } from './authSlice'
import { validateRegisterForm } from './authValidation'

export default function () {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const validator = new Validator()

    const [formValues, setFormValues] = useState({
        name: "John", email: "john@mail.com", password: "welcome", password_confirmation: "welcome"
    })
    const [errors, setErrors] = useState({})
    const { user: authUser, error } = useSelector(state => state.auth)

    useEffect(() => {
        dispatch(reset())
        if (authUser) {
            navigate('/admin/modules')
        }
    }, [authUser])

    const onChangeForm = (e) => {
        const validated = validator.validate(e, validateRegisterForm, formValues)
        setFormValues(prev => ({ ...prev, ...validated.formValues }))
        setErrors(prev => ({ ...prev, ...validated.error }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newFormData = validator.submit(formValues, validateRegisterForm)
        if (typeof newFormData.errors != 'undefined') {
            setErrors(newFormData.errors)
        } else {
            try {
                const resultAction = await dispatch(register(newFormData))
                unwrapResult(resultAction)
                navigate('/admin/modules')
            } catch (error) {
                console.error(error)
            }
        }
    }

    return (
        <BlankLayout>
            <div className='cardbody col-md-4 col-sm-8'>

                <h1>Sign Up</h1>
                <p className="my-1">Have an account? <Link to="/login">Log in now</Link></p>
                {
                    error &&
                    <p className='red-alert'>{error}</p>
                }
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Name</label>
                        <input type="text"
                            className="form-control input-field"
                            id="name"
                            value={formValues.name}
                            name="name"
                            onChange={onChangeForm}
                        />
                        <div className="color-red">{errors.name}</div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email"
                            className="form-control input-field"
                            id="email"
                            value={formValues.email}
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
                    <div className="form-group">
                        <label htmlFor="password_confirmation">Confirm Password</label>
                        <input type="password"
                            className="form-control input-field"
                            id="password_confirmation"
                            value={formValues.password_confirmation}
                            name="password_confirmation"
                            onChange={onChangeForm}
                        />
                        <div className="color-red">{errors.password_confirmation}</div>
                    </div>
                    <button type='submit' className="btn submit">SIGN UP</button>
                </form>
            </div>
        </BlankLayout>
    )
}
