import React, { useState, useEffect } from "react";
import { Battery, Zap, Shield, Cpu, Wrench, Globe, Leaf, Clock, Award, Star, Target, TestTube, Settings, Monitor, Smartphone, Wifi, Lock } from 'lucide-react';

const ProjectPage = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const projectCategories = [
    {
      title: "Technical Specifications",
      icon: <Cpu className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10",
      items: [
        { 
          name: "Motor Power", 
          value: "750W Brushless", 
          icon: <Zap className="w-6 h-6" />, 
          description: "High-efficiency brushless motor for optimal performance",
          level: 95,
          color: "text-blue-400"
        },
        { 
          name: "Battery Capacity", 
          value: "48V 15Ah Lithium-ion", 
          icon: <Battery className="w-6 h-6" />, 
          description: "Long-lasting lithium-ion battery technology",
          level: 90,
          color: "text-green-400"
        },
        { 
          name: "Max Range", 
          value: "80+ Miles", 
          icon: <Target className="w-6 h-6" />, 
          description: "Extended range for long-distance travel",
          level: 85,
          color: "text-purple-400"
        },
        { 
          name: "Top Speed", 
          value: "35 MPH", 
          icon: <Monitor className="w-6 h-6" />, 
          description: "High-speed performance for urban commuting",
          level: 88,
          color: "text-yellow-400"
        },
        { 
          name: "Frame Material", 
          value: "Carbon Fiber", 
          icon: <Shield className="w-6 h-6" />, 
          description: "Lightweight yet durable carbon fiber construction",
          level: 92,
          color: "text-red-400"
        },
        { 
          name: "Weight", 
          value: "45 lbs", 
          icon: <Wrench className="w-6 h-6" />, 
          description: "Optimized weight for easy handling",
          level: 80,
          color: "text-cyan-400"
        }
      ]
    },
    {
      title: "Smart Features",
      icon: <Smartphone className="w-6 h-6" />,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-500/10",
      items: [
        { 
          name: "GPS Tracking", 
          value: "Real-time Location", 
          icon: <Globe className="w-6 h-6" />, 
          description: "Advanced GPS tracking with anti-theft alarm system",
          level: 95,
          color: "text-green-400"
        },
        { 
          name: "Mobile App", 
          value: "iOS & Android", 
          icon: <Smartphone className="w-6 h-6" />, 
          description: "Comprehensive mobile app for ride statistics and control",
          level: 90,
          color: "text-blue-400"
        },
        { 
          name: "Riding Modes", 
          value: "Eco, Normal, Sport", 
          icon: <Settings className="w-6 h-6" />, 
          description: "Multiple riding modes for different scenarios",
          level: 88,
          color: "text-purple-400"
        },
        { 
          name: "LED Integration", 
          value: "Smart Lighting", 
          icon: <Zap className="w-6 h-6" />, 
          description: "Intelligent LED headlight and taillight system",
          level: 85,
          color: "text-yellow-400"
        },
        { 
          name: "Regenerative Braking", 
          value: "Energy Recovery", 
          icon: <Battery className="w-6 h-6" />, 
          description: "Advanced regenerative braking for energy efficiency",
          level: 87,
          color: "text-green-400"
        },
        { 
          name: "Wireless Connectivity", 
          value: "Bluetooth 5.0", 
          icon: <Wifi className="w-6 h-6" />, 
          description: "Seamless wireless connectivity and updates",
          level: 82,
          color: "text-cyan-400"
        }
      ]
    },
    {
      title: "Sustainability Focus",
      icon: <Leaf className="w-6 h-6" />,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-500/10",
      items: [
        { 
          name: "Recyclable Frame", 
          value: "100% Aluminum", 
          icon: <Leaf className="w-6 h-6" />, 
          description: "Completely recyclable aluminum frame construction",
          level: 100,
          color: "text-green-400"
        },
        { 
          name: "Eco Battery", 
          value: "Green Technology", 
          icon: <Battery className="w-6 h-6" />, 
          description: "Environmentally friendly battery technology",
          level: 95,
          color: "text-emerald-400"
        },
        { 
          name: "Carbon Neutral", 
          value: "Zero Emissions", 
          icon: <Globe className="w-6 h-6" />, 
          description: "Carbon-neutral shipping and manufacturing",
          level: 90,
          color: "text-green-500"
        },
        { 
          name: "CO2 Reduction", 
          value: "90% vs Cars", 
          icon: <Shield className="w-6 h-6" />, 
          description: "Significant reduction in CO2 emissions compared to cars",
          level: 90,
          color: "text-lime-400"
        }
      ]
    },
    {
      title: "Development Timeline",
      icon: <Clock className="w-6 h-6" />,
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-500/10",
      items: [
        { 
          name: "Concept Design", 
          value: "Q1 2024", 
          icon: <TestTube className="w-6 h-6" />, 
          description: "Initial prototyping and design conceptualization",
          level: 100,
          color: "text-green-400"
        },
        { 
          name: "Engineering", 
          value: "Q2 2024", 
          icon: <Wrench className="w-6 h-6" />, 
          description: "Motor and battery system optimization",
          level: 100,
          color: "text-green-400"
        },
        { 
          name: "Testing Phase", 
          value: "Q3 2024", 
          icon: <Monitor className="w-6 h-6" />, 
          description: "Real-world performance validation and testing",
          level: 100,
          color: "text-green-400"
        },
        { 
          name: "Production", 
          value: "Q4 2024", 
          icon: <Settings className="w-6 h-6" />, 
          description: "Manufacturing setup and quality control",
          level: 80,
          color: "text-yellow-400"
        },
        { 
          name: "Market Launch", 
          value: "Q1 2025", 
          icon: <Star className="w-6 h-6" />, 
          description: "Official product launch and market release",
          level: 60,
          color: "text-blue-400"
        }
      ]
    },
    {
      title: "Safety & Security",
      icon: <Lock className="w-6 h-6" />,
      color: "from-red-500 to-pink-500",
      bgColor: "bg-red-500/10",
      items: [
        { 
          name: "Anti-theft System", 
          value: "Advanced Security", 
          icon: <Lock className="w-6 h-6" />, 
          description: "Multi-layer anti-theft protection system",
          level: 95,
          color: "text-red-400"
        },
        { 
          name: "Emergency Braking", 
          value: "ABS Technology", 
          icon: <Shield className="w-6 h-6" />, 
          description: "Advanced braking system for emergency situations",
          level: 92,
          color: "text-yellow-400"
        },
        { 
          name: "LED Visibility", 
          value: "360° Lighting", 
          icon: <Zap className="w-6 h-6" />, 
          description: "Complete visibility with LED lighting system",
          level: 88,
          color: "text-blue-400"
        },
        { 
          name: "Impact Protection", 
          value: "Reinforced Frame", 
          icon: <Shield className="w-6 h-6" />, 
          description: "Enhanced frame protection for rider safety",
          level: 90,
          color: "text-green-400"
        }
      ]
    },
    {
      title: "Performance Metrics",
      icon: <Award className="w-6 h-6" />,
      color: "from-indigo-500 to-blue-500",
      bgColor: "bg-indigo-500/10",
      items: [
        { 
          name: "Acceleration", 
          value: "0-25 MPH in 6s", 
          icon: <Zap className="w-6 h-6" />, 
          description: "Rapid acceleration for urban environments",
          level: 90,
          color: "text-yellow-400"
        },
        { 
          name: "Hill Climbing", 
          value: "25° Grade", 
          icon: <Target className="w-6 h-6" />, 
          description: "Excellent hill climbing capability",
          level: 85,
          color: "text-green-400"
        },
        { 
          name: "Battery Life", 
          value: "1000+ Cycles", 
          icon: <Battery className="w-6 h-6" />, 
          description: "Long-lasting battery with extended lifecycle",
          level: 95,
          color: "text-blue-400"
        },
        { 
          name: "Efficiency", 
          value: "95% Energy", 
          icon: <Leaf className="w-6 h-6" />, 
          description: "High energy efficiency rating",
          level: 95,
          color: "text-green-400"
        }
      ]
    }
  ];

  const getItemLevel = (level) => {
    if (level >= 95) return { text: "Excellent", icon: <Award className="w-4 h-4" />, color: "text-yellow-400" };
    if (level >= 85) return { text: "Advanced", icon: <Star className="w-4 h-4" />, color: "text-blue-400" };
    if (level >= 70) return { text: "Good", icon: <Target className="w-4 h-4" />, color: "text-green-400" };
    return { text: "In Progress", icon: <Clock className="w-4 h-4" />, color: "text-gray-400" };
  };

  const ProjectCard = ({ item, index, categoryColor }) => {
    const [isAnimated, setIsAnimated] = useState(false);
    const itemLevel = getItemLevel(item.level);

    useEffect(() => {
      if (isVisible) {
        const timer = setTimeout(() => {
          setIsAnimated(true);
        }, index * 150);
        return () => clearTimeout(timer);
      }
    }, [isVisible, index, activeCategory]);

    return (
      <div
        className={`group relative bg-gradient-to-br from-gray-800/40 to-gray-900/60 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50 hover:border-gray-600/70 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 ${
          isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        {/* Glow effect */}
        <div className={`absolute inset-0 bg-gradient-to-br ${categoryColor} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-3xl`} />
        
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className={`text-gray-400 group-hover:${item.color} transition-colors`}>
                {item.icon}
              </div>
              <div>
                <h4 className="text-xl font-bold text-white group-hover:text-gray-100 transition-colors">
                  {item.name}
                </h4>
                <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                  {item.description}
                </p>
              </div>
            </div>
            
            {/* Level Badge */}
            <div className={`flex items-center space-x-1 px-3 py-2 rounded-full bg-gray-800/50 border border-gray-700 ${itemLevel.color}`}>
              {itemLevel.icon}
              <span className="text-xs font-medium">{itemLevel.text}</span>
            </div>
          </div>

          {/* Value Display */}
          <div className="mb-6">
            <div className={`text-3xl font-black bg-gradient-to-r ${categoryColor} bg-clip-text text-transparent mb-2`}>
              {item.value}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="relative">
            <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
              <span>Performance</span>
              <span>{item.level}%</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2">
              <div 
                className={`bg-gradient-to-r ${categoryColor} h-2 rounded-full transition-all duration-1000 ease-out`}
                style={{ width: isAnimated ? `${item.level}%` : '0%' }}
              />
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
            background: `radial-gradient(circle at 50% 50%, 
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
        <div className="absolute top-1/6 left-1/5 w-2 h-2 bg-green-400 rounded-full animate-ping" style={{ animationDelay: '0s' }} />
        <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-lime-400 rounded-full animate-ping" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/3 right-2/3 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-ping" style={{ animationDelay: '4s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500/20 via-lime-500/20 to-yellow-500/20 rounded-full border border-green-500/40 backdrop-blur-sm mb-8">
            <span className="text-sm font-bold bg-gradient-to-r from-green-400 to-lime-400 bg-clip-text text-transparent">
              Innovation In Motion
            </span>
          </div>
          
          <h2 className="text-5xl lg:text-6xl font-black mb-6">
            <span className="bg-gradient-to-r from-green-400 via-lime-400 to-yellow-400 bg-clip-text text-transparent"> Project Details</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover the cutting-edge technology and innovative features that make our electric bike extraordinary
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {projectCategories.map((category, index) => (
            <button
              key={index}
              onClick={() => setActiveCategory(index)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full border transition-all duration-300 transform hover:scale-105 ${
                activeCategory === index
                  ? `bg-gradient-to-r ${category.color} text-white border-transparent shadow-lg`
                  : 'bg-gray-900/50 text-gray-400 border-gray-800 hover:border-gray-600 hover:text-gray-300'
              }`}
            >
              {category.icon}
              <span className="font-medium">{category.title}</span>
            </button>
          ))}
        </div>

        {/* Project Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectCategories[activeCategory].items.map((item, index) => (
            <ProjectCard
              key={`${activeCategory}-${item.name}`}
              item={item}
              index={index}
              categoryColor={projectCategories[activeCategory].color}
            />
          ))}
        </div>

        {/* Bottom Summary */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500/10 to-lime-500/10 backdrop-blur-sm rounded-full px-6 py-3 border border-green-500/20">
            <Award className="w-5 h-5 text-green-400" />
            <span className="text-gray-300">Revolutionary technology for sustainable mobility</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;