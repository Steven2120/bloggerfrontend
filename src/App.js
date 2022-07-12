import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import BlogsPage from "./Pages/Blogs";
import { useState, useEffect } from "react";
import PostBlogPage from "./Pages/PostBlogPage";

const urlEndpoint = "http://localhost:4000";

function App() {
  const [serverJSON, setServerJSON] = useState({ message: [] });
  const [sortField, setSortField] = useState("id");
  const [sortOrder, setSortOrder] = useState("DESC");
  const [filterField, setFilterField] = useState("title");
  const [filterValue, setFilterValue] = useState("");
  const [limit, setLimit] = useState(Number());
  const [page, setPage] = useState(Number(1));
  const [isFetching, setIsFetching] = useState(false);

  const blogSubmit = async (blog) => {
    const url = urlEndpoint + "/blogs/blog-submit";
    // const url = `${urlEndpoint}/blogs/blog-submit`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blog),
    });
    const responseJSON = await response.json();
    return responseJSON;
  };

  useEffect(() => {
    const fetchData = async () => {
      const url = `${urlEndpoint}/blogs/all-blogs?sortField=${sortField}&sortOrder=${sortOrder}&filterField=${filterField}&filterValue=${filterValue}&limit=${limit}&page=${page}`;
      const apiResponse = await fetch(url);
      const apiJSON = await apiResponse.json();
      setServerJSON(apiJSON);
      return;
    };
    fetchData();
  }, [sortField, sortOrder, filterField, filterValue, limit, page, isFetching]);

  return (
    <div className="App">
      <header>
        <Routes>
          <Route
            index
            element={
              <BlogsPage
                blogs={serverJSON.message}
                sortField={sortField}
                setSortField={setSortField}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
                filterField={filterField}
                setFilterField={setFilterField}
                filterValue={filterValue}
                setFilterValue={setFilterValue}
                limit={limit}
                setLimit={setLimit}
                page={page}
                setPage={setPage}
              />
            }
          />
          <Route
            path="/post-blog"
            element={
              <PostBlogPage
                blogSubmit={blogSubmit}
                setIsFetching={setIsFetching}
              />
            }
          />
        </Routes>
      </header>
    </div>
  );
}

export default App;
