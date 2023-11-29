import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fff",
    minWidth: "99vw",
  },
  form: {
    width: "100%",
    maxWidth: "600px",
    margin: "auto",
  },
  submitButton: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
  mainFormContainer: {
    backgroundColor: "#1365f260",
    padding: "12px",
    boxSizing: "border-box",
    gap: 12,
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
