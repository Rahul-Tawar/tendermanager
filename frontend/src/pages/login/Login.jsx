import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from '@/store/slices/authSlice';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { isLoading, error, user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="flex flex-wrap w-full max-w-4xl bg-card rounded-lg shadow-sm">
        <section className="w-full md:w-1/2 pt-12 pb-6 px-6">
          <div className="text-center space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold">Login</h2>
            <p className="text-muted-foreground">Sign in to your account</p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2 text-left">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2 text-left relative">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 transform -translate-y-1/4"
              >
                {showPassword ? (
                  <span role="img" aria-label="Hide password">🙈</span>
                ) : (
                  <span role="img" aria-label="Show password">👁️</span>
                )}
              </button>
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <Button 
              variant="solid" 
              className="w-full bg-orange-400 hover:bg-orange-500"
              disabled={isLoading}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>
            <div className="flex items-center justify-between">
              <Link to="/signup" className="text-sm text-muted-foreground hover:underline">
                Don't have an account? Sign up
              </Link>
            </div>
          </form>
        </section>
        <section className="w-full md:w-1/2">
          <img src="/login.jpg" alt="Login" className="w-full h-full object-cover rounded-r-lg" />
        </section>
      </div>
    </div>
  );
};

export default Login;
