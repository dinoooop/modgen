import { useDispatch, useSelector } from 'react-redux';
import AppIcon from '../components/AppIcon';
import { destroy, index, remove } from './moduleSlice';
import { useEffect, useState } from 'react';
import SortArrow from '../components/SortArrow';
import Pagination from "react-js-pagination";
import { Link } from 'react-router-dom';
import ProtectedLayout from '../layouts/ProtectedLayout';

export default function () {

    const dispatch = useDispatch()

    const { items, perPage, total, error } = useSelector(state => state.module)
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
        <ProtectedLayout roles="all" error={error}>

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
                                    items.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td><Link to={`/admin/modules/${item.id}`}>{item.title}</Link></td>
                                            <td className='action'>
                                                <AppIcon onClick={handleDelete} item={item} icon="trash" />
                                                <AppIcon to={`/admin/modules/${item.id}`} icon="edit" />
                                                <AppIcon to={`/admin/generate/${item.id}`} icon="gears" />
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
        </ProtectedLayout>

    )
}