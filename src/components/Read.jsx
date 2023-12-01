import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Read() {
  const [data, setData] = useState([]);
  const [tabledark, setTabledark] = useState('');


  function getData() {
    axios
      .get("https://655f7193879575426b455b36.mockapi.io/crud")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      });
  }

  function handleDelete(id) {
    axios
      .delete(`https://655f7193879575426b455b36.mockapi.io/crud/${id}`)
      .then(() => {
        getData();
      });
  }

  const setToLocalStorage = (id, name, email) => {
    localStorage.setItem("id", id);
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="m-5">
        <div className="form-check form-switch">
          <input className="form-check-input" type="checkbox"
          onClick={() => {
          if(tabledark === "table-dark") setTabledark("");
          else setTabledark("table-dark");
          }}
           />
        </div>
        <div className="d-flex justify-content-between m-2">
          <h1>Read</h1>
          <Link to="/">
            <button className="btn btn-secondary">Create</button>
          </Link>
        </div>
        <table className={`table ${tabledark}`} >
          <thead>
            <tr>
              <th scope="col">S.no</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          {data.map((eachData) => {
            return (
              <>
                <tbody>
                  <tr>
                    <th scope="row">{eachData.id}</th>
                    <td>{eachData.name}</td>
                    <td>{eachData.email}</td>
                    <td>
                      <Link to="/update">
                        <button
                          className="btn btn-success"
                          onClick={() =>
                            setToLocalStorage(
                              eachData.id,
                              eachData.name,
                              eachData.email
                            )
                          }
                        >
                          Edit{" "}
                        </button>
                      </Link>
                    </td>
                    <td>
                      <button
                        className=" btn btn-danger"
                        onClick={() => handleDelete(eachData.id)}
                      >
                        Delete{" "}
                      </button>
                    </td>
                  </tr>
                </tbody>
              </>
            );
          })}
        </table>
      </div>
    </>
  );
}
