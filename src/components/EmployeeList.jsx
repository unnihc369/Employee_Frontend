import profile from "../../public/";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowUpRight,Pencil,Trash } from "lucide-react";

export default function NewEmp() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://employee-backend-ten.vercel.app/employees"
        );
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

  const toggleSelectEmployee = (employeeId) => {
    setSelectedEmployees((prevSelected) => {
      if (prevSelected.includes(employeeId)) {
        return prevSelected.filter((id) => id !== employeeId);
      } else {
        return [...prevSelected, employeeId];
      }
    });
  };

  const handleDeleteSingle = async (employeeId) => {
    try {
      await fetch(
        `https://employee-backend-ten.vercel.app/employees/${employeeId}`,
        {
          method: "DELETE",
        }
      );

      setEmployees((prevEmployees) =>
        prevEmployees.filter((employee) => employee.employee_id !== employeeId)
      );

      navigate('/');
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const handleEditSingle = (employeeId) => {
    console.log(`Edit button clicked for employee ${employeeId}`);
  };

  const handleDeleteSelected = async () => {
    try {
      await Promise.all(
        selectedEmployees.map(async (employeeId) => {
          await fetch(
            `https://employee-backend-ten.vercel.app/employees/${employeeId}`,
            {
              method: "DELETE",
            }
          );
        })
      );

      setEmployees((prevEmployees) =>
        prevEmployees.filter(
          (employee) => !selectedEmployees.includes(employee.employee_id)
        )
      );

      setSelectedEmployees([]);

      navigate("/");
    } catch (error) {
      console.error("Error deleting employees:", error);
    }
  };

  return (
    <div className="mt-6 flex flex-col items-center mx-4">
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
      {selectedEmployees.length > 0 && (
        <button
          type="button"
          onClick={handleDeleteSelected}
          className="mb-4 w-[150px] rounded shadow-md bg-red-500 px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-50 flex items-center gap-2"
        >
          <Trash />
          Delete Selected
        </button>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full max-w-4xl">
        {filteredEmployees.map((employee) => (
          <div
            key={employee.employee_id}
            className={`w-full max-w-[300px] mx-auto mb-4 rounded-md shadow-lg border ${
              selectedEmployees.includes(employee.employee_id)
                ? "bg-blue-200 border-blue-500"
                : ""
            }`}
          >
            <div className="flex items-center justify-center">
              <img
                className="h-20 w-20 mt-2 rounded-full mb-2 object-cover"
                src={profile}
                alt=""
              />
            </div>
            <div className="p-4">
              <h1 className="inline-flex items-center text-lg font-semibold">
                <Link
                  to={`/employee/${employee.employee_id}`}
                  className="flex items-center gap-1"
                >
                  {employee.employee_name} <ArrowUpRight className="h-4 w-4" />
                </Link>
              </h1>
              <p className="mt-3 text-sm text-gray-600">
                <span>Age : </span>
                {employee.employee_age}
              </p>
              <p className="mt-3 text-sm text-gray-600">
                <span>Salary : </span>${employee.employee_salary}
              </p>
              <div className="my-2 flex items-center justify-between">
                <p>Select to delete:</p>
                <input
                  type="checkbox"
                  className="ml-2"
                  checked={selectedEmployees.includes(employee.employee_id)}
                  onChange={() => toggleSelectEmployee(employee.employee_id)}
                />
              </div>
              <button
                type="button"
                onClick={() => handleEditSingle(employee.employee_id)}
                className="mt-2 w-full rounded bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-50 flex items-center justify-center gap-3"
              >
                <Pencil />
                <span>Edit</span>
              </button>
              <button
                type="button"
                onClick={() => handleDeleteSingle(employee.employee_id)}
                disabled={selectedEmployees.includes(employee.employee_id)}
                className={`mt-2 w-full rounded bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-50 flex items-center justify-center gap-2`}
              >
                <Trash />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
