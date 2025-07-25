import React, { useState, useEffect } from 'react';
import { Activity, Thermometer, Satellite, MapPin, Clock, Settings, Bell } from 'lucide-react';

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

  const [isOnline, setIsOnline] = useState(true);
  const [activeTab, setActiveTab] = useState('DASHBOARD');

  useEffect(() => {
    const interval = setInterval(() => {
      setBikeData(prev => ({
        ...prev,
        velocity: Math.max(0, prev.velocity + (Math.random() - 0.5) * 2),
        batteryTemp: Math.max(20, Math.min(50, prev.batteryTemp + (Math.random() - 0.5) * 1)),
        gpsSignal: Math.max(0, Math.min(10, prev.gpsSignal + (Math.random() - 0.5) * 0.5)),
        lastUpdate: new Date().toLocaleTimeString()
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getVelocityStatus = (velocity) => {
    if (velocity < 10) return { status: 'LOW', color: 'text-yellow-400' };
    if (velocity > 40) return { status: 'HIGH', color: 'text-red-400' };
    return { status: 'NORMAL', color: 'text-blue-400' };
  };

  const getBatteryTempStatus = (temp) => {
    if (temp < 25) return { status: 'COOL', color: 'text-cyan-400' };
    if (temp > 45) return { status: 'HOT', color: 'text-red-400' };
    return { status: 'NORMAL', color: 'text-blue-400' };
  };

  const getGpsSignalStatus = (signal) => {
    if (signal < 3) return { status: 'WEAK SIGNAL', color: 'text-red-400' };
    if (signal > 7) return { status: 'STRONG SIGNAL', color: 'text-blue-400' };
    return { status: 'MODERATE', color: 'text-yellow-400' };
  };

  const velocityStatus = getVelocityStatus(bikeData.velocity);
  const batteryStatus = getBatteryTempStatus(bikeData.batteryTemp);
  const gpsStatus = getGpsSignalStatus(bikeData.gpsSignal);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-blue-400">BIKE MONITOR</h1>
            <p className="text-gray-400 text-sm">REAL-TIME TELEMETRY</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-blue-500' : 'bg-red-500'} animate-pulse`}></div>
            <span className="text-blue-400 text-sm font-medium">
              {isOnline ? 'ONLINE' : 'OFFLINE'}
            </span>
          </div>
          <Bell className="w-5 h-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
        </div>
      </div>

      <div className="flex space-x-1 mb-8">
        {['DASHBOARD', 'GPS MAP', 'SETTINGS'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 text-sm font-medium transition-all duration-300 ${
              activeTab === tab
                ? 'bg-blue-500/20 text-blue-400 border-b-2 border-blue-500'
                : 'text-gray-400 hover:text-white hover:bg-gray-800/30'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'DASHBOARD' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-800/50 border border-gray-600 rounded-xl p-6 hover:border-blue-500/50 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-blue-400 font-medium">VELOCITY</h3>
                <Activity className="w-5 h-5 text-blue-400" />
              </div>
              <div className="mb-4">
                <div className="text-4xl font-bold text-blue-400 mb-1">
                  {bikeData.velocity.toFixed(1)}
                </div>
                <div className="text-gray-400 text-sm">KM/H</div>
              </div>
              <div className="flex items-center justify-between">
                <span className={`text-xs font-medium px-2 py-1 rounded ${velocityStatus.color} bg-gray-700`}>
                  {velocityStatus.status}
                </span>
                <span className="text-gray-500 text-xs">MAX: 50 KM/H</span>
              </div>
            </div>

            <div className="bg-gray-800/50 border border-gray-600 rounded-xl p-6 hover:border-blue-500/50 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-blue-400 font-medium">BATTERY TEMP</h3>
                <Thermometer className="w-5 h-5 text-blue-400" />
              </div>
              <div className="mb-4">
                <div className="text-4xl font-bold text-blue-400 mb-1">
                  {bikeData.batteryTemp.toFixed(1)}
                </div>
                <div className="text-gray-400 text-sm">°CELSIUS</div>
              </div>
              <div className="flex items-center justify-between">
                <span className={`text-xs font-medium px-2 py-1 rounded ${batteryStatus.color} bg-gray-700`}>
                  {batteryStatus.status}
                </span>
                <span className="text-gray-500 text-xs">MAX: 45°C</span>
              </div>
            </div>

            <div className="bg-gray-800/50 border border-gray-600 rounded-xl p-6 hover:border-blue-500/50 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-blue-400 font-medium">GPS SIGNAL</h3>
                <Satellite className="w-5 h-5 text-blue-400" />
              </div>
              <div className="mb-4">
                <div className="text-4xl font-bold text-blue-400 mb-1">
                  {bikeData.gpsSignal.toFixed(1)}
                </div>
                <div className="text-gray-400 text-sm">METERS</div>
              </div>
              <div className="flex items-center justify-between">
                <span className={`text-xs font-medium px-2 py-1 rounded ${gpsStatus.color} bg-gray-700`}>
                  {gpsStatus.status}
                </span>
                <span className="text-gray-500 text-xs">TARGET: &lt;10M</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 border border-gray-600 rounded-xl p-6">
            <div className="flex items-center mb-6">
              <MapPin className="w-6 h-6 text-blue-400 mr-3" />
              <div>
                <h3 className="text-xl font-bold text-blue-400">CURRENT POSITION</h3>
                <p className="text-gray-400 text-sm">GPS COORDINATES & TELEMETRY</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <h4 className="text-blue-400 text-sm font-medium mb-2">LATITUDE</h4>
                <div className="text-2xl font-bold text-white">{bikeData.latitude}</div>
              </div>
              
              <div>
                <h4 className="text-blue-400 text-sm font-medium mb-2">LONGITUDE</h4>
                <div className="text-2xl font-bold text-white">{bikeData.longitude}</div>
              </div>
              
              <div>
                <h4 className="text-blue-400 text-sm font-medium mb-2">ACCURACY</h4>
                <div className="text-2xl font-bold text-white">{bikeData.accuracy}M</div>
              </div>
              
              <div>
                <h4 className="text-blue-400 text-sm font-medium mb-2">LAST UPDATE</h4>
                <div className="text-lg font-bold text-white flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-blue-400" />
                  {bikeData.lastUpdate}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === 'GPS MAP' && (
        <div className="bg-gray-800/50 border border-gray-600 rounded-xl p-8 text-center">
          <MapPin className="w-16 h-16 text-blue-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-2">GPS Map View</h3>
          <p className="text-gray-400 mb-6">Interactive map showing bike location and route history</p>
          <div className="bg-gray-700 rounded-lg h-64 flex items-center justify-center border border-gray-600">
            <span className="text-gray-400">Map integration would go here</span>
          </div>
        </div>
      )}

      {activeTab === 'SETTINGS' && (
        <div className="bg-gray-800/50 border border-gray-600 rounded-xl p-8">
          <div className="flex items-center mb-6">
            <Settings className="w-6 h-6 text-blue-400 mr-3" />
            <h3 className="text-2xl font-bold text-white">System Settings</h3>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg border border-gray-600">
              <div>
                <h4 className="text-white font-medium">Real-time Updates</h4>
                <p className="text-gray-400 text-sm">Enable live telemetry data</p>
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
                    isOnline ? 'bg-blue-500' : 'bg-gray-600'
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

            <div className="p-4 bg-gray-700/50 rounded-lg border border-gray-600">
              <h4 className="text-white font-medium mb-2">Update Frequency</h4>
              <select className="w-full p-2 bg-gray-800 border border-gray-500 rounded text-white focus:border-blue-500 focus:outline-none">
                <option value="2">Every 2 seconds</option>
                <option value="5">Every 5 seconds</option>
                <option value="10">Every 10 seconds</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;