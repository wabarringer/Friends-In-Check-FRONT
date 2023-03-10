// import React, { useState } from "react";
// import Header from "./Header";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import Home from "./pages/Home/index";
// import Room from "./pages/Room/index";
// import Friends from "./pages/Friends/index";
// import Stats from "./pages/Stats/index";
// import { Link } from "react-router-dom";

// // useNavigate allows to set nav location,
// function Navigation() {
//   const [currentPage, setCurrentPage] = useState("Home");

//   const renderPage = () => {
//     if (currentPage === "Login") {
//       return <Login />;
//     }
//     if (currentPage === "Signup") {
//       return <Signup />;
//     }
//     if (currentPage === "Home") {
//       return <Home />;
//     }
//   };

//   const handlePageChange = (page) => setCurrentPage(page);

//   return (
//     <div>
//       <Header currentPage={currentPage} handlePageChange={handlePageChange} />
//       {renderPage()}
//     </div>
//   );
// }

// export default Navigation;
