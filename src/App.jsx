import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [data, setData] = useState([]);
  const [searching, setSearching] = useState("");
  const [sortType, setSortType] = useState("");
  const [filterUserId, setFilterUserId] = useState("");

  const fetchData = async () => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      const json = await res.json();
      setData(json);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSort = (posts) => {
    if (sortType === "title-asc") {
      return [...posts].sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortType === "title-desc") {
      return [...posts].sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortType === "userId-asc") {
      return [...posts].sort((a, b) => a.userId - b.userId);
    } else if (sortType === "userId-desc") {
      return [...posts].sort((a, b) => b.userId - a.userId);
    }
    return posts;
  };

  const handleFilter = (posts) => {
    return filterUserId
      ? posts.filter((post) => post.userId === parseInt(filterUserId))
      : posts;
  };

  const filteredAndSortedPosts = handleSort(
    handleFilter(
      data.filter((post) =>
        post.title.toLowerCase().includes(searching.toLowerCase())
      )
    )
  );

  if (!data.length) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="header">
        <input
          type="text"
          placeholder="Search by title"
          onChange={(e) => setSearching(e.target.value)}
        />
        <select onChange={(e) => setSortType(e.target.value)}>
          <option value="">Sort By</option>
          <option value="title-asc">Title (Ascending)</option>
          <option value="title-desc">Title (Descending)</option>
          <option value="userId-asc">User ID (Ascending)</option>
          <option value="userId-desc">User ID (Descending)</option>
        </select>
        <input
          type="number"
          placeholder="Filter by User ID"
          onChange={(e) => setFilterUserId(e.target.value)}
        />
      </div>

      <div className="main-card">
        {filteredAndSortedPosts.map((ele) => (
          <div className="card" key={ele.id}>
            <p>User ID: {ele.userId}</p>
            <h3>{ele.title}</h3>
            <p>{ele.body}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default App;
