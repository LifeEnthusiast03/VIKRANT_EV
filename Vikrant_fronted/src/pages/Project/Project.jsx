import React  from "react";

  const ProjectPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white pt-20">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6">Project Details</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover the cutting-edge technology and innovative features that make our electric bike extraordinary
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700">
              <h3 className="text-2xl font-bold mb-4 text-blue-400">Technical Specifications</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-300">Motor Power</span>
                  <span className="font-semibold">750W Brushless</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Battery Capacity</span>
                  <span className="font-semibold">48V 15Ah Lithium-ion</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Max Range</span>
                  <span className="font-semibold">50+ Miles</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Top Speed</span>
                  <span className="font-semibold">28 MPH</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Frame Material</span>
                  <span className="font-semibold">Aluminum Alloy</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Weight</span>
                  <span className="font-semibold">55 lbs</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700">
              <h3 className="text-2xl font-bold mb-4 text-purple-400">Smart Features</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                  <span>GPS tracking and anti-theft alarm system</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                  <span>Mobile app connectivity for ride statistics</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                  <span>Multiple riding modes (Eco, Normal, Sport)</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                  <span>LED headlight and taillight integration</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                  <span>Regenerative braking system</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700">
              <h3 className="text-2xl font-bold mb-4 text-green-400">Sustainability Focus</h3>
              <p className="text-gray-300 mb-4">
                Our electric bike is designed with environmental responsibility at its core. 
                We use sustainable materials and manufacturing processes to minimize our carbon footprint.
              </p>
              <ul className="space-y-2 text-sm">
                <li>• 100% recyclable aluminum frame</li>
                <li>• Eco-friendly battery technology</li>
                <li>• Carbon-neutral shipping</li>
                <li>• Reduces CO2 emissions by 90% vs cars</li>
              </ul>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700">
              <h3 className="text-2xl font-bold mb-4 text-orange-400">Development Timeline</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-4 h-4 bg-orange-400 rounded-full"></div>
                  <div>
                    <div className="font-semibold">Q1 2024 - Concept Design</div>
                    <div className="text-sm text-gray-400">Initial prototyping and testing</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-4 h-4 bg-orange-400 rounded-full"></div>
                  <div>
                    <div className="font-semibold">Q2 2024 - Engineering</div>
                    <div className="text-sm text-gray-400">Motor and battery optimization</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-4 h-4 bg-orange-400 rounded-full"></div>
                  <div>
                    <div className="font-semibold">Q3 2024 - Testing</div>
                    <div className="text-sm text-gray-400">Real-world performance validation</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                  <div>
                    <div className="font-semibold">Q4 2024 - Production</div>
                    <div className="text-sm text-gray-400">Manufacturing and quality control</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  export default ProjectPage;