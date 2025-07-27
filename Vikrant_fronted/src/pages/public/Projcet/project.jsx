// import React  from "react";

//   const ProjectPage = () => (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white pt-20 overflow-hidden">
//       {/* Enhanced Dynamic Background */}
//       <div className="fixed inset-0 opacity-30 pointer-events-none">
//         <div 
//           className="absolute inset-0"
//           style={{
//             background: `radial-gradient(circle at 50% 50%, 
//               rgba(34, 197, 94, 0.15) 0%, 
//               rgba(132, 204, 22, 0.1) 30%,
//               rgba(234, 179, 8, 0.08) 60%, 
//               transparent 100%)`
//           }}
//         />
//       </div>
      
//       {/* Animated Grid Background */}
//       <div className="fixed inset-0 opacity-10">
//         <div 
//           className="absolute inset-0"
//           style={{
//             backgroundImage: `
//               linear-gradient(rgba(34, 197, 94, 0.2) 1px, transparent 1px),
//               linear-gradient(90deg, rgba(34, 197, 94, 0.2) 1px, transparent 1px)
//             `,
//             backgroundSize: '60px 60px'
//           }}
//         />
//       </div>

//       {/* Floating particles */}
//       <div className="fixed inset-0 pointer-events-none">
//         <div className="absolute top-1/6 left-1/5 w-2 h-2 bg-green-400 rounded-full animate-ping" style={{ animationDelay: '0s' }} />
//         <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-lime-400 rounded-full animate-ping" style={{ animationDelay: '2s' }} />
//         <div className="absolute top-1/3 right-2/3 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-ping" style={{ animationDelay: '4s' }} />
//       </div>

//       <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
//         <div className="text-center mb-16">
//           <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500/20 via-lime-500/20 to-yellow-500/20 rounded-full border border-green-500/40 backdrop-blur-sm mb-8">
//             <span className="text-sm font-bold bg-gradient-to-r from-green-400 to-lime-400 bg-clip-text text-transparent">
//               Innovation In Motion
//             </span>
//           </div>
          
//           <h2 className="text-5xl lg:text-6xl font-black mb-6">
//             <span className="bg-gradient-to-r from-white via-green-200 to-white bg-clip-text text-transparent">
//               Project
//             </span>
//             <span className="bg-gradient-to-r from-green-400 via-lime-400 to-yellow-400 bg-clip-text text-transparent"> Details</span>
//           </h2>
//           <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
//             Discover the cutting-edge technology and innovative features that make our electric bike extraordinary
//           </p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//           <div className="space-y-8">
//             <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/60 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50 hover:border-green-500/30 transition-all duration-300 relative overflow-hidden">
//               {/* Glow effect */}
//               <div className="absolute inset-0 bg-gradient-to-br from-green-400/5 via-lime-400/5 to-yellow-400/5 opacity-50" />
              
//               <div className="relative z-10">
//                 <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-green-400 to-lime-400 bg-clip-text text-transparent">
//                   Technical Specifications
//                 </h3>
//                 <div className="space-y-3">
//                   <div className="flex justify-between">
//                     <span className="text-gray-300">Motor Power</span>
//                     <span className="font-semibold text-green-400">750W Brushless</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-300">Battery Capacity</span>
//                     <span className="font-semibold text-lime-400">48V 15Ah Lithium-ion</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-300">Max Range</span>
//                     <span className="font-semibold text-yellow-400">50+ Miles</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-300">Top Speed</span>
//                     <span className="font-semibold text-green-400">28 MPH</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-300">Frame Material</span>
//                     <span className="font-semibold text-lime-400">Aluminum Alloy</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-300">Weight</span>
//                     <span className="font-semibold text-yellow-400">55 lbs</span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/60 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50 hover:border-lime-500/30 transition-all duration-300 relative overflow-hidden">
//               {/* Glow effect */}
//               <div className="absolute inset-0 bg-gradient-to-br from-lime-400/5 via-green-400/5 to-yellow-400/5 opacity-50" />
              
