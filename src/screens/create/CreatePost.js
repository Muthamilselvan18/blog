import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UseFetch } from "../../hooks/UseFetch";
import "./CreatePost.css";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [validationError, setValidationError] = useState("");

  const navigate = useNavigate();

  const { data, error, optionData } = UseFetch(
    "https://jsonplaceholder.typicode.com/posts",
    "POST"
  );

  const handlesubmit = (e) => {
    e.preventDefault();
    if (!title) {
      setValidationError("Title should not be empty");
      return;
    }

    if (!content) {
      setValidationError("Content should not be empty");
      return;
    }
    setValidationError("");
    console.log({ title, body: content, userId: 1 });
    optionData({ title, body: content, userId: 1 });
  };

  useEffect(() => {
    if (data.length !== 0) {
      const timer = setTimeout(() => navigate("/"), 3000);
      return () => clearTimeout(timer);
    }
  }, [data, navigate]);

  return (
    <div className="outercontainer">
      <form onSubmit={handlesubmit}>
        <div className="form-group">
          <label>
            <h4>Title:</h4>
          </label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>
            <h4>Content:</h4>
          </label>
          <textarea
            className="form-control"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        {validationError && (
          <div className="alert alert-danger" role="alert">
            {validationError}
          </div>
        )}
        {data.length !== 0 && (
          <div className="alert alert-success" role="alert">
            Post Created Successfully !
          </div>
        )}
        {error && (
          <div classname="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <div className="float-end">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreatePost;
