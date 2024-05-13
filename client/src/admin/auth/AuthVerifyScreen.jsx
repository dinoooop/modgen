import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import BlankLayout from '../layouts/BlankLayout'
import { check, resendVerify, reset } from './authSlice'

export default function () {

    const dispatch = useDispatch()
    const { user, error, success } = useSelector(state => state.auth)


    useEffect(() => {
        dispatch(reset())
        dispatch(check())
    }, [dispatch])

    const handleResend = () => {
        dispatch(reset())
        dispatch(resendVerify())
    }

    return (
        <BlankLayout>
            <div className='cardbody col-md-4 col-sm-8'>
                <h1>Account Verification</h1>
                {success && <p className='green-alert'>{success}</p>}
                {error && <p className='red-alert'>{error}</p>}
                <p className="my-1">We just sent you a temporary verification link. Please check your inbox. Can't find it? <span className='btnreg' onClick={handleResend}>resend</span></p>
            </div>
        </BlankLayout>
    )
}
