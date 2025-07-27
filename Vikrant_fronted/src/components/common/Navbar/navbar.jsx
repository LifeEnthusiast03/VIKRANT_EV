// import React, { useState, useEffect } from 'react';
// import { Users, FileText, Phone, Wrench, Activity, Thermometer, Satellite, MapPin, Clock, Settings, Bell } from 'lucide-react';

// const Navbar = ({ currentSection, setCurrentSection }) => {
//   const [bikeData, setBikeData] = useState({
//     velocity: 19.4,
//     batteryTemp: 35.0,
//     gpsSignal: 8.2,
//     latitude: 40.711364,
//     longitude: -74.003423,
//     accuracy: 8.2,
//     lastUpdate: '8:49:58 PM'
//   });

//   const [isOnline, setIsOnline] = useState(true);
//   const [activeTab, setActiveTab] = useState('DASHBOARD');

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setBikeData(prev => ({
//         ...prev,
//         velocity: Math.max(0, prev.velocity + (Math.random() - 0.5) * 2),
//         batteryTemp: Math.max(20, Math.min(50, prev.batteryTemp + (Math.random() - 0.5) * 1)),
//         gpsSignal: Math.max(0, Math.min(10, prev.gpsSignal + (Math.random() - 0.5) * 0.5)),
//         lastUpdate: new Date().toLocaleTimeString()
//       }));
//     }, 2000);

//     // Render dashboard if currentSection is 'dashboard'
//   if (currentSection === 'dashboard') {
//     return <Dashboard />;
//   }

//   return () => clearInterval(interval);
//   }, []);

//   const getVelocityStatus = (velocity) => {
//     if (velocity < 10) return { status: 'LOW', color: 'text-yellow-400' };
//     if (velocity > 40) return { status: 'HIGH', color: 'text-red-400' };
//     return { status: 'NORMAL', color: 'text-green-400' };
//   };

//   const getBatteryTempStatus = (temp) => {
//     if (temp < 25) return { status: 'COOL', color: 'text-lime-400' };
//     if (temp > 45) return { status: 'HOT', color: 'text-red-400' };
//     return { status: 'NORMAL', color: 'text-green-400' };
//   };

//   const getGpsSignalStatus = (signal) => {
//     if (signal < 3) return { status: 'WEAK SIGNAL', color: 'text-red-400' };
//     if (signal > 7) return { status: 'STRONG SIGNAL', color: 'text-green-400' };
//     return { status: 'MODERATE', color: 'text-yellow-400' };
//   };

//   const velocityStatus = getVelocityStatus(bikeData.velocity);
//   const batteryStatus = getBatteryTempStatus(bikeData.batteryTemp);
//   const gpsStatus = getGpsSignalStatus(bikeData.gpsSignal);

//   // Dashboard Component
//   const Dashboard = () => (
//     <div className="min-h-screen bg-gradient-to-br from-green-950 via-gray-950 to-green-900 text-white p-6 overflow-hidden">
//       {/* Enhanced Dynamic Background */}
//       <div className="fixed inset-0 opacity-40 pointer-events-none">
//         <div 
//           className="absolute inset-0"
//           style={{
//             background: `radial-gradient(circle at 20% 80%, 
//               rgba(34, 197, 94, 0.25) 0%, 
//               rgba(20, 83, 45, 0.2) 30%,
//               rgba(5, 46, 22, 0.15) 60%, 
//               rgba(0, 0, 0, 0.8) 100%)`
//           }}
//         />
//       </div>
      
//       {/* Animated Grid Background */}
//       <div className="fixed inset-0 opacity-15">
//         <div 
//           className="absolute inset-0"
//           style={{
//             backgroundImage: `
//               linear-gradient(rgba(34, 197, 94, 0.3) 1px, transparent 1px),
//               linear-gradient(90deg, rgba(34, 197, 94, 0.3) 1px, transparent 1px)
//             `,
//             backgroundSize: '60px 60px'
//           }}
//         />
//       </div>

//       {/* Floating particles */}
//       <div className="fixed inset-0 pointer-events-none">
//         <div className="absolute top-1/4 left-1/6 w-2 h-2 bg-green-400 rounded-full animate-ping" style={{ animationDelay: '0s' }} />
//         <div className="absolute top-2/3 right-1/5 w-1 h-1 bg-emerald-400 rounded-full animate-ping" style={{ animationDelay: '2s' }} />
//         <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-green-300 rounded-full animate-ping" style={{ animationDelay: '4s' }} />
//       </div>

//       <div className="relative z-10">
//         <div className="flex items-center justify-between mb-8">
//           <div className="flex items-center space-x-3">
//             <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center shadow-lg shadow-green-500/50 border border-green-500/30">
//               <Activity className="w-6 h-6 text-white" />
//             </div>
//             <div>
//               <h1 className="text-2xl font-bold bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text text-transparent">BIKE MONITOR</h1>
//               <p className="text-green-400 text-sm">REAL-TIME TELEMETRY</p>
//             </div>
//           </div>
          
//           <div className="flex items-center space-x-4">
//             <div className="flex items-center space-x-2">
//               <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-400' : 'bg-red-500'} animate-pulse`}></div>
//               <span className="text-green-300 text-sm font-medium">
//                 {isOnline ? 'ONLINE' : 'OFFLINE'}
//               </span>
//             </div>
//             <Bell className="w-5 h-5 text-green-400 hover:text-green-300 cursor-pointer transition-colors" />
//           </div>
//         </div>

//         <div className="flex space-x-1 mb-8">
//           {['DASHBOARD', 'GPS MAP', 'SETTINGS'].map((tab) => (
//             <button
//               key={tab}
//               onClick={() => setActiveTab(tab)}
//               className={`px-6 py-3 text-sm font-medium transition-all duration-300 rounded-t-lg ${
//                 activeTab === tab
//                   ? 'bg-gradient-to-r from-green-600/30 to-emerald-600/30 text-green-300 border-b-2 border-green-400 shadow-lg shadow-green-500/20'
//                   : 'text-green-400 hover:text-green-300 hover:bg-gradient-to-r hover:from-green-600/20 hover:to-emerald-600/20'
//               }`}
//             >
//               {tab}
//             </button>
//           ))}
//         </div>

//         {activeTab === 'DASHBOARD' && (
//           <>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//               <div className="bg-gradient-to-br from-green-950/60 to-gray-950/80 backdrop-blur-xl border border-green-800/50 rounded-xl p-6 hover:border-green-600/70 transition-all duration-300 relative overflow-hidden shadow-lg shadow-green-900/30">
//                 <div className="absolute inset-0 bg-gradient-to-br from-green-600/10 to-emerald-600/10 opacity-60" />
//                 <div className="relative z-10">
//                   <div className="flex items-center justify-between mb-4">
//                     <h3 className="text-green-300 font-medium">VELOCITY</h3>
//                     <Activity className="w-5 h-5 text-green-400" />
//                   </div>
//                   <div className="mb-4">
//                     <div className="text-4xl font-bold text-green-300 mb-1">
//                       {bikeData.velocity.toFixed(1)}
//                     </div>
//                     <div className="text-green-500 text-sm">KM/H</div>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <span className={`text-xs font-medium px-2 py-1 rounded ${velocityStatus.color} bg-green-950/60 border border-green-800/30`}>
//                       {velocityStatus.status}
//                     </span>
//                     <span className="text-green-600 text-xs">MAX: 50 KM/H</span>
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-gradient-to-br from-green-950/60 to-gray-950/80 backdrop-blur-xl border border-green-800/50 rounded-xl p-6 hover:border-emerald-600/70 transition-all duration-300 relative overflow-hidden shadow-lg shadow-green-900/30">
//                 <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/10 to-green-600/10 opacity-60" />
//                 <div className="relative z-10">
//                   <div className="flex items-center justify-between mb-4">
//                     <h3 className="text-emerald-300 font-medium">BATTERY TEMP</h3>
//                     <Thermometer className="w-5 h-5 text-emerald-400" />
//                   </div>
//                   <div className="mb-4">
//                     <div className="text-4xl font-bold text-emerald-300 mb-1">
//                       {bikeData.batteryTemp.toFixed(1)}
//                     </div>
//                     <div className="text-emerald-500 text-sm">°CELSIUS</div>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <span className={`text-xs font-medium px-2 py-1 rounded ${batteryStatus.color} bg-green-950/60 border border-green-800/30`}>
//                       {batteryStatus.status}
//                     </span>
//                     <span className="text-green-600 text-xs">MAX: 45°C</span>
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-gradient-to-br from-green-950/60 to-gray-950/80 backdrop-blur-xl border border-green-800/50 rounded-xl p-6 hover:border-green-500/70 transition-all duration-300 relative overflow-hidden shadow-lg shadow-green-900/30">
//                 <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-green-700/10 opacity-60" />
//                 <div className="relative z-10">
//                   <div className="flex items-center justify-between mb-4">
//                     <h3 className="text-green-400 font-medium">GPS SIGNAL</h3>
//                     <Satellite className="w-5 h-5 text-green-400" />
//                   </div>
//                   <div className="mb-4">
//                     <div className="text-4xl font-bold text-green-400 mb-1">
//                       {bikeData.gpsSignal.toFixed(1)}
//                     </div>
//                     <div className="text-green-500 text-sm">METERS</div>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <span className={`text-xs font-medium px-2 py-1 rounded ${gpsStatus.color} bg-green-950/60 border border-green-800/30`}>
//                       {gpsStatus.status}
//                     </span>
//                     <span className="text-green-600 text-xs">TARGET: &lt;10M</span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-gradient-to-br from-green-950/60 to-gray-950/80 backdrop-blur-xl border border-green-800/50 rounded-xl p-6 relative overflow-hidden shadow-lg shadow-green-900/30">
//               <div className="absolute inset-0 bg-gradient-to-br from-green-600/10 via-emerald-600/10 to-green-700/10 opacity-60" />
//               <div className="relative z-10">
//                 <div className="flex items-center mb-6">
//                   <MapPin className="w-6 h-6 text-green-400 mr-3" />
//                   <div>
//                     <h3 className="text-xl font-bold bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text text-transparent">CURRENT POSITION</h3>
//                     <p className="text-green-500 text-sm">GPS COORDINATES & TELEMETRY</p>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//                   <div>
//                     <h4 className="text-green-400 text-sm font-medium mb-2">LATITUDE</h4>
//                     <div className="text-2xl font-bold text-green-200">{bikeData.latitude}</div>
//                   </div>
                  
//                   <div>
//                     <h4 className="text-emerald-400 text-sm font-medium mb-2">LONGITUDE</h4>
//                     <div className="text-2xl font-bold text-green-200">{bikeData.longitude}</div>
//                   </div>
                  
//                   <div>
//                     <h4 className="text-green-500 text-sm font-medium mb-2">ACCURACY</h4>
//                     <div className="text-2xl font-bold text-green-200">{bikeData.accuracy}M</div>
//                   </div>
                  
//                   <div>
//                     <h4 className="text-green-400 text-sm font-medium mb-2">LAST UPDATE</h4>
//                     <div className="text-lg font-bold text-green-200 flex items-center">
//                       <Clock className="w-4 h-4 mr-2 text-emerald-400" />
//                       {bikeData.lastUpdate}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </>
//         )}

//         {activeTab === 'GPS MAP' && (
//           <div className="bg-gradient-to-br from-green-950/60 to-gray-950/80 backdrop-blur-xl border border-green-800/50 rounded-xl p-8 text-center relative overflow-hidden shadow-lg shadow-green-900/30">
//             <div className="absolute inset-0 bg-gradient-to-br from-green-600/10 via-emerald-600/10 to-green-700/10 opacity-60" />
//             <div className="relative z-10">
//               <MapPin className="w-16 h-16 text-green-400 mx-auto mb-4" />
//               <h3 className="text-2xl font-bold bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text text-transparent mb-2">GPS Map View</h3>
//               <p className="text-green-500 mb-6">Interactive map showing bike location and route history</p>
//               <div className="bg-green-950/50 rounded-lg h-64 flex items-center justify-center border border-green-700/50">
//                 <span className="text-green-400">Map integration would go here</span>
//               </div>
//             </div>
//           </div>
//         )}

//         {activeTab === 'SETTINGS' && (
//           <div className="bg-gradient-to-br from-green-950/60 to-gray-950/80 backdrop-blur-xl border border-green-800/50 rounded-xl p-8 relative overflow-hidden shadow-lg shadow-green-900/30">
//             <div className="absolute inset-0 bg-gradient-to-br from-green-600/10 via-emerald-600/10 to-green-700/10 opacity-60" />
//             <div className="relative z-10">
//               <div className="flex items-center mb-6">
//                 <Settings className="w-6 h-6 text-green-400 mr-3" />
//                 <h3 className="text-2xl font-bold bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text text-transparent">System Settings</h3>
//               </div>
              
//               <div className="space-y-6">
//                 <div className="flex items-center justify-between p-4 bg-green-950/50 rounded-lg border border-green-800/50 hover:border-green-600/60 transition-colors">
//                   <div>
//                     <h4 className="text-green-200 font-medium">Real-time Updates</h4>
//                     <p className="text-green-500 text-sm">Enable live telemetry data</p>
//                   </div>
//                   <div className="relative">
//                     <input
//                       type="checkbox"
//                       checked={isOnline}
//                       onChange={(e) => setIsOnline(e.target.checked)}
//                       className="sr-only"
//                     />
//                     <div
//                       onClick={() => setIsOnline(!isOnline)}
//                       className={`w-12 h-6 rounded-full cursor-pointer transition-colors ${
//                         isOnline ? 'bg-gradient-to-r from-green-600 to-emerald-600' : 'bg-green-900'
//                       }`}
//                     >
//                       <div
//                         className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
//                           isOnline ? 'translate-x-6' : 'translate-x-0.5'
//                         } mt-0.5`}
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 <div className="p-4 bg-green-950/50 rounded-lg border border-green-800/50 hover:border-green-600/60 transition-colors">
//                   <h4 className="text-green-200 font-medium mb-2">Update Frequency</h4>
//                   <select className="w-full p-2 bg-green-900/50 border border-green-700/50 rounded text-green-200 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/30 transition-all">
//                     <option value="2">Every 2 seconds</option>
//                     <option value="5">Every 5 seconds</option>
//                     <option value="10">Every 10 seconds</option>
//                   </select>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
//   return (
//     <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
//       <div className="bg-black/90 backdrop-blur-md border border-green-500/40 rounded-full shadow-2xl px-6 py-3 hover:border-lime-400/60 transition-all duration-300">
//         <div className="flex items-center space-x-8">
          
//           {/* Brand with Greenish-Yellow Glow Animation */}
//           <div
//             className="text-lg font-bold bg-gradient-to-r from-green-400 via-lime-400 to-yellow-400 bg-clip-text text-transparent 
//                        hover:scale-105 transform transition duration-300 cursor-pointer whitespace-nowrap animate-pulse"
//             onClick={() => setCurrentSection('home')}
//           >
//             VIKRANT EV
//           </div>

//           {/* Navigation Buttons */}
//           <div className="flex space-x-3">
//             {[
//               { label: 'Home', section: 'home' },
//               { label: 'Team', section: 'team', icon: <Users size={16} /> },
//               { label: 'Project', section: 'project', icon: <FileText size={16} /> },
//               { label: 'Service', section: 'service', icon: <Wrench size={16} /> },
//               { label: 'Dashboard', section: 'dashboard', icon: <Activity size={16} /> },
//               { label: 'Contact', section: 'contact', icon: <Phone size={16} /> },
//             ].map(({ label, section, icon }) => (
//               <button
//                 key={section}
//                 onClick={() => setCurrentSection(section)}
//                 className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-in-out transform 
//                   ${currentSection === section
//                     ? 'bg-gradient-to-r from-green-500 to-lime-500 text-white scale-105 shadow-lg shadow-green-500/30'
//                     : 'text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-green-500/20 hover:to-lime-500/20 hover:scale-105 hover:border-green-400/30 border border-transparent'}`}
//               >
//                 {icon && icon}
//                 <span className="whitespace-nowrap">{label}</span>
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Users, FileText, Phone, Wrench, Activity, LogOut, User } from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth';
import { ROUTES } from '../../../utils/constants.js';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate(ROUTES.HOME);
    } catch (error) {
      console.error('Logout failed:', error);
    }
    setShowUserMenu(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  // Public navigation items
  const publicNavItems = [
    { label: 'Home', path: ROUTES.HOME },
    { label: 'Team', path: ROUTES.TEAM, icon: <Users size={16} /> },
    { label: 'Project', path: ROUTES.PROJECT, icon: <FileText size={16} /> },
    { label: 'Contact', path: ROUTES.CONTACT, icon: <Phone size={16} /> },
  ];

  // Private navigation items (only show when authenticated)
  const privateNavItems = [
    { label: 'Dashboard', path: ROUTES.DASHBOARD, icon: <Activity size={16} /> },
    { label: 'Service', path: ROUTES.SERVICE, icon: <Wrench size={16} /> },
  ];

  // Combine navigation items based on authentication status
  const navItems = isAuthenticated 
    ? [...publicNavItems, ...privateNavItems]
    : publicNavItems;

  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-black/90 backdrop-blur-md border border-green-500/40 rounded-full shadow-2xl px-6 py-3 hover:border-lime-400/60 transition-all duration-300">
        <div className="flex items-center space-x-8">
          
          {/* Brand with Greenish-Yellow Glow Animation */}
          <Link
            to={ROUTES.HOME}
            className="text-lg font-bold bg-gradient-to-r from-green-400 via-lime-400 to-yellow-400 bg-clip-text text-transparent 
                       hover:scale-105 transform transition duration-300 cursor-pointer whitespace-nowrap animate-pulse"
          >
            VIKRANT EV
          </Link>

          {/* Navigation Buttons */}
          <div className="flex space-x-3">
            {navItems.map(({ label, path, icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-in-out transform 
                  ${isActive(path)
                    ? 'bg-gradient-to-r from-green-500 to-lime-500 text-white scale-105 shadow-lg shadow-green-500/30'
                    : 'text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-green-500/20 hover:to-lime-500/20 hover:scale-105 hover:border-green-400/30 border border-transparent'}`}
              >
                {icon && icon}
                <span className="whitespace-nowrap">{label}</span>
              </Link>
            ))}
          </div>

          {/* User Authentication Section */}
          <div className="flex items-center space-x-3">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-green-500/20 hover:to-lime-500/20 hover:scale-105 transition-all duration-300 border border-transparent hover:border-green-400/30"
                >
                  <User size={16} />
                  <span className="whitespace-nowrap">
                    {user?.email?.split('@')[0] || 'User'}
                  </span>
                </button>

                {/* User Dropdown Menu */}
                {showUserMenu && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-black/95 backdrop-blur-md border border-green-500/40 rounded-xl shadow-2xl py-2">
                    <div className="px-4 py-2 border-b border-green-500/20">
                      <p className="text-sm text-gray-400">Signed in as</p>
                      <p className="text-sm text-green-300 truncate">{user?.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-red-500/20 hover:to-red-600/20 transition-all duration-300"
                    >
                      <LogOut size={16} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to={ROUTES.LOGIN}
                className="flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-green-500 to-lime-500 text-white hover:from-green-600 hover:to-lime-600 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg shadow-green-500/30"
              >
                <User size={16} />
                <span className="whitespace-nowrap">Sign In</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Click outside to close user menu */}
      {showUserMenu && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;