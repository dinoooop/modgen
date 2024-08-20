import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { generate } from './moduleSlice'
import { validateForm } from './moduleValidation'
import { vr } from '../../helpers/vr'
import ProtectedLayout from '../layouts/ProtectedLayout'

export default function () {

    const dispatch = useDispatch()
    const params = useParams()
    ;

    const [formValues, setFormValues] = useState({
        red: '',
        id: params.id
    })

    const [errors, setErrors] = useState({})

    const onChangeForm = (e) => {
        setFormValues(prev => ({ ...prev, ...vr.validate(e, validateForm).formValues }))
        setErrors(prev => ({ ...prev, ...vr.validate(e, validateForm).error }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const newFormValues = vr.submit(formValues, validateForm)
        if (typeof newFormValues.errors != 'undefined') {
            setErrors(newFormValues.errors)
        } else {
            dispatch(generate(newFormValues))
        }
    }

    return (
        <ProtectedLayout roles="all">

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
                        <Link to="/admin/modules" className="btn">Cancel</Link>

                    </form>
                </div>
            </div>
        </ProtectedLayout>
    )
}
