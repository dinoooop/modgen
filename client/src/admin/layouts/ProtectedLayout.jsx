import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DashboardLayout from './DashboardLayout'
import Basic from '../../helpers/Basic'
import NotFoundScreen from '../general/NotFoundScreen'
import { useNavigate } from 'react-router-dom'
import { check } from '../../admin/auth/authSlice'

export default function ({ roles, children, error = false }) {

    const basic = new Basic()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const authUser = useSelector(state => state.auth.user)

    useEffect(() => {

        if (!authUser) {
            navigate('/login')
        }

        dispatch(check())
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
