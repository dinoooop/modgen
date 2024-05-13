import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DashboardLayout from './DashboardLayout'
import Basic from '../../helpers/Basic'
import NotFoundScreen from '../general/NotFoundScreen'
import { check } from '../../admin/auth/authSlice'
import { useNavigate } from 'react-router-dom'

export default function ProtectedLayout({ roles, children, error = false }) {

    const basic = new Basic()
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth)
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(check())
        if (!user) { navigate('/login') }
    }, [dispatch])

    return (
        <>
            {
                basic.has(roles) && !error ?
                    <DashboardLayout>
                        {children}
                    </DashboardLayout>
                    :
                    <NotFoundScreen />
            }
        </>
    )
}
