import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, Zap, Battery, Shield, Cpu, Star, Award, Globe } from 'lucide-react';
import * as THREE from 'three';

// Enhanced 3D Bike Component with Realistic Rotating Model
const Realistic3DBike = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const bikeRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Clear any existing content
    mountRef.current.innerHTML = '';

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(500, 500);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    mountRef.current.appendChild(renderer.domElement);

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const pointLight1 = new THREE.PointLight(0x84cc16, 0.8, 100);
    pointLight1.position.set(-10, 5, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xeab308, 0.8, 100);
    pointLight2.position.set(10, -5, -10);
    scene.add(pointLight2);

    // Create realistic bike geometry - FIX: Added missing bikeGroup declaration
    const bikeGroup = new THREE.Group();

    // Frame
    const frameGeometry = new THREE.CylinderGeometry(0.05, 0.05, 3, 8);
    const frameMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x166534,
      shininess: 100,
      specular: 0x111111
    });
    
    const mainFrame = new THREE.Mesh(frameGeometry, frameMaterial);
    mainFrame.rotation.z = Math.PI / 6;
    mainFrame.position.set(0, 0, 0);
    bikeGroup.add(mainFrame);

    const topFrame = new THREE.Mesh(frameGeometry, frameMaterial);
    topFrame.rotation.z = -Math.PI / 8;
    topFrame.position.set(0.5, 0.8, 0);
    topFrame.scale.set(1, 0.8, 1);
    bikeGroup.add(topFrame);

    // Wheels
    const wheelGeometry = new THREE.TorusGeometry(0.8, 0.1, 16, 100);
    const wheelMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x333333,
      shininess: 50
    });

    const frontWheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
    frontWheel.position.set(1.5, -1, 0);
    frontWheel.rotation.y = Math.PI / 2;
    bikeGroup.add(frontWheel);

    const rearWheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
    rearWheel.position.set(-1.5, -1, 0);
    rearWheel.rotation.y = Math.PI / 2;
    bikeGroup.add(rearWheel);

    // Battery pack
    const batteryGeometry = new THREE.BoxGeometry(1.2, 0.3, 0.4);
    const batteryMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x84cc16,
      emissive: 0x223300,
      shininess: 100
    });
    const battery = new THREE.Mesh(batteryGeometry, batteryMaterial);
    battery.position.set(0, -0.2, 0);
    bikeGroup.add(battery);

    // Seat
    const seatGeometry = new THREE.BoxGeometry(0.6, 0.1, 0.3);
    const seatMaterial = new THREE.MeshPhongMaterial({ color: 0x444444 });
    const seat = new THREE.Mesh(seatGeometry, seatMaterial);
    seat.position.set(-0.5, 1.2, 0);
    bikeGroup.add(seat);

    // Handlebars
    const handlebarGeometry = new THREE.CylinderGeometry(0.02, 0.02, 1, 8);
    const handlebarMaterial = new THREE.MeshPhongMaterial({ color: 0x666666 });
    const handlebar = new THREE.Mesh(handlebarGeometry, handlebarMaterial);
    handlebar.rotation.z = Math.PI / 2;
    handlebar.position.set(1.8, 1, 0);
    bikeGroup.add(handlebar);

    // LED strips
    const ledGeometry = new THREE.BoxGeometry(0.8, 0.05, 0.05);
    const ledMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x84cc16,
      emissive: 0x4ade80,
      transparent: true,
      opacity: 0.8
    });
    const led1 = new THREE.Mesh(ledGeometry, ledMaterial);
    led1.position.set(0, 0.3, 0.25);
    bikeGroup.add(led1);

    const led2 = new THREE.Mesh(ledGeometry, ledMaterial);
    led2.position.set(0, 0.3, -0.25);
    bikeGroup.add(led2);

    scene.add(bikeGroup);
    bikeRef.current = bikeGroup;

    camera.position.set(0, 2, 5);
    camera.lookAt(0, 0, 0);

    sceneRef.current = scene;
    rendererRef.current = renderer;

    // Animation loop
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      
      if (bikeRef.current) {
        bikeRef.current.rotation.y += 0.01;
        bikeRef.current.rotation.x = Math.sin(Date.now() * 0.001) * 0.1;
      }
      
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (mountRef.current && renderer.domElement && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      
      // Clean up geometries and materials
      scene.traverse((object) => {
        if (object.geometry) {
          object.geometry.dispose();
        }
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
    };
  }, []);

  return (
    <div className="relative">
      <div ref={mountRef} className="w-full h-full" />
      
      {/* Enhanced floating elements */}
      <div className="absolute -top-5 -left-5 w-16 h-16 bg-gradient-to-r from-green-400/30 to-lime-400/30 rounded-full blur-xl animate-pulse" />
      <div className="absolute -bottom-5 -right-5 w-20 h-20 bg-gradient-to-r from-yellow-400/30 to-green-400/30 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/3 -right-8 w-12 h-12 bg-gradient-to-r from-lime-400/30 to-yellow-400/30 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }} />
      
      {/* Tech indicators */}
      <div className="absolute top-8 left-4 bg-black/70 backdrop-blur-sm rounded-xl px-4 py-2 border border-green-500/40 animate-bounce" style={{ animationDelay: '0.5s' }}>
        <div className="text-xs text-green-400 font-bold flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          Smart AI
        </div>
      </div>
      
      <div className="absolute bottom-16 right-4 bg-black/70 backdrop-blur-sm rounded-xl px-4 py-2 border border-lime-500/40 animate-bounce" style={{ animationDelay: '1.5s' }}>
        <div className="text-xs text-lime-400 font-bold flex items-center gap-2">
          <div className="w-2 h-2 bg-lime-400 rounded-full animate-pulse" />
          Turbo Mode
        </div>
      </div>

      <div className="absolute top-1/2 left-2 bg-black/70 backdrop-blur-sm rounded-xl px-4 py-2 border border-yellow-500/40 animate-bounce" style={{ animationDelay: '2.5s' }}>
        <div className="text-xs text-yellow-400 font-bold flex items-center gap-2">
          <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
          Zero Emission
        </div>
      </div>

      <div className="absolute top-1/2 left-2 bg-black/70 backdrop-blur-sm rounded-xl px-4 py-2 border border-yellow-500/40 animate-bounce" style={{ animationDelay: '2.5s' }}>
        <div className="text-xs text-yellow-400 font-bold flex items-center gap-2">
          <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
          Energy Efficient
        </div>
      </div>
    </div>
  );
};

