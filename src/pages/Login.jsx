import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, ShieldAlert } from 'lucide-react';

export default function Login({ login }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('VESIT Email is required.');
      return;
    }
    if (!email.endsWith('@ves.ac.in')) {
      setError('Please use your official @ves.ac.in email address.');
      return;
    }
    if (!password) {
      setError('Password is required.');
      return;
    }
    if (password.length < 4) {
      setError('Password must be at least 4 characters.');
      return;
    }

    // Success login
    login(email);
    navigate('/dashboard');
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4 py-12 bg-bg-ves">
      <div className="w-full max-w-md bg-surface border border-sand p-8 shadow-sm">
        
        {/* Header branding */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block mb-3">
            <span className="font-serif text-3xl font-black tracking-tight text-olive select-none">
              VES<span className="text-terracotta">Local</span>
            </span>
          </Link>
          <h2 className="font-serif text-xl font-bold text-dark mt-2">Welcome Back</h2>
          <p className="text-xs text-muted mt-1">
            Sign in to access opportunities & campus businesses.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-terracotta/10 border border-terracotta/20 text-terracotta flex items-start gap-2 text-xs">
            <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
            <div className="text-left font-medium">{error}</div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 text-left">
          
          {/* Email input */}
          <div>
            <label className="block text-xs font-bold text-dark uppercase tracking-wider mb-1.5">
              VESIT Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted pointer-events-none">
                <Mail className="w-4 h-4" />
              </span>
              <input
                type="text"
                placeholder="username@ves.ac.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-sm bg-bg-ves border border-sand focus:border-olive focus:outline-none transition-all placeholder:text-muted/60"
              />
            </div>
          </div>

          {/* Password input */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-xs font-bold text-dark uppercase tracking-wider">
                Password
              </label>
              <a 
                href="#forgot" 
                onClick={(e) => { e.preventDefault(); alert("Mock password reset link clicked! For this demo, try typing a valid @ves.ac.in email and any 4+ char password."); }}
                className="text-[10px] font-bold text-olive hover:text-terracotta transition-colors"
              >
                Forgot Password?
              </a>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted pointer-events-none">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-sm bg-bg-ves border border-sand focus:border-olive focus:outline-none transition-all placeholder:text-muted/60"
              />
            </div>
          </div>

          {/* Remember me option */}
          <div className="flex items-center">
            <input
              id="remember-me"
              type="checkbox"
              className="h-4 w-4 text-olive border-sand bg-bg-ves focus:ring-0 focus:ring-offset-0 focus:outline-none"
            />
            <label htmlFor="remember-me" className="ml-2 block text-xs text-muted cursor-pointer select-none">
              Remember me on this browser
            </label>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full py-3 bg-olive text-surface hover:bg-olive/90 font-semibold text-sm transition-all duration-150 flex items-center justify-center gap-2 border border-olive mt-6"
          >
            <span>Log In</span>
            <Lock className="w-3.5 h-3.5" />
          </button>

        </form>

        <div className="h-px bg-sand w-full my-6"></div>

        <div className="text-center text-xs text-muted">
          New to VESLocal?{' '}
          <Link to="/register" className="font-bold text-olive hover:text-terracotta transition-colors">
            Register your account
          </Link>
        </div>

      </div>
    </div>
  );
}
