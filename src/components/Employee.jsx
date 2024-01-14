import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import profileImage from "../../public/profile.png"; // Replace with your actual profile image URL

const Employee = () => {
  const { id } = useParams(); // Get the employee ID from the URL
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
      <div className="max-w-lg w-full bg-white p-8 rounded-md shadow-md">
        {isLoading && (
          <p className="text-center">Loading employee details...</p>
        )}
        {error && (
          <p className="text-center text-red-500">
            Error fetching data: {error.message}
          </p>
        )}
        {employeeData && (
          <>
            <div className="flex items-center justify-center mb-4">
              <img
                className="h-32 w-32 rounded-full object-cover"
                src={profileImage}
                alt="Profile"
              />
            </div>
            <h2 className="text-2xl font-bold mb-4">
              {employeeData.employee_name}
            </h2>
            <p className="text-gray-600 mb-2">ID: {employeeData.id}</p>
            <p className="text-gray-600 mb-4">
              Age: {employeeData.employee_age}
            </p>
            <p className="text-gray-600 mb-4">
              Salary: ${employeeData.employee_salary}
            </p>
            <p className="text-gray-600 mb-4">Role: Full Stack Developer</p>
            <p className="text-gray-600 mb-4">Address: Bangalore</p>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={handleEdit}
                className="w-1/2 bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-700"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="w-1/2 bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-700"
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
