import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import BlankLayout from '../layouts/BlankLayout'
import Validator from '../../helpers/Validator'
import { unwrapResult } from '@reduxjs/toolkit'
import { check, login, resendVerificationCode, reset, verify } from './authSlice'
import { validateForm } from './authValidation'

export default function () {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()
    const validator = new Validator()

    const [formValues, setFormValues] = useState({ email: "admin@mail.com", password: "welcome" })
    const [errors, setErrors] = useState({})
    const { user: authUser, error, success, loading } = useSelector(state => state.auth)

    useEffect(() => {
        dispatch(reset())
        dispatch(check())
    }, [dispatch])

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
                newFormData.process_link = params.id
                const resultAction = await dispatch(verify(newFormData))
                unwrapResult(resultAction)
                navigate('/admin/modules')
            } catch (error) {
                console.error(error)
            }
        }
    }


    const handleResend = () => {

        
        dispatch(reset())
        dispatch(resendVerificationCode())

    }

    return (
        <BlankLayout>

            <div className='cardbody col-md-4 col-sm-8'>
                <h1>Account Verification</h1>
                <p className="my-1">We just sent you a temporary verification code . Please check your inbox. Can't find it? <span className='btnreg' onClick={handleResend}>resend</span></p>
            </div>

        </BlankLayout>
    )
}
