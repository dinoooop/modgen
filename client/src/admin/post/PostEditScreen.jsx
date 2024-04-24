import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { show, update } from './postSlice'
import { validateForm } from './postValidation'
import DashboardLayout from '../layouts/DashboardLayout'
import Validator from '../../helpers/validator'

export default function () {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()
    const validator = new Validator()

    const stateFormValues = useSelector(state => state.post)
    const [formValues, setFormValues] = useState(stateFormValues.post || {})
    const [errors, setErrors] = useState({})

    useEffect(() => {
        dispatch(show(params.id))
    }, [dispatch, params.id])

    useEffect(() => {
        if (stateFormValues.post) {
            setFormValues(stateFormValues.post)
        }
    }, [stateFormValues.post])

    const onChangeForm = (e) => {
        setFormValues(prev => ({ ...prev, ...validator.validate(e, validateForm).formValues }))
        setErrors(prev => ({ ...prev, ...validator.validate(e, validateForm).error }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const submitData = validator.submit(formValues, validateForm)
        if (typeof submitData.errors != 'undefined') {
            setErrors(submitData.errors)
        } else {
            dispatch(update(submitData))
            navigate('/admin/posts')
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
                            <label htmlFor="title">Title</label>
                            <input type="text"
                                className="form-control input-field"
                                id="title"
                                value={formValues.title || ""}
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
                                value={formValues.content || ""}
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
                                    checked={formValues.status || ""}
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
