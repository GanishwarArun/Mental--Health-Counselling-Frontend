import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [newAppointment, setNewAppointment] = useState({ date: '', time: '', counselor: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch all appointments
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/appointments`);
        setAppointments(response.data);
      } catch (error) {
        setError('Error fetching appointments. Please try again later.');
      }
    };
    fetchAppointments();
  }, []);

  // Handle creating a new appointment
  const handleCreate = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/appointments`, newAppointment);
      setAppointments([...appointments, response.data]);
      setMessage('Appointment created successfully!');
      setNewAppointment({ date: '', time: '', counselor: '' });
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create appointment');
    }
  };

  // Handle canceling an appointment
  const handleCancel = async (id) => {
    setMessage('');
    setError('');
    try {
      await axios.put(`${import.meta.env.VITE_API_BASE_URL}/appointments/cancel/${id}`);
      setAppointments(appointments.filter((appointment) => appointment._id !== id));
      setMessage('Appointment canceled successfully!');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to cancel appointment');
    }
  };

  return (
    <div className="bg-gray-100 p-8 min-h-screen">
      <div className="bg-white shadow-lg mx-auto p-6 rounded-lg max-w-4xl">
        <h2 className="mb-6 font-bold text-2xl text-gray-800">Manage Appointments</h2>

        {/* Message Display */}
        {message && <p className="mb-4 font-medium text-green-600">{message}</p>}
        {error && <p className="mb-4 font-medium text-red-600">{error}</p>}

        {/* Form to Create Appointment */}
        <form onSubmit={handleCreate} className="mb-6">
          <div className="gap-4 grid grid-cols-1 sm:grid-cols-3">
            <div>
              <label htmlFor="date" className="block font-medium text-gray-700">Date</label>
              <input
                type="date"
                id="date"
                className="border-gray-300 p-2 border rounded-lg w-full"
                value={newAppointment.date}
                onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
                required
              />
            </div>

            <div>
              <label htmlFor="time" className="block font-medium text-gray-700">Time</label>
              <input
                type="time"
                id="time"
                className="border-gray-300 p-2 border rounded-lg w-full"
                value={newAppointment.time}
                onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
                required
              />
            </div>

            <div>
              <label htmlFor="counselor" className="block font-medium text-gray-700">Counselor</label>
              <input
                type="text"
                id="counselor"
                className="border-gray-300 p-2 border rounded-lg w-full"
                value={newAppointment.counselor}
                onChange={(e) => setNewAppointment({ ...newAppointment, counselor: e.target.value })}
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 mt-4 px-4 py-2 rounded-lg font-medium text-white transition"
          >
            Create Appointment
          </button>
        </form>

        {/* Appointments List */}
        <h3 className="mb-4 font-semibold text-gray-800 text-xl">Upcoming Appointments</h3>
        {appointments.length > 0 ? (
          <ul className="space-y-4">
            {appointments.map((appointment) => (
              <li key={appointment._id} className="flex justify-between items-center border-gray-200 bg-gray-50 p-4 border rounded-lg">
                <div>
                  <p className="font-medium text-gray-800">{appointment.date} at {appointment.time}</p>
                  <p className="text-gray-600 text-sm">Counselor: {appointment.counselor}</p>
                </div>
                <button
                  onClick={() => handleCancel(appointment._id)}
                  className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded-lg font-medium text-white transition"
                >
                  Cancel
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No appointments scheduled.</p>
        )}

        {/* Navigation Button */}
        <button
          onClick={() => navigate('/chat')}
          className="bg-gray-800 hover:bg-gray-900 mt-6 px-4 py-2 rounded-lg font-medium text-white transition"
        >
         GO TO CHAT
        </button>
      </div>
    </div>
  );
};

export default Appointments;



// // src/pages/Appointments.jsx
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Appointments = () => {
//   const [appointments, setAppointments] = useState([]);
//   const [newAppointment, setNewAppointment] = useState({ date: '', time: '' });
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();

//   // Fetch all appointments
//   useEffect(() => {
//     const fetchAppointments = async () => {
//       try {
//         const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/appointments`);
//         setAppointments(response.data);
//       } catch (error) {
//         console.error('Error fetching appointments:', error);
//       }
//     };
//     fetchAppointments();
//   }, []);

//   // Handle creating a new appointment
//   const handleCreate = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/appointments`, newAppointment);
//       setAppointments([...appointments, response.data]);
//       setMessage('Appointment created successfully!');
//       setNewAppointment({ date: '', time: '' });
//     } catch (error) {
//       setMessage(error.response?.data?.message || 'Failed to create appointment');
//     }
//   };

//   // Handle canceling an appointment
//   const handleCancel = async (id) => {
//     try {
//       await axios.put(`${import.meta.env.VITE_API_BASE_URL}/appointments/cancel/${id}`);
//       setAppointments(appointments.filter((appointment) => appointment.id !== id));
//       setMessage('Appointment canceled successfully!');
//     } catch (error) {
//       setMessage(error.response?.data?.message || 'Failed to cancel appointment');
//     }
//   };

//   return (
//     <div className="bg-gray-100 p-8 min-h-screen">
//       <div className="bg-white shadow-lg mx-auto p-6 rounded-lg max-w-4xl">
//         <h2 className="mb-6 font-bold text-2xl text-gray-800">Manage Appointments</h2>

//         {/* Message Display */}
//         {message && <p className="mb-4 font-medium text-green-600">{message}</p>}

//         {/* Form to Create Appointment */}
//         <form onSubmit={handleCreate} className="mb-6">
//           <div className="gap-4 grid grid-cols-1 sm:grid-cols-2">
//             <div>
//               <label htmlFor="date" className="block font-medium text-gray-700">Date</label>
//               <input
//                 type="date"
//                 id="date"
//                 className="border-gray-300 p-2 border rounded-lg w-full"
//                 value={newAppointment.date}
//                 onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
//                 required
//               />
//             </div>

//             <div>
//               <label htmlFor="time" className="block font-medium text-gray-700">Time</label>
//               <input
//                 type="time"
//                 id="time"
//                 className="border-gray-300 p-2 border rounded-lg w-full"
//                 value={newAppointment.time}
//                 onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
//                 required
//               />
//             </div>
//           </div>
//           <button
//             type="submit"
//             className="bg-blue-600 hover:bg-blue-700 mt-4 px-4 py-2 rounded-lg font-medium text-white transition"
//           >
//             Create Appointment
//           </button>
//         </form>

//         {/* Appointments List */}
//         <h3 className="mb-4 font-semibold text-gray-800 text-xl">Upcoming Appointments</h3>
//         {appointments.length > 0 ? (
//           <ul className="space-y-4">
//             {appointments.map((appointment) => (
//               <li key={appointment.id} className="flex justify-between items-center border-gray-200 bg-gray-50 p-4 border rounded-lg">
//                 <div>
//                   <p className="font-medium text-gray-800">{appointment.date} at {appointment.time}</p>
//                 </div>
//                 <button
//                   onClick={() => handleCancel(appointment.id)}
//                   className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded-lg font-medium text-white transition"
//                 >
//                   Cancel
//                 </button>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p className="text-gray-600">No appointments scheduled.</p>
//         )}

//         {/* Navigation Button */}
//         <button
//           onClick={() => navigate('/')}
//           className="bg-gray-800 hover:bg-gray-900 mt-6 px-4 py-2 rounded-lg font-medium text-white transition"
//         >
//           Back to Home
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Appointments;

