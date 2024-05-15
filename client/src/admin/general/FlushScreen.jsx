import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import DashboardLayout from '../layouts/DashboardLayout'
import { flush, reset } from './generalSlice'

export default function () {
    const dispatch = useDispatch()
    const { error, success } = useSelector(state => state.general)

    useEffect(() => {
        dispatch(reset())
    }, [dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(flush())
    }

    return (
        <DashboardLayout>
            <div className="page-header">
                <h1>Flush Users</h1>
            </div>
            <div className="row">
                <div className='cardbody col-lg-6'>

                    {success && <p className='green-alert'>{success}</p>}
                    {error && <p className='red-alert'>{error}</p>}

                    <form onSubmit={handleSubmit}>
                        <p>Delete other users and its files</p>
                        <button type='submit' className="btn submit">Flush</button>
                        <Link to="/admin/modules" className="btn">Cancel</Link>
                    </form>
                </div>
            </div>
        </DashboardLayout>
    )
}