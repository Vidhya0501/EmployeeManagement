import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

import { useNavigate, Link } from 'react-router-dom'
import AxiosService from '../../utils/AxiosService'

const EmployeeLogin = () => {
    const [values, setValues] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    
    const handleSubmit = (event) => {
        event.preventDefault()
        AxiosService.post('/employee/employee_login', values)
        .then(result => {
            if(result.data.loginStatus) {
                localStorage.setItem("valid", true)
                navigate('/employee_detail/'+result.data.id)
            } else {
                setError(result.data.Error)
            }
        })
        .catch(err => console.log(err))
    }

  return (
    <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
        <div className='p-3 rounded w-25 border loginForm'>
        <Link to="/" className='btn border rounded'> <FontAwesomeIcon icon={faArrowLeft} /></Link>
        <h1 className="text-center">EMS</h1>
        <h4 className='text-center mb-3'>Login Page</h4>
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                  
                    <input type="email" name='email' autoComplete='off' placeholder='Enter Email'
                     onChange={(e) => setValues({...values, email : e.target.value})} className='form-control rounded-0'/>
                </div>
                <div className='mb-3'> 
                  
                    <input type="password" name='password' placeholder='Enter Password'
                     onChange={(e) => setValues({...values, password : e.target.value})} className='form-control rounded-0'/>
                </div>
                <button className='btn btn-success w-100 rounded-0 mb-2'>Log in</button>
                
            </form>
            <div className='text-danger text-center'>
                {error && error}
            </div>
        </div>
    </div>
  )
}

export default EmployeeLogin