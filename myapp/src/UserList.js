import React, { useState, useEffect } from 'react';

function UserList() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Fetch users from the API
    fetch('/api/users')
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setSearchResults(data);
      })
      .catch((error) => console.error('Error:', error));
  }, []);

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    const results = users.filter((user) =>
      user.name.toLowerCase().includes(term)
    );
    setSearchResults(results);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search users"
        value={searchTerm}
        onChange={handleSearch}
      />
      <ul>
        {searchResults.map((user) => (
          <li key={user._id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