const HomePage = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  // Navigation function for Experience Vikrant button
  const handleExperienceClick = () => {
    // Option 1: If you're using React Router
    // navigate('/project-details');
    
    // Option 2: If you're using simple anchor navigation
    const projectSection = document.getElementById('project-details');
    if (projectSection) {
      projectSection.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Option 3: If you have a custom navigation function
    // props.onNavigateToProject?.();
    
    // Option 4: Simple URL navigation
    // window.location.href = '#project-details';
    
    console.log('Navigating to Project Details page...');
  };

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const stats = [
    { value: "80+", label: "Miles Range", icon: Battery, color: "from-green-400 to-lime-400" },
    { value: "35", label: "MPH Top Speed", icon: Zap, color: "from-yellow-400 to-lime-400" },
    { value: "2-3", label: "Hours Charge", icon: Shield, color: "from-lime-400 to-green-400" },
    { value: "AI+", label: "Neural Control", icon: Cpu, color: "from-green-500 to-yellow-400" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden">
      {/* Enhanced Dynamic Background */}
      <div 
        className="fixed inset-0 opacity-40 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
            rgba(34, 197, 94, 0.15) 0%, 
            rgba(132, 204, 22, 0.1) 30%,
            rgba(234, 179, 8, 0.08) 60%, 
            transparent 100%)`
        }}
      />
      
      {/* Animated Grid Background */}
      <div className="fixed inset-0 opacity-15">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(34, 197, 94, 0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34, 197, 94, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            transform: `translate(${scrollY * 0.1}px, ${scrollY * 0.05}px)`
          }}
        />
      </div>

      {/* Floating particles */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-green-400 rounded-full animate-ping" style={{ animationDelay: '0s' }} />
        <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-lime-400 rounded-full animate-ping" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-ping" style={{ animationDelay: '4s' }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 pt-20">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
            {/* Left Content - Enhanced */}
            <div 
              ref={heroRef}
              className="space-y-10 transform transition-all duration-1000"
              style={{
                transform: `translateY(${scrollY * 0.1}px)`,
                opacity: 1
              }}
            >
              <div className="space-y-8">
                {/* Brand Badge */}
                <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500/20 via-lime-500/20 to-yellow-500/20 rounded-full border border-green-500/40 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
                  <Star className="w-5 h-5 mr-3 text-green-400 animate-spin" style={{ animationDuration: '3s' }} />
                  <span className="text-sm font-bold bg-gradient-to-r from-green-400 to-lime-400 bg-clip-text text-transparent">
                    Next-Gen Electric Revolution
                  </span>
                  <Award className="w-5 h-5 ml-3 text-yellow-400" />
                </div>
                
                {/* Main Heading */}
                <div className="space-y-4">
                  <h1 className="text-8xl lg:text-9xl font-black leading-tight tracking-tight">
                    <span className="bg-gradient-to-r from-white via-green-200 to-white bg-clip-text text-transparent">
                      VIKRANT
                    </span>
                    <span className="bg-gradient-to-r from-green-400 via-lime-400 to-yellow-400 bg-clip-text text-transparent block animate-pulse font-extrabold">
                      EV
                    </span>
                  </h1>
                  
                  <div className="text-2xl lg:text-3xl font-bold text-gray-300 tracking-wide">
                    <span className="bg-gradient-to-r from-green-400 to-lime-400 bg-clip-text text-transparent">
                      Redefining
                    </span>{' '}
                    <span className="text-white">Urban Mobility</span>
                  </div>
                </div>
                
                {/* Enhanced Description */}
                <div className="space-y-4">
                  <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-2xl font-medium">
                    Step into tomorrow with India's most advanced electric bike. 
                    <span className="text-green-400 font-semibold"> Intelligent. Sustainable. Unstoppable.</span>
                  </p>
                  
                  <div className="flex items-center space-x-6 text-sm text-gray-400">
                    <div className="flex items-center space-x-2">
                      <Globe className="w-4 h-4 text-green-400" />
                      <span>Carbon Neutral</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Zap className="w-4 h-4 text-lime-400" />
                      <span>Lightning Fast</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Shield className="w-4 h-4 text-yellow-400" />
                      <span>Military Grade</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Enhanced Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div 
                      key={index}
                      className="group bg-gradient-to-br from-gray-800/40 to-gray-900/60 backdrop-blur-xl rounded-3xl p-6 border border-gray-700/50 hover:border-gray-600/70 transition-all duration-500 hover:transform hover:scale-110 cursor-pointer relative overflow-hidden"
                      style={{
                        boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4)'
                      }}
                    >
                      {/* Glow effect */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                      
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                          <Icon className={`w-7 h-7 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} />
                          <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${stat.color} animate-pulse group-hover:animate-spin`} />
                        </div>
                        <div className={`text-4xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                          {stat.value}
                        </div>
                        <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors font-semibold">
                          {stat.label}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Enhanced CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-6">
                <button className="group bg-gradient-to-r from-green-500 via-lime-500 to-yellow-500 hover:from-green-600 hover:via-lime-600 hover:to-yellow-600 text-white font-bold py-5 px-10 rounded-full transition-all duration-300 transform hover:scale-110 hover:rotate-1 flex items-center justify-center space-x-3 shadow-2xl hover:shadow-green-500/30 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10 text-lg">Experience Vikrant</span>
                  <ChevronRight size={22} className="group-hover:translate-x-2 transition-transform relative z-10" />
                </button>
                
                <button className="group bg-transparent border-2 border-green-500/50 hover:border-green-400 text-white font-bold py-5 px-10 rounded-full transition-all duration-300 transform hover:scale-110 hover:-rotate-1 flex items-center justify-center space-x-3 backdrop-blur-sm hover:bg-green-500/10 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-lime-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10 text-lg">Watch Revolution</span>
                  <div className="w-4 h-4 rounded-full bg-gradient-to-r from-green-400 to-lime-400 animate-pulse relative z-10" />
                </button>
              </div>
            </div>

            {/* Right 3D Bike - Enhanced Realistic Model */}
            <div 
              className="flex justify-center items-center transform transition-all duration-1000"
              style={{
                transform: `translateY(${scrollY * -0.03}px) translateX(${mousePosition.x * 0.01 - 0.5}px)`,
                opacity: 1
              }}
            >
              <div className="relative w-[500px] h-[500px]">
                <Realistic3DBike />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-3 opacity-70 hover:opacity-100 transition-all duration-300 hover:scale-110">
        <div className="text-sm text-gray-400 font-semibold tracking-wide">Discover More</div>
        <div className="w-8 h-12 border-2 border-green-500/60 rounded-full flex justify-center relative overflow-hidden">
          <div className="w-2 h-4 bg-gradient-to-b from-green-400 via-lime-400 to-yellow-400 rounded-full mt-2 animate-bounce" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-400/20 to-transparent animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;