import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Read() {
  const [data, setData] = useState([]);

  function getData() {
    axios
      .get("https://655f7193879575426b455b36.mockapi.io/crud")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      });
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <h2>Read Operation</h2>
      <table className="table">
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
                    <button className="btn-success">Edit</button>
                  </td>
                  <td>
                    <button className="btn-danger">Delete</button>
                  </td>
                </tr>
              </tbody>
            </>
          );
        })}
      </table>
    </>
  );
}