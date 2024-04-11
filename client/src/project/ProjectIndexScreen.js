import { useDispatch, useSelector } from 'react-redux';
import AppIcon from '../components/AppIcon';
import DashboardLayout from '../layouts/DashboardLayout';
import { destroy, index, remove } from './projectSlice';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SortArrow from '../components/SortArrow';

function ProjectIndexScreen() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const stateProject = useSelector(state => state.project)
    const [formData, setFormData] = useState({
        search: "",
        so: ""

    });

    const { projects, project } = stateProject
    const { theme } = useSelector(state => state.auth)

    useEffect(() => {
        const data = Object.fromEntries(
            Object.entries(formData)
                .filter(([key, value]) => value !== "")
                .map(([key, value]) => [key, value])
        );
        dispatch(index(data))
    }, [dispatch, formData])

    const deleteHandler = (project) => {
        dispatch(remove(project))
        dispatch(destroy(project))
    }

    const handleSort = order => {
        setFormData(prev => ({ ...prev, so: order }))
    }

    const onChangeForm = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    return (
        <DashboardLayout>
            <div className="row">
                <div className="page-header">
                    <h1>Projects</h1>
                </div>

                <div className="other-actions">
                    <AppIcon to="create" icon="add" />
                    <div className="search">
                        <input type="text"
                            className="form-control input-field"
                            id="search"
                            value={formData.search}
                            name="search"
                            onChange={onChangeForm}
                        />
                    </div>
                </div>
            </div>

            <div className="row">
                <div className='cardbody'>
                    <div className="index-table-container">

                        <table className="index-table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Project Name <SortArrow onClick={handleSort} /></th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    projects.map((data) => (
                                        <tr key={data.id}>
                                            <td>{data.id}</td>
                                            <td>{data.name}</td>
                                            <td className='action'>
                                                <AppIcon onClick={deleteHandler} item={data} icon="trash" />
                                                <AppIcon to={`/projects/${data.id}`} icon="edit" />
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </DashboardLayout>

    )
}

export default ProjectIndexScreen