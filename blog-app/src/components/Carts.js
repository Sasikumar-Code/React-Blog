/** @format */

import React, { useEffect } from 'react';

const Carts = () => {
  useEffect(() => {
    const value = localStorage.getItem('carts');
    // console.log(JSON.parse(value));
  });
  return (
    <div>
      <h1>sk</h1>
    </div>
  );
};

export default Carts;
