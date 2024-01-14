import profile from "../../public/";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export default function NewEmp() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch employee data from the API
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/employees");
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchData();
  }, []);

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.employee_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.employee_age.toString().includes(searchTerm) ||
      employee.employee_salary.toString().includes(searchTerm)
  );

  const handleDelete = async (employeeId) => {
    try {
      // Make a DELETE request to the endpoint
      await fetch(`http://localhost:3000/employees/${employeeId}`, {
        method: "DELETE",
      });

      // Update the state to reflect the deletion
      setEmployees((prevEmployees) =>
        prevEmployees.filter((employee) => employee.employee_id !== employeeId)
      );

      // Navigate back to the previous page
      navigate("/");
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  return (
    <div className="mt-6 flex flex-col items-center j">
      <div className="mb-4 w-full max-w-md">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <input
          type="text"
          id="search"
          placeholder="Search"
          className="w-full py-2 px-4 rounded-md border border-gray-300 focus:outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full max-w-4xl">
        {filteredEmployees.map((employee) => (
          <Link
            to={`employee/${employee.employee_id}`}
            key={employee.employee_id}
            className="flex-shrink-0"
          >
            <div className="w-full max-w-[300px] mx-auto mb-4 rounded-md border">
              <div className="flex items-center justify-center ">
                <img
                  className="h-20 w-20 mt-2 rounded-full mb-2 object-cover"
                  src={profile}
                  alt=""
                />
              </div>
              <div className="p-4">
                <h1 className="inline-flex items-center text-lg font-semibold">
                  {employee.employee_name} <ArrowUpRight className="h-4 w-4" />
                </h1>
                <p className="mt-3 text-sm text-gray-600">
                  <span>Age : </span>
                  {employee.employee_age}
                </p>
                <p className="mt-3 text-sm text-gray-600">
                  <span>Salary : </span>${employee.employee_salary}
                </p>

                <button
                  type="button"
                  className="mt-4 w-full rounded bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(employee.employee_id)}
                  className="mt-4 w-full rounded bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  Delete
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
