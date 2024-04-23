import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { generate, show, update } from './projectSlice'
import { validateForm } from './projectValidation'
import DashboardLayout from '../layouts/DashboardLayout'
import Validator from '../../helpers/validator'

export default function () {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()
    
    const validator = new Validator();

    const [formValues, setFormValues] = useState({
        red: '',
        id: params.id
    })
    const [errors, setErrors] = useState({})

    const onChangeForm = (e) => {
        setFormValues(prev => ({ ...prev, ...validator.validate(e, validateForm).formValues }))
        setErrors(prev => ({ ...prev, ...validator.validate(e, validateForm).error }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const newFormValues = validator.submit(formValues, validateForm)
        if (typeof newFormValues.errors != 'undefined') {
            setErrors(newFormValues.errors)
        } else {
            dispatch(generate(newFormValues))
        }
    }

    return (
        <DashboardLayout>
            <div className="page-header">
                <h1>Generate New Module</h1>
            </div>

            <div className="row">
                <div className='cardbody col-lg-6'>
                    <form onSubmit={handleSubmit}>

                        <div className="form-group">
                            <label htmlFor="red">Red Name</label>
                            <input type="text"
                                className="form-control input-field"
                                id="red"
                                value={formValues.red || ''}
                                name="red"
                                onChange={onChangeForm}
                            />
                            <i className='help'>Small case with spaces</i>
                            <div className="color-red">{errors.red}</div>
                        </div>
                        

                        <button type='submit' className="btn submit">Generate</button>
                        <Link to="/admin/projects" className="btn">Cancel</Link>

                    </form>
                </div>
            </div>
        </DashboardLayout>
    )
}
