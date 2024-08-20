import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import BlankLayout from '../layouts/BlankLayout'
import { verify } from './authSlice'

export default function () {

    const dispatch = useDispatch()
    const params = useParams()
    const { user, success, error, loading } = useSelector(state => state.auth)

    useEffect(() => {
        const data = {}
        data.process_link = params.process_link
        dispatch(verify(data))
    }, [dispatch])

    return (
        <BlankLayout>

            {
                loading
                    ? <div className='loader'></div>
                    : <>
                        {
                            error
                                ? <>
                                    <h1>404</h1>
                                </>
                                : <div className='cardbody col-md-4 col-sm-8'>
                                    <h1>Welcome</h1>
                                    <p>Your email verified successfully. Now, you have the full access to the platform.</p>
                                    <Link to="/admin/modules"><button className='btn'>Explore</button></Link>
                                </div>
                        }
                    </>
            }


        </BlankLayout>
    )
}
