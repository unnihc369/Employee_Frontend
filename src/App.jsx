import { BrowserRouter, Routes, Route } from "react-router-dom";
import Employee from "./components/Employee";
import EmployeeList from "./components/EmployeeList";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EmployeeList />} />
        <Route path="/employee/:id" element={<Employee />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
