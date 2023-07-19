import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getOEM } from "../redux/OEM_GET/action";

const TableInvetories = () => {
  const dispatch = useDispatch();
  const { oemdata, Loading, Error } = useSelector((store) => store.oemReducer);

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  // Debounce the search term to reduce API calls on every keystroke
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  // Fetch data when debounced search term changes
  useEffect(() => {
    dispatch(getOEM(debouncedSearchTerm));
  }, [debouncedSearchTerm, dispatch]);

  // Handle loading state
  if (Loading) {
    return <div>Loading...</div>;
  }

  // Handle error state
  if (Error) {
    return <div>Error: {Error}</div>;
  }

  // Handle data state
  return (
    <Container>
      <SearchInput
        type="text"
        placeholder="Search by Make or Model..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Table>
        <thead>
          <tr>
            <th>Make</th>
            <th>Model</th>
            <th>Year</th>
            <th>List Price (USD)</th>
            <th>Available Colors</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(oemdata) &&
            oemdata.map((item, index) => (
              <tr key={index}>
                <td>{item.make}</td>
                <td>{item.model}</td>
                <td>{item.year}</td>
                <td>{item.list_price_usd}</td>
                <td className="available-colors">
                  {item.available_colors?.map((color, colorIndex) => (
                    <ColorCircle key={colorIndex} style={{ backgroundColor: color.toLowerCase() }} />
                  ))}
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: #f2f2f2;
  }

  tbody tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  tbody tr:hover {
    background-color: #e6e6e6;
  }
`;

const ColorCircle = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 5px;
`;

export default TableInvetories;
