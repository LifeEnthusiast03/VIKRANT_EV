
import React, { useState, useEffect } from 'react';
import { Mail, Loader2, AlertCircle } from 'lucide-react';
import { teamService } from '../../services/teamservice';

const TeamPage = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTeamData();
  }, []);

  const fetchTeamData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await teamService.getTeamMembers();
      
      if (result.success) {
        setTeamMembers(result.data);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('An unexpected error occurred while fetching team data');
      console.error('Error in fetchTeamData:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    fetchTeamData();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white pt-20">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="flex flex-col items-center justify-center min-h-[50vh]">
            <Loader2 className="w-12 h-12 animate-spin text-blue-500 mb-4" />
            <p className="text-xl text-gray-300">Loading team members...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white pt-20">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="flex flex-col items-center justify-center min-h-[50vh]">
            <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
            <p className="text-xl text-red-400 mb-4">Error loading team data</p>
            <p className="text-gray-300 mb-6 text-center max-w-md">{error}</p>
            <button
              onClick={handleRetry}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors duration-200"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white pt-20">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6">Meet Our Team</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Passionate engineers and designers working together to revolutionize electric mobility.
          </p>
          <p className="text-sm text-gray-400 mt-4">
            {teamMembers.length} team member{teamMembers.length !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="group bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            >
              <div className="flex items-start space-x-6">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full border-4 border-blue-500 object-cover flex-shrink-0 group-hover:ring-4 group-hover:ring-blue-400 transition-all duration-300"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/96x96/374151/9CA3AF?text=' + member.name.split(' ').map(n => n[0]).join('');
                  }}
                />
                <div className="flex-1 space-y-2">
                  <h3 className="text-2xl font-bold group-hover:text-white transition-colors duration-300">
                    {member.name}
                  </h3>
                  <p className="text-blue-400">{member.projectRole}</p>
                  <p className="text-sm text-gray-300 leading-snug">
                    <strong>College:</strong> {member.college}<br />
                    <strong>Department:</strong> {member.department}<br />
                    <strong>Specialization:</strong> {member.specialization}<br />
                    <strong>Phone:</strong> {member.phone}
                  </p>
                  <a
                    href={`mailto:${member.email}`}
                    className="inline-flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
                  >
                    <Mail size={16} />
                    <span className="text-sm">{member.email}</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {teamMembers.length === 0 && !loading && !error && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No team members found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamPage;