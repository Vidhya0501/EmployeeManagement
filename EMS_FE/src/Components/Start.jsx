
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AxiosService from "../../utils/AxiosService";

const Start = () => {
    const navigate = useNavigate()
  
  useEffect(() => {
    AxiosService.get('/verify')
    .then(result => {
      if(result.data.Status) {
        if(result.data.role === "admin") {
          navigate('/dashboard')
        } else {
          navigate('/employee_detail/'+result.data.id)
        }
      }
    }).catch(err =>console.log(err))
  }, [])

  return (
    <>
    
    <div className="d-flex justify-content-center align-items-center  vh-100 loginPage">
   
    
   
      <div className="p-3 rounded w-25 border loginForm">
      <h1 className="text-center">EMS</h1>
        <h4 className="text-left text-decoration-underline">Login As</h4>
        <div className="d-flex justify-content-between flex-wrap mt-5 mb-2">
          <button type="button" className="btn btn-primary" onClick={() => {navigate('/employee_login')}}>
            Employee
          </button>
          <button type="button" className="btn btn-success" onClick={() => {navigate('/adminlogin')}}>
            Admin
          </button>
        </div>
      </div>
      </div>
  
    </>
  );
};

export default Start;