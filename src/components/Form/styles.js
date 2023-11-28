import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(4),
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100vw",
    // eslint-disable-next-line no-dupe-keys
    marginTop: 0,
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
    padding: "10px",
    boxSizing: "border-box",
  },
  groupContainer: {
    backgroundColor: "#fff",
    borderRadius: 4,
    padding: "10px",
    boxSizing: "border-box",
    marginBottom: "14px",
    display: "flex",
  },
}));
export default useStyles;
