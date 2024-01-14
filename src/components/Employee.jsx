import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import profileImage from "../../public/profile.png";
import "./Employee.css"; // Import your existing CSS file or styles
import { ArrowUpRight } from "lucide-react"; // If not imported already

const Employee = () => {
  const { id } = useParams();
  const [employeeData, setEmployeeData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await fetch(`http://localhost:3000/employees/${id}`);
        const data = await response.json();
        setEmployeeData(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleEdit = () => {
    // Handle edit functionality
    console.log("Edit button clicked");
  };

  const handleDelete = () => {
    // Handle delete functionality
    console.log("Delete button clicked");
  };

  return (
    <div className="flex items-center justify-center h-full">
      <div className="employee-container bg-white p-6 rounded-md shadow-md">
        {isLoading && (
          <p className="loading-message">Loading employee details...</p>
        )}
        {error && (
          <p className="error-message">Error fetching data: {error.message}</p>
        )}
        {employeeData && (
          <>
            <div className="flex items-center justify-center mb-4">
              <img
                className="profile-image h-20 w-20 rounded-full mb-2 object-cover"
                src={profileImage}
                alt="Profile"
              />
            </div>
            <h2 className="employee-name text-xl font-semibold mb-2">
              {employeeData.employee_name}{" "}
              <ArrowUpRight className="h-5 w-5 inline" />
            </h2>
            <p className="employee-info">ID: {employeeData.id}</p>
            <p className="employee-info">Age: {employeeData.employee_age}</p>
            <p className="employee-info">
              Salary: ${employeeData.employee_salary}
            </p>
            <p className="employee-info">Role: Full Stack Developer</p>
            <p className="employee-info">Address: Bangalore</p>

            <div className="button-container mt-4 space-x-2">
              <button
                type="button"
                onClick={handleEdit}
                className="edit-button bg-black text-white py-2 px-4 rounded  focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-50"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="delete-button bg-black text-white py-2 px-4 rounded  focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-50"
              >
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Employee;
