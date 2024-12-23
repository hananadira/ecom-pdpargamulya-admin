// // login.jsx
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';  // Import useNavigate

// function Login() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();  // Initialize navigate

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Logika autentikasi login
//     if (username === 'admin' && password === 'admin') {
//       // Redirect ke halaman home setelah login berhasil
//       navigate('/home');
//     } else {
//       alert('Login failed');
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// }

// export default Login;
