import React, {useEffect}from "react";
import "./PostDetails.css";
import { useLocation, useNavigate } from "react-router-dom";
import { UseFetch } from "../../hooks/UseFetch";

function PostDetails() {
  const location = useLocation();

  const { state: post } = location;

  const { data, error, optionData } = UseFetch(
    `https://jsonplaceholder.typicode.com/posts/${post.id}`,
    "DELETE"
  );

  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/edit/${post.id}`, { state: post });
  };
  const handleDelete = () => {
    optionData()
  };
  useEffect(() => {
    if (data.length !== 0) {
      const timer = setTimeout(() => navigate("/"), 3000);
      return () => clearTimeout(timer);
    }
  }, [data, navigate]);

  return (
    <div className="container">
      <div className="jumbotron">
        <h1 className="display-4">{post.title}</h1>
        <p className="lead">{post.body}</p>
        {data.length !== 0 && (
          <div className="alert alert-success" role="alert">
            Post Deleted Successfully !
          </div>
        )}
        {error && (
          <div classname="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <div className="float-end">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleEdit}
          >
            Edit
          </button>
        </div>
        <div className="float-end">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostDetails;
