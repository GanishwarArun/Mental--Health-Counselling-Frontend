import React from 'react';

const AppointmentCard = ({ appointment }) => {
  return (
    <div className="border p-4 rounded-md shadow-md">
      <h3 className="text-lg font-bold">{appointment.title}</h3>
      <p>{appointment.description}</p>
      <button className="bg-blue-500 text-white px-4 py-2 mt-2 rounded">Book Now</button>
    </div>
  );
};

export default AppointmentCard;
