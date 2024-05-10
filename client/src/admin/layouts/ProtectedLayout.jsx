import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import DashboardLayout from './DashboardLayout'
import Basic from '../../helpers/Basic'
import NotFoundScreen from '../general/NotFoundScreen'
import { check } from '../../admin/auth/authSlice'

export default function ProtectedLayout({ roles, children, error = false }) {

    const basic = new Basic()
    const dispatch = useDispatch()

    useEffect(() => {
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
