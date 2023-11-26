import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


function Create() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const history = useNavigate();

  const header = { "Access-Control-Allow-Origin": "*"};

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("https://655f7193879575426b455b36.mockapi.io/crud",
    {
      name: name,
      email: email,
      header
    })
    .then(() => {
      history("/read");
    });

  }

  
  return (
    <>
      <h1>Create</h1>
      <form>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {/* <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
    <label className="form-check-label">Check me out</label>
  </div> */}
        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </>
  );
}

export default Create;
