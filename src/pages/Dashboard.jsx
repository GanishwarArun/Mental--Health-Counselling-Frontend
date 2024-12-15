import React from 'react';

const Dashboard = () => {
  const userDetails = {
    name: "User", 
    email: "user@example.com", 
    upcomingAppointments: [
      { date: "2024-11-15", time: "10:00 AM", counselor: "Dr. Tamil Selvam" }, 
      { date: "2024-11-20", time: "02:00 PM", counselor: "Dr. Dilip" }, 
    ],
  };

  const handleLogout = () => {
    alert('Logging out...');
    // Add logic to clear user session or tokens
  };

  const handleReschedule = (index) => {
    alert(`Reschedule appointment at ${userDetails.upcomingAppointments[index].time} on ${userDetails.upcomingAppointments[index].date}`);
    // Add logic to reschedule appointment
  };

  const handleCancel = (index) => {
    alert(`Cancel appointment at ${userDetails.upcomingAppointments[index].time} on ${userDetails.upcomingAppointments[index].date}`);
    // Add logic to cancel appointment
  };

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
          {userDetails.name.charAt(0)}
        </div>
        <div className="ml-8">
          <h2 className="font-extrabold text-3xl text-teal-900">Welcome, {userDetails.name}</h2>
          <p className="text-gray-700 text-lg">{userDetails.email}</p>
        </div>
      </div>

      {/* Appointments Section */}
      <section>
        <h3 className="drop-shadow-md mb-8 font-extrabold text-4xl text-teal-900">Upcoming Appointments</h3>
        
        {userDetails.upcomingAppointments.length > 0 ? (
          <ul className="space-y-8">
            {userDetails.upcomingAppointments.map((appointment, index) => (
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
    </div>
  );
};

export default Dashboard;