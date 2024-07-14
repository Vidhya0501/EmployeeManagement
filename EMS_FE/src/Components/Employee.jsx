
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AxiosService from "../../utils/AxiosService";

const Employee = () => {
  const [employee, setEmployee] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    AxiosService
      .get("/auth/employee")
      .then((result) => {
        if (result.data.Status) {
          setEmployee(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  const handleDelete = (id) => {
    AxiosService
      .delete("/auth/delete_employee/" + id)
      .then((result) => {
        if (result.data.Status) {
          window.location.reload();
        } else {
          alert(result.data.Error);
        }
      });
  };
  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>Employee List</h3>
      </div>
      <div className="d-flex justify-content-end">
      <Link to="/dashboard/add_employee" className="btn btn-success">
        Add Employee
      </Link>
      </div>
     
      <div className="mt-3">
        <table className="table table-striped table-dark">
          <thead>
            <tr>
              <th><h5>Name</h5></th>
              <th><h5>Email</h5></th>
              <th><h5>Address</h5></th>
              <th><h5>Salary</h5></th>
              <th><h5>Action</h5></th>
            </tr>
          </thead>
          <tbody>
            {employee.map((e) => (
              <tr key={e.id}>
                <td>{e.name}</td>
                <td>{e.email}</td>
                <td>{e.address}</td>
                <td>{e.salary}</td>

                <td>
                  <Link
                    to={`/dashboard/edit_employee/` + e.id}
                    className="btn btn-info btn-sm me-2"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(e.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employee;
