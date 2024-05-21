import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { CSVLink } from "react-csv";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Read() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [filter, setFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedItems, setSelectedItems] = useState(new Set());

  const getData = async () => {
    try {
      const res = await axios.get("https://655f7193879575426b455b36.mockapi.io/crud");
      setData(res.data);
    } catch (error) {
      console.error("Error while getting data", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      try {
        await axios.delete(`https://655f7193879575426b455b36.mockapi.io/crud/${id}`);
        getData();
        toast.success("Contact deleted successfully!");
      } catch (error) {
        console.error("Error while deleting data", error);
        toast.error("Failed to delete contact!");
      }
    }
  };

  const handleDeleteSelected = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete selected items?");
    if (confirmDelete) {
      try {
        for (let id of selectedItems) {
          await axios.delete(`https://655f7193879575426b455b36.mockapi.io/crud/${id}`);
        }
        setSelectedItems(new Set());
        getData();
        toast.success("Selected contacts deleted successfully!");
      } catch (error) {
        console.error("Error while deleting data", error);
        toast.error("Failed to delete selected contacts!");
      }
    }
  };

  const setToLocalStorage = (id, name, email) => {
    localStorage.setItem("id", id);
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setCurrentPage(1); // Reset to the first page when filtering
  };

  const filteredData = data.filter(item => 
    item.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleSort = () => {
    const order = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(order);

    const sortedData = [...data].sort((a, b) => {
      if (order === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    setData(sortedData);
  };

  const handleSelectItem = (id) => {
    const newSelectedItems = new Set(selectedItems);
    if (newSelectedItems.has(id)) {
      newSelectedItems.delete(id);
    } else {
      newSelectedItems.add(id);
    }
    setSelectedItems(newSelectedItems);
  };

  const handleSelectAll = () => {
    if (selectedItems.size === currentItems.length) {
      setSelectedItems(new Set());
    } else {
      const allCurrentPageIds = new Set(currentItems.map(item => item.id));
      setSelectedItems(allCurrentPageIds);
    }
  };


  const headers = [
    { label: "S.no", key: "sno" },
    { label: "Name", key: "name" },
    { label: "Email", key: "email" }
  ];

  const csvData = filteredData.map((item, index) => ({
    sno: index + 1,
    name: item.name,
    email: item.email
  }));

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="m-10">
    <ToastContainer />
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Read</h1>
          <div className="space-x-10">
            <CSVLink 
              data={csvData} 
              headers={headers} 
              filename={"data.csv"}
              className="px-4 py-2 bg-green-500 text-white rounded-md"
            >
              Export to CSV
            </CSVLink>
          <Link to="/">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md">Create</button>
          </Link>
          </div>
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name"
          value={filter}
          onChange={handleFilterChange}
          className="px-4 py-2 border rounded-md"
        />
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-6 py-2 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
              <input 
                type="checkbox" 
                onChange={handleSelectAll} 
                checked={selectedItems.size === currentItems.length} 
              />
            </th>
            <th className="px-6 py-2 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">S.no</th>
            <th className="px-6 py-2 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider cursor-pointer" onClick={handleSort}>Name {sortOrder === "asc" ? "▲" : "▼"}</th>
            <th className="px-6 py-2 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Email</th>
            <th className="px-6 py-2 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Edit</th>
            <th className="px-6 py-2 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Delete</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {currentItems.map((eachData, index) => (
            <tr key={eachData.id}>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                <input 
                  type="checkbox" 
                  checked={selectedItems.has(eachData.id)} 
                  onChange={() => handleSelectItem(eachData.id)} 
                />
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{indexOfFirstItem + index + 1}</td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{eachData.name}</td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{eachData.email}</td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                <Link to="/update">
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                    onClick={() => setToLocalStorage(eachData.id, eachData.name, eachData.email)}
                  >
                    Edit
                  </button>
                </Link>
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-md"
                  onClick={() => handleDelete(eachData.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        <button
          className="px-4 py-2 bg-red-500 text-white rounded-md mr-auto"
          onClick={handleDeleteSelected}
          disabled={selectedItems.size === 0}
        >
          Delete Selected
        </button>
        <div className="flex justify-center">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`px-4 py-2 mx-1 rounded-md ${index + 1 === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Read;
