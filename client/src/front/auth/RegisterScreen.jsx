import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { register } from './authSlice'
import { validateRegisterForm } from './authValidation'
import BlankLayout from '../layouts/BlankLayout'

export default function () {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [formData, setFormData] = useState({
        name: "John", email: "john@mail.com", password: "welcome", password_confirmation: "welcome"
    })
    const [errors, setErrors] = useState({})
    const authUser = useSelector(state => state.auth.user)
    const serverError = useSelector(state => state.auth.error)

    useEffect(() => {
        if (authUser) {
            navigate('/admin/projects')
        }
    }, [authUser])

    const onChangeForm = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
        const error = validateRegisterForm(e.target.name, e.target.value, formData)
        setErrors(prev => ({ ...prev, [e.target.name]: error }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const updatedErrors = {}
        Object.entries(formData).forEach(([key, value]) => {
            updatedErrors[key] = validateRegisterForm(key, value, formData)
        })
        setErrors(prev => ({ ...prev, ...updatedErrors }))
        const allErrorsFalse = Object.values(updatedErrors).every(error => error === false)
        if (allErrorsFalse) {
            dispatch(register(formData))
        }
    }

    return (
        <BlankLayout>
            <div className="midbox">
                <div className='cardbody'>
                    <h1>Sign Up</h1>
                    <p className="my-1">Have an account? <Link to="/login">Log in now</Link></p>
                    {
                        serverError &&
                        <p className='red-alert'>{serverError}</p>
                    }
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Name</label>
                            <input type="text"
                                className="form-control input-field"
                                id="name"
                                value={formData.name}
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
                                value={formData.email}
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
                                value={formData.password}
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
                                value={formData.password_confirmation}
                                name="password_confirmation"
                                onChange={onChangeForm}
                            />
                            <div className="color-red">{errors.password_confirmation}</div>
                        </div>
                        <button type='submit' className="btn submit">SIGN UP</button>
                    </form>
                </div>
            </div>
        </BlankLayout>
    )
}
