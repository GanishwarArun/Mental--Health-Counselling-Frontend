import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="flex justify-between bg-blue-500 p-4 text-white">
      <div className="font-bold text-xl">Counseling Platform</div>
      <div>
        <Link to="/" className="mx-2">Home</Link>
        <Link to="/login" className="mx-2">Login</Link>
        <Link to="/register" className="mx-2">Register</Link>
        <Link to="/dashboard" className="mx-2">Dashboard</Link>
        <Link to="/book-appointment" className="mx-2">Book Appointment</Link>
      </div>
    </nav>
  );
};

export default Navbar;

// import React from 'react';
// import { Link } from 'react-router-dom';

// const Navbar = () => {
//   return (
//     <nav className="flex justify-between bg-blue-500 p-4 text-white">
//       <div className="font-bold text-xl">Counseling Platform</div>
//       <div>
//         <Link to="/" className="mx-2">Home</Link>
//         <Link to="/login" className="mx-2">Login</Link>
//         <Link to="/register" className="mx-2">Register</Link>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
