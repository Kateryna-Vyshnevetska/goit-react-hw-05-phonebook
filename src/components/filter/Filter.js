import React from 'react';

const Filter = ({getNamesByFilter}) => {

  const getValue = ({target: {value}})=> {
    getNamesByFilter(value)
  }

  return(
    <>
      <h3 className='title'>Find contacts by name</h3>
      <input className='input' onChange={getValue} type='text' name='filter' placeholder='Enter name'></input>
    </>
  )
}
export default Filter;