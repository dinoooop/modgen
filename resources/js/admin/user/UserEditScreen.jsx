import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { show, update } from './userSlice';
import { validateForm } from './userValidation';
import { vr } from '../../helpers/vr';
import ProtectedLayout from '../layouts/ProtectedLayout';
import { unwrapResult } from '@reduxjs/toolkit';
import { bc } from '../../helpers/bc';
import { sv } from '../../helpers/sv';

export default function () {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()
    

    const { item, error } = useSelector(state => state.user)
    const { stock } = useSelector(state => state.general)
    const [formValues, setFormValues] = useState({})
    const [errors, setErrors] = useState({})

    useEffect(() => {
        dispatch(show(params.id))
    }, [dispatch, params.id])

    useEffect(() => {
        setFormValues({
            id: item.id,
            name: item.name,
            email: item.email,
            roles: bc.pluckIds(item.roles),
            password: "",
            status: item.status,
        })
    }, [item])

    const onChangeForm = (e) => {
        const validated = vr.validate(e, validateForm, formValues)
        setFormValues(prev => ({ ...prev, ...validated.formValues }))
        setErrors(prev => ({ ...prev, ...validated.error }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newFormData = vr.submit(formValues, validateForm)
        if (typeof newFormData.errors != 'undefined') {
            setErrors(newFormData.errors)
        } else {
            try {
                const resultAction = await dispatch(update(newFormData))
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
                <h1>Edit User</h1>
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
                                stock.roles?.map(role => (
                                    <label className='checkbox-control' key={role.key}>
                                        <input type="checkbox"
                                            value={role.id}
                                            name="roles"
                                            onChange={onChangeForm}
                                            checked={formValues.roles?.includes(role.id) || false}
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
