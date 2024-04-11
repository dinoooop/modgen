import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Dashboard from '../layouts/Dashboard'
import { show, update } from './projectSlice'
import Card from 'react-bootstrap/Card'
import { Button, Form } from 'react-bootstrap'
import { validateForm } from './projectValidation'

function ProjectEditScreen() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams();

    const stateProject = useSelector(state => state.project)
    const [project, setProject] = useState(stateProject.project || {});
    const [errors, setErrors] = useState({})

    useEffect(() => {
        dispatch(show(params.id));
    }, [dispatch, params.id]);

    useEffect(() => {
        if (stateProject.project) {
            setProject(stateProject.project);
        }
    }, [stateProject.project]);

    const onChangeForm = (e) => {
        setProject(prev => ({ ...prev, [e.target.name]: e.target.value }))
        const error = validateForm(e.target.name, e.target.value)
        setErrors(prev => ({ ...prev, [e.target.name]: error }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const updatedErrors = {}
        Object.entries(project).forEach(([key, value]) => {
            updatedErrors[key] = validateForm(key, value)
        })
        setErrors(prev => ({ ...prev, ...updatedErrors }))
        const allErrorsFalse = Object.values(updatedErrors).every(error => error === false)
        if (allErrorsFalse) {
            dispatch(update(project))
            // navigate('/projects')
        }
    }

    return (
        <Dashboard>
            <Card className='mt-2'>
                <Card.Body>
                    <Card.Title>Project Edit</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Edit your project.</Card.Subtitle>

                    <Form onSubmit={handleSubmit} noValidate > 
                        <Form.Group controlId="projectName" className='mb-3'>
                            <Form.Label>Project Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={project.name || ''}
                                name="name"
                                onChange={onChangeForm}
                                isInvalid={!!errors.name}
                            />
                            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="projectDescription" className='mb-3'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={6}
                                value={project.description || ''}
                                name="description"
                                onChange={onChangeForm}
                                isInvalid={!!errors.description}
                            />
                            <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
                        </Form.Group>
                        <Button variant='primary' type='submit'>Save</Button>
                    </Form>
                </Card.Body>
            </Card>
        </Dashboard>
    )
}

export default ProjectEditScreen