import React, { useEffect } from 'react';
import { BriefcaseIcon, MenuIcon } from './iconComponents/Icons';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser, setToken } from '@/store/slices/authSlice';

const Nav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  
  
  

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      dispatch(setToken(storedToken));
    }
  }, [dispatch]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(logoutUser());
    navigate('/login');
  };

  return (
    <header className="bg-background px-4 lg:px-6 py-4 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2">
        <BriefcaseIcon className="w-6 h-6 text-primary" />
        <span className="text-xl font-bold">Tender Manager</span>
      </Link>
      <div className="flex items-center gap-4">
        {!token ? (
          <Button onClick={() => navigate('/login')} variant="outline" size="default">
            Log In
          </Button>
        ) : (
          <Button onClick={handleLogout} variant="outline" size="default">
            Log Out
          </Button>
        )}
        <div className="md:hidden">
          <Button variant="outline" size="icon">
            <MenuIcon className="w-6 h-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Nav;
