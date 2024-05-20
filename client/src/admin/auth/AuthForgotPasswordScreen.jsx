import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import BlankLayout from '../layouts/BlankLayout'
import { vr } from '../../helpers/vr'
import { unwrapResult } from '@reduxjs/toolkit'
import { check, forgotPassword, login, resendVerify, reset, verify } from './authSlice'
import { validateForm } from './authValidation'
import NoAuthLayout from '../layouts/NoAuthLayout'

export default function () {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()
    

    const [formValues, setFormValues] = useState({ email: "admin@mail.com", password: "welcome" })
    const [errors, setErrors] = useState({})
    const { user, error, success, loading } = useSelector(state => state.auth)

    

    const onChangeForm = (e) => {
        const validated = vr.validate(e, validateForm, formValues)
        setFormValues(prev => ({ ...prev, ...validated.formValues }))
        setErrors(prev => ({ ...prev, ...validated.error }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch(reset())
        const newFormData = vr.submit(formValues, validateForm)
        if (typeof newFormData.errors != 'undefined') {
            setErrors(newFormData.errors)
        } else {
            try {
                newFormData.process_link = params.id
                const resultAction = await dispatch(forgotPassword(newFormData))
                unwrapResult(resultAction)
            } catch (error) {
                console.error(error)
            }
        }
    }


    return (
        <NoAuthLayout>

            <div className='cardbody col-md-4 col-sm-8'>
                <h1>Forgot Password</h1>
                <p className="my-1">Enter your registered email to request an account password reset. Go back to <Link to="/login">login.</Link></p>

                {
                    error &&
                    <p className='red-alert'>{error}</p>
                }

                {
                    success &&
                    <p className='green-alert'>{success}</p>
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

                    {
                        loading
                            ? <div className='loader'></div>
                            : <button className="btnmid">GET RESET LINK</button>
                    }
                </form>
            </div>

        </NoAuthLayout>
    )
}
