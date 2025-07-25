const getTeamData = (req, res) => {
  try {
    const teamData = [
      {
        id: 1,
        name: 'Alex Johnson',
        role: 'Lead Engineer',
        bio: 'Passionate about sustainable transportation and electric vehicle technology.',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
        github: 'https://github.com',
        linkedin: 'https://linkedin.com',
        email: 'alex@haquenich.com'
      },
      {
        id: 2,
        name: 'Sarah Chen',
        role: 'Design Director',
        bio: 'Creating beautiful and functional designs for the future of mobility.',
        image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
        github: 'https://github.com',
        linkedin: 'https://linkedin.com',
        email: 'sarah@haquenich.com'
      },
      {
        id: 3,
        name: 'Michael Rodriguez',
        role: 'Battery Specialist',
        bio: 'Expert in lithium-ion battery technology and energy management systems.',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
        github: 'https://github.com',
        linkedin: 'https://linkedin.com',
        email: 'michael@haquenich.com'
      }
    ];

    res.status(200).json(teamData);
  } catch (error) {
    console.error('Error fetching team data:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to fetch team data'
    });
  }
};

export { getTeamData };