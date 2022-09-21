import { useRef, useState } from "react";
import FileData from "./components/FileData";
import Papa from "papaparse";
import "./index.css";
function App() {
  const inputRef = useRef();
  const [hasUploaded, setHasUploaded] = useState(false);
  const [file, setfile] = useState([]);
  const fileSubmitHandler = (event) => {
    event.preventDefault();
    if (!inputRef.current.value) {
      alert("PLEASE SELECT A FILE");
      return;
    }
    Papa.parse(inputRef.current.files[0], {
      header: true,
      skipEmptyLines: false,
      complete: (results) => {
        setfile(results.data);
      },
    });
  };
  const inputfillHandler = () => {
    setHasUploaded(true);
  };
  let inputcolour = hasUploaded ? "btn btn-success" : "btn btn-secondary";
  return (
    <>
      <form
        className="form container"
        height="100%"
        onSubmit={fileSubmitHandler}
      >
        <h1>UPLOAD THE INVENTORY DATA</h1>
        <br /><br />
        <label
          htmlFor="fileuploadinput"
          className={`btn centerfill ${inputcolour}`}
        >
          {hasUploaded ? "SELECT NEW FILE" : "UPLOAD THE DATA FILE HERE"}
        </label>
        <input
          onChange={inputfillHandler}
          ref={inputRef}
          className="btn btn-secondary"
          style={{ visibility: "hidden" }}
          type="file"
          id="fileuploadinput"
        />
        <br /><br />
        {<button type="submit" className="btn btn-primary">
          SUBMIT THE FILE
        </button>}
      </form>
      <br /><br /><br /><br />
      <div >
      {file.length > 0 && <FileData file={file}></FileData>}
      </div>
    </>
  );
}

export default App;
