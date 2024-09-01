
/*
import React, { useState } from 'react';
import './PartnerForm.css'; // Make sure to create and use a corresponding CSS file

export default function PartnerForm() {
    const [formData, setFormData] = useState({
        partnerId: "",
        name: "",
        phone: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zip: "",
        serviceAreas: [""], // Initialize with one empty service area input
        bankName: "",
        accountNumber: "",
        ifscCode: ""
      });
    
      // Function to handle changes in the input fields
      function handleInput(event) {
        setFormData((prevDetails) => ({
          ...prevDetails,
          [event.target.name]: event.target.value,
        }));
      }
    
      // Function to handle adding a new service area input
      function addServiceArea() {
        setFormData((prevDetails) => ({
          ...prevDetails,
          serviceAreas: [...prevDetails.serviceAreas, ""]
        }));
      }
    
      // Function to handle changes in the service area input fields
      function handleServiceAreaChange(index, event) {
        const updatedServiceAreas = [...formData.serviceAreas];
        updatedServiceAreas[index] = event.target.value;
        setFormData((prevDetails) => ({
          ...prevDetails,
          serviceAreas: updatedServiceAreas
        }));
      }
    
      // Function to handle form submission
      function submitForm(event) {
        event.preventDefault();
    
        // Convert serviceAreas array to a comma-separated string or keep as array if needed
        const dataToSend = {
          ...formData,
          serviceAreas: formData.serviceAreas.filter(area => area) // Filter out any empty service areas
        };
    
        fetch("http://localhost:3026/api/v1/deliverypartners/register/", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(dataToSend),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data); // Handle successful response
          })
          .catch((err) => {
            console.log(err); // Handle errors
          });
      }
    
      return (
        <>
          <div>
            <form onSubmit={submitForm}>
              <div>
                <label>Partner ID:</label>
                <input type="text" name="partnerId" onChange={handleInput} required />
              </div>
              <div>
                <label>Name:</label>
                <input type="text" name="name" onChange={handleInput} required />
              </div>
              <div>
                <label>Phone Number:</label>
                <input type="tel" name="phone" onChange={handleInput} required />
              </div>
              <div>
                <label>Email Address:</label>
                <input type="email" name="email" onChange={handleInput} required />
              </div>
              <div>
                <label>Street Address:</label>
                <input type="text" name="street" onChange={handleInput} required />
              </div>
              <div>
                <label>City:</label>
                <input type="text" name="city" onChange={handleInput} required />
              </div>
              <div>
                <label>State/Province:</label>
                <input type="text" name="state" onChange={handleInput} required />
              </div>
              <div>
                <label>Zip/Postal Code:</label>
                <input type="text" name="zip" onChange={handleInput} required />
              </div>
    
              {/* Service Areas /}
              <div>
                <label>Service Area:</label>
                {formData.serviceAreas.map((area, index) => (
                  <div key={index}>
                    <input
                      type="text"
                      value={area}
                      onChange={(event) => handleServiceAreaChange(index, event)}
                    />
                  </div>
                ))}
                <button type="button" onClick={addServiceArea}>Add Service Area</button>
              </div>
    
              <div>
                <label>Bank Name:</label>
                <input type="text" name="bankName" onChange={handleInput} required />
              </div>
              <div>
                <label>Account Number:</label>
                <input type="text" name="accountNumber" onChange={handleInput} required />
              </div>
              <div>
                <label>IFSC Code:</label>
                <input type="text" name="ifscCode" onChange={handleInput} required />
              </div>
              <button type="submit">Submit Form</button>
            </form>
          </div>
        </>
      );
}
*/

import React, { useState } from 'react';
import './PartnerForm.css'; // Make sure to create and use a corresponding CSS file

// List of Indian states
const states = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

