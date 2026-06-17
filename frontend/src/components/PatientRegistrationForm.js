import React, { useState } from "react";
import axios from "axios";

function PatientRegistrationForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    gender: "",
    bloodGroup: "",
    phone: "",
    address: "",
    emergencyContact: "",
    insuranceInformation: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Validation
  const validate = () => {
    let newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full Name is required";
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of Birth is required";
    }

    if (!formData.gender) {
      newErrors.gender = "Gender is required";
    }

    if (!formData.bloodGroup) {
      newErrors.bloodGroup = "Blood Group is required";
    }

    if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid 10-digit phone number";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!/^[0-9]{10}$/.test(formData.emergencyContact)) {
      newErrors.emergencyContact =
        "Enter a valid emergency contact number";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const response = await axios.post(
        "http://localhost:5000/api/patients",
        formData
      );

      console.log(response.data);

      setMessage("Patient Registered Successfully!");

      setFormData({
        fullName: "",
        dateOfBirth: "",
        gender: "",
        bloodGroup: "",
        phone: "",
        address: "",
        emergencyContact: "",
        insuranceInformation: "",
      });

      setErrors({});
    } catch (error) {
      console.error(error);
      setMessage("Registration Failed!");
    }
  };

  return (
    <div className="container">
      <h2>Patient Registration Form</h2>

      {message && (
        <p className="success-message">{message}</p>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
        />
        <p className="error">{errors.fullName}</p>

        <input
          type="date"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
        />
        <p className="error">{errors.dateOfBirth}</p>

        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <p className="error">{errors.gender}</p>

        <select
          name="bloodGroup"
          value={formData.bloodGroup}
          onChange={handleChange}
        >
          <option value="">Select Blood Group</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
        </select>
        <p className="error">{errors.bloodGroup}</p>

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
        />
        <p className="error">{errors.phone}</p>

        <textarea
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
        />
        <p className="error">{errors.address}</p>

        <input
          type="text"
          name="emergencyContact"
          placeholder="Emergency Contact"
          value={formData.emergencyContact}
          onChange={handleChange}
        />
        <p className="error">
          {errors.emergencyContact}
        </p>

        <input
          type="text"
          name="insuranceInformation"
          placeholder="Insurance Information"
          value={formData.insuranceInformation}
          onChange={handleChange}
        />

        <button type="submit">
          Register Patient
        </button>
      </form>
    </div>
  );
}

export default PatientRegistrationForm;