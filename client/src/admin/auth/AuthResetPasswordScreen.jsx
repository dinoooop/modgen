import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import BlankLayout from '../layouts/BlankLayout'
import Validator from '../../helpers/Validator'
import { unwrapResult } from '@reduxjs/toolkit'
import { check, forgotPassword, login, resendVerificationCode, reset, resetPassword, verify } from './authSlice'
import { validateForm } from './authValidation'

export default function () {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()
    const validator = new Validator()

    const { user, error, success, loading } = useSelector(state => state.auth)
    const [formValues, setFormValues] = useState({ email: "admin@mail.com", password: "welcome" })
    const [errors, setErrors] = useState({})

    useEffect(() => {
        dispatch(reset())
        if (user) {
            navigate('/admin/modules')
        }
    }, [dispatch, user])

    const onChangeForm = (e) => {
        const validated = validator.validate(e, validateForm, formValues)
        setFormValues(prev => ({ ...prev, ...validated.formValues }))
        setErrors(prev => ({ ...prev, ...validated.error }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch(reset())
        const newFormData = validator.submit(formValues, validateForm)
        if (typeof newFormData.errors != 'undefined') {
            setErrors(newFormData.errors)
        } else {
            try {
                newFormData.reset_link = params.reset_link
                const resultAction = await dispatch(resetPassword(newFormData))
                unwrapResult(resultAction)
            } catch (error) {
                console.error(error)
            }
        }
    }

    return (
        <BlankLayout>






            {
                success
                    ?
                    <div className='cardbody col-md-4 col-sm-8'>
                        <p>Your password succesfully updated. <Link to="/login">Login now</Link></p>
                    </div>
                    :
                    <div className='cardbody col-md-4 col-sm-8'>
                        <h1>Reset Password</h1>
                        <p className="my-1">Enter your new password. Go back to <Link to="/login">Login</Link>.</p>

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

                            {
                                loading
                                    ? <div className='loader'></div>
                                    : <button className="btnmid">RESET</button>
                            }
                        </form>
                    </div>
            }



        </BlankLayout>
    )
}
