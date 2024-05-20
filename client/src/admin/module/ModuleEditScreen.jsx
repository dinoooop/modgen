import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { show, update } from './moduleSlice'
import { validateForm } from './moduleValidation'
import { vr } from '../../helpers/vr'
import ProtectedLayout from '../layouts/ProtectedLayout'

export default function () {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()
    const fileInputRef = useRef(null)
    ;

    const {item, error} = useSelector(state => state.module)
    const [formValues, setFormValues] = useState(item || {})
    const [errors, setErrors] = useState({})
    
    useEffect(() => {
        dispatch(show(params.id));
    }, [dispatch, params.id]);

    useEffect(() => {
        if (item) {
            setFormValues(item);
        }
    }, [item]);

    const onChangeForm = (e) => {
        setFormValues(prev => ({ ...prev, ...vr.validate(e, validateForm).formValues }))
        setErrors(prev => ({ ...prev, ...vr.validate(e, validateForm).error }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const newFormData = vr.submitFile(formValues, validateForm)
        if (typeof newFormData.errors != 'undefined') {
            setErrors(newFormData.errors)
        } else {
            dispatch(update(newFormData))
            navigate('/admin/modules')
        }
    }

    return (
        <ProtectedLayout roles="all" error={error}>

            <div className="page-header">
                <h1>Edit Module</h1>
            </div>

            <div className="row">
                <div className='cardbody col-lg-6'>
                    <form onSubmit={handleSubmit}>

                        <div className="form-group">
                            <label htmlFor="title">Module Name</label>
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
                            <div>{formValues.dir || ''}</div>
                            <div className="color-red">{errors.zip}</div>
                        </div>

                        <button type='submit' className="btn submit">Submit</button>
                        <Link to="/admin/modules" className="btn">Cancel</Link>

                    </form>
                </div>
            </div>
        </ProtectedLayout>
    )
}
