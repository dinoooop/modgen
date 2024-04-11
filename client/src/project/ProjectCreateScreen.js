import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Dashboard from '../layouts/Dashboard'
import { store } from './projectSlice'
import Card from 'react-bootstrap/Card'
import { Button, Form } from 'react-bootstrap'
import { validateForm } from './projectValidation'

function ProjectCreateScreen() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [project, setProject] = useState({
        name: '',
        description: ''
    });
    const [errors, setErrors] = useState({})

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
            dispatch(store(project))
            navigate('/projects')
        }
    }

    return (
        <Dashboard>
            <Card className='mt-2'>
                <Card.Body>
                    <Card.Title>Create Project</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">create your new project.</Card.Subtitle>

                    <Form onSubmit={handleSubmit} noValidate > 
                        <Form.Group controlId="projectName" className='mb-3'>
                            <Form.Label>Project Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={project.name}
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
                                value={project.description}
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

export default ProjectCreateScreen