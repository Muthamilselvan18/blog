import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UseFetch } from "../../hooks/UseFetch";
import "./EditPost.css";

function EditPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [validationError, setValidationError] = useState("");
  const [modifiedField, setModifiedField] = useState({});

  const navigate = useNavigate();

  const location = useLocation();

  const { state: post } = location;

  const { data, error, optionData } = UseFetch(
    `https://jsonplaceholder.typicode.com/posts/${post.id}`,
    "PATCH"
  );

  const onTitleChange = (e) => {
    setTitle(e.target.value);
    setModifiedField({ ...modifiedField, title: e.target.value });
  };

  const onContentChange = (e) => {
    setContent(e.target.value);
    setModifiedField({ ...modifiedField, body: e.target.value });
  };

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
    console.log(modifiedField);
    optionData(modifiedField);
  };

  useEffect(() => {
    setTitle(post.title);
    setContent(post.body);
    if (data.length !== 0) {
      const timer = setTimeout(() => navigate("/"), 3000);
      return () => clearTimeout(timer);
    }
  }, [data, navigate, post.title, post.body]);

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
            onChange={onTitleChange}
          />
        </div>
        <div className="form-group">
          <label>
            <h4>Content:</h4>
          </label>
          <textarea rows="5"
            className="form-control"
            value={content}
            onChange={onContentChange}
          />
        </div>
        {validationError && (
          <div className="alert alert-danger" role="alert">
            {validationError}
          </div>
        )}
        {data.length !== 0 && (
          <div className="alert alert-success" role="alert">
            Post Edited Successfully !
          </div>
        )}
        {error && (
          <div classname="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <div className="float-end">
          <button type="submit" className="btn btn-primary">
            Edit
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditPost;
