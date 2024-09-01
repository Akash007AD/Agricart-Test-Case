import './Register.css';
import React, { useState } from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import { Link } from 'react-router-dom';

export default function RegisterAsFarmer() {
  const [farmer, setFarmer] = useState({
    username: '',
    name: '',
    password: '',
    gender: '',
    address: '',
    pincode: '',
    email: '',
    phoneNumber: '',
    farmingCertifications: '',
    farmingDetails: '',
  });

  const [message, setMessage] = useState({
    type: "invisible-msg",
    text: "Dummy Msg"
  });

  function handleInput(event) {
    setFarmer((prevDetails) => {
      return { ...prevDetails, [event.target.name]: event.target.value };
    });
  }

  function handleSubmit(event) {
    event.preventDefault(); // Prevent page refresh
    // Add your form submission logic here
    console.log(farmer);
    fetch("http://localhost:3026/api/v1/farmers/register", { // Replace with the API endpoint for farmer registration
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(farmer),
    })
      .then((response) => response.json())
      .then((data) => {
        setMessage({ type: "success", text: data.message });

        setFarmer({
          username: '',
          name: '',
          password: '',
          gender: '',
          address: '',
          pincode: '',
          email: '',
          phoneNumber: '',
          farmingCertifications: '',
          farmingDetails: '',
        });

        setTimeout(() => {
          setMessage({ type: "invisible-msg", text: "Dummy Msg" });
        }, 5000);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <Navbar page={"home"} />
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              onChange={handleInput}
              className="form-control"
              id="name"
              name="name"
              placeholder="Enter your name"
              value={farmer.name}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              onChange={handleInput}
              className="form-control"
              id="username"
              name="username"
              placeholder="Enter your username"
              value={farmer.username}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              onChange={handleInput}
              className="form-control"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={farmer.password}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Gender</label>
            <div className="gender-options">
              <div className="gender-radio-group">
                <input
                  type="radio"
                  onChange={handleInput}
                  id="male"
                  name="gender"
                  value="male"
                  checked={farmer.gender === 'male'}
                />
                <label htmlFor="male">Male</label>
              </div>
              <div className="gender-radio-group">
                <input
                  type="radio"
                  onChange={handleInput}
                  id="female"
                  name="gender"
                  value="female"
                  checked={farmer.gender === 'female'}
                />
                <label htmlFor="female">Female</label>
              </div>
              <div className="gender-radio-group">
                <input
                  type="radio"
                  onChange={handleInput}
                  id="other"
                  name="gender"
                  value="other"
                  checked={farmer.gender === 'other'}
                />
                <label htmlFor="other">Other</label>
              </div>
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Address</label>
            <input
              type="text"
              onChange={handleInput}
              className="form-control"
              id="address"
              name="address"
              placeholder="Enter your address"
              value={farmer.address}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Pincode</label>
            <input
              type="text"
              onChange={handleInput}
              className="form-control"
              id="pincode"
              name="pincode"
              placeholder="Enter your pincode"
              value={farmer.pincode}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              onChange={handleInput}
              className="form-control"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={farmer.email}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Phone Number</label>
            <input
              type="text"
              onChange={handleInput}
              className="form-control"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Enter your phone number"
              value={farmer.phoneNumber}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Farming Certifications</label>
            <input
              type="text"
              onChange={handleInput}
              className="form-control"
              id="farmingCertifications"
              name="farmingCertifications"
              placeholder="Enter your farming certifications"
              value={farmer.farmingCertifications}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Farming Details</label>
            <textarea
              onChange={handleInput}
              className="form-control"
              id="farmingDetails"
              name="farmingDetails"
              placeholder="Provide details about your farming practices"
              value={farmer.farmingDetails}
              rows="3"
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">
            Register as Farmer
          </button>
          <p>
            Already have an account? <Link to="/login-farmer">Login as Farmer</Link>
          </p>
          <p className={message.type}>{message.text}</p>
        </form>
      </div>
      <Footer />
    </>
  );
}