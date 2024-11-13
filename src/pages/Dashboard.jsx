import React from 'react';

const Dashboard = () => {
  const userDetails = {
    name: "John Doe",
    email: "johndoe@example.com",
    upcomingAppointments: [
      { date: "2024-11-15", time: "10:00 AM", counselor: "Dr. Smith" },
      { date: "2024-11-20", time: "02:00 PM", counselor: "Dr. Emily" },
    ],
  };

  return (
    <div className="bg-gray-100 p-6 min-h-screen">
      <h1 className="mb-4 font-bold text-2xl">Dashboard</h1>
      <div className="bg-white shadow p-4 rounded-lg">
        <h2 className="mb-2 font-semibold text-xl">Welcome, {userDetails.name}</h2>
        <p>Email: {userDetails.email}</p>
        <h3 className="mt-4 font-semibold text-lg">Upcoming Appointments</h3>
        <ul className="pl-5 list-disc">
          {userDetails.upcomingAppointments.length > 0 ? (
            userDetails.upcomingAppointments.map((appointment, index) => (
              <li key={index} className="mt-2">
                <span>{appointment.date} at {appointment.time}</span> with{" "}
                <span className="font-medium">{appointment.counselor}</span>
              </li>
            ))
          ) : (
            <p className="mt-2 text-gray-500">No upcoming appointments.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
