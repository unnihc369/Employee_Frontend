import { useState, useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";
import profileImage from "../../public/profile.png";
import { Pencil, Trash } from "lucide-react";
import "./Employee.css";

const Employee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employeeData, setEmployeeData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await fetch(
          `https://employee-backend-ten.vercel.app/employees/${id}`
        );
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
    console.log("Edit button clicked");
  };

  const handleDelete = () => {
    console.log("Delete button clicked");
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-4 mt-8">
      <div className="employee-container m-2 bg-white p-6 rounded-md shadow-2xl">
        {isLoading && (
          <p className="loading-message m-4">Loading employee details...</p>
        )}
        {error && (
          <p className="error-message m4">
            Error fetching data: {error.message}
          </p>
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
            </h2>
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
                className="edit-button bg-black text-white py-2 px-4 rounded focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-50 flex items-center justify-center gap-4"
              >
                <Pencil />
                Edit
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="delete-button bg-black text-white py-2 px-4 rounded focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-50 flex items-center justify-center gap-4"
              >
                <Trash/>
                Delete
              </button>
            </div>

            <div className="navigation-buttons mt-4 space-x-2 flex items-center justify-center">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-50"
              >
                Back to Home
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Employee;
