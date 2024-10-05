import React, { useState  } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import VerifyCode from '../components/VerifyCode';

const SignUp = () => {
  const api = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const [emailMsg, setEmailMsg] = useState('');
  const [usernameMsg, setUsernameMsg] = useState('');
  const [passwordMsg, setPasswordMsg] = useState('');

  const [user,setUser] = useState(null)



  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${api}/user/signup`, {
        email,
        username,
        password,
      });
      const user = response.data.user

      if(user){
        setUser(user)
        setShowVerifyDiv(true)
      }
      
    } catch (error) {
      if (error.response) {
        console.error('Server error:', error.response.data);
        setEmailMsg(error.response.data.email || '');
        setUsernameMsg(error.response.data.username || '');
        setPasswordMsg(error.response.data.password || '');
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error:', error.message);
      }
    }
  };


  return (
    <section className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSignUp}
        className="bg-white p-6 rounded-lg shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
          Sign Up
        </h2>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-600 font-medium mb-2"
          >
            Email:
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
            required
          />
          <p className="h-4 text-red-500 text-sm">{emailMsg}</p>
        </div>

        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-gray-600 font-medium mb-2"
          >
            Username:
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
            required
          />
          <p className="h-4 text-red-500 text-sm">{usernameMsg}</p>
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-600 font-medium mb-2"
          >
            Password:
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
            required
          />
          <p className="h-4 text-red-500 text-sm">{passwordMsg}</p>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out"
        >
          Sign Up
        </button>
      </form>
    </section>
  );
};

export default SignUp;
