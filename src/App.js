import React, { useState, useEffect } from 'react';

function UserList() {
  const [users, setUsers] = useState([]);  
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);  

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=5')  
      .then((response) => {
        if (!response.ok) {
          throw new Error('Unable to load the page!'); 
        }
        return response.json();  
      })
      .then((data) => {
        setUsers(data.results);  
        setLoading(false); 
      })
      .catch((error) => {
        setError(error); 
        setLoading(false);  
      });
  }, []); 

  if (loading) return <p>Loading...</p>;  
  if (error) return <p>Error: {error.message}</p>; 

  return (
    <div>
      <h1>UserS Details</h1>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            <h2>{user.name.first} {user.name.last}</h2>
            <img src={user.picture.thumbnail} alt={`${user.name.first} ${user.name.last}`} />
            <p>Email: {user.email}</p>
            <p>Location: {user.location.city}, {user.location.country}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
