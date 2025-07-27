// import React, { useState, useEffect } from 'react';
// import { Activity, Thermometer, Satellite, MapPin, Clock, Settings, Bell } from 'lucide-react';

// const Dashboard = () => {
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

//     return () => clearInterval(interval);
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

//   return (
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
// };

// export default Dashboard;
import React, { useState, useEffect } from 'react';
import { Activity, Thermometer, Satellite, MapPin, Clock, Settings, Bell, TrendingUp, Battery, Zap } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';

const Dashboard = () => {
  const [bikeData, setBikeData] = useState({
    velocity: 19.4,
    batteryTemp: 35.0,
    gpsSignal: 8.2,
    latitude: 40.711364,
    longitude: -74.003423,
    accuracy: 8.2,
    lastUpdate: '8:49:58 PM'
  });

  // Historical data for graphs
  const [velocityData, setVelocityData] = useState([
    { time: '8:45', velocity: 15.2, batteryTemp: 32.1, gpsSignal: 7.8 },
    { time: '8:46', velocity: 18.5, batteryTemp: 33.2, gpsSignal: 8.1 },
    { time: '8:47', velocity: 22.1, batteryTemp: 34.5, gpsSignal: 7.9 },
    { time: '8:48', velocity: 19.8, batteryTemp: 35.1, gpsSignal: 8.3 },
    { time: '8:49', velocity: 16.3, batteryTemp: 34.8, gpsSignal: 8.0 },
    { time: '8:50', velocity: 19.4, batteryTemp: 35.0, gpsSignal: 8.2 }
  ]);

  const [batteryLifeData] = useState([
    { day: 'Mon', batteryLife: 95, efficiency: 88 },
    { day: 'Tue', batteryLife: 92, efficiency: 85 },
    { day: 'Wed', batteryLife: 89, efficiency: 82 },
    { day: 'Thu', batteryLife: 87, efficiency: 79 },
    { day: 'Fri', batteryLife: 85, efficiency: 76 },
    { day: 'Sat', batteryLife: 83, efficiency: 74 },
    { day: 'Sun', batteryLife: 81, efficiency: 72 }
  ]);

  const [performanceData] = useState([
    { metric: 'Speed', current: 19.4, target: 25, percentage: 78 },
    { metric: 'Battery', current: 35.0, target: 40, percentage: 88 },
    { metric: 'GPS', current: 8.2, target: 10, percentage: 82 },
    { metric: 'Efficiency', current: 85, target: 90, percentage: 94 }
  ]);

  const [isOnline, setIsOnline] = useState(true);
  const [activeTab, setActiveTab] = useState('DASHBOARD');

  useEffect(() => {
    const interval = setInterval(() => {
      const newTime = new Date().toLocaleTimeString('en-US', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit' 
      });
      
      const newVelocity = Math.max(0, bikeData.velocity + (Math.random() - 0.5) * 4);
      const newBatteryTemp = Math.max(20, Math.min(50, bikeData.batteryTemp + (Math.random() - 0.5) * 2));
      const newGpsSignal = Math.max(0, Math.min(10, bikeData.gpsSignal + (Math.random() - 0.5) * 1));

      setBikeData(prev => ({
        ...prev,
        velocity: newVelocity,
        batteryTemp: newBatteryTemp,
        gpsSignal: newGpsSignal,
        lastUpdate: new Date().toLocaleTimeString()
      }));

      setVelocityData(prev => {
        const newData = [...prev.slice(-5), {
          time: newTime,
          velocity: newVelocity,
          batteryTemp: newBatteryTemp,
          gpsSignal: newGpsSignal
        }];
        return newData;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [bikeData.velocity, bikeData.batteryTemp, bikeData.gpsSignal]);

  const getVelocityStatus = (velocity) => {
    if (velocity < 10) return { status: 'LOW', color: 'text-yellow-400' };
    if (velocity > 40) return { status: 'HIGH', color: 'text-red-400' };
    return { status: 'NORMAL', color: 'text-green-400' };
  };

  const getBatteryTempStatus = (temp) => {
    if (temp < 25) return { status: 'COOL', color: 'text-lime-400' };
    if (temp > 45) return { status: 'HOT', color: 'text-red-400' };
    return { status: 'NORMAL', color: 'text-green-400' };
  };

  const getGpsSignalStatus = (signal) => {
    if (signal < 3) return { status: 'WEAK SIGNAL', color: 'text-red-400' };
    if (signal > 7) return { status: 'STRONG SIGNAL', color: 'text-green-400' };
    return { status: 'MODERATE', color: 'text-yellow-400' };
  };

  const velocityStatus = getVelocityStatus(bikeData.velocity);
  const batteryStatus = getBatteryTempStatus(bikeData.batteryTemp);
  const gpsStatus = getGpsSignalStatus(bikeData.gpsSignal);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-950 via-gray-950 to-green-900 text-white overflow-hidden">
     

      {/* Enhanced Dynamic Background */}
      <div className="fixed inset-0 opacity-40 pointer-events-none">
        <div 
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 20% 80%, 
              rgba(34, 197, 94, 0.25) 0%, 
              rgba(20, 83, 45, 0.2) 30%,
              rgba(5, 46, 22, 0.15) 60%, 
              rgba(0, 0, 0, 0.8) 100%)`
          }}
        />
      </div>
      
      {/* Animated Grid Background */}
      <div className="fixed inset-0 opacity-15">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(34, 197, 94, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34, 197, 94, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* Floating particles */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/6 w-2 h-2 bg-green-400 rounded-full animate-ping" style={{ animationDelay: '0s' }} />
        <div className="absolute top-2/3 right-1/5 w-1 h-1 bg-emerald-400 rounded-full animate-ping" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-green-300 rounded-full animate-ping" style={{ animationDelay: '4s' }} />
      </div>

      <div className="relative z-10 px-6 md:px-12 lg:px-20 py-6 ml-20 mr-20">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center shadow-lg shadow-green-500/50 border border-green-500/30">
              <Activity className="w-7 h-7 text-white" />
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-400' : 'bg-red-500'} animate-pulse`}></div>
              <span className="text-green-300 text-sm font-medium">
                {isOnline ? 'ONLINE' : 'OFFLINE'}
              </span>
            </div>
            <Bell className="w-6 h-6 text-green-400 hover:text-green-300 cursor-pointer transition-colors" />
          </div>
        </div>

        {/* Title above navigation bar */}
        <div className="group relative bg-gradient-to-br from-gray-800/40 to-gray-900/60 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50 hover:border-gray-600/70 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl overflow-hidden mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text text-transparent mb-2 text-center">My E-Bike</h1>
          <p className="text-gray-300 text-lg font-medium text-center">REAL-TIME PERFORMANCE DASHBOARD</p>
        </div>

        <div className="flex space-x-1 mb-8">
          {['DASHBOARD', 'ANALYTICS', 'GPS MAP', 'SETTINGS'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-sm font-medium transition-all duration-300 rounded-t-lg ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-green-600/30 to-emerald-600/30 text-green-300 border-b-2 border-green-400 shadow-lg shadow-green-500/20'
                  : 'text-green-400 hover:text-green-300 hover:bg-gradient-to-r hover:from-green-600/20 hover:to-emerald-600/20'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'DASHBOARD' && (
          <>
            {/* Real-time Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-green-950/60 to-gray-950/80 backdrop-blur-xl border border-green-800/50 rounded-xl p-6 hover:border-green-600/70 transition-all duration-300 relative overflow-hidden shadow-lg shadow-green-900/30">
                <div className="absolute inset-0 bg-gradient-to-br from-green-600/10 to-emerald-600/10 opacity-60" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-green-300 font-medium">VELOCITY</h3>
                    <Activity className="w-5 h-5 text-green-400" />
                  </div>
                  <div className="mb-4">
                    <div className="text-4xl font-bold text-green-300 mb-1">
                      {bikeData.velocity.toFixed(1)}
                    </div>
                    <div className="text-green-500 text-sm">KM/H</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-medium px-2 py-1 rounded ${velocityStatus.color} bg-green-950/60 border border-green-800/30`}>
                      {velocityStatus.status}
                    </span>
                    <span className="text-green-600 text-xs">MAX: 50 KM/H</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-950/60 to-gray-950/80 backdrop-blur-xl border border-green-800/50 rounded-xl p-6 hover:border-emerald-600/70 transition-all duration-300 relative overflow-hidden shadow-lg shadow-green-900/30">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/10 to-green-600/10 opacity-60" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-emerald-300 font-medium">BATTERY TEMP</h3>
                    <Thermometer className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div className="mb-4">
                    <div className="text-4xl font-bold text-emerald-300 mb-1">
                      {bikeData.batteryTemp.toFixed(1)}
                    </div>
                    <div className="text-emerald-500 text-sm">°CELSIUS</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-medium px-2 py-1 rounded ${batteryStatus.color} bg-green-950/60 border border-green-800/30`}>
                      {batteryStatus.status}
                    </span>
                    <span className="text-green-600 text-xs">MAX: 45°C</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-950/60 to-gray-950/80 backdrop-blur-xl border border-green-800/50 rounded-xl p-6 hover:border-green-500/70 transition-all duration-300 relative overflow-hidden shadow-lg shadow-green-900/30">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-green-700/10 opacity-60" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-green-400 font-medium">GPS SIGNAL</h3>
                    <Satellite className="w-5 h-5 text-green-400" />
                  </div>
                  <div className="mb-4">
                    <div className="text-4xl font-bold text-green-400 mb-1">
                      {bikeData.gpsSignal.toFixed(1)}
                    </div>
                    <div className="text-green-500 text-sm">METERS</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-medium px-2 py-1 rounded ${gpsStatus.color} bg-green-950/60 border border-green-800/30`}>
                      {gpsStatus.status}
                    </span>
                    <span className="text-green-600 text-xs">TARGET: &lt;10M</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Real-time Performance Graph */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-gradient-to-br from-green-950/60 to-gray-950/80 backdrop-blur-xl border border-green-800/50 rounded-xl p-6 shadow-lg shadow-green-900/30">
                <div className="flex items-center mb-4">
                  <TrendingUp className="w-5 h-5 text-green-400 mr-2" />
                  <h3 className="text-lg font-bold text-green-300">Real-time Performance</h3>
                </div>
                <ResponsiveContainer width="100%" height={280}>
                  <LineChart data={velocityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#064e3b" />
                    <XAxis dataKey="time" stroke="#10b981" fontSize={12} />
                    <YAxis stroke="#10b981" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#064e3b', 
                        border: '1px solid #10b981', 
                        borderRadius: '8px',
                        color: '#dcfce7' 
                      }} 
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="velocity" 
                      stroke="#10b981" 
                      strokeWidth={3}
                      name="Velocity (km/h)"
                      dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="batteryTemp" 
                      stroke="#34d399" 
                      strokeWidth={2}
                      name="Battery Temp (°C)"
                      dot={{ fill: '#34d399', strokeWidth: 2, r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-gradient-to-br from-green-950/60 to-gray-950/80 backdrop-blur-xl border border-green-800/50 rounded-xl p-6 shadow-lg shadow-green-900/30">
                <div className="flex items-center mb-4">
                  <Battery className="w-5 h-5 text-emerald-400 mr-2" />
                  <h3 className="text-lg font-bold text-emerald-300">Weekly Battery Performance</h3>
                </div>
                <ResponsiveContainer width="100%" height={280}>
                  <AreaChart data={batteryLifeData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#064e3b" />
                    <XAxis dataKey="day" stroke="#10b981" fontSize={12} />
                    <YAxis stroke="#10b981" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#064e3b', 
                        border: '1px solid #10b981', 
                        borderRadius: '8px',
                        color: '#dcfce7' 
                      }} 
                    />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="batteryLife" 
                      stackId="1"
                      stroke="#10b981" 
                      fill="#10b981" 
                      fillOpacity={0.6}
                      name="Battery Life (%)"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="efficiency" 
                      stackId="2"
                      stroke="#34d399" 
                      fill="#34d399" 
                      fillOpacity={0.4}
                      name="Efficiency (%)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Current Position */}
            <div className="bg-gradient-to-br from-green-950/60 to-gray-950/80 backdrop-blur-xl border border-green-800/50 rounded-xl p-6 relative overflow-hidden shadow-lg shadow-green-900/30">
              <div className="absolute inset-0 bg-gradient-to-br from-green-600/10 via-emerald-600/10 to-green-700/10 opacity-60" />
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <MapPin className="w-6 h-6 text-green-400 mr-3" />
                  <div>
                    <h3 className="text-xl font-bold bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text text-transparent">CURRENT POSITION</h3>
                    <p className="text-green-500 text-sm">GPS COORDINATES & TELEMETRY</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div>
                    <h4 className="text-green-400 text-sm font-medium mb-2">LATITUDE</h4>
                    <div className="text-2xl font-bold text-green-200">{bikeData.latitude}</div>
                  </div>
                  
                  <div>
                    <h4 className="text-emerald-400 text-sm font-medium mb-2">LONGITUDE</h4>
                    <div className="text-2xl font-bold text-green-200">{bikeData.longitude}</div>
                  </div>
                  
                  <div>
                    <h4 className="text-green-500 text-sm font-medium mb-2">ACCURACY</h4>
                    <div className="text-2xl font-bold text-green-200">{bikeData.accuracy}M</div>
                  </div>
                  
                  <div>
                    <h4 className="text-green-400 text-sm font-medium mb-2">LAST UPDATE</h4>
                    <div className="text-lg font-bold text-green-200 flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-emerald-400" />
                      {bikeData.lastUpdate}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'ANALYTICS' && (
          <div className="space-y-6">
            {/* Performance Metrics Bar Chart */}
            <div className="bg-gradient-to-br from-green-950/60 to-gray-950/80 backdrop-blur-xl border border-green-800/50 rounded-xl p-6 shadow-lg shadow-green-900/30">
              <div className="flex items-center mb-4">
                <Zap className="w-5 h-5 text-yellow-400 mr-2" />
                <h3 className="text-lg font-bold text-green-300">Performance Metrics</h3>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#064e3b" />
                  <XAxis dataKey="metric" stroke="#10b981" fontSize={12} />
                  <YAxis stroke="#10b981" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#064e3b', 
                      border: '1px solid #10b981', 
                      borderRadius: '8px',
                      color: '#dcfce7' 
                    }} 
                  />
                  <Legend />
                  <Bar dataKey="percentage" fill="#10b981" name="Performance %" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* GPS Signal Quality over Time */}
            <div className="bg-gradient-to-br from-green-950/60 to-gray-950/80 backdrop-blur-xl border border-green-800/50 rounded-xl p-6 shadow-lg shadow-green-900/30">
              <div className="flex items-center mb-4">
                <Satellite className="w-5 h-5 text-blue-400 mr-2" />
                <h3 className="text-lg font-bold text-green-300">GPS Signal Quality Trend</h3>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={velocityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#064e3b" />
                  <XAxis dataKey="time" stroke="#10b981" fontSize={12} />
                  <YAxis stroke="#10b981" fontSize={12} domain={[0, 10]} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#064e3b', 
                      border: '1px solid #10b981', 
                      borderRadius: '8px',
                      color: '#dcfce7' 
                    }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="gpsSignal" 
                    stroke="#3b82f6" 
                    fill="#3b82f6" 
                    fillOpacity={0.6}
                    name="GPS Signal Quality (m)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === 'GPS MAP' && (
          <div className="bg-gradient-to-br from-green-950/60 to-gray-950/80 backdrop-blur-xl border border-green-800/50 rounded-xl p-8 text-center relative overflow-hidden shadow-lg shadow-green-900/30">
            <div className="absolute inset-0 bg-gradient-to-br from-green-600/10 via-emerald-600/10 to-green-700/10 opacity-60" />
            <div className="relative z-10">
              <MapPin className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text text-transparent mb-2">GPS Map View</h3>
              <p className="text-green-500 mb-6">Interactive map showing bike location and route history</p>
              <div className="bg-green-950/50 rounded-lg h-64 flex items-center justify-center border border-green-700/50">
                <span className="text-green-400">Map integration would go here</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'SETTINGS' && (
          <div className="bg-gradient-to-br from-green-950/60 to-gray-950/80 backdrop-blur-xl border border-green-800/50 rounded-xl p-8 relative overflow-hidden shadow-lg shadow-green-900/30">
            <div className="absolute inset-0 bg-gradient-to-br from-green-600/10 via-emerald-600/10 to-green-700/10 opacity-60" />
            <div className="relative z-10">
              <div className="flex items-center mb-6">
                <Settings className="w-6 h-6 text-green-400 mr-3" />
                <h3 className="text-2xl font-bold bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text text-transparent">System Settings</h3>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-green-950/50 rounded-lg border border-green-800/50 hover:border-green-600/60 transition-colors">
                  <div>
                    <h4 className="text-green-200 font-medium">Real-time Updates</h4>
                    <p className="text-green-500 text-sm">Enable live telemetry data</p>
                  </div>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={isOnline}
                      onChange={(e) => setIsOnline(e.target.checked)}
                      className="sr-only"
                    />
                    <div
                      onClick={() => setIsOnline(!isOnline)}
                      className={`w-12 h-6 rounded-full cursor-pointer transition-colors ${
                        isOnline ? 'bg-gradient-to-r from-green-600 to-emerald-600' : 'bg-green-900'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                          isOnline ? 'translate-x-6' : 'translate-x-0.5'
                        } mt-0.5`}
                      />
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-green-950/50 rounded-lg border border-green-800/50 hover:border-green-600/60 transition-colors">
                  <h4 className="text-green-200 font-medium mb-2">Update Frequency</h4>
                  <select className="w-full p-2 bg-green-900/50 border border-green-700/50 rounded text-green-200 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/30 transition-all">
                    <option value="2">Every 2 seconds</option>
                    <option value="3">Every 3 seconds</option>
                    <option value="5">Every 5 seconds</option>
                    <option value="10">Every 10 seconds</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;