import { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { store } from './projectSlice'
import { validateForm } from './projectValidation'
import validator from '../../helpers/validator'
import DashboardLayout from '../layouts/DashboardLayout'

export default function () {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const fileInputRef = useRef(null)

    const [formData, setFormData] = useState({
        title: "",
        content: "Hi",
        yellow: "AS1022",
        zip: "",
        filetype: []
    })
    const [errors, setErrors] = useState({})

    const onChangeForm = (e) => {
        setFormData(prev => ({ ...prev, ...validator.validate(e, validateForm).formData }))
        setErrors(prev => ({ ...prev, ...validator.validate(e, validateForm).error }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const submit = validator.submit(formData, validateForm);
        if (typeof submit.errors != 'undefined') {
            setErrors(submit.errors)
        } else {
            dispatch(store(submit))
        }
    }

    return (
        <DashboardLayout>
            <div className="page-header">
                <h1>Create Project</h1>
            </div>

            <div className="row">
                <div className='cardbody col-lg-6'>
                    <form onSubmit={handleSubmit}>

                        <div className="form-group">
                            <label htmlFor="title">Project Name</label>
                            <input type="text"
                                className="form-control input-field"
                                id="title"
                                value={formData.title || ''}
                                name="title"
                                onChange={onChangeForm}
                            />
                            <div className="color-red">{errors.title}</div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="content">Description</label>
                            <textarea
                                className="form-control input-field"
                                id="content"
                                value={formData.content || ''}
                                name="content"
                                onChange={onChangeForm}
                            />
                            <div className="color-red">{errors.content}</div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="yellow">Yellow</label>
                            <input type="text"
                                className="form-control input-field"
                                id="yellow"
                                value={formData.yellow || ''}
                                name="yellow"
                                onChange={onChangeForm}
                            />
                            <div className="color-red">{errors.yellow}</div>
                        </div>

                        <div className="form-group">
                            <label>Template files (Zip)</label>
                            <label htmlFor="zip"><i className="fas fa-file icon"></i></label>

                            <input
                                type="file"
                                ref={fileInputRef}
                                id="zip"
                                name="zip"
                                onChange={onChangeForm}
                                placeholder="test"
                            />
                            <div>{formData.zip.name || ''}</div>
                            <div className="color-red">{errors.zip}</div>
                        </div>

                        <button type='submit' className="btn submit">Submit</button>
                        <Link to="/admin/projects" className="btn">Cancel</Link>
                    </form>


                </div>
            </div>
        </DashboardLayout>
    )
}
