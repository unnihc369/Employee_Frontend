import { BrowserRouter, Routes, Route } from "react-router-dom";
import Employee from "./components/Employee";
import EmployeeList from "./components/EmployeeList";
import NewEmp from "./components/NewEmp";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EmployeeList />} />
        <Route path="/employee/:id" element={<Employee />} />
        <Route path="/new" element={<NewEmp/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
