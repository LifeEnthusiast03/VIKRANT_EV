import React from 'react';
import { Crown, Wrench, Zap, Cpu, Globe } from 'lucide-react';

const teamdata = [
  {
    name: "Nurhak Mondal",
    college: "Institute of Engineering and Management",
    department: "Electronics & Communication Engineering",
    phone: "7063694560",
    email: "mondalnur@gmail.com",
    image: "/NM.jpg",
    team: "Team Leads",
    projectRole: "Project Lead",
    specialization: "Battery Design, PCB Development, IoT Sensors"
  },
  {
    name: "Abir Sural",
    college: "Institute of Engineering and Management",
    department: "Electronics and Communication Engineering",
    phone: "+91-7585830546",
    email: "suralabir40@gmail.com",
    image: "/Abir.webp",
    team: "Team Leads",
    projectRole: "Project Co-lead",
    specialization: "Web Development, Electrical & Electronics Designing, Project Management, BMS Integration"
  },
  {
    name: "Sharukh Khan",
    college: "Institute of Engineering and Management",
    department: "Mechanical Engineering",
    phone: "+91-747750144",
    email: "41.o.sharukhkhan@gmail.com",
    image: "/SK.jpg",
    team: "Mechanical Team",
    projectRole: "CAD & 3D Designer",
    specialization: "Python, Solidworks, Fusion 360, Engineering Drawing, Ansys Analysis"
  },
  {
    name: "Mrinmoy Basu",
    college: "Institute of Engineering & Management",
    department: "Electronics and Communication Engineering",
    phone: "+91-7003352399",
    email: "rkms2022mrinmoybasudetce25@gmail.com",
    image: "/MB.jpg",
    team: "Mechanical Team",
    projectRole: "Mechanical Team",
    specialization: "Technical proficiency, problem-solving abilities, and strong communication and interpersonal skills"
  },
  {
    name: "Bratyabandhu Bhattacharyya",
    college: "Institute of Engineering & Management",
    department: "Electronics and Communication Engineering",
    phone: "+91-8240005041",
    email: "bratyabandhu@gmail.com",
    image: "/bb.JPG",
    team: "Electrical Team",
    projectRole: "Electrical Sub-system Designer",
    specialization: "EasyEDA, Proteus, Electrical Relays"
  },
  {
    name: "Debabrata Ghosh",
    college: "Institute of Engineering and Management",
    department: "Electrical and Electronics Engineering",
    phone: "+91-7439502673",
    email: "debabratag542@gmail.com",
    image: "/DG.jpg",
    team: "Electrical Team",
    projectRole: "Electrical Hardware and Simulation Lead",
    specialization: "Python, Java, React, Node.js, Express, REST APIs, React Native, MongoDB, PostgreSQL, TensorFlow, PyTorch, scikit-learn, Pandas, NumPy, LLMs, DSA, Full-stack Dev, Git, Docker, Jupyter, Google Colab, Arduino, SCADA, PLC, PVsyst, Electrical Safety, Substation Ops, VCBs, Transformers"
  },
  {
    name: "Priyadarshi Gupta",
    college: "Institute of Engineering and Management",
    department: "Electronics and Communication Engineering",
    phone: "+91-6290359268",
    email: "priyadarshigupta2004@gmail.com",
    image: "/Priyadarshi.jpg",
    team: "Electrical Team",
    projectRole: "Battery Management System",
    specialization: "Analog circuits, circuit analysis , simulation"
  },
  {
    name: "Abhijit Shaw",
    college: "Institute of Engineering and Management",
    department: "Electronics and Communication Engineering",
    phone: "+91-6291505774",
    email: "26shaw.abhijit@gmail.com",
    image: "/Abhijit.png",
    team: "Electronics & IoT Team",
    projectRole: "EV Fabrication & Battery Assembly",
    specialization: "IoT, Embedded Systems, Digital Electronics, Analog Circuit Design, PCB Design, Microcontroller Interfacing, LTspice, Vivado, MATLAB"
  },
  {
    name: "Aranya Rath",
    college: "Institute of Engineering and Management",
    department: "Computer Science and Engineering (IoT-CSBT)",
    phone: "+91-8274090864",
    email: "arjundutt01238@gmail.com",
    image: "/AR.jpg",
    team: "Electronics & IoT Team",
    projectRole: "IoT monitoring, and display feed",
    specialization: "Web Dev, SolidWorks, IoT coding and circuits, hardware materialing"
  },
  {
    name: "Sougata Saha",
    college: "Jadavpur University",
    department: "Information Technology",
    phone: "+91-6296824383",
    email: "sahasougata820@gmail.com",
    image: "/sougata.jpg",
    team: "Software Team",
    projectRole: "Software Team Lead",
    specialization: "Express, React, MongoDB, RestApi, Java, C++"
  },
  {
    name: "Subhadip Layek",
    college: "Institute of Engineering and Management",
    department: "Electrical and Electronics Engineering",
    phone: "+91-8617695092",
    email: "subhadiplayek47@gmail.com",
    image: "/Subhadip.jpg",
    team: "Software Team",
    projectRole: "Full Stack Developer",
    specialization: "Express, Ejs, React, Postgre SQL, RestApi, C++, Node.js, Java, C"
  }
];

const teamCategories = [
  {
    title: "Team Leads",
    icon: <Crown className="w-6 h-6" />,
    color: "from-yellow-500 to-orange-500",
    bgColor: "",
    pinStyle: "diamond",
    members: [teamdata[0], teamdata[1]] // Project Lead and Co-lead
  },
  {
    title: "Mechanical Team",
    icon: <Wrench className="w-6 h-6" />,
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-500/10",
    pinStyle: "hexagon",
    members: [teamdata[2], teamdata[3]] // CAD Designer and Mechanical Team
  },
  {
    title: "Electrical Team",
    icon: <Zap className="w-6 h-6" />,
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-500/10",
    pinStyle: "star",
    members: [teamdata[5], teamdata[4], teamdata[6]] // Electrical designers and hardware lead
  },
  {
    title: "Electronics & IoT Team",
    icon: <Cpu className="w-6 h-6" />,
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-500/10",
    pinStyle: "circuit",
    members: [teamdata[7], teamdata[8]] // EV Fabrication and IoT monitoring
  },
  {
    title: "Software Team",
    icon: <Globe className="w-6 h-6" />,
    color: "from-indigo-500 to-blue-500",
    bgColor: "bg-indigo-500/10",
    pinStyle: "shield",
    members: [teamdata[9], teamdata[10]] // Cloud & ML, Software Lead, Frontend
  }
];

export { teamCategories, teamdata };