//               <div className="relative z-10">
//                 <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-lime-400 to-yellow-400 bg-clip-text text-transparent">
//                   Smart Features
//                 </h3>
//                 <ul className="space-y-3">
//                   <li className="flex items-start space-x-3">
//                     <div className="w-2 h-2 bg-green-400 rounded-full mt-2 animate-pulse"></div>
//                     <span>GPS tracking and anti-theft alarm system</span>
//                   </li>
//                   <li className="flex items-start space-x-3">
//                     <div className="w-2 h-2 bg-lime-400 rounded-full mt-2 animate-pulse"></div>
//                     <span>Mobile app connectivity for ride statistics</span>
//                   </li>
//                   <li className="flex items-start space-x-3">
//                     <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 animate-pulse"></div>
//                     <span>Multiple riding modes (Eco, Normal, Sport)</span>
//                   </li>
//                   <li className="flex items-start space-x-3">
//                     <div className="w-2 h-2 bg-green-400 rounded-full mt-2 animate-pulse"></div>
//                     <span>LED headlight and taillight integration</span>
//                   </li>
//                   <li className="flex items-start space-x-3">
//                     <div className="w-2 h-2 bg-lime-400 rounded-full mt-2 animate-pulse"></div>
//                     <span>Regenerative braking system</span>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </div>

//           <div className="space-y-8">
//             <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/60 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50 hover:border-green-500/30 transition-all duration-300 relative overflow-hidden">
//               {/* Glow effect */}
//               <div className="absolute inset-0 bg-gradient-to-br from-green-400/5 via-lime-400/5 to-yellow-400/5 opacity-50" />
              
//               <div className="relative z-10">
//                 <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-green-400 to-lime-400 bg-clip-text text-transparent">
//                   Sustainability Focus
//                 </h3>
//                 <p className="text-gray-300 mb-4">
//                   Our electric bike is designed with environmental responsibility at its core. 
//                   We use sustainable materials and manufacturing processes to minimize our carbon footprint.
//                 </p>
//                 <ul className="space-y-2 text-sm">
//                   <li className="flex items-center space-x-2">
//                     <div className="w-1 h-1 bg-green-400 rounded-full"></div>
//                     <span>100% recyclable aluminum frame</span>
//                   </li>
//                   <li className="flex items-center space-x-2">
//                     <div className="w-1 h-1 bg-lime-400 rounded-full"></div>
//                     <span>Eco-friendly battery technology</span>
//                   </li>
//                   <li className="flex items-center space-x-2">
//                     <div className="w-1 h-1 bg-yellow-400 rounded-full"></div>
//                     <span>Carbon-neutral shipping</span>
//                   </li>
//                   <li className="flex items-center space-x-2">
//                     <div className="w-1 h-1 bg-green-400 rounded-full"></div>
//                     <span>Reduces CO2 emissions by 90% vs cars</span>
//                   </li>
//                 </ul>
//               </div>
//             </div>

//             <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/60 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50 hover:border-yellow-500/30 transition-all duration-300 relative overflow-hidden">
//               {/* Glow effect */}
//               <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-lime-400/5 to-green-400/5 opacity-50" />
              
//               <div className="relative z-10">
//                 <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-lime-400 bg-clip-text text-transparent">
//                   Development Timeline
//                 </h3>
//                 <div className="space-y-4">
//                   <div className="flex items-center space-x-4">
//                     <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
//                     <div>
//                       <div className="font-semibold text-white">Q1 2024 - Concept Design</div>
//                       <div className="text-sm text-gray-400">Initial prototyping and testing</div>
//                     </div>
//                   </div>
//                   <div className="flex items-center space-x-4">
//                     <div className="w-4 h-4 bg-lime-400 rounded-full animate-pulse"></div>
//                     <div>
//                       <div className="font-semibold text-white">Q2 2024 - Engineering</div>
//                       <div className="text-sm text-gray-400">Motor and battery optimization</div>
//                     </div>
//                   </div>
//                   <div className="flex items-center space-x-4">
//                     <div className="w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
//                     <div>
//                       <div className="font-semibold text-white">Q3 2024 - Testing</div>
//                       <div className="text-sm text-gray-400">Real-world performance validation</div>
//                     </div>
//                   </div>
//                   <div className="flex items-center space-x-4">
//                     <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
//                     <div>
//                       <div className="font-semibold text-white">Q4 2024 - Production</div>
//                       <div className="text-sm text-gray-400">Manufacturing and quality control</div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   export default ProjectPage;
import React from "react";
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Play, ArrowRight } from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth';
import { ROUTES } from '../../../utils/constants';

const ProjectPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  const handleGetStartedClick = () => {
    if (isAuthenticated) {
      navigate(ROUTES.DASHBOARD);
    } else {
      navigate(ROUTES.LOGIN);
    }
  };

  const handleExploreServicesClick = () => {
    if (isAuthenticated) {
      navigate(ROUTES.SERVICE);
    } else {
      navigate(ROUTES.LOGIN);
    }
  };

  const handleContactClick = () => {
    navigate(ROUTES.CONTACT);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white pt-20 overflow-hidden">
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
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500/20 via-lime-500/20 to-yellow-500/20 rounded-full border border-green-500/40 backdrop-blur-sm mb-8">
            <span className="text-sm font-bold bg-gradient-to-r from-green-400 to-lime-400 bg-clip-text text-transparent">
              {isAuthenticated && user 
                ? `${user.email?.split('@')[0]}'s Project Overview` 
                : 'Innovation In Motion'
              }
            </span>
          </div>
          
          <h2 className="text-5xl lg:text-6xl font-black mb-6">
            <span className="bg-gradient-to-r from-white via-green-200 to-white bg-clip-text text-transparent">
              Project
            </span>
            <span className="bg-gradient-to-r from-green-400 via-lime-400 to-yellow-400 bg-clip-text text-transparent"> Details</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover the cutting-edge technology and innovative features that make our electric bike extraordinary
          </p>
          
          {/* Authentication status indicator */}
          {isAuthenticated ? (
            <div className="inline-flex items-center px-4 py-2 bg-green-500/20 rounded-full border border-green-500/40 backdrop-blur-sm mt-4">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2" />
              <span className="text-sm text-green-300 font-medium">
                Premium Access Granted
              </span>
            </div>
          ) : (
            <div className="inline-flex items-center px-4 py-2 bg-yellow-500/20 rounded-full border border-yellow-500/40 backdrop-blur-sm mt-4">
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse mr-2" />
              <span className="text-sm text-yellow-300 font-medium">
                Sign in for exclusive features
              </span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/60 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50 hover:border-green-500/30 transition-all duration-300 relative overflow-hidden">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-400/5 via-lime-400/5 to-yellow-400/5 opacity-50" />
              
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-green-400 to-lime-400 bg-clip-text text-transparent">
                  Technical Specifications
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Motor Power</span>
                    <span className="font-semibold text-green-400">750W Brushless</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Battery Capacity</span>
                    <span className="font-semibold text-lime-400">48V 15Ah Lithium-ion</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Max Range</span>
                    <span className="font-semibold text-yellow-400">80+ Miles</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Top Speed</span>
                    <span className="font-semibold text-green-400">35 MPH</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Frame Material</span>
                    <span className="font-semibold text-lime-400">Carbon Fiber Aluminum</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Weight</span>
                    <span className="font-semibold text-yellow-400">45 lbs</span>
                  </div>
                  {isAuthenticated && (
                    <>
                      <div className="flex justify-between border-t border-green-500/20 pt-3 mt-3">
                        <span className="text-gray-300">AI Features</span>
                        <span className="font-semibold text-green-400">Neural Control+</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Warranty</span>
                        <span className="font-semibold text-lime-400">5 Years Extended</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/60 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50 hover:border-lime-500/30 transition-all duration-300 relative overflow-hidden">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-lime-400/5 via-green-400/5 to-yellow-400/5 opacity-50" />
              
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-lime-400 to-yellow-400 bg-clip-text text-transparent">
                  Smart Features
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 animate-pulse"></div>
                    <span>GPS tracking and anti-theft alarm system</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-lime-400 rounded-full mt-2 animate-pulse"></div>
                    <span>Mobile app connectivity for ride statistics</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 animate-pulse"></div>
                    <span>Multiple riding modes (Eco, Normal, Sport)</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 animate-pulse"></div>
                    <span>LED headlight and taillight integration</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-lime-400 rounded-full mt-2 animate-pulse"></div>
                    <span>Regenerative braking system</span>
                  </li>
                  {isAuthenticated && (
                    <>
                      <li className="flex items-start space-x-3 border-t border-lime-500/20 pt-3 mt-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2 animate-pulse"></div>
                        <span className="text-green-300">Premium: Voice control integration</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-lime-400 rounded-full mt-2 animate-pulse"></div>
                        <span className="text-lime-300">Premium: Predictive maintenance alerts</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 animate-pulse"></div>
                        <span className="text-yellow-300">Premium: Custom riding profiles</span>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/60 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50 hover:border-green-500/30 transition-all duration-300 relative overflow-hidden">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-400/5 via-lime-400/5 to-yellow-400/5 opacity-50" />
              
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-green-400 to-lime-400 bg-clip-text text-transparent">
                  Sustainability Focus
                </h3>
                <p className="text-gray-300 mb-4">
                  Our electric bike is designed with environmental responsibility at its core. 
                  We use sustainable materials and manufacturing processes to minimize our carbon footprint.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <div className="w-1 h-1 bg-green-400 rounded-full"></div>
                    <span>100% recyclable aluminum frame</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-1 h-1 bg-lime-400 rounded-full"></div>
                    <span>Eco-friendly battery technology</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-1 h-1 bg-yellow-400 rounded-full"></div>
                    <span>Carbon-neutral shipping</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-1 h-1 bg-green-400 rounded-full"></div>
                    <span>Reduces CO2 emissions by 90% vs cars</span>
                  </li>
                  {isAuthenticated && (
                    <>
                      <li className="flex items-center space-x-2 border-t border-green-500/20 pt-2 mt-2">
                        <div className="w-1 h-1 bg-lime-400 rounded-full"></div>
                        <span className="text-lime-300">Premium: Solar charging compatibility</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-1 h-1 bg-yellow-400 rounded-full"></div>
                        <span className="text-yellow-300">Premium: Tree planting program participation</span>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/60 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50 hover:border-yellow-500/30 transition-all duration-300 relative overflow-hidden">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-lime-400/5 to-green-400/5 opacity-50" />
              
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-lime-400 bg-clip-text text-transparent">
                  Development Timeline
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
                    <div>
                      <div className="font-semibold text-white">Q1 2024 - Concept Design</div>
                      <div className="text-sm text-gray-400">Initial prototyping and testing</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-4 h-4 bg-lime-400 rounded-full animate-pulse"></div>
                    <div>
                      <div className="font-semibold text-white">Q2 2024 - Engineering</div>
                      <div className="text-sm text-gray-400">Motor and battery optimization</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
                    <div>
                      <div className="font-semibold text-white">Q3 2024 - Testing</div>
                      <div className="text-sm text-gray-400">Real-world performance validation</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
                    <div>
                      <div className="font-semibold text-white">Q4 2024 - Production</div>
                      <div className="text-sm text-gray-400">Manufacturing and quality control</div>
                    </div>
                  </div>
                  {isAuthenticated && (
                    <div className="flex items-center space-x-4 border-t border-yellow-500/20 pt-4 mt-4">
                      <div className="w-4 h-4 bg-lime-400 rounded-full animate-pulse"></div>
                      <div>
                        <div className="font-semibold text-lime-300">Q1 2025 - Premium Launch</div>
                        <div className="text-sm text-lime-400">Exclusive features for authenticated users</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/60 backdrop-blur-xl rounded-3xl p-12 border border-gray-700/50 hover:border-green-500/30 transition-all duration-300 relative overflow-hidden">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-400/5 via-lime-400/5 to-yellow-400/5 opacity-50" />
            
            <div className="relative z-10 space-y-8">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
                Ready to Experience the Future?
              </h3>
              
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                {isAuthenticated 
                  ? `Welcome ${user?.email?.split('@')[0]}! Access your personalized dashboard or book a service.`
                  : 'Join thousands of riders who have already made the switch to sustainable transportation.'
                }
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button 
                  onClick={handleGetStartedClick}
                  className="group bg-gradient-to-r from-green-500 via-lime-500 to-yellow-500 hover:from-green-600 hover:via-lime-600 hover:to-yellow-600 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-3 shadow-2xl hover:shadow-green-500/30 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10">
                    {isAuthenticated ? 'Go to Dashboard' : 'Get Started'}
                  </span>
                  <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform relative z-10" />
                </button>
                
                <button 
                  onClick={handleExploreServicesClick}
                  className="group bg-transparent border-2 border-green-500/50 hover:border-green-400 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-3 backdrop-blur-sm hover:bg-green-500/10 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-lime-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Play size={20} className="relative z-10" />
                  <span className="relative z-10">
                    {isAuthenticated ? 'Book Service' : 'Explore Services'}
                  </span>
                </button>
                
                <button 
                  onClick={handleContactClick}
                  className="group bg-transparent border-2 border-lime-500/50 hover:border-lime-400 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-3 backdrop-blur-sm hover:bg-lime-500/10 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-lime-400/10 to-yellow-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10">Contact Us</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform relative z-10" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;