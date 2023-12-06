import { useState } from "react";
import useStyles from "./styles";
import {
  Avatar,
  Stack,
  TextField,
  Button,
  Container,
  Grid,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import PhotoCameraOutlinedIcon from "@mui/icons-material/PhotoCameraOutlined";
import { submitEmployeeDetails } from "../../ApiCalls/apiCalls";

const vertical = "top";
const horizontal = "center";

const App = () => {
  const classes = useStyles();
  const getLocalStorageItem = JSON.parse(localStorage.getItem("userDetails"));
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  //get user location
  /*   if ("geolocation" in navigator) {
    // Request the user's location
    navigator.geolocation.getCurrentPosition(
      // Success callback
      function (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        // Use the latitude and longitude as needed
        console.log("Latitude: " + latitude);
        console.log("Longitude: " + longitude);
      }
    );
  } */

  // STATE TO MAINTAIN ALL VALUES
  const [employeeDetails, setEmployeeDetails] = useState(
    getLocalStorageItem !== null
      ? getLocalStorageItem
      : {
          fullName: "",
          dateOfBirth: "",
          employeeId: "",
          gender: "",
          address: "",
          phoneNumber: "",
          email: "",
          maritalStatus: "",
          jobTitle: "",
          dateOfHire: "",
          department: "",
          workLocation: "",
          manager: "",
          emergencyPerson: "",
          bloodGroup: "",
          emergencyPhoneNumber: "",
          emergencyRelation: "",
          laptop: "",
          laptopSerialNo: "",
          userImage: "",
        }
  );

  const handleInputChange = (fieldName) => (event) => {
    setEmployeeDetails({
      ...employeeDetails,
      [fieldName]: event.target.value,
    });
  };

  // PROFILE IMAGE UPLOADING...
  const handleImageUpload = async (e) => {
    console.log(e.target.files[0]);
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setEmployeeDetails({
      ...employeeDetails,
      userImage: base64,
    });
  };

  // CONVERTING TO BASE64 FORMAT
  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }

  //SAVING DATA TO LOCALSTORAGE
  const handleSaveButton = () => {
    localStorage.setItem("userDetails", JSON.stringify(employeeDetails));
  };

  //SUBMITTING THE DATA TO BACKEND
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Submitted:", employeeDetails);

    const response = await submitEmployeeDetails(employeeDetails);
    if (response.status === 200) {
      setEmployeeDetails({
        fullName: "",
        dateOfBirth: "",
        employeeId: "",
        gender: "",
        address: "",
        phoneNumber: "",
        email: "",
        maritalStatus: "",
        jobTitle: "",
        dateOfHire: "",
        department: "",
        workLocation: "",
        manager: "",
        emergencyPerson: "",
        bloodGroup: "",
        emergencyPhoneNumber: "",
        emergencyRelation: "",
        laptop: "",
        laptopSerialNo: "",
        userImage: "",
      });
      localStorage.removeItem("userDetails");
      setAlertMessage(response.data);
      setShowAlert(true);
    }
  };

  const renderAlertMessage = () => {
    return (
      <Snackbar
        open={showAlert}
        autoHideDuration={6000}
        onClose={() => setShowAlert(false)}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert
          onClose={() => setShowAlert(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    );
  };

  return (
    <Box>
      <form className={classes.form} onSubmit={handleSubmit}>
        <Typography
          variant="h6"
          align="center"
          color="primary"
          fontWeight={700}
          gutterBottom
          mb={1}
          mt={1}
        >
          AAPMOR 360 - Employee Profile Center
        </Typography>
        <Grid container className={classes.mainFormContainer}>
          {/* PERSONAL INFORMATION */}
          <Typography variant="body2" gutterBottom fontWeight={600}>
            Personal Information
          </Typography>
          <Grid
            container
            className={classes.groupContainer}
            rowSpacing={1.5}
            columnSpacing={0}
          >
            {/* USER PROFILE PICTURE */}
            <Stack
              sx={{ height: "120px", width: "100%" }}
              direction={"row"}
              alignItems="center"
              spacing={1}
            >
              <Avatar
                sx={{ width: 100, height: 100 }}
                alt="profile image"
                src={
                  employeeDetails.userImage !== ""
                    ? employeeDetails.userImage
                    : ""
                }
              />
              <Stack direction={"column"} alignItems={"center"} spacing={1}>
                <Typography
                  variant="body2"
                  sx={{ cursor: "pointer", color: "red" }}
                  onClick={() =>
                    setEmployeeDetails({ ...employeeDetails, userImage: "" })
                  }
                >
                  Remove image
                </Typography>
                <Button
                  variant="contained"
                  size="small"
                  component="label"
                  htmlFor="userImage"
                  startIcon={<PhotoCameraOutlinedIcon />}
                >
                  Upload image
                </Button>

                <input
                  type={"file"}
                  style={{ display: "none" }}
                  id="userImage"
                  onChange={handleImageUpload}
                />
              </Stack>
            </Stack>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  size="small"
                  label="Full Name"
                  variant="outlined"
                  fullWidth
                  value={employeeDetails.fullName}
                  onChange={handleInputChange("fullName")}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  size="small"
                  label="Employee ID"
                  variant="outlined"
                  fullWidth
                  value={employeeDetails.employeeId}
                  onChange={handleInputChange("employeeId")}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  size="small"
                  label="Date of Birth"
                  type="date"
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={employeeDetails.dateOfBirth}
                  onChange={handleInputChange("dateOfBirth")}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth size="small">
                  <InputLabel>Gender</InputLabel>
                  <Select
                    fullWidth
                    value={employeeDetails.gender}
                    label="Gender"
                    onChange={handleInputChange("gender")}
                  >
                    <MenuItem value={"male"}>Male</MenuItem>
                    <MenuItem value={"female"}>Female</MenuItem>
                    <MenuItem value={"other"}>Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth size="small">
                  <InputLabel>Marital Status</InputLabel>
                  <Select
                    fullWidth
                    value={employeeDetails.maritalStatus}
                    label="Marital Status"
                    onChange={handleInputChange("maritalStatus")}
                    placeholder="Select"
                  >
                    <MenuItem value={"married"}>Married</MenuItem>
                    <MenuItem value={"unmarried"}>Unmarried</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth size="small">
                  <InputLabel>Blood Group</InputLabel>
                  <Select
                    label="Blood Group"
                    value={employeeDetails.bloodGroup}
                    onChange={handleInputChange("bloodGroup")}
                  >
                    <MenuItem value={"A+"}>A+</MenuItem>
                    <MenuItem value={"A-"}>A-</MenuItem>
                    <MenuItem value={"B+"}>B+</MenuItem>
                    <MenuItem value={"B-"}>B-</MenuItem>
                    <MenuItem value={"O+"}>O+</MenuItem>
                    <MenuItem value={"O-"}>O-</MenuItem>
                    <MenuItem value={"AB+"}>AB+</MenuItem>
                    <MenuItem value={"AB-"}>AB-</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>

          {/* CONTACT INFORMATION */}
          <Typography variant="body2" gutterBottom fontWeight={600}>
            Contact Information
          </Typography>
          <Grid container className={classes.groupContainer}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Address"
                  variant="outlined"
                  size="small"
                  fullWidth
                  multiline
                  rows={3}
                  value={employeeDetails.address}
                  onChange={handleInputChange("address")}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  size="small"
                  label="Phone Number"
                  variant="outlined"
                  fullWidth
                  value={employeeDetails.phoneNumber}
                  onChange={handleInputChange("phoneNumber")}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  size="small"
                  label="Email Address"
                  type="email"
                  variant="outlined"
                  fullWidth
                  value={employeeDetails.email}
                  onChange={handleInputChange("email")}
                />
              </Grid>
            </Grid>
          </Grid>

          {/* EMPLOYEMENT DETAILS */}
          <Typography
            variant="body2"
            size="small"
            gutterBottom
            fontWeight={600}
          >
            Employment Information
          </Typography>
          <Grid container rowSpacing={1.5} className={classes.groupContainer}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  size="small"
                  label="Job Title"
                  variant="outlined"
                  fullWidth
                  value={employeeDetails.jobTitle}
                  onChange={handleInputChange("jobTitle")}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  size="small"
                  label="Date of Hire"
                  variant="outlined"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                  value={employeeDetails.dateOfHire}
                  onChange={handleInputChange("dateOfHire")}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth size="small">
                  <InputLabel>Department</InputLabel>
                  <Select
                    label="Department"
                    value={employeeDetails.department}
                    onChange={handleInputChange("department")}
                  >
                    <MenuItem value={"Fullstack"}>Fullstack</MenuItem>
                    <MenuItem value={"Data Analyst"}>Data Analyst</MenuItem>
                    <MenuItem value={"Data Science"}>Data Science</MenuItem>
                    <MenuItem value={"AI ML"}>AI ML</MenuItem>
                    <MenuItem value={"Testing"}>Testing</MenuItem>
                    <MenuItem value={"Devops"}>Devops</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  size="small"
                  label="Work Location"
                  variant="outlined"
                  fullWidth
                  value={employeeDetails.workLocation}
                  onChange={handleInputChange("workLocation")}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  size="small"
                  label="Manager / Supervisor"
                  variant="outlined"
                  fullWidth
                  value={employeeDetails.manager}
                  onChange={handleInputChange("manager")}
                />
              </Grid>
            </Grid>
          </Grid>

          {/* EMERGENCY CONTACT */}
          <Typography
            variant="body2"
            size="small"
            gutterBottom
            fontWeight={600}
          >
            Emergency Information
          </Typography>
          <Grid container rowSpacing={1.5} className={classes.groupContainer}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  size="small"
                  label="Emergency contact name"
                  variant="outlined"
                  fullWidth
                  value={employeeDetails.emergencyPerson}
                  onChange={handleInputChange("emergencyPerson")}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  size="small"
                  label="Phone Number"
                  variant="outlined"
                  fullWidth
                  value={employeeDetails.emergencyPhoneNumber}
                  onChange={handleInputChange("emergencyPhoneNumber")}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth size="small">
                  <InputLabel>Relation</InputLabel>
                  <Select
                    label="Relation"
                    value={employeeDetails.emergencyRelation}
                    onChange={handleInputChange("emergencyRelation")}
                  >
                    <MenuItem value={"Father"}>Father</MenuItem>
                    <MenuItem value={"Mother"}>Mother</MenuItem>
                    <MenuItem value={"Brother"}>Brother</MenuItem>
                    <MenuItem value={"Sister"}>Sister</MenuItem>
                    <MenuItem value={"Other"}>Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>

          {/* ASSETS */}
          <Typography
            variant="body2"
            size="small"
            gutterBottom
            fontWeight={600}
          >
            Company Assets
          </Typography>
          <Grid container rowSpacing={1.5} className={classes.groupContainer}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Laptop"
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={employeeDetails.laptop}
                  onChange={handleInputChange("laptop")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Laptop serial no:"
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={employeeDetails.laptopSerialNo}
                  onChange={handleInputChange("laptopSerialNo")}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Box className={classes.buttonGroup}>
          <Button
            type="button"
            variant="outlined"
            fullWidth
            color="primary"
            className={classes.submitButton}
            onClick={handleSaveButton}
          >
            Save
          </Button>
          <Button type="submit" variant="contained" fullWidth color="primary">
            Submit
          </Button>
        </Box>
      </form>
      {showAlert && renderAlertMessage()}
    </Box>
  );
};

export default App;
