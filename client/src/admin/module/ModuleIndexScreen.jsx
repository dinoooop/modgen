import { useDispatch, useSelector } from 'react-redux';
import AppIcon from '../components/AppIcon';
import DashboardLayout from '../layouts/DashboardLayout';
import { destroy, index, remove } from './moduleSlice';
import { useEffect, useState } from 'react';
import SortArrow from '../components/SortArrow';
import Pagination from "react-js-pagination";
import { Link } from 'react-router-dom';

export default function () {

    const dispatch = useDispatch()

    const { modules, perPage, total } = useSelector(state => state.module)
    const [formValues, setFormValues] = useState({
        search: "",
        so: "",
        sb: "",
        page: 1,
    });

    useEffect(() => {
        const data = Object.fromEntries(
            Object.entries(formValues)
                .filter(([key, value]) => value !== "")
                .map(([key, value]) => [key, value])
        );
        dispatch(index(data))
    }, [dispatch, formValues])

    const handleDelete = (module) => {
        dispatch(remove(module))
        dispatch(destroy(module))
    }

    const handleSearch = e => {
        setFormValues({ search: e.target.value })
    }

    const handleSort = (order, name) => {
        setFormValues(prev => ({ ...prev, so: order, sb: name }))
    }

    const handlePagination = number => {
        setFormValues(prev => ({ ...prev, page: number }))
    }

    return (
        <DashboardLayout>
            <div className="page-header">
                <h1>Modules</h1>
                <div className="other-actions">
                    <AppIcon to="create" icon="add" />
                    <div className="search">
                        <input type="text"
                            className="form-control input-field"
                            id="search"
                            value={formValues.search}
                            name="search"
                            onChange={handleSearch}
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
                                    <th># <SortArrow onClick={handleSort} column="id" /></th>
                                    <th>Module Name <SortArrow onClick={handleSort} column="title" /></th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    modules.map((data) => (
                                        <tr key={data.id}>
                                            <td>{data.id}</td>
                                            <td><Link to={`/admin/modules/${data.id}`}>{data.title}</Link></td>
                                            <td className='action'>
                                                <AppIcon onClick={handleDelete} item={data} icon="trash" />
                                                <AppIcon to={`/admin/modules/${data.id}`} icon="edit" />
                                                <AppIcon to={`/admin/generate/${data.id}`} icon="gears" />
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>

                    </div>
                    <Pagination
                        activePage={formValues.page}
                        itemsCountPerPage={perPage}
                        totalItemsCount={total}
                        pageRangeDisplayed={5}
                        onChange={handlePagination}
                    />
                </div>
            </div>
        </DashboardLayout>

    )
}