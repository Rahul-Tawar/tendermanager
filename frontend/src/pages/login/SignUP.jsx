import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SignUP = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUserName] = useState('');
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:3000/api/auth/register', {
        username,
        email,
        password,
      });
      console.log(response?.data);
    } catch (error) {
      setError(error.response.data.message);
      console.log('error fetching the data', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="flex flex-wrap w-full max-w-4xl bg-card rounded-lg shadow-sm">
        <section className="w-full md:w-1/2 p-6">
          <div className="text-center space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold">Sign Up</h2>
            <p className="text-muted-foreground">Create an account to get started</p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2 text-left">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Enter your name"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>
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
              type="submit" 
              variant="solid" 
              className="w-full bg-orange-400 hover:bg-orange-500"
            >
              Sign Up
            </Button>
            <div className="flex items-center justify-between">
              <Link 
                to="/login" 
                className="text-sm text-muted-foreground hover:underline"
              >
                Already have an account? Sign in
              </Link>
            </div>
          </form>
        </section>
        <section className="w-full md:w-1/2">
          <img src="/signup.png" alt="Sign Up" className="w-full h-full object-cover rounded-r-lg" />
        </section>
      </div>
    </div>
  );
};

export default SignUP;
