import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { show, update } from './postSlice'
import { validateForm } from './postValidation'
import DashboardLayout from '../layouts/DashboardLayout'

export default function () {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()

    const stateFormData = useSelector(state => state.post)
    const [formData, setFormData] = useState(stateFormData.post || {})
    const [errors, setErrors] = useState({})

    useEffect(() => {
        dispatch(show(params.id))
    }, [dispatch, params.id])

    useEffect(() => {
        if (stateFormData.post) {
            setFormData(stateFormData.post)
        }
    }, [stateFormData.post])

    const onChangeForm = (e) => {
        if (e.target.type === 'checkbox') {
            setFormData(prev => ({ ...prev, [e.target.name]: e.target.checked }))
        } else {
            setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
        }

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
                navigate('/admin/posts')
            })
        }
    }

    return (
        <DashboardLayout>
            <div className="page-header">
                <h1>Edit Post</h1>
            </div>

            <div className="row">
                <div className='cardbody col-lg-6'>
                    <form onSubmit={handleSubmit}>

                        <div className="form-group">
                            <label htmlFor="email">Post Name</label>
                            <input type="text"
                                className="form-control input-field"
                                id="name"
                                value={formData.name || ""}
                                name="name"
                                onChange={onChangeForm}
                            />
                            <div className="color-red">{errors.name}</div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea
                                className="form-control input-field"
                                id="description"
                                value={formData.description || ""}
                                name="description"
                                onChange={onChangeForm}
                            />
                            <div className="color-red">{errors.description}</div>
                        </div>

                        <div className="form-group">
                            <label className='checkbox-control'>
                                <input
                                    type="checkbox"
                                    id="status"
                                    value={1}
                                    name="status"
                                    onChange={onChangeForm}
                                    checked={formData.status}
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
