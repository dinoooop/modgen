import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { show, update } from './projectSlice'
import { validateForm } from './projectValidation'
import DashboardLayout from '../layouts/DashboardLayout'
import Validator from '../../helpers/validator'

export default function () {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()
    const fileInputRef = useRef(null)
    const validator = new Validator();

    const stateFormData = useSelector(state => state.project)
    const [formValues, setFormValues] = useState(stateFormData.project || {})
    const [errors, setErrors] = useState({})

    useEffect(() => {
        dispatch(show(params.id));
    }, [dispatch, params.id]);

    useEffect(() => {
        if (stateFormData.project) {
            setFormValues(stateFormData.project);
        }
    }, [stateFormData.project]);

    const onChangeForm = (e) => {
        setFormValues(prev => ({ ...prev, ...validator.validate(e, validateForm).formValues }))
        setErrors(prev => ({ ...prev, ...validator.validate(e, validateForm).error }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const newFormData = validator.submitFile(formValues, validateForm)
        if (typeof newFormData.errors != 'undefined') {
            setErrors(newFormData.errors)
        } else {
            dispatch(update(newFormData))
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
                                value={formValues.title || ''}
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
                                value={formValues.content || ''}
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
                                value={formValues.yellow || ''}
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
                            <div>{ formValues.dir || ''}</div>
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
