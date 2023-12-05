import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  submitButton: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
  mainFormContainer: {
    backgroundColor:"#EEEEEE",
    borderRadius:4,
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
    justifyContent: "space-evenly",
    gap: 2,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

export default useStyles;
