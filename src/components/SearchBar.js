import { useRef } from "react";
import '../../src/index.css'
const SearchBar = (props) => {
    const searchRef = useRef();
    const searchHandler = () => {
        
        props.onSearch(searchRef.current.value)
    };
  return (
    <div className="input-group" >
      <div className="form-outline searchbar">
        <input  ref={searchRef } type="search" id="form1" className="form-control" />
        <label className="form-label" htmlFor="form1">
          Search
        </label>
      </div>
      <button type="button" className="btn btn-primary" onClick={searchHandler}>
        <i className="fas fa-search"></i>
      </button>
    </div>
  );
};

export default SearchBar;
