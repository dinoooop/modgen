import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { show, update } from './projectSlice'
import { validateForm } from './projectValidation'
import DashboardLayout from '../layouts/DashboardLayout'

export default function () {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()
    const fileInputRef = useRef(null)

    const stateFormData = useSelector(state => state.project)
    const [formData, setFormData] = useState(stateFormData.project || {})
    const [errors, setErrors] = useState({})

    useEffect(() => {
        dispatch(show(params.id));
    }, [dispatch, params.id]);

    useEffect(() => {
        if (stateFormData.project) {
            setFormData(stateFormData.project);
        }
    }, [stateFormData.project]);

    const onChangeForm = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
        const error = validateForm(e.target.name, e.target.value)
        setErrors(prev => ({ ...prev, [e.target.name]: error }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const updatedErrors = {}
        Object.entries(formData).forEach(([key, value]) => {
            updatedErrors[key] = validateForm(key, value)
        })
        setErrors(prev => ({ ...prev, ...updatedErrors }))
        const allErrorsFalse = Object.values(updatedErrors).every(error => error === false)
        if (allErrorsFalse) {
            dispatch(update(formData)).then(() => {
                navigate('/admin/projects')
            })
        }
    }

    return (
        <DashboardLayout>
            <div className="page-header">
                <h1>Edit Project</h1>
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
                                className="form-control input-field"
                                id="zip"
                                name="zip"
                                onChange={onChangeForm}
                                placeholder="test"
                            />
                            <div>{formData.dir && formData.dir || ''}</div>
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