export default function PartnerForm() {
    const [formData, setFormData] = useState({
        partnerId: "",
        name: "",
        phoneNumber: "",
        email: "",
        address: {
            street: "",
            city: "",
            state: "",
            zip: ""
        },
        serviceArea: [""], // Initialize with one empty service area input
        bankingInfo: {
            bankName: "",
            accountNumber: "",
            ifscCode: ""
        }
    });
    
    // Function to handle changes in the input fields
    function handleInput(event) {
        const { name, value } = event.target;
        setFormData(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    }
    
    // Function to handle changes in address fields
    function handleAddressInput(event) {
        const { name, value } = event.target;
        setFormData(prevDetails => ({
            ...prevDetails,
            address: {
                ...prevDetails.address,
                [name]: value
            }
        }));
    }

    // Function to handle changes in bankingInfo fields
    function handleBankingInput(event) {
        const { name, value } = event.target;
        setFormData(prevDetails => ({
            ...prevDetails,
            bankingInfo: {
                ...prevDetails.bankingInfo,
                [name]: value
            }
        }));
    }
    
    // Function to handle adding a new service area input
    function addServiceArea() {
        setFormData(prevDetails => ({
            ...prevDetails,
            serviceArea: [...prevDetails.serviceArea, ""]
        }));
    }
    
    // Function to handle changes in the service area input fields
    function handleServiceAreaChange(index, event) {
        const updatedServiceAreas = [...formData.serviceArea];
        updatedServiceAreas[index] = event.target.value;
        setFormData(prevDetails => ({
            ...prevDetails,
            serviceArea: updatedServiceAreas
        }));
    }
    
    // Function to handle form submission
    function submitForm(event) {
        event.preventDefault();

        // Convert serviceAreas array to a comma-separated string or keep as array if needed
        const dataToSend = {
            ...formData,
            serviceArea: formData.serviceArea.filter(area => area) // Filter out any empty service areas
        };
    
        fetch("http://localhost:3026/api/v1/deliverypartners/register/", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSend),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data); // Handle successful response
        })
        .catch(err => {
            console.log(err); // Handle errors
        });
    }
    
    return (
        <div>
            <form onSubmit={submitForm}>
                <div>
                    <label>Partner ID:</label>
                    <input type="text" name="partnerId" onChange={handleInput} required />
                </div>
                <div>
                    <label>Name:</label>
                    <input type="text" name="name" onChange={handleInput} required />
                </div>
                <div>
                    <label>Phone Number:</label>
                    <input type="tel" name="phoneNumber" onChange={handleInput} required />
                </div>
                <div>
                    <label>Email Address:</label>
                    <input type="email" name="email" onChange={handleInput} required />
                </div>
                <div>
                    <label>Street Address:</label>
                    <input type="text" name="street" onChange={handleAddressInput} required />
                </div>
                <div>
                    <label>City:</label>
                    <input type="text" name="city" onChange={handleAddressInput} required />
                </div>
                <div>
                    <label>State:</label>
                    <select name="state" onChange={handleAddressInput} required>
                        <option value="">Select State</option>
                        {states.map((state, index) => (
                            <option key={index} value={state}>{state}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Zip/Postal Code:</label>
                    <input type="text" name="zip" onChange={handleAddressInput} required />
                </div>

                {/* Service Areas */}
                <div>
                    <label>Service Area:</label>
                    {formData.serviceArea.map((area, index) => (
                        <div key={index}>
                            <input
                                type="text"
                                value={area}
                                onChange={(event) => handleServiceAreaChange(index, event)}
                            />
                        </div>
                    ))}
                    <button type="button" onClick={addServiceArea}>Add Service Area</button>
                </div>

                <div>
                    <label>Bank Name:</label>
                    <input type="text" name="bankName" onChange={handleBankingInput} required />
                </div>
                <div>
                    <label>Account Number:</label>
                    <input type="text" name="accountNumber" onChange={handleBankingInput} required />
                </div>
                <div>
                    <label>IFSC Code:</label>
                    <input type="text" name="ifscCode" onChange={handleBankingInput} required />
                </div>
                <button type="submit">Submit Form</button>
            </form>
        </div>
    );
}
