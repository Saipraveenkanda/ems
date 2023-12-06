import axios from "axios";

export const submitEmployeeDetails = async (employeeDetails) => {
  const response = await axios.post(
    "http://localhost:5000/employees",
    employeeDetails
  );
  console.log(response, "from api call");
  return response;
};
