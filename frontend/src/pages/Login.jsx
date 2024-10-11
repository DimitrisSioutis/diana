import React ,{useEffect, useRef, useState, useContext} from 'react'
import axios from 'axios'
import AuthContext from './AuthProvider';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Login = () => {

  const { auth ,setAuth} = useContext(AuthContext); // Use the AuthContext here
  const navigate = useNavigate()

  useEffect(() => {
    // Redirect to dashboard if user is already logged in
    if (auth) {
        navigate('/admin');
    }
  }, [auth]);


    const api = import.meta.env.VITE_API_URL;

    const usernameRef = useRef()
    const passwordRef = useRef()

    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')

    const [usernameMsg,setUsernameMsg] = useState('')
    const [passwordMsg,setPasswordMsg] = useState('')

    const handleUsername = () =>{
        setUsername(usernameRef.current.value)
    }

    const handlePassword= () =>{
        setPassword(passwordRef.current.value)
    }

    const handleLogin = async (e) => {
      e.preventDefault();
  
      try {
          const response = await axios.post(`${api}/user/login`, {
              username: username,
              password: password
          }, { withCredentials: true });
  
          if (response.status === 200) {
              // Update auth state with response data
              setAuth({
                  accessToken: response.data.accessToken,
                  user: response.data.user
              });
  
              // Redirect to dashboard
              navigate('/admin');
          }
      } catch (error) {
          console.error('Login error:', error.response ? error.response.data : error.message);
      }
  };
  
    function handleInputs(ref , string, setMsg){
        ref.current.style.border = '2px solid rgba(0,0,0,0.1)'
        setMsg('')
        if(string.length>0 && string.length<5){
            ref.current.style.border = '2px solid red'
            setMsg(ref.current.name + ' should be at least 5 characters')
        }
        if(string.length>=5){
            ref.current.style.border = '2px solid green'
        }
    }

    useEffect(()=>{
        usernameRef.current.focus()
    },[])

    useEffect(()=>{
        handleInputs(usernameRef,username,setUsernameMsg)
        handleInputs(passwordRef,password,setPasswordMsg)
    },[username,password])

    return (
        <section className="flex items-center justify-center h-[100svh] bg-gray-100">
          <form
            onSubmit={handleLogin}
            className="bg-white p-6 rounded-lg shadow-lg w-96"
          >
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
              Login
            </h2>
    
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-gray-600 font-medium mb-2"
              >
                Username:
              </label>
              <input
                ref={usernameRef}
                type="text"
                name="username"
                onChange={handleUsername}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none "
                required
              />
              <p className='h-4 text-red-500 text-sm '>{usernameMsg}</p>
            </div>
    
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-600 font-medium mb-2"
              >
                Password:
              </label>
              <input
                ref={passwordRef}
                type="password"
                name="password"
                onChange={handlePassword}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none "
                required
              />
              <p className='h-4'>{passwordMsg}</p>
            </div>
    
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out"
            >
              Login
            </button>
          </form>
        </section>
      );
}

export default Login