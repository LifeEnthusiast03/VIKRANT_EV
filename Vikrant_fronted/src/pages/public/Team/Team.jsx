
import React, { useState, useEffect } from 'react';
import { Mail } from 'lucide-react';
import { teamdata } from '../../../../constant/teamdata.js';

const TeamPage = () => {
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    // Load team data from local teamdata.js file
    setTeamMembers(teamdata);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white pt-20 overflow-hidden">
      {/* Enhanced Dynamic Background */}
      <div className="fixed inset-0 opacity-30 pointer-events-none">
        <div 
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 30% 40%, 
              rgba(34, 197, 94, 0.15) 0%, 
              rgba(132, 204, 22, 0.1) 30%,
              rgba(234, 179, 8, 0.08) 60%, 
              transparent 100%)`
          }}
        />
      </div>
      
      {/* Animated Grid Background */}
      <div className="fixed inset-0 opacity-10">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(34, 197, 94, 0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34, 197, 94, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* Floating particles */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-green-400 rounded-full animate-ping" style={{ animationDelay: '0s' }} />
        <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-lime-400 rounded-full animate-ping" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-ping" style={{ animationDelay: '4s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500/20 via-lime-500/20 to-yellow-500/20 rounded-full border border-green-500/40 backdrop-blur-sm mb-8">
            <span className="text-sm font-bold bg-gradient-to-r from-green-400 to-lime-400 bg-clip-text text-transparent">
              Meet Our Amazing Team
            </span>
          </div>
          
          <h2 className="text-5xl lg:text-6xl font-black mb-6">
            <span className="bg-gradient-to-r from-white via-green-200 to-white bg-clip-text text-transparent">
              Our
            </span>
            <span className="bg-gradient-to-r from-green-400 via-lime-400 to-yellow-400 bg-clip-text text-transparent"> Team</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Passionate engineers and designers working together to revolutionize electric mobility.
          </p>
          <p className="text-sm text-green-400 mt-4 font-semibold">
            {teamMembers.length} team member{teamMembers.length !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="group bg-gradient-to-br from-gray-800/40 to-gray-900/60 backdrop-blur-xl rounded-3xl p-6 border border-gray-700/50 hover:border-green-500/70 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-green-500/20 relative overflow-hidden"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 via-lime-400/10 to-yellow-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10 flex items-start space-x-6">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full border-4 border-green-500 object-cover flex-shrink-0 group-hover:ring-4 group-hover:ring-lime-400 transition-all duration-300 group-hover:scale-110"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/96x96/374151/9CA3AF?text=' + member.name.split(' ').map(n => n[0]).join('');
                  }}
                />
                <div className="flex-1 space-y-2">
                  <h3 className="text-2xl font-bold group-hover:text-white transition-colors duration-300 bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
                    {member.name}
                  </h3>
                  <p className="text-green-400 font-semibold">{member.projectRole}</p>
                  <p className="text-sm text-gray-300 leading-snug">
                    <strong className="text-lime-400">College:</strong> {member.college}<br />
                    <strong className="text-lime-400">Department:</strong> {member.department}<br />
                    <strong className="text-lime-400">Specialization:</strong> {member.specialization}<br />
                    <strong className="text-lime-400">Phone:</strong> {member.phone}
                  </p>
                  <a
                    href={`mailto:${member.email}`}
                    className="inline-flex items-center space-x-2 text-gray-300 hover:text-green-400 transition-colors group-hover:scale-105 transform duration-300"
                  >
                    <Mail size={16} />
                    <span className="text-sm">{member.email}</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamPage;