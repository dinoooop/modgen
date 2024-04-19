import { useDispatch, useSelector } from 'react-redux';
import AppIcon from '../components/AppIcon';
import DashboardLayout from '../layouts/DashboardLayout';
import { destroy, index, remove } from './postSlice';
import { useEffect, useState } from 'react';
import SortArrow from '../components/SortArrow';
import Pagination from "react-js-pagination";
import { Link } from 'react-router-dom';

export default function () {

    const dispatch = useDispatch()

    const { posts, perPage, total } = useSelector(state => state.post)
    const [formData, setFormData] = useState({
        search: "",
        so: "",
        sb: "",
        page: 1,
    });

    useEffect(() => {
        const data = Object.fromEntries(
            Object.entries(formData)
                .filter(([key, value]) => value !== "")
                .map(([key, value]) => [key, value])
        );
        dispatch(index(data))
    }, [dispatch, formData])

    const handleDelete = (post) => {
        dispatch(remove(post))
        dispatch(destroy(post))
    }

    const handleSearch = e => {
        setFormData({ search: e.target.value })
    }

    const handleSort = (order, name) => {
        setFormData(prev => ({ ...prev, so: order, sb: name }))
    }

    const handlePagination = number => {
        setFormData(prev => ({ ...prev, page: number }))
    }

    return (
        <DashboardLayout>
            <div className="page-header">
                <h1>Posts</h1>
                <div className="other-actions">
                    <AppIcon to="create" icon="add" />
                    <div className="search">
                        <input type="text"
                            className="form-control input-field"
                            id="search"
                            value={formData.search}
                            name="search"
                            onChange={handleSearch}
                        />
                    </div>
                </div>
            </div>

            <div className="row">
                <div className='cardbody col-lg-12'>
                    <div className="index-table-container">

                        <table className="index-table">
                            <thead>
                                <tr>
                                    <th># <SortArrow onClick={handleSort} column="id" /></th>
                                    <th>Post Name <SortArrow onClick={handleSort} column="name" /></th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    posts.map((data) => (
                                        <tr key={data.id}>
                                            <td>{data.id}</td>
                                            <td><Link to={`/admin/posts/${data.id}`}>{data.name}</Link></td>
                                            <td>{data.status ? 
                                            <i class="fa-regular fa-circle-check"></i>:
                                            <i class="fa-regular fa-circle-xmark"></i>
                                            }</td>
                                            <td className='action'>
                                                <AppIcon onClick={handleDelete} item={data} icon="trash" />
                                                <AppIcon to={`/admin/posts/${data.id}`} icon="edit" />
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>

                    </div>
                    <Pagination
                        activePage={formData.page}
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