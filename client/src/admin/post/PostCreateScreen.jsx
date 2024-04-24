import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { store } from './postSlice'
import { validateForm } from './postValidation'
import DashboardLayout from '../layouts/DashboardLayout'
import Validator from '../../helpers/validator'

export default function () {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const validator = new Validator()
    const [errors, setErrors] = useState({})
    const [formValues, setFormValues] = useState({
        title: '',
        content: '',
        status: 0
    })

    const onChangeForm = (e) => {
        setFormValues(prev => ({ ...prev, ...validator.validate(e, validateForm).formValues }))
        setErrors(prev => ({ ...prev, ...validator.validate(e, validateForm).error }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const newFormData = validator.submit(formValues, validateForm)
        if (typeof newFormData.errors != 'undefined') {
            setErrors(newFormData.errors)
        } else {
            dispatch(store(newFormData))
            // navigate('/admin/posts')
        }
    }

    return (
        <DashboardLayout>
            <div className="page-header">
                <h1>Create Post</h1>
            </div>
            <div className="row">
                <div className='cardbody col-lg-6'>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Post Name</label>
                            <input type="text"
                                className="form-control input-field"
                                id="title"
                                value={formValues.title}
                                name="title"
                                onChange={onChangeForm}
                            />
                            <div className="color-red">{errors.title}</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="content">Content</label>
                            <textarea
                                className="form-control input-field"
                                id="content"
                                value={formValues.content}
                                name="content"
                                onChange={onChangeForm}
                            />
                            <div className="color-red">{errors.content}</div>
                        </div>
                        <div className="form-group">
                            <label className='checkbox-control'>
                                <input
                                    type="checkbox"
                                    id="status"
                                    value={1}
                                    name="status"
                                    onChange={onChangeForm}
                                    
                                /> Status
                            </label>
                            <div className="color-red">{errors.status}</div>
                        </div>
                        <button type='submit' className="btn submit">Submit</button>
                        <Link to="/admin/posts" className="btn">Cancel</Link>
                    </form>
                </div>
            </div>
        </DashboardLayout>
    )
}