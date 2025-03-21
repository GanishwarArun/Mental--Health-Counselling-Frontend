
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [userDetails, setUserDetails] = useState({
    name: "User", 
    email: "user@example.com", 
    upcomingAppointments: [
      { date: "2024-11-15", time: "10:00 AM", counselor: "Dr. Tamil Selvam" }, 
      { date: "2024-11-20", time: "02:00 PM", counselor: "Dr. Dilip" },
    ],
    profilePicture: null,
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [appointmentDetails, setAppointmentDetails] = useState(null);

  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      alert('Logging out...');
      // Add logic to clear session or tokens
    }
  };

  const handleReschedule = (index) => {
    alert(`Reschedule appointment at ${userDetails.upcomingAppointments[index].time} on ${userDetails.upcomingAppointments[index].date}`);
    // Add logic to reschedule appointment
  };

  const handleCancel = (index) => {
    alert(`Cancel appointment at ${userDetails.upcomingAppointments[index].time} on ${userDetails.upcomingAppointments[index].date}`);
    // Add logic to cancel appointment
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleProfilePictureUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUserDetails({ ...userDetails, profilePicture: URL.createObjectURL(file) });
    }
  };

  const handleNavigateToBookAppointment = () => {
    navigate('/book-appointment');  // Navigate to Book Appointment page
  };

  const filteredAppointments = userDetails.upcomingAppointments.filter((appointment) =>
    appointment.date.includes(searchQuery) || appointment.counselor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-gradient-to-r from-teal-50 to-teal-200 p-8 min-h-screen text-gray-900">
      
      {/* Header Section */}
      <header className="flex justify-between items-center mb-10">
        <h1 className="drop-shadow-md font-extrabold text-5xl text-teal-900">Dashboard</h1>
        <button 
          className="bg-red-500 hover:bg-red-600 shadow-md px-6 py-3 rounded-md focus:ring-4 focus:ring-red-200 font-bold transform transition-transform hover:scale-105"
          onClick={handleLogout}
        >
          Log Out
        </button>
      </header>

      {/* User Details Section */}
      <div className="flex items-center bg-white bg-opacity-95 shadow-2xl mb-10 p-10 rounded-lg">
        <div className="flex justify-center items-center bg-teal-500 rounded-full w-24 h-24 font-extrabold text-4xl text-white">
          {userDetails.profilePicture ? (
            <img src={userDetails.profilePicture} alt="Profile" className="rounded-full w-full h-full" />
          ) : (
            userDetails.name.charAt(0)
          )}
        </div>
        <div className="ml-8">
          <h2 className="font-extrabold text-3xl text-teal-900">Welcome, {userDetails.name}</h2>
          <p className="text-gray-700 text-lg">{userDetails.email}</p>
          <input
            type="file"
            accept="image/*"
            onChange={handleProfilePictureUpload}
            className="mt-4"
          />
        </div>
      </div>

      {/* Search Appointments Section */}
      <section className="mb-8">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search appointments by date or counselor"
          className="shadow-md p-2 rounded-md w-full text-lg"
        />
      </section>

      {/* Today's Date Section */}
      <section className="mb-8">
        <p className="text-gray-700 text-xl">Today's Date: {new Date().toLocaleDateString()}</p>
      </section>

      {/* Appointments Section */}
      <section>
        <h3 className="drop-shadow-md mb-8 font-extrabold text-4xl text-teal-900">Upcoming Appointments</h3>
        
        {filteredAppointments.length > 0 ? (
          <ul className="space-y-8">
            {filteredAppointments.map((appointment, index) => (
              <li 
                key={index} 
                className="flex justify-between items-center bg-white bg-opacity-95 shadow-2xl p-10 rounded-lg transform transition-transform hover:scale-105"
              >
                <div>
                  <p className="font-bold text-2xl text-teal-900">{appointment.date} at {appointment.time}</p>
                  <p className="text-gray-700 text-lg">With {appointment.counselor}</p>
                </div>
                <div className="flex space-x-6">
                  <button 
                    className="bg-green-600 hover:bg-green-700 shadow-md px-6 py-3 rounded-md focus:ring-4 focus:ring-green-300 font-bold text-white transform transition-transform hover:scale-105"
                    onClick={() => handleReschedule(index)}
                  >
                    Reschedule
                  </button>
                  <button 
                    className="bg-red-600 hover:bg-red-700 shadow-md px-6 py-3 rounded-md focus:ring-4 focus:ring-red-300 font-bold text-white transform transition-transform hover:scale-105"
                    onClick={() => handleCancel(index)}
                  >
                    Cancel
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-8 text-gray-700 text-xl">No upcoming appointments.</p>
        )}
      </section>

      {/* Modal for Appointment Details */}
      {showModal && appointmentDetails && (
        <div className="z-50 fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="bg-white shadow-2xl p-8 rounded-lg">
            <h3 className="font-bold text-2xl text-teal-900">Appointment Details</h3>
            <p className="text-gray-700 text-lg">Date: {appointmentDetails.date}</p>
            <p className="text-gray-700 text-lg">Time: {appointmentDetails.time}</p>
            <p className="text-gray-700 text-lg">Counselor: {appointmentDetails.counselor}</p>
            <button
              onClick={() => setShowModal(false)}
              className="bg-teal-600 hover:bg-teal-700 mt-4 px-6 py-3 rounded-md font-bold text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Navigate to Book Appointment Section */}
      <div className="mt-8">
        <button
          className="bg-teal-600 hover:bg-teal-700 shadow-md px-6 py-3 rounded-md focus:ring-4 focus:ring-teal-300 font-bold text-black"
          onClick={handleNavigateToBookAppointment}
        >
          Book Appointment
        </button>
      </div>
    </div>
  );
};

export default Dashboard;

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Dashboard = () => {
//   const [userDetails, setUserDetails] = useState({
//     name: "User", 
//     email: "user@example.com", 
//     upcomingAppointments: [
//       { date: "2024-11-15", time: "10:00 AM", counselor: "Dr. Tamil Selvam" }, 
//       { date: "2024-11-20", time: "02:00 PM", counselor: "Dr. Dilip" },
//     ],
//     profilePicture: null,
//   });

//   const [searchQuery, setSearchQuery] = useState('');
//   const [showModal, setShowModal] = useState(false);
//   const [appointmentDetails, setAppointmentDetails] = useState(null);

//   const navigate = useNavigate();

//   const handleLogout = () => {
//     if (window.confirm('Are you sure you want to log out?')) {
//       alert('Logging out...');
//       // Add logic to clear session or tokens
//     }
//   };

//   const handleReschedule = (index) => {
//     alert(`Reschedule appointment at ${userDetails.upcomingAppointments[index].time} on ${userDetails.upcomingAppointments[index].date}`);
//     // Add logic to reschedule appointment
//   };

//   const handleCancel = (index) => {
//     alert(`Cancel appointment at ${userDetails.upcomingAppointments[index].time} on ${userDetails.upcomingAppointments[index].date}`);
//     // Add logic to cancel appointment
//   };

//   const handleNavigateToChat = () => {
//     navigate(`/chat?sender=${userDetails.name}&receiver=Dr. Tamil Selvam`);
//   };

//   const handleSearch = (event) => {
//     setSearchQuery(event.target.value);
//   };

//   const handleProfilePictureUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setUserDetails({ ...userDetails, profilePicture: URL.createObjectURL(file) });
//     }
//   };

//   const handleNavigateToBookAppointment = () => {
//     navigate('/book-appointment');  // Navigate to Book Appointment page
//   };

//   const filteredAppointments = userDetails.upcomingAppointments.filter((appointment) =>
//     appointment.date.includes(searchQuery) || appointment.counselor.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="bg-gradient-to-r from-teal-50 to-teal-200 p-8 min-h-screen text-gray-900">
      
//       {/* Header Section */}
//       <header className="flex justify-between items-center mb-10">
//         <h1 className="drop-shadow-md font-extrabold text-5xl text-teal-900">Dashboard</h1>
//         <button 
//           className="bg-red-500 hover:bg-red-600 shadow-md px-6 py-3 rounded-md focus:ring-4 focus:ring-red-200 font-bold transform transition-transform hover:scale-105"
//           onClick={handleLogout}
//         >
//           Log Out
//         </button>
//       </header>

//       {/* User Details Section */}
//       <div className="flex items-center bg-white bg-opacity-95 shadow-2xl mb-10 p-10 rounded-lg">
//         <div className="flex justify-center items-center bg-teal-500 rounded-full w-24 h-24 font-extrabold text-4xl text-white">
//           {userDetails.profilePicture ? (
//             <img src={userDetails.profilePicture} alt="Profile" className="rounded-full w-full h-full" />
//           ) : (
//             userDetails.name.charAt(0)
//           )}
//         </div>
//         <div className="ml-8">
//           <h2 className="font-extrabold text-3xl text-teal-900">Welcome, {userDetails.name}</h2>
//           <p className="text-gray-700 text-lg">{userDetails.email}</p>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleProfilePictureUpload}
//             className="mt-4"
//           />
//         </div>
//       </div>

//       {/* Search Appointments Section */}
//       <section className="mb-8">
//         <input
//           type="text"
//           value={searchQuery}
//           onChange={handleSearch}
//           placeholder="Search appointments by date or counselor"
//           className="shadow-md p-2 rounded-md w-full text-lg"
//         />
//       </section>

//       {/* Today's Date Section */}
//       <section className="mb-8">
//         <p className="text-gray-700 text-xl">Today's Date: {new Date().toLocaleDateString()}</p>
//       </section>

//       {/* Appointments Section */}
//       <section>
//         <h3 className="drop-shadow-md mb-8 font-extrabold text-4xl text-teal-900">Upcoming Appointments</h3>
        
//         {filteredAppointments.length > 0 ? (
//           <ul className="space-y-8">
//             {filteredAppointments.map((appointment, index) => (
//               <li 
//                 key={index} 
//                 className="flex justify-between items-center bg-white bg-opacity-95 shadow-2xl p-10 rounded-lg transform transition-transform hover:scale-105"
//               >
//                 <div>
//                   <p className="font-bold text-2xl text-teal-900">{appointment.date} at {appointment.time}</p>
//                   <p className="text-gray-700 text-lg">With {appointment.counselor}</p>
//                 </div>
//                 <div className="flex space-x-6">
//                   <button 
//                     className="bg-green-600 hover:bg-green-700 shadow-md px-6 py-3 rounded-md focus:ring-4 focus:ring-green-300 font-bold text-white transform transition-transform hover:scale-105"
//                     onClick={() => handleReschedule(index)}
//                   >
//                     Reschedule
//                   </button>
//                   <button 
//                     className="bg-red-600 hover:bg-red-700 shadow-md px-6 py-3 rounded-md focus:ring-4 focus:ring-red-300 font-bold text-white transform transition-transform hover:scale-105"
//                     onClick={() => handleCancel(index)}
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p className="mt-8 text-gray-700 text-xl">No upcoming appointments.</p>
//         )}
//       </section>

//       {/* Modal for Appointment Details */}
//       {showModal && appointmentDetails && (
//         <div className="z-50 fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
//           <div className="bg-white shadow-2xl p-8 rounded-lg">
//             <h3 className="font-bold text-2xl text-teal-900">Appointment Details</h3>
//             <p className="text-gray-700 text-lg">Date: {appointmentDetails.date}</p>
//             <p className="text-gray-700 text-lg">Time: {appointmentDetails.time}</p>
//             <p className="text-gray-700 text-lg">Counselor: {appointmentDetails.counselor}</p>
//             <button
//               onClick={() => setShowModal(false)}
//               className="bg-teal-600 hover:bg-teal-700 mt-4 px-6 py-3 rounded-md font-bold text-white"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Navigate to Chat Section */}
//       <div className="mt-8">
//         <button
//           className="bg-blue-600 hover:bg-blue-700 shadow-md px-6 py-3 rounded-md focus:ring-4 focus:ring-blue-300 font-bold text-white"
//           onClick={handleNavigateToChat}
//         >
//           Go to Chat
//         </button>
//       </div>

//       {/* Navigate to Book Appointment Section */}
//       <div className="mt-8">
//         <button
//           className="bg-teal-600 hover:bg-teal-700 shadow-md px-6 py-3 rounded-md focus:ring-4 focus:ring-teal-300 font-bold text-white"
//           onClick={handleNavigateToBookAppointment}
//         >
//           Book Appointment
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Dashboard = () => {
//   const [userDetails, setUserDetails] = useState({
//     name: "User", 
//     email: "user@example.com", 
//     upcomingAppointments: [
//       { date: "2024-11-15", time: "10:00 AM", counselor: "Dr. Tamil Selvam" }, 
//       { date: "2024-11-20", time: "02:00 PM", counselor: "Dr. Dilip" },
//     ],
//     profilePicture: null,
//   });

//   const [searchQuery, setSearchQuery] = useState('');
//   const [showModal, setShowModal] = useState(false);
//   const [appointmentDetails, setAppointmentDetails] = useState(null);

//   const navigate = useNavigate();

//   const handleLogout = () => {
//     if (window.confirm('Are you sure you want to log out?')) {
//       alert('Logging out...');
//       // Add logic to clear session or tokens
//     }
//   };

//   const handleReschedule = (index) => {
//     alert(`Reschedule appointment at ${userDetails.upcomingAppointments[index].time} on ${userDetails.upcomingAppointments[index].date}`);
//     // Add logic to reschedule appointment
//   };

//   const handleCancel = (index) => {
//     alert(`Cancel appointment at ${userDetails.upcomingAppointments[index].time} on ${userDetails.upcomingAppointments[index].date}`);
//     // Add logic to cancel appointment
//   };

//   const handleNavigateToChat = () => {
//     navigate(`/chat?sender=${userDetails.name}&receiver=Dr. Tamil Selvam`);
//   };

//   const handleSearch = (event) => {
//     setSearchQuery(event.target.value);
//   };

//   const handleProfilePictureUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setUserDetails({ ...userDetails, profilePicture: URL.createObjectURL(file) });
//     }
//   };

//   const filteredAppointments = userDetails.upcomingAppointments.filter((appointment) =>
//     appointment.date.includes(searchQuery) || appointment.counselor.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="bg-gradient-to-r from-teal-50 to-teal-200 p-8 min-h-screen text-gray-900">
      
//       {/* Header Section */}
//       <header className="flex justify-between items-center mb-10">
//         <h1 className="drop-shadow-md font-extrabold text-5xl text-teal-900">Dashboard</h1>
//         <button 
//           className="bg-red-500 hover:bg-red-600 shadow-md px-6 py-3 rounded-md focus:ring-4 focus:ring-red-200 font-bold transform transition-transform hover:scale-105"
//           onClick={handleLogout}
//         >
//           Log Out
//         </button>
//       </header>

//       {/* User Details Section */}
//       <div className="flex items-center bg-white bg-opacity-95 shadow-2xl mb-10 p-10 rounded-lg">
//         <div className="flex justify-center items-center bg-teal-500 rounded-full w-24 h-24 font-extrabold text-4xl text-white">
//           {userDetails.profilePicture ? (
//             <img src={userDetails.profilePicture} alt="Profile" className="rounded-full w-full h-full" />
//           ) : (
//             userDetails.name.charAt(0)
//           )}
//         </div>
//         <div className="ml-8">
//           <h2 className="font-extrabold text-3xl text-teal-900">Welcome, {userDetails.name}</h2>
//           <p className="text-gray-700 text-lg">{userDetails.email}</p>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleProfilePictureUpload}
//             className="mt-4"
//           />
//         </div>
//       </div>

//       {/* Search Appointments Section */}
//       <section className="mb-8">
//         <input
//           type="text"
//           value={searchQuery}
//           onChange={handleSearch}
//           placeholder="Search appointments by date or counselor"
//           className="shadow-md p-2 rounded-md w-full text-lg"
//         />
//       </section>

//       {/* Today's Date Section */}
//       <section className="mb-8">
//         <p className="text-gray-700 text-xl">Today's Date: {new Date().toLocaleDateString()}</p>
//       </section>

//       {/* Appointments Section */}
//       <section>
//         <h3 className="drop-shadow-md mb-8 font-extrabold text-4xl text-teal-900">Upcoming Appointments</h3>
        
//         {filteredAppointments.length > 0 ? (
//           <ul className="space-y-8">
//             {filteredAppointments.map((appointment, index) => (
//               <li 
//                 key={index} 
//                 className="flex justify-between items-center bg-white bg-opacity-95 shadow-2xl p-10 rounded-lg transform transition-transform hover:scale-105"
//               >
//                 <div>
//                   <p className="font-bold text-2xl text-teal-900">{appointment.date} at {appointment.time}</p>
//                   <p className="text-gray-700 text-lg">With {appointment.counselor}</p>
//                 </div>
//                 <div className="flex space-x-6">
//                   <button 
//                     className="bg-green-600 hover:bg-green-700 shadow-md px-6 py-3 rounded-md focus:ring-4 focus:ring-green-300 font-bold text-white transform transition-transform hover:scale-105"
//                     onClick={() => handleReschedule(index)}
//                   >
//                     Reschedule
//                   </button>
//                   <button 
//                     className="bg-red-600 hover:bg-red-700 shadow-md px-6 py-3 rounded-md focus:ring-4 focus:ring-red-300 font-bold text-white transform transition-transform hover:scale-105"
//                     onClick={() => handleCancel(index)}
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p className="mt-8 text-gray-700 text-xl">No upcoming appointments.</p>
//         )}
//       </section>

//       {/* Modal for Appointment Details */}
//       {showModal && appointmentDetails && (
//         <div className="z-50 fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
//           <div className="bg-white shadow-2xl p-8 rounded-lg">
//             <h3 className="font-bold text-2xl text-teal-900">Appointment Details</h3>
//             <p className="text-gray-700 text-lg">Date: {appointmentDetails.date}</p>
//             <p className="text-gray-700 text-lg">Time: {appointmentDetails.time}</p>
//             <p className="text-gray-700 text-lg">Counselor: {appointmentDetails.counselor}</p>
//             <button
//               onClick={() => setShowModal(false)}
//               className="bg-teal-600 hover:bg-teal-700 mt-4 px-6 py-3 rounded-md font-bold text-white"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Navigate to Chat Section */}
//       <div className="mt-8">
//         <button
//           className="bg-blue-600 hover:bg-blue-700 shadow-md px-6 py-3 rounded-md focus:ring-4 focus:ring-blue-300 font-bold text-white"
//           onClick={handleNavigateToChat}
//         >
//           Go to Chat
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Dashboard = () => {
//   const [userDetails, setUserDetails] = useState({
//     name: "User", 
//     email: "user@example.com", 
//     upcomingAppointments: [
//       { date: "2024-11-15", time: "10:00 AM", counselor: "Dr. Tamil Selvam" }, 
//       { date: "2024-11-20", time: "02:00 PM", counselor: "Dr. Dilip" }, 
//     ],
//   });

//   const navigate = useNavigate();

//   const handleLogout = () => {
//     alert('Logging out...');
//     // Logic to clear session or tokens
//   };

//   const handleReschedule = (index) => {
//     alert(`Reschedule appointment at ${userDetails.upcomingAppointments[index].time} on ${userDetails.upcomingAppointments[index].date}`);
//     // Add logic to reschedule appointment
//   };

//   const handleCancel = (index) => {
//     alert(`Cancel appointment at ${userDetails.upcomingAppointments[index].time} on ${userDetails.upcomingAppointments[index].date}`);
//     // Add logic to cancel appointment
//   };

//   const handleNavigateToChat = () => {
//     navigate(`/chat?sender=${userDetails.name}&receiver=Dr. Tamil Selvam`);
//   };

//   const handleUpdateProfile = () => {
//     // Logic to update profile details
//     alert("Profile Updated!");
//     // Example: setUserDetails({...userDetails, name: 'New Name'});
//   };

//   const handleAppointmentAction = (action) => {
//     alert(`You chose to ${action} the appointment.`);
//     // Logic to handle appointment actions like reschedule or cancel
//   };

//   return (
//     <div className="bg-gradient-to-r from-teal-50 to-teal-200 p-8 min-h-screen text-gray-900">
      
//       {/* Header Section */}
//       <header className="flex justify-between items-center mb-10">
//         <h1 className="drop-shadow-md font-extrabold text-5xl text-teal-900">Dashboard</h1>
//         <button 
//           className="bg-red-500 hover:bg-red-600 shadow-md px-6 py-3 rounded-md focus:ring-4 focus:ring-red-200 font-bold transform transition-transform hover:scale-105"
//           onClick={handleLogout}
//         >
//           Log Out
//         </button>
//       </header>

//       {/* User Details Section */}
//       <div className="flex items-center bg-white bg-opacity-95 shadow-2xl mb-10 p-10 rounded-lg">
//         <div className="flex justify-center items-center bg-teal-500 rounded-full w-24 h-24 font-extrabold text-4xl text-white">
//           {userDetails.name.charAt(0)}
//         </div>
//         <div className="ml-8">
//           <h2 className="font-extrabold text-3xl text-teal-900">Welcome, {userDetails.name}</h2>
//           <p className="text-gray-700 text-lg">{userDetails.email}</p>
//         </div>
//       </div>

//       {/* Update Profile Section */}
//       <section className="mb-8">
//         <button
//           className="bg-yellow-500 hover:bg-yellow-600 shadow-md px-6 py-3 rounded-md focus:ring-4 focus:ring-yellow-300 font-bold text-white"
//           onClick={handleUpdateProfile}
//         >
//           Update Profile
//         </button>
//       </section>

//       {/* Today's Date Section */}
//       <section className="mb-8">
//         <p className="text-gray-700 text-xl">Today's Date: {new Date().toLocaleDateString()}</p>
//       </section>

//       {/* Appointments Section */}
//       <section>
//         <h3 className="drop-shadow-md mb-8 font-extrabold text-4xl text-teal-900">Upcoming Appointments</h3>
        
//         {userDetails.upcomingAppointments.length > 0 ? (
//           <ul className="space-y-8">
//             {userDetails.upcomingAppointments.map((appointment, index) => (
//               <li 
//                 key={index} 
//                 className="flex justify-between items-center bg-white bg-opacity-95 shadow-2xl p-10 rounded-lg transform transition-transform hover:scale-105"
//               >
//                 <div>
//                   <p className="font-bold text-2xl text-teal-900">{appointment.date} at {appointment.time}</p>
//                   <p className="text-gray-700 text-lg">With {appointment.counselor}</p>
//                 </div>
//                 <div className="flex space-x-6">
//                   <button 
//                     className="bg-green-600 hover:bg-green-700 shadow-md px-6 py-3 rounded-md focus:ring-4 focus:ring-green-300 font-bold text-white transform transition-transform hover:scale-105"
//                     onClick={() => handleReschedule(index)}
//                   >
//                     Reschedule
//                   </button>
//                   <button 
//                     className="bg-red-600 hover:bg-red-700 shadow-md px-6 py-3 rounded-md focus:ring-4 focus:ring-red-300 font-bold text-white transform transition-transform hover:scale-105"
//                     onClick={() => handleCancel(index)}
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p className="mt-8 text-gray-700 text-xl">No upcoming appointments.</p>
//         )}
//       </section>

//       {/* Navigate to Chat Section */}
//       <div className="mt-8">
//         <button
//           className="bg-blue-600 hover:bg-blue-700 shadow-md px-6 py-3 rounded-md focus:ring-4 focus:ring-blue-300 font-bold text-white"
//           onClick={handleNavigateToChat}
//         >
//           Go to Chat
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const Dashboard = () => {
//   const userDetails = {
//     name: "User", 
//     email: "user@example.com", 
//     upcomingAppointments: [
//       { date: "2024-11-15", time: "10:00 AM", counselor: "Dr. Tamil Selvam" }, 
//       { date: "2024-11-20", time: "02:00 PM", counselor: "Dr. Dilip" }, 
//     ],
//   };

//   const navigate = useNavigate();  // Hook to navigate to different pages

//   const handleLogout = () => {
//     alert('Logging out...');
//     // Add logic to clear user session or tokens
//   };

//   const handleReschedule = (index) => {
//     alert(`Reschedule appointment at ${userDetails.upcomingAppointments[index].time} on ${userDetails.upcomingAppointments[index].date}`);
//     // Add logic to reschedule appointment
//   };

//   const handleCancel = (index) => {
//     alert(`Cancel appointment at ${userDetails.upcomingAppointments[index].time} on ${userDetails.upcomingAppointments[index].date}`);
//     // Add logic to cancel appointment
//   };

//   const handleNavigateToChat = () => {
//     // Navigate to chat page with sender and receiver parameters
//     navigate(`/chat?sender=${userDetails.name}&receiver=Dr. Tamil Selvam`);
//   };

//   return (
//     <div className="bg-gradient-to-r from-teal-50 to-teal-200 p-8 min-h-screen text-gray-900">
      
//       {/* Header Section */}
//       <header className="flex justify-between items-center mb-10">
//         <h1 className="drop-shadow-md font-extrabold text-5xl text-teal-900">Dashboard</h1>
//         <button 
//           className="bg-red-500 hover:bg-red-600 shadow-md px-6 py-3 rounded-md focus:ring-4 focus:ring-red-200 font-bold transform transition-transform hover:scale-105"
//           onClick={handleLogout}
//         >
//           Log Out
//         </button>
//       </header>

//       {/* User Details Section */}
//       <div className="flex items-center bg-white bg-opacity-95 shadow-2xl mb-10 p-10 rounded-lg">
//         <div className="flex justify-center items-center bg-teal-500 rounded-full w-24 h-24 font-extrabold text-4xl text-white">
//           {userDetails.name.charAt(0)}
//         </div>
//         <div className="ml-8">
//           <h2 className="font-extrabold text-3xl text-teal-900">Welcome, {userDetails.name}</h2>
//           <p className="text-gray-700 text-lg">{userDetails.email}</p>
//         </div>
//       </div>

//       {/* Appointments Section */}
//       <section>
//         <h3 className="drop-shadow-md mb-8 font-extrabold text-4xl text-teal-900">Upcoming Appointments</h3>
        
//         {userDetails.upcomingAppointments.length > 0 ? (
//           <ul className="space-y-8">
//             {userDetails.upcomingAppointments.map((appointment, index) => (
//               <li 
//                 key={index} 
//                 className="flex justify-between items-center bg-white bg-opacity-95 shadow-2xl p-10 rounded-lg transform transition-transform hover:scale-105"
//               >
//                 <div>
//                   <p className="font-bold text-2xl text-teal-900">{appointment.date} at {appointment.time}</p>
//                   <p className="text-gray-700 text-lg">With {appointment.counselor}</p>
//                 </div>
//                 <div className="flex space-x-6">
//                   <button 
//                     className="bg-green-600 hover:bg-green-700 shadow-md px-6 py-3 rounded-md focus:ring-4 focus:ring-green-300 font-bold text-white transform transition-transform hover:scale-105"
//                     onClick={() => handleReschedule(index)}
//                   >
//                     Reschedule
//                   </button>
//                   <button 
//                     className="bg-red-600 hover:bg-red-700 shadow-md px-6 py-3 rounded-md focus:ring-4 focus:ring-red-300 font-bold text-white transform transition-transform hover:scale-105"
//                     onClick={() => handleCancel(index)}
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p className="mt-8 text-gray-700 text-xl">No upcoming appointments.</p>
//         )}
//       </section>

//       {/* Navigate to Chat Section */}
//       <div className="mt-8">
//         <button
//           className="bg-blue-600 hover:bg-blue-700 shadow-md px-6 py-3 rounded-md focus:ring-4 focus:ring-blue-300 font-bold text-white"
//           onClick={handleNavigateToChat}
//         >
//           Go to Chat
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


// import React from 'react';

// const Dashboard = () => {
//   const userDetails = {
//     name: "User", 
//     email: "user@example.com", 
//     upcomingAppointments: [
//       { date: "2024-11-15", time: "10:00 AM", counselor: "Dr. Tamil Selvam" }, 
//       { date: "2024-11-20", time: "02:00 PM", counselor: "Dr. Dilip" }, 
//     ],
//   };

//   const handleLogout = () => {
//     alert('Logging out...');
//     // Add logic to clear user session or tokens
//   };

//   const handleReschedule = (index) => {
//     alert(`Reschedule appointment at ${userDetails.upcomingAppointments[index].time} on ${userDetails.upcomingAppointments[index].date}`);
//     // Add logic to reschedule appointment
//   };

//   const handleCancel = (index) => {
//     alert(`Cancel appointment at ${userDetails.upcomingAppointments[index].time} on ${userDetails.upcomingAppointments[index].date}`);
//     // Add logic to cancel appointment
//   };

//   return (
//     <div className="bg-gradient-to-r from-teal-50 to-teal-200 p-8 min-h-screen text-gray-900">
      
//       {/* Header Section */}
//       <header className="flex justify-between items-center mb-10">
//         <h1 className="drop-shadow-md font-extrabold text-5xl text-teal-900">Dashboard</h1>
//         <button 
//           className="bg-red-500 hover:bg-red-600 shadow-md px-6 py-3 rounded-md focus:ring-4 focus:ring-red-200 font-bold transform transition-transform hover:scale-105"
//           onClick={handleLogout}
//         >
//           Log Out
//         </button>
//       </header>

//       {/* User Details Section */}
//       <div className="flex items-center bg-white bg-opacity-95 shadow-2xl mb-10 p-10 rounded-lg">
//         <div className="flex justify-center items-center bg-teal-500 rounded-full w-24 h-24 font-extrabold text-4xl text-white">
//           {userDetails.name.charAt(0)}
//         </div>
//         <div className="ml-8">
//           <h2 className="font-extrabold text-3xl text-teal-900">Welcome, {userDetails.name}</h2>
//           <p className="text-gray-700 text-lg">{userDetails.email}</p>
//         </div>
//       </div>

//       {/* Appointments Section */}
//       <section>
//         <h3 className="drop-shadow-md mb-8 font-extrabold text-4xl text-teal-900">Upcoming Appointments</h3>
        
//         {userDetails.upcomingAppointments.length > 0 ? (
//           <ul className="space-y-8">
//             {userDetails.upcomingAppointments.map((appointment, index) => (
//               <li 
//                 key={index} 
//                 className="flex justify-between items-center bg-white bg-opacity-95 shadow-2xl p-10 rounded-lg transform transition-transform hover:scale-105"
//               >
//                 <div>
//                   <p className="font-bold text-2xl text-teal-900">{appointment.date} at {appointment.time}</p>
//                   <p className="text-gray-700 text-lg">With {appointment.counselor}</p>
//                 </div>
//                 <div className="flex space-x-6">
//                   <button 
//                     className="bg-green-600 hover:bg-green-700 shadow-md px-6 py-3 rounded-md focus:ring-4 focus:ring-green-300 font-bold text-white transform transition-transform hover:scale-105"
//                     onClick={() => handleReschedule(index)}
//                   >
//                     Reschedule
//                   </button>
//                   <button 
//                     className="bg-red-600 hover:bg-red-700 shadow-md px-6 py-3 rounded-md focus:ring-4 focus:ring-red-300 font-bold text-white transform transition-transform hover:scale-105"
//                     onClick={() => handleCancel(index)}
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p className="mt-8 text-gray-700 text-xl">No upcoming appointments.</p>
//         )}
//       </section>
//     </div>
//   );
// };

// export default Dashboard;