/** @format */

import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const [Data, setData] = useState([]);
  const [Cart, setCart] = useState([]);
  // Calculate pagination values
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = Data.slice(firstIndex, lastIndex);
  const npage = Math.ceil(Data.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);
  // const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const addCart = (i) => {
    Cart.push(records[i]);
    const value = JSON.stringify(Cart);
    localStorage.setItem('carts', value);
  };
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts').then((res) => {
      setData(res.data);
      console.log(res);
    });
  }, []);

  return (
    <>
      <div>
        <table className="table">
          <thead>
            <th>ID</th>
            <th>Title</th>
            <th>Body</th>
          </thead>
          <tbody>
            {records.map((d, i) => (
              <tr key={i}>
                <td>{d.id}</td>
                <td>{d.title}</td>
                <td>{d.body}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <nav>
          <ul className="pagination">
            <li className="page-item">
              <a href="#" className="page-link" onClick={prePage}>
                Prev
              </a>
            </li>
            {numbers.map((n, i) => (
              <li
                className={`page-item ${currentPage === n ? 'active' : ''}`}
                key={i}
              >
                <a
                  href="#"
                  className="page-item"
                  onClick={() => changeCPage(n)}
                >
                  {n}
                </a>
              </li>
            ))}
            <li className="page-item">
              <a href="#" className="page-link" onClick={nextPage}>
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
  function prePage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }
  function changeCPage(id) {
    setCurrentPage(id);
  }
  function nextPage() {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  }
}

export default App;
