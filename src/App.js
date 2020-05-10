import React, { useState, useEffect } from 'react';
import './App.css';

import Search from './components/Search';
import List from './components/List';

// // 1. Custom Hook created by moving useState and useEffect search logic out of App(). 
// const useSemiPersistentState = () => {
//   const [searchTerm, setSearchTerm] = useState(
//     localStorage.getItem('search') || ''
//   );

//   useEffect(() => {
//     localStorage.setItem('search', searchTerm);
//   }, [searchTerm]);

//   return [searchTerm, setSearchTerm];
// };

// // 2. Abstract away the specifics to increase reusability
// const useSemiPersistentState = () => {
//   const [value, setValue] = useState(
//     localStorage.getItem('value') || ''
//   );

//   useEffect(() => {
//     localStorage.setItem('value', value);
//   }, [value]);

//   return [value, setValue];
// }

// 3. The problem with solution 2 is that the application overwrites the value allocated item in the local storage. Use a "key" to prevent this. 
const useSemiPersistentState = (key) => {
  const [value, setValue] = useState(
    localStorage.getItem(key) || ''
  );
  
  // Since the key comes from the function call in the App(), the hook will assume that the key could change. Therefore, the key needs to be included in the dependency array of the useEffect Hook. Without the key, side-effects may run with an outdated key (called stale) if the key changes b/w renders.
  useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
}

const App = () => {

  const stories = [
    {
      title: 'React',
      url: 'https://reactjs.org/',
      author: 'Jordan Walke',
      num_comments: 3,
      points: 4,
      objectID: 0,
    }, 
    {
      title: 'Redux',
      url: 'https://redux.js.org/',
      author: 'Dan Abramov',
      num_comments: 2,
      points: 5,
      objectID: 1,
    }, 
  ];

  const [searchTerm, setSearchTerm] = useSemiPersistentState('search');

  // Since search state is managed in this component, filter the list array with the stateful searchTerm.If user entered search term is in an item in the stories array, then it is passed to the List component.
  const searchedStories = stories.filter(story => 
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // State lifted out of Search Component. Search passes up the event after text is entered into the input via this Callback handler. The callback is used in Search component.
  const handleSearch = event => {
    // After Search used callback handler and callsback to here, this function then uses the passes up value to set search state.
    setSearchTerm(event.target.value);
  };

  

  return (
    <div className="App">
      {/* Callback handler is passed via props to Search Component */}
      <Search userSearch={searchTerm} onSearch={handleSearch} />

      <hr />
    {/* If searchTerm is in stories array, the filtered results array with item is passed to the List component */}
      <List list={searchedStories} />
    </div>
  );
}


export default App;
