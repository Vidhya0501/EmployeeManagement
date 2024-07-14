
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AxiosService from '../../utils/AxiosService'

const Category = () => {

    const [category, setCategory] = useState([])

    useEffect(()=> {
        AxiosService.get('/auth/category')
        .then(result => {
            if(result.data.Status) {
                setCategory(result.data.Result);
            } else {
                alert(result.data.Error)
            }
        }).catch(err => console.log(err))
    }, [])
  return (
    <div className='px-5 mt-3'>
        <div className='d-flex justify-content-center'>
            <h3>Category List</h3>
        </div>
        <div className="d-flex justify-content-end">
        <Link to="/dashboard/add_category" className='btn btn-success'>Add Category</Link>
        </div>
        <div className='mt-3'>
            <table className='table table-striped table-dark'>
                <thead>
                    <tr>
                        <th><h5>Name</h5></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        category.map(c => (
                            <tr>
                                <td>{c.name}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>

    </div>
  )
}

export default Category