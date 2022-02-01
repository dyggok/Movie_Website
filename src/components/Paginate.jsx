import React, {useState, useEffect} from "react";
import ReactPaginate from "react-paginate";
import { Pagination } from "react-bootstrap";
import "../index.css";

function Paginate(props){
  const [pageCount, setPageCount] = useState(0);
  const {searchData, setSearchData, offset, setOffset, perPage} = props;

 useEffect(() => {
  setSearchData(searchData);
  setPageCount(Math.ceil(searchData.length / perPage));
 }, [searchData])


  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    console.log(selectedPage * perPage);
    setOffset(selectedPage * perPage);
  };
  
  return <>
  <ReactPaginate
          
          previousLabel={"prev"}
          nextLabel={"next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination justify-content-center"}
          subContainerClassName={"pages pagination"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          breakLinkClassName={"page-link"}
          activeClassName={"active"}
        />
  
  
  </>






}

export {Paginate};