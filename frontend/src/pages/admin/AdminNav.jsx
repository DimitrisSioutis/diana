import React ,{useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import AuthContext from '../AuthProvider';

const AdminNav = () => {

    const api = import.meta.env.VITE_API_URL;
    const { auth, setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post(`${api}/user/logout`, {}, { withCredentials: true });
            setAuth(null);
            navigate('/login');
        } catch (error) {
            console.error("Logout failed", error);
        }
    };
    return (
        <>
        
            <div className='h-8 bg-slate-300'><button onClick={handleLogout}>Logout</button></div>
            <nav className='w-64 h-[100svh] bg-slate-300'>
                <ul>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </nav>
        </>
    )
}

export default AdminNav