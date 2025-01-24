import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { UserPlus, Users } from 'lucide-react';
import Signup from './components/Signup';
import Members from './components/Members';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between h-16">
              <div className="flex space-x-8">
                <Link
                  to="/signup"
                  className="inline-flex items-center px-1 pt-1 text-gray-500 hover:text-gray-700"
                >
                  <UserPlus className="w-5 h-5 mr-2" />
                  Signup
                </Link>
                <Link
                  to="/members"
                  className="inline-flex items-center px-1 pt-1 text-gray-500 hover:text-gray-700"
                >
                  <Users className="w-5 h-5 mr-2" />
                  Members
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/members" element={<Members />} />
            <Route path="/" element={<Signup />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;