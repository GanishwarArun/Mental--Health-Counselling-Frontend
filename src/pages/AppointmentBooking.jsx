import React, { useState } from 'react';

const AppointmentBooking = () => {
  const [appointmentDetails, setAppointmentDetails] = useState({
    date: "",
    time: "",
    counselor: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointmentDetails({
      ...appointmentDetails,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!appointmentDetails.date || !appointmentDetails.time || !appointmentDetails.counselor) {
      setMessage("All fields are required!");
      return;
    }
    setMessage("Appointment booked successfully!");
    console.log("Appointment Details:", appointmentDetails);
    // Reset form
    setAppointmentDetails({ date: "", time: "", counselor: "" });
  };

  return (
    <div className="bg-gray-100 p-6 min-h-screen">
      <h1 className="mb-4 font-bold text-2xl">Book an Appointment</h1>
      <div className="bg-white shadow p-6 rounded-lg">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-semibold text-gray-700" htmlFor="date">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={appointmentDetails.date}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold text-gray-700" htmlFor="time">
              Time
            </label>
            <input
              type="time"
              id="time"
              name="time"
              value={appointmentDetails.time}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold text-gray-700" htmlFor="counselor">
              Counselor
            </label>
            <input
              type="text"
              id="counselor"
              name="counselor"
              value={appointmentDetails.counselor}
              onChange={handleChange}
              placeholder="Enter counselor's name"
              className="mt-1 p-2 border rounded w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white"
          >
            Book Appointment
          </button>
        </form>
        {message && <p className="mt-4 text-green-600">{message}</p>}
      </div>
    </div>
  );
};

export default AppointmentBooking;
