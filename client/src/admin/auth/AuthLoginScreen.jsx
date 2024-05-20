import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import BlankLayout from '../layouts/BlankLayout'
import { vr } from '../../helpers/vr'
import { unwrapResult } from '@reduxjs/toolkit'
import { login, reset } from './authSlice'
import { validateForm } from './authValidation'
import NoAuthLayout from '../layouts/NoAuthLayout'

export default function () {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    

    const [formValues, setFormValues] = useState({ email: "admin@mail.com", password: "welcome" })
    const [errors, setErrors] = useState({})
    const { user, error, loading } = useSelector(state => state.auth)

    const onChangeForm = (e) => {
        const validated = vr.validate(e, validateForm, formValues)
        setFormValues(prev => ({ ...prev, ...validated.formValues }))
        setErrors(prev => ({ ...prev, ...validated.error }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newFormData = vr.submit(formValues, validateForm)
        if (typeof newFormData.errors != 'undefined') {
            setErrors(newFormData.errors)
        } else {
            try {
                const resultAction = await dispatch(login(newFormData))
                unwrapResult(resultAction)
                navigate('/admin/modules')
            } catch (error) {
                console.error(error)
            }
        }
    }

    return (
        <NoAuthLayout>

            <div className='cardbody col-md-4 col-sm-8 '>
                <h1>Login</h1>
                <p className="my-1">Don't have an account? <Link to="/register">Sign Up</Link></p>
                <p className="my-1">Go to <Link to="/">Home</Link></p>

                {
                    error &&
                    <p className='red-alert'>{error}</p>
                }

                <form onSubmit={handleSubmit} noValidate={true}>
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

                    {
                        error &&
                        <p className='my-1'><Link to='/forgot-password'>Forgot password?</Link></p>
                    }


                    {
                        loading ? <div className='loader'></div> : <button className="btnmid">SIGN IN</button>
                    }

                </form>
            </div>

        </NoAuthLayout>
    )
}
