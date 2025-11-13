import React, { useState, useEffect } from 'react';
import {
  DollarSign,
  TrendingUp,
  PieChart,
  Shield,
  ArrowRight,
  Menu,
  X,
  Check,
  Sparkles
} from 'lucide-react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Feed = () => {
  const navigate = useNavigate();
  const {user} = useSelector((state) => state.auth);
  // console.log("--->",user);

  const [scrolled, setScrolled] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white overflow-hidden">
      {/* Animated Background Elements */}
      

      {/* Navigation */}
      <Navbar />


      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center space-x-2 bg-gray-800/20 px-4 py-2 rounded-full border border-gray-700/30">
              <Sparkles className="w-4 h-4 text-gray-400" />
              <span className="text-sm">Manage. Control. Empower Access.</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight">
              Build Your Admin Panel
              <br />
              <span className="bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 bg-clip-text text-transparent">
                With Roles & Permissions
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
              Create a secure and scalable admin dashboard to manage users, assign roles, and control permissions with ease — all from a single interface.
            </p>


            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {(user?.role === 'Admin' || user?.role === 'Author' || user?.role === 'Editor') ? (
                <button
                  onClick={() => navigate('/viewposts')}
                  className="px-6 py-2 bg-gradient-to-r from-gray-700 to-gray-800 rounded-lg hover:shadow-lg hover:shadow-gray-800/50 transition-all transform hover:scale-105"
                >
                  View Posts
                </button>
              ) : (
                <button
                  onClick={() => navigate('/signin')}
                  className="px-6 py-2 bg-gradient-to-r from-gray-700 to-gray-800 rounded-lg hover:shadow-lg hover:shadow-gray-800/50 transition-all transform hover:scale-105"
                >
                  Get Started
                </button>
              )}
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Feed;