import React, { useState } from 'react';

const AppointmentBooking = () => {
  const [appointmentDetails, setAppointmentDetails] = useState({
    date: '',
    time: '',
    counselor: '',
  });

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'
  const [clientRecords, setClientRecords] = useState([]); // Store booked appointments

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointmentDetails({
      ...appointmentDetails,
      [name]: value,
    });
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const { date, time, counselor } = appointmentDetails;

    if (!date || !time || !counselor) {
      setMessageType('error');
      setMessage('⚠️ All fields are required!');
      return;
    }

    const appointmentTime = new Date(`${date}T${time}`);
    if (appointmentTime < new Date()) {
      setMessageType('error');
      setMessage('⚠️ Appointment time must be in the future!');
      return;
    }

    // Add new appointment to client records
    setClientRecords((prevRecords) => [
      ...prevRecords,
      { ...appointmentDetails, id: Date.now(), status: 'Upcoming' }, // Add a unique ID and status
    ]);

    setMessageType('success');
    setMessage('✅ Appointment booked successfully!');

    // Reset form
    setAppointmentDetails({ date: '', time: '', counselor: '' });
  };

  // Handle appointment cancellation
  const handleCancelAppointment = (id) => {
    const updatedRecords = clientRecords.map((record) =>
      record.id === id ? { ...record, status: 'Cancelled' } : record
    );
    setClientRecords(updatedRecords);
    setMessageType('success');
    setMessage('🗑️ Appointment cancelled successfully.');
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-8 min-h-screen">
      <h1 className="drop-shadow-md mb-8 font-extrabold text-4xl text-center text-white">📅 Book an Appointment</h1>

      {/* Booking Form */}
      <div className="bg-white shadow-2xl mx-auto p-10 rounded-xl max-w-xl">
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block font-semibold text-gray-700" htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={appointmentDetails.date}
              onChange={handleChange}
              className="mt-2 p-3 border rounded-md focus:ring-2 focus:ring-blue-500 w-full"
            />
          </div>

          <div className="mb-6">
            <label className="block font-semibold text-gray-700" htmlFor="time">Time</label>
            <input
              type="time"
              id="time"
              name="time"
              value={appointmentDetails.time}
              onChange={handleChange}
              className="mt-2 p-3 border rounded-md focus:ring-2 focus:ring-blue-500 w-full"
            />
          </div>

          <div className="mb-6">
            <label className="block font-semibold text-gray-700" htmlFor="counselor">Counselor</label>
            <input
              type="text"
              id="counselor"
              name="counselor"
              value={appointmentDetails.counselor}
              onChange={handleChange}
              placeholder="Enter counselor's name"
              className="mt-2 p-3 border rounded-md focus:ring-2 focus:ring-blue-500 w-full"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 py-3 rounded-lg w-full font-bold text-white transition-all"
          >
            Book Appointment
          </button>
        </form>

        {message && (
          <p
            className={`mt-6 p-4 text-center rounded-md ${
              messageType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}
          >
            {message}
          </p>
        )}
      </div>

      {/* Client Records Section */}
      <h2 className="drop-shadow-md mt-12 mb-6 font-bold text-3xl text-center text-white">📋 Client Records</h2>

      {clientRecords.length > 0 ? (
        <div className="mx-auto max-w-5xl">
          <table className="bg-white shadow-2xl rounded-lg w-full">
            <thead>
              <tr className="bg-blue-600 text-left text-white">
                <th className="p-4">Date</th>
                <th className="p-4">Time</th>
                <th className="p-4">Counselor</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {clientRecords.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50 border-t">
                  <td className="p-4">{record.date}</td>
                  <td className="p-4">{record.time}</td>
                  <td className="p-4">{record.counselor}</td>
                  <td className={`p-4 font-bold ${record.status === 'Cancelled' ? 'text-red-600' : 'text-blue-600'}`}>{record.status}</td>
                  <td className="p-4">
                    {record.status !== 'Cancelled' && (
                      <button
                        onClick={() => handleCancelAppointment(record.id)}
                        className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded text-white"
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="mt-4 text-center text-white">No appointments booked yet.</p>
      )}
    </div>
  );
};

export default AppointmentBooking;

