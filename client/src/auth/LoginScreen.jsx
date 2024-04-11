import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { login } from './authSlice'
import { validateLoginForm } from './authValidation'
import BlankLayout from '../layouts/BlankLayout'

export default function () {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [formData, setLogin] = useState({ email: "admin@mail.com", password: "welcome" })
    const [errors, setErrors] = useState({})
    const authUser = useSelector(state => state.auth.user)
    const serverError = useSelector(state => state.auth.error)

    useEffect(() => {
        if (authUser) {
            navigate('/projects')
        }
    }, [authUser])

    const onChangeForm = (e) => {
        setLogin(prev => ({ ...prev, [e.target.name]: e.target.value }))
        const error = validateLoginForm(e.target.name, e.target.value)
        setErrors(prev => ({ ...prev, [e.target.name]: error }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const updatedErrors = {}
        Object.entries(formData).forEach(([key, value]) => {
            updatedErrors[key] = validateLoginForm(key, value)
        })
        setErrors(prev => ({ ...prev, ...updatedErrors }))
        const allErrorsFalse = Object.values(updatedErrors).every(error => error === false)
        if (allErrorsFalse) {
            dispatch(login(formData))
        }
    }

    return (
        <BlankLayout>
            <div className="midbox">
                <div className='cardbody'>
                    <h1>Login</h1>

                    {
                        serverError &&
                        <p className='red-alert'>{serverError}</p>
                    }

                    <form onSubmit={handleSubmit}>
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
                        <button type='submit' className="btn submit">SIGN IN</button>
                    </form>
                </div>
            </div>
        </BlankLayout>
    )
}
