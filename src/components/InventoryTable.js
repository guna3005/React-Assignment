import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import SearchBar from "./SearchBar";
import '../index.css'
import TableRow from "./TableRow";
const InventoryTable = (props) => {
  const [table, setTable] = useState(props.maintable);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  useEffect(() => {
    const endOffset = itemOffset + 10;
    setCurrentItems(table.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(table.length / 10));
  }, [itemOffset,table]);
  const searchHandler = async (keyvalue) => {
    let newTable = [];
    for (const row of props.maintable) {
      if (row["name"].toLowerCase().includes(keyvalue.toLowerCase())) {
        newTable.push(row);
      }
    }
    setTable(newTable);
  };
  const handlePageClick = (event) => {
    const newOffset = (event.selected * 10) % table.length;
    setItemOffset(newOffset);
  };
  return (
    <>
      <SearchBar onSearch={searchHandler} />
      <br />
      <br />
      <br />
      <div style={{padding : '20px'}} >
      <table style={{ background: "white" , borderRadius: '10px' ,boxShadow : '5px 5px 25px 3px'}} className="table">
        <thead style={{ background: "lightskyblue" , borderRadius : '10px' }} className="thead-dark">
          <tr>
            <th>Name</th>
            <th>Batch</th>
            <th>stock</th>
            <th>Deal</th>
            <th>Free</th>
            <th>MRP</th>
            <th>Rate</th>
            <th>Expiry Date</th>
          </tr>
        </thead>
        <tbody className="thead-light">
          {currentItems.map((row) => (
            <TableRow key={row.name + row.batch} tableRow={row} />
          ))}
        </tbody>
      </table>
      </div>
      {table.length <= 0 && (
        <h2
          style={{ width: "100%", alignContent: "center", marginLeft: "35%" }}
        >
          Enter Valid Medicine Name
        </h2>
      )}
      <div style={{'justifyContent' : 'space-between'}}>
        <ReactPaginate 
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          previousLinkClassName={'page-item'}
          renderOnZeroPageCount={0}
          containerClassName = {`mypagination pagination`}
        />
        </div>
    </>
  );
};

export default InventoryTable;
