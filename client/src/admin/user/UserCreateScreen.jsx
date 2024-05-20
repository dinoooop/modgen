import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { validateForm } from './userValidation'
import Validator from '../../helpers/Validator'
import ProtectedLayout from '../layouts/ProtectedLayout'
import { unwrapResult } from '@reduxjs/toolkit'
import { reset, store } from './userSlice'
import { basic } from '../../helpers/Basic'
import { sv } from '../../helpers/sv'

export default function () {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const validator = new Validator()

    const [errors, setErrors] = useState({})
    const [formValues, setFormValues] = useState({
        name: "test",
        email: "test@mail.com",
        roles: [sv.role("subscriber")],
        password: "welcome",
        status: sv.status("active"),
    })
    const { error } = useSelector(state => state.user)

    useEffect(() => { dispatch(reset()) }, [dispatch])

    const onChangeForm = (e) => {
        const validated = validator.validate(e, validateForm, formValues)
        setFormValues(prev => ({ ...prev, ...validated.formValues }))
        setErrors(prev => ({ ...prev, ...validated.error }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newFormData = validator.submit(formValues, validateForm)
        if (typeof newFormData.errors != 'undefined') {
            setErrors(newFormData.errors)
        } else {
            try {
                const resultAction = await dispatch(store(newFormData))
                unwrapResult(resultAction)
                navigate('/admin/users')
            } catch (error) {
                console.error(error)
            }
        }
    }

    return (
        <ProtectedLayout roles="admin">

            <div className="page-header">
                <h1>Create User</h1>
            </div>

            <div className="row">
                <div className='cardbody col-lg-6'>
                    <form onSubmit={handleSubmit}>

                        {error && <p className='red-alert'>{error}</p>}

                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text"
                                className="form-control input-field"
                                id="name"
                                value={formValues.name || ''}
                                name="name"
                                onChange={onChangeForm}
                            />
                            <div className="color-red">{errors.name}</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="text"
                                className="form-control input-field"
                                id="email"
                                value={formValues.email || ''}
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
                            <label htmlFor="role">Role</label>
                            {
                                sv.role().map(role => (
                                    <label className='checkbox-control' key={role.key}>
                                        <input type="checkbox"
                                            value={role.id}
                                            name="roles"
                                            onChange={onChangeForm}
                                            checked={formValues.roles.includes(role.id)}
                                        /> {role.name}
                                    </label>
                                ))
                            }
                            <div className="color-red">{errors.role}</div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="status">Status</label>
                            {
                                sv.status().map(mapitem => (
                                    <label className='radio-control' key={mapitem.key}>
                                        <input type="radio"
                                            value={mapitem.id}
                                            name="status"
                                            onChange={onChangeForm}
                                            checked={formValues.status == mapitem.id || ''}
                                        /> {mapitem.name}
                                    </label>
                                ))
                            }
                            <div className="color-red">{errors.status}</div>
                        </div>

                        <button type='submit' className="btn submit">Submit</button>
                        <Link to="/admin/users" className="btn">Cancel</Link>
                    </form>

                </div>
            </div>
        </ProtectedLayout>
    )
}
