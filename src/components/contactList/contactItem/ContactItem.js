import React from 'react';

const ContactItem = ({name, number, id, delItem}) => {
 const deleteItem =()=>{
  delItem(id);
 }
  return(
    <li className='list__item'>
      <p className='text'>{name}: {number}</p>
      <button className='btn' onClick={deleteItem}>delete</button>
    </li>
  )
}

export default ContactItem;