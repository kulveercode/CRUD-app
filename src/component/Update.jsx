import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Update() {
    const [id, setId] = useState(0);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
      setId(localStorage.getItem("id"));
      setName(localStorage.getItem("name"));
      setEmail(localStorage.getItem("email"));
    }, [])

    const handleUpdate = (e) => {
        e.preventDefault();
        axios.put(`https://655f7193879575426b455b36.mockapi.io/crud/${id}`,
        {
            name: name,
            email: email,
          })
          .then(() => {
            toast.success("Contact updated successfully!");
            setTimeout(() => {
                navigate("/read");
            }, 2000);
          }).catch(error => {
            console.error("Error while updating data", error);
            toast.error("Failed to update contact!");
        });
    }

  return (
    <>
      <div className='m-10'>
      <ToastContainer />
            <h1 className="text-2xl font-bold mb-4">Update</h1>
            <form>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
                    <input
                        type="text"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email Address</label>
                    <input
                        type="email"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={handleUpdate}
                    >
                        Update
                    </button>
                    <Link to='/read'>
                        <button
                            type="button"
                            className="ml-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Back
                        </button>
                    </Link>
                </div>
            </form>
        </div>
    </>
  )
}

export default Update
