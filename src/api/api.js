import { format, addDays } from 'date-fns';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Available service tags that users can select
const SERVICE_TAGS = [
  'Mentoring',
  'Development',
  'Code Review',
  'Consulting',
  'Q&A Session',
  'UI/UX Design',
  'Artist',
  'Technical Writing',
  'Community Management',
  'Marketing',
  'TokenEconomics',
  'Smart Contract Audit'
];

// Generate users with their services
const generateUsers = (count) => {
  return Array.from({ length: count }, (_, id) => ({
    id: `user-${id + 1}`,
    name: `User ${id + 1}`,
    username: `user${id + 1}`,
    bio: `Experienced developer in the TON ecosystem with ${Math.floor(Math.random() * 8) + 2} years of experience`,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=user${id}`,
    rating: (4 + Math.random()).toFixed(1),
    verified: Math.random() > 0.7,
    completedServices: Math.floor(Math.random() * 50) + 1,
    totalEarned: Math.floor(Math.random() * 10000) + 1000,
    joinedDate: format(addDays(new Date(), -Math.floor(Math.random() * 365)), 'yyyy-MM-dd'),
    languages: ['English', 'Russian', 'Spanish'].slice(0, Math.floor(Math.random() * 3) + 1),
    socialLinks: {
      telegram: `@user${id + 1}`,
      github: `github/user${id + 1}`,
      twitter: `twitter/user${id + 1}`
    }
  }));
};

// Generate services for each user
const generateServices = (users) => {
  const services = [];
  
  users.forEach(user => {
    // Each user offers 1-4 services
    const numServices = Math.floor(Math.random() * 3) + 1;
    const userTags = [...SERVICE_TAGS]
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.floor(Math.random() * 3) + 1);

    for (let i = 0; i < numServices; i++) {
      services.push({
        id: `service-${user.id}-${i}`,
        userId: user.id,
        title: `${userTags[0]} Session with ${user.name}`,
        description: `Get personalized ${userTags[0].toLowerCase()} assistance from an experienced professional.`,
        tags: userTags,
        pricing: {
          basePrice: Math.floor(Math.random() * 500) + 100,
          currency: 'TON'
        },
        duration: [30, 60, 90][Math.floor(Math.random() * 3)],
        availability: {
          timezone: 'UTC',
          slots: generateTimeSlots(),
        },
        stats: {
          completedSessions: Math.floor(Math.random() * 30),
          totalEarned: Math.floor(Math.random() * 5000),
          averageRating: (4 + Math.random()).toFixed(1)
        },
        status: Math.random() > 0.8 ? 'booked' : 'available'
      });
    }
  });

  return services;
};

// Generate available time slots
const generateTimeSlots = () => {
  const slots = [];
  const days = 7;
  
  for (let day = 0; day < days; day++) {
    const numSlots = Math.floor(Math.random() * 5) + 1;
    for (let slot = 0; slot < numSlots; slot++) {
      slots.push({
        date: format(addDays(new Date(), day), 'yyyy-MM-dd'),
        time: `${9 + Math.floor(Math.random() * 8)}:00`,
        available: Math.random() > 0.3
      });
    }
  }
  
  return slots;
};

// Initialize data
const users = generateUsers(20);
const services = generateServices(users);

// API endpoints
const api = {
  // User endpoints
  getUsers: async ({ page = 1, limit = 10, search = '' }) => {
    await delay(300);
    let filtered = [...users];
    
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(user => 
        user.name.toLowerCase().includes(searchLower) ||
        user.username.toLowerCase().includes(searchLower)
      );
    }
    
    return {
      users: filtered.slice((page - 1) * limit, page * limit),
      total: filtered.length
    };
  },

  getUserById: async (userId) => {
    await delay(200);
    const user = users.find(u => u.id === userId);
    if (!user) throw new Error('User not found');
    return user;
  },

  // Service endpoints
  getServices: async ({ page = 1, limit = 10, tags = [], search = '' }) => {
    await delay(300);
    let filtered = [...services];
    
    if (tags.length > 0) {
      filtered = filtered.filter(service => 
        tags.some(tag => service.tags.includes(tag))
      );
    }

    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(service => 
        service.title.toLowerCase().includes(searchLower) ||
        service.description.toLowerCase().includes(searchLower)
      );
    }

    return {
      services: filtered.slice((page - 1) * limit, page * limit),
      total: filtered.length,
      hasMore: filtered.length > page * limit
    };
  },

  getServiceById: async (serviceId) => {
    await delay(200);
    const service = services.find(s => s.id === serviceId);
    if (!service) throw new Error('Service not found');
    return {
      ...service,
      user: users.find(u => u.id === service.userId)
    };
  },

  // Tags endpoint
  getServiceTags: async () => {
    await delay(100);
    return SERVICE_TAGS;
  },

  getDashboardData: async () => {
    await delay(300);
    
    const trendingServices = services
      .sort(() => 0.5 - Math.random())
      .slice(0, 4)
      .map(service => ({
        ...service,
        progress: Math.floor(Math.random() * 100),
        timeLeft: `${Math.floor(Math.random() * 24)}h ${Math.floor(Math.random() * 60)}m`,
      }));

    const recentActivities = services
      .slice(0, 5)
      .map(service => ({
        id: `activity-${service.id}`,
        userImage: users.find(u => u.id === service.userId)?.avatar,
        userName: users.find(u => u.id === service.userId)?.name,
        action: [
          'placed a bid',
          'won auction',
          'started a session',
          'left a review',
          'scheduled a meeting'
        ][Math.floor(Math.random() * 5)],
        amount: service.pricing.basePrice,
        timestamp: `${Math.floor(Math.random() * 24)}h ago`,
      }));

    return {
      stats: {
        activeBids: Math.floor(Math.random() * 20) + 5,
        wonAuctions: Math.floor(Math.random() * 15),
        tonSpent: Math.floor(Math.random() * 5000) + 1000,
      },
      trendingAuctions: trendingServices,
      recentActivity: recentActivities,
    };
  }
};

export default api; 