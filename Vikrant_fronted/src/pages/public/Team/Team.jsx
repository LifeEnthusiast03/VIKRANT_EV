import React, { useState, useEffect } from 'react';
import { Mail, Users, Wrench, Zap, Cpu, Globe, Star, Crown, Shield, Award, Target, Diamond } from 'lucide-react';
import { teamCategories,teamdata } from '../../../../constant/teamdata';

const TeamPage = () => {
  const [activeTeam, setActiveTeam] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Real team data from your JSON file

  const getPinShape = (pinStyle, categoryColor) => {
    const baseClasses = "absolute -top-3 -right-3 w-8 h-8 flex items-center justify-center text-xs font-bold text-white transform rotate-12 group-hover:rotate-0 transition-transform duration-300";
    
    switch(pinStyle) {
      case 'diamond':
        return (
          <div className={`${baseClasses} bg-gradient-to-br ${categoryColor} rounded-none transform rotate-45`}>
            <Diamond className="w-4 h-4 transform -rotate-45" />
          </div>
        );
      case 'hexagon':
        return (
          <div className={`${baseClasses} bg-gradient-to-br ${categoryColor}`} style={{clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'}}>
            <Wrench className="w-4 h-4" />
          </div>
        );
      case 'star':
        return (
          <div className={`${baseClasses} bg-gradient-to-br ${categoryColor}`} style={{clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'}}>
            <Zap className="w-3 h-3" />
          </div>
        );
      case 'circuit':
        return (
          <div className={`${baseClasses} bg-gradient-to-br ${categoryColor} rounded-lg border-2 border-dashed border-white/30`}>
            <Cpu className="w-4 h-4" />
          </div>
        );
      case 'shield':
        return (
          <div className={`${baseClasses} bg-gradient-to-br ${categoryColor}`} style={{clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)'}}>
            <Globe className="w-4 h-4" />
          </div>
        );
      default:
        return (
          <div className={`${baseClasses} bg-gradient-to-br ${categoryColor} rounded-full`}>
            <Users className="w-4 h-4" />
          </div>
        );
    }
  };

  const MemberCard = ({ member, index, categoryColor, pinStyle }) => {
    const [isAnimated, setIsAnimated] = useState(false);

    useEffect(() => {
      if (isVisible) {
        const timer = setTimeout(() => {
          setIsAnimated(true);
        }, index * 200);
        return () => clearTimeout(timer);
      }
    }, [isVisible, index, activeTeam]);

    // Parse skills from specialization
    const skills = member.specialization.split(',').map(skill => skill.trim());

    return (
      <div
        className={`group relative bg-gradient-to-br from-gray-800/40 to-gray-900/60 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50 hover:border-gray-600/70 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl overflow-hidden ${
          isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        {/* Pin Tag */}
        {getPinShape(pinStyle, categoryColor)}
        
        {/* Glow effect */}
        <div className={`absolute inset-0 bg-gradient-to-br ${categoryColor} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-3xl`} />
        
        <div className="relative z-10">
          {/* Member Photo & Basic Info */}
          <div className="flex items-start space-x-6 mb-6">
            <div className="relative">
              <img
                src={member.image}
                alt={member.name}
                className="w-24 h-24 rounded-full border-4 border-gray-600 object-cover flex-shrink-0 group-hover:ring-4 group-hover:ring-offset-2 group-hover:ring-offset-gray-900 transition-all duration-300 group-hover:scale-110"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/96x96/374151/9CA3AF?text=' + member.name.split(' ').map(n => n[0]).join('');
                }}
              />
            </div>
            
            <div className="flex-1">
              <h3 className="text-2xl font-bold group-hover:text-white transition-colors duration-300 mb-2">
                <span className={`bg-gradient-to-r ${categoryColor} bg-clip-text text-transparent`}>
                  {member.name}
                </span>
              </h3>
              <p className={`font-semibold mb-3 bg-gradient-to-r ${categoryColor} bg-clip-text text-transparent`}>
                {member.projectRole}
              </p>
            </div>
          </div>

          {/* Detailed Information */}
          <div className="space-y-3 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-gray-400 font-medium">College:</span>
                <span className="text-gray-200 ml-2 text-xs">{member.college}</span>
              </div>
              <div>
                <span className="text-gray-400 font-medium">Department:</span>
                <span className="text-gray-200 ml-2 text-xs">{member.department}</span>
              </div>
              <div className="md:col-span-2">
                <span className="text-gray-400 font-medium">Phone:</span>
                <span className="text-gray-200 ml-2">{member.phone}</span>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          
          <div className="mb-6">
            <h4 className="text-gray-400 font-medium mb-3 flex items-center">
              <Target className="w-4 h-4 mr-2" />
              Skills & Expertise
            </h4>
            <div className="flex flex-wrap gap-2">
              {skills.slice(0, 6).map((skill, idx) => (
                <span 
                  key={idx} 
                  className="px-3 py-1 text-xs bg-gray-800/60 rounded-full border border-gray-600 text-gray-400 hover:scale-105 hover:text-gray-300 hover:border-gray-500 transition-all duration-200"
                >
                  {skill}
                </span>
              ))}
              {skills.length > 6 && (
                <span className="px-3 py-1 text-xs bg-gray-700 rounded-full border border-gray-600 text-gray-400">
                  +{skills.length - 6} more
                </span>
              )}
            </div>
          </div>
          
          {/* Contact */}
          <div className="flex items-center justify-between">
            <a
              href={`mailto:${member.email}`}
              className="inline-flex items-center space-x-2 text-gray-300 hover:text-white transition-colors group-hover:scale-105 transform duration-300"
            >
              <Mail size={16} />
              <span className="text-sm">{member.email}</span>
            </a>
            
            <div className={`text-2xl font-bold bg-gradient-to-r ${categoryColor} bg-clip-text text-transparent`}>
              #{index + 1}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white pt-20 overflow-hidden">
      
      {/* Fixed Logo */}
      <div className="fixed top-4 left-4 z-50">
        <img 
          src="logo.jpg" 
          alt="Logo" 
          className="w-16 h-16 rounded-lg shadow-lg border-2 border-green-500/30 hover:border-green-400/60 transition-all duration-300"
        />
      </div>
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
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500/20 via-lime-500/20 to-yellow-500/20 rounded-full border border-green-500/40 backdrop-blur-sm mb-8">
            <Users className="w-5 h-5 mr-3 text-green-400" />
            <span className="text-sm font-bold bg-gradient-to-r from-green-400 to-lime-400 bg-clip-text text-transparent">
              Meet Our Amazing Team
            </span>
          </div>
          
          <h2 className="text-5xl lg:text-6xl font-black mb-6">
            <span className="bg-gradient-to-r from-white via-green-200 to-white bg-clip-text text-transparent">
              Vikrant EV
            </span>
            <span className="bg-gradient-to-r from-green-400 via-lime-400 to-yellow-400 bg-clip-text text-transparent"> Team</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Passionate engineers and designers working together to revolutionize electric mobility
          </p>
          <p className="text-sm text-green-400 mt-4 font-semibold">
            {teamCategories[activeTeam].members.length} member{teamCategories[activeTeam].members.length !== 1 ? 's' : ''} in {teamCategories[activeTeam].title}
          </p>
        </div>

        {/* Team Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {teamCategories.map((team, index) => (
            <button
              key={index}
              onClick={() => setActiveTeam(index)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full border transition-all duration-300 transform hover:scale-105 relative ${
                activeTeam === index
                  ? `bg-gradient-to-r ${team.color} text-white border-transparent shadow-lg`
                  : 'bg-gray-900/50 text-gray-400 border-gray-800 hover:border-gray-600 hover:text-gray-300'
              }`}
            >
              {team.icon}
              <span className="font-medium">{team.title}</span>
              <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                activeTeam === index ? 'bg-white/20' : 'bg-gray-700'
              }`}>
                {team.members.length}
              </span>
            </button>
          ))}
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {teamCategories[activeTeam].members.map((member, index) => (
            <MemberCard
              key={`${activeTeam}-${member.name}`}
              member={member}
              index={index}
              categoryColor={teamCategories[activeTeam].color}
              pinStyle={teamCategories[activeTeam].pinStyle}
            />
          ))}
        </div>

        {/* Bottom Summary */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500/10 to-lime-500/10 backdrop-blur-sm rounded-full px-6 py-3 border border-green-500/20">
            <Award className="w-5 h-5 text-green-400" />
            <span className="text-gray-300">United by innovation, driven by sustainability</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamPage;