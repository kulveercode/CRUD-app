import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Create() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const header = { "Access-Control-Allow-Origin": "*" };      //part of the Cross-Origin Resource Sharing (CORS) mechanism
 
    const handleSubmit = async(e) => {
        e.preventDefault();           // Prevent the default form submission action
        try {
            await axios.post("https://655f7193879575426b455b36.mockapi.io/crud",  {
            name: name,
            email: email,
            header,
        })
        .then((res) => {
            toast.success("Contact Created successfully!");
            setTimeout(() => {
                navigate("/read");
                console.log(res.data);
            }, 2000);
        })
        } catch (error) {
            setError("An error occurred while creating the entry. Please try again.");
            console.log("Error creating entry:", error);
            toast.error("Failed to update contact!");
        }
    };

  return (
    <>
      <div className='m-20'>
      <ToastContainer />
            <div className='flex justify-between m-2'>
                <h1 className="text-2xl font-bold">Create</h1>
                <Link to='/read'>
                    <button className='px-4 py-2 bg-green-500 text-white rounded-md'>Show data</button>
                </Link>
            </div>
            {error && <div className="text-red-500" role="alert">{error}</div>}
            <form>
                <div className='mb-3 flex flex-col'>
                    <label className='form-label'>Name</label>
                    <input type="text" id='name' className="form-label border" onChange={(e) => setName(e.target.value)} />
                </div>
                <div className='mb-3 flex flex-col'>
                    <label className='form-label'>Email</label>
                    <input type="email" id='email' className="form-label border" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <button type='submit' className='px-6 py-2 text-white font-semibold bg-blue-500' onClick={handleSubmit}>Submit</button>
            </form>
      </div>
    </>
  )
}

export default Create

//try and catch, async await, .then .catch 