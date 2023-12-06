import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  mainFormContainer: {
    backgroundColor: "#EEEEEE",
    borderRadius: 4,
    maxWidth: "80%",
    padding: 10,
    gap: 10,
  },
  groupContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 4,
    padding: "10px",
  },
  buttonGroup: {
    display: "flex",
    width: "80%",
    justifyContent: "space-evenly",
    marginTop: "10px",
    marginBottom: "10px",
  },
}));

export default useStyles;
