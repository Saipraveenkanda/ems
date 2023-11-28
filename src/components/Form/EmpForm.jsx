import { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Grid,
  Typography,
} from "@material-ui/core";
import useStyles from "./styles";
import { Avatar, ButtonGroup, Stack } from "@mui/material";
import PhotoCameraOutlinedIcon from "@mui/icons-material/PhotoCameraOutlined";

const App = () => {
  const classes = useStyles();
  const getLocalStorageItem = JSON.parse(localStorage.getItem("userDetails"));
  // console.log(getLocalStorageItem);

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

  const handleImageUpload = async (e) => {
    console.log(e.target.files[0]);
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setEmployeeDetails({
      ...employeeDetails,
      userImage: base64,
    });
  };

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

  const handleSaveButton = () => {
    /* if(!employeeDetails.name || !employeeDetails.address || !employeeDetails.phoneNumber||!employeeDetails.email||!employeeDetails){
      if(!employeeDetails.phoneNumber || !employeeDetails.email || !employeeDetails.maritalStatus ||!employeeDetails.jobTitle){
        if(!validateForm()){
          alert("Please check the fields")
      }
    }
  } */
    localStorage.setItem("userDetails", JSON.stringify(employeeDetails));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add logic to handle form submission
    console.log("Submitted:", employeeDetails);
  };

  return (
    <Container className={classes.root}>
      <Typography variant="h6" align="center" color="primary" gutterBottom>
        Employee Details Form
      </Typography>
      <Grid container justify="center">
        <form
          className={classes.form}
          onSubmit={handleSubmit}
          style={{ backgroundColor: "#fff", color: "#000" }}
        >
          <Grid container spacing={2} className={classes.mainFormContainer}>
            {/* PERSONAL INFORMATION */}
            <Grid container spacing={1} className={classes.groupContainer}>
              <Typography
                variant="body2"
                gutterBottom
                style={{ fontWeight: "bold", paddingLeft: 4 }}
              >
                Personal Information
              </Typography>

              {/* USER PROFILE PICTURE */}
              <Stack
                sx={{ height: "120px", width: "100%" }}
                direction={"row"}
                alignItems="center"
                spacing={2}
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
                <Button
                  component="label"
                  htmlFor="userImage"
                  startIcon={<PhotoCameraOutlinedIcon />}
                >
                  Upload image
                </Button>
                <Button
                  onClick={() =>
                    setEmployeeDetails({ ...employeeDetails, userImage: "" })
                  }
                >
                  Remove profile image
                </Button>

                <input
                  type={"file"}
                  style={{ display: "none" }}
                  id="userImage"
                  onChange={handleImageUpload}
                />
              </Stack>

              <Grid item xs={12}>
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
                <TextField
                  label="Gender"
                  size="small"
                  variant="outlined"
                  fullWidth
                  value={employeeDetails.gender}
                  onChange={handleInputChange("gender")}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Marital Status"
                  size="small"
                  variant="outlined"
                  fullWidth
                  value={employeeDetails.maritalStatus}
                  onChange={handleInputChange("maritalStatus")}
                />
              </Grid>
            </Grid>

            {/* CONTACT INFORMATION */}
            <Grid container spacing={1} className={classes.groupContainer}>
              <Typography
                variant="body2"
                gutterBottom
                style={{ fontWeight: "bold", paddingLeft: 4 }}
              >
                Contact Information
              </Typography>
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

            {/* EMPLOYEMENT DETAILS */}
            <Grid container spacing={1} className={classes.groupContainer}>
              <Typography
                variant="body2"
                size="small"
                gutterBottom
                style={{ fontWeight: "bold", paddingLeft: 4 }}
              >
                Employment Information
              </Typography>
              <Grid item xs={12}>
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
                <TextField
                  size="small"
                  label="Department"
                  variant="outlined"
                  fullWidth
                  value={employeeDetails.department}
                  onChange={handleInputChange("department")}
                />
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

            {/* EMERGENCY CONTACT */}
            <Grid container spacing={1} className={classes.groupContainer}>
              <Typography
                variant="body2"
                size="small"
                gutterBottom
                style={{ fontWeight: "bold", paddingLeft: 4 }}
              >
                Emergency Information
              </Typography>
              <Grid item xs={12}>
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
                  label="Blood Group"
                  variant="outlined"
                  fullWidth
                  value={employeeDetails.bloodGroup}
                  onChange={handleInputChange("bloodGroup")}
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
                <TextField
                  size="small"
                  label="Relation"
                  variant="outlined"
                  fullWidth
                  value={employeeDetails.emergencyRelation}
                  onChange={handleInputChange("emergencyRelation")}
                />
              </Grid>
            </Grid>

            {/* ASSETS */}
            <Grid container spacing={1} className={classes.groupContainer}>
              <Typography
                variant="body2"
                size="small"
                gutterBottom
                style={{ fontWeight: "bold", paddingLeft: 4 }}
              >
                Company Assets
              </Typography>

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

            {/* Add more fields as needed */}
          </Grid>
          <ButtonGroup
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: 1,
              padding: "0",
            }}
          >
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
            <Button
              type="submit"
              variant="contained"
              fullWidth
              color="primary"
              className={classes.submitButton}
            >
              Submit
            </Button>
          </ButtonGroup>
        </form>
      </Grid>
    </Container>
  );
};

export default App;
