import React from 'react';
import Item from './Item';

// Takes in array from App component and maps over each item in the array, passing the item to the Item Component to further breakdown and display each item in the object. 
const List = ({ list }) => 
  list.map(item => <Item key={item.objectID} item={item} />);


export default List;

  