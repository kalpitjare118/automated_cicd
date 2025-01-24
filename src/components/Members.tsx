import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { User } from 'lucide-react';

interface Member {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
}

function Members() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/members');
        setMembers(response.data);
      } catch (err) {
        setError('Failed to fetch members');
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Members List</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {members.map((member) => (
          <div key={member._id} className="px-6 py-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <User className="h-8 w-8 text-gray-400" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">{member.name}</h3>
                <div className="text-sm text-gray-500">
                  <p>{member.email}</p>
                  <p>Joined: {new Date(member.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Members;