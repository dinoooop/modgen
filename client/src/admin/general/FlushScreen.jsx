import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import DashboardLayout from '../layouts/DashboardLayout'
import { flush } from './generalSlice'

export default function () {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const serverError = useSelector(state => state.general.error)
    const serverMessage = useSelector(state => state.general.message)


    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(flush())
        // navigate('/admin/posts')
    }

    return (
        <DashboardLayout>
            <div className="page-header">
                <h1>Flush Users</h1>
            </div>
            <div className="row">
                <div className='cardbody col-lg-6'>
                    {
                        serverError &&
                        <p className='red-alert'>{serverError}</p>
                    }
                    {
                        serverMessage &&
                        <p className='green-alert'>{serverMessage}</p>
                    }
                    <form onSubmit={handleSubmit}>
                        <p>Delete other users and its files</p>
                        <button type='submit' className="btn submit">Flush</button>
                        <Link to="/admin/posts" className="btn">Cancel</Link>
                    </form>
                </div>
            </div>
        </DashboardLayout>
    )
}