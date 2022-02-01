import React, { Component, useState } from 'react';
import { Button, Container } from "react-bootstrap";
import Form from 'react-bootstrap/Form'
import styledComponents from "styled-components";
import styled from "styled-components";
import { useQueries, useQuery } from "react-query";
import { fetchGenres } from "../api";
import { useDispatch } from "react-redux";

function SortAndFilter(props){
  const {sortAction, setSortAction, setIsSorting, setDate, setGenres} = props;
  const {isLoading, isError, error, data, isFetched, isFetching, ...query} = useQuery('genres', fetchGenres)
  const [filtercheck, setFilterCheck] = useState(false);
  const dispatch = useDispatch();
  const genres = [];
  const options = [
  {value: "0", label: ""},
  {value: "1", label: "Sort by A-Z"},
  {value: "2", label: "Sort by Z-A"},
  {value: "3", label: "Sort by Popularity Ascending"},
  {value: "4", label: "Sort by Popularity Descending"}
  ];
  const SideBar = styled.div`
    float: left;
    height: 100%;
  `
  const FormSelect = styled.select`
    &:focus {
      box-shadow: none !important;
      border-color: black !important
    }
  `
   const Input = styled.input`
     &:not(:checked) + label{
       background-color: white;
       color: black;
     }
     &:checked + label{
       background-color: #6c757d;
       color: white;
     }
   `

  function optionHandler(e){
    setSortAction(e.target.value)
    setIsSorting(true)
  }

  function filterHandler(){
    setDate([document.getElementsByName('from')[0].value, document.getElementsByName('to')[0].value])
    setGenres(genres)
  }

  function filterCheckHandler(e){
    genres.push(parseInt(e.target.id))
  }
  return   <SideBar className="m-3 ">
    <Container className="border border-dark" style={{"height" : "250px"}}>
    <h2 className="mt-3">Sort By</h2>
    <FormSelect className="form-select" value={sortAction} onChange={(e) => optionHandler(e)}>
      {options.map(o => <option value={o.label} >{o.label}</option>)}
    </FormSelect>
    </Container>
    <Container className="mr-3 mt-3 border border-dark" style={{"height" : "500px"}} >
     <h2 className="mt-3">Filter By</h2>
     <Container>
     <div className='m-2'>From: <input type="date" name="from" /></div>
     <div className='m-4'>To: <input type="date" name="to" /></div>
     </Container>
     <Container>
      {data?.data?.genres.map(genre => {
        return <>
        <Input className="d-none" type="checkbox" id={genre.id} name={genre.name} onChange={(e) => filterCheckHandler(e)} />
          <label className="btn btn-flat border border-dark m-1" htmlFor={genre.id}>
          {genre?.name}</label>
        </>
      })}
    </Container>
    </Container >
    <Button className="col-12 my-3 btn btn-secondary justify-content-end" onClick={filterHandler}>Search</Button>
  </SideBar>
}

export {SortAndFilter}