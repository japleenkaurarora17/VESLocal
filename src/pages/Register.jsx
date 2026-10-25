import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, BookOpen, GraduationCap, ShieldAlert, Loader2 } from 'lucide-react';
import { authAPI } from '../services/api';

export default function Register({ register }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');
  const [year, setYear] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const departments = [
    "Computer Engineering",
    "Information Technology",
    "Electronics & Telecommunication",
    "Artificial Intelligence & Data Science",
    "Instrumentation Engineering"
  ];

  const years = [
    "First Year",
    "Second Year",
    "Third Year",
    "Fourth Year"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name) {
      setError('Full Name is required.');
      return;
    }
    if (!email) {
      setError('VESIT Email is required.');
      return;
    }
    if (!email.endsWith('@ves.ac.in')) {
      setError('Registration requires a valid @ves.ac.in campus email.');
      return;
    }
    if (!department) {
      setError('Please select your academic department.');
      return;
    }
    if (!year) {
      setError('Please select your academic year.');
      return;
    }
    if (!password) {
      setError('Password is required.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      const res = await authAPI.register({
        name,
        email,
        password,
        department,
        year
      });

      if (res && res.token) {
        register(res.user, res.token);
      } else {
        register({ name, email, department, year, password });
      }
      navigate('/dashboard');
    } catch (err) {
      if (err.isOffline) {
        console.warn('Backend offline, proceeding in local demo mode.');
        register({ name, email, department, year, password });
        navigate('/dashboard');
      } else {
        setError(err.message || 'Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[90vh] px-4 py-12 bg-bg-ves">
      <div className="w-full max-w-lg bg-surface border border-sand p-8 shadow-sm">
        
        {/* Header Branding */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block mb-3">
            <span className="font-serif text-3xl font-black tracking-tight text-olive select-none">
              VES<span className="text-terracotta">Local</span>
            </span>
          </Link>
          <h2 className="font-serif text-xl font-bold text-dark mt-2">Create Student Account</h2>
          <p className="text-xs text-muted mt-1">
            Build your campus identity and start collaborating.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-terracotta/10 border border-terracotta/20 text-terracotta flex items-start gap-2 text-xs">
            <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
            <div className="text-left font-medium">{error}</div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          
          {/* Name Input */}
          <div>
            <label className="block text-xs font-bold text-dark uppercase tracking-wider mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted pointer-events-none">
                <User className="w-4 h-4" />
              </span>
              <input
                type="text"
                placeholder="Japleen Kaur"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm bg-bg-ves border border-sand focus:border-olive focus:outline-none transition-all placeholder:text-muted/60"
              />
            </div>
          </div>

          {/* Email Input */}
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
                placeholder="firstname.lastname@ves.ac.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm bg-bg-ves border border-sand focus:border-olive focus:outline-none transition-all placeholder:text-muted/60"
              />
            </div>
          </div>

          {/* Academic Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Department Selection */}
            <div>
              <label className="block text-xs font-bold text-dark uppercase tracking-wider mb-1.5">
                Department
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted pointer-events-none">
                  <BookOpen className="w-4 h-4" />
                </span>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-sm bg-bg-ves border border-sand focus:border-olive focus:outline-none transition-all cursor-pointer text-dark"
                >
                  <option value="">Select Department</option>
                  {departments.map((dept, idx) => (
                    <option key={idx} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Year Selection */}
            <div>
              <label className="block text-xs font-bold text-dark uppercase tracking-wider mb-1.5">
                Year of Study
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted pointer-events-none">
                  <GraduationCap className="w-4 h-4" />
                </span>
                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-sm bg-bg-ves border border-sand focus:border-olive focus:outline-none transition-all cursor-pointer text-dark"
                >
                  <option value="">Select Year</option>
                  {years.map((y, idx) => (
                    <option key={idx} value={y}>{y}</option>
                  ))}
                </select>
              </div>
            </div>

          </div>

          {/* Passwords Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-dark uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted pointer-events-none">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-sm bg-bg-ves border border-sand focus:border-olive focus:outline-none transition-all placeholder:text-muted/60"
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-bold text-dark uppercase tracking-wider mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted pointer-events-none">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-sm bg-bg-ves border border-sand focus:border-olive focus:outline-none transition-all placeholder:text-muted/60"
                />
              </div>
            </div>

          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-olive text-surface hover:bg-olive/90 font-semibold text-sm transition-all duration-150 flex items-center justify-center gap-2 border border-olive mt-6 disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Creating Account...</span>
              </>
            ) : (
              <>
                <span>Register & Login</span>
                <User className="w-3.5 h-3.5" />
              </>
            )}
          </button>

        </form>

        <div className="h-px bg-sand w-full my-6"></div>

        <div className="text-center text-xs text-muted">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-olive hover:text-terracotta transition-colors">
            Sign In
          </Link>
        </div>

      </div>
    </div>
  );
}
