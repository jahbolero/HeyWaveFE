const users = [
  {
    id: 1,
    name: "Alex Thompson",
    role: "DeFi Architect",
    expertise: ["Smart Contracts", "DeFi", "TON"],
    rating: 4.9,
    completedProjects: 23,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    verified: true
  },
  // ... more users (20 total)
];

const generateOpportunities = () => {
  const opportunities = [];
  let opportunityId = 1;

  // Categories and their specific services
  const serviceTypes = {
    "Mentoring": [
      "1-on-1 DeFi Development Session",
      "Smart Contract Architecture Review",
      "TON Ecosystem Deep Dive",
      "Blockchain Architecture Consultation"
    ],
    "Code Review": [
      "Smart Contract Security Audit",
      "Code Quality Assessment",
      "Performance Optimization Review",
      "Architecture Review"
    ],
    "Consulting": [
      "TokenEconomics Design",
      "DeFi Strategy Planning",
      "Technical Architecture Planning",
      "Security Assessment"
    ],
    "Q&A Session": [
      "Open Q&A about TON",
      "Technical Implementation Q&A",
      "Project Direction Discussion",
      "Market Strategy Q&A"
    ]
  };

  // Generate 2-4 opportunities per user
  users.forEach(user => {
    const numOpportunities = Math.floor(Math.random() * 3) + 2; // 2-4 opportunities
    const categories = Object.keys(serviceTypes);

    for (let i = 0; i < numOpportunities; i++) {
      const category = categories[Math.floor(Math.random() * categories.length)];
      const services = serviceTypes[category];
      const service = services[Math.floor(Math.random() * services.length)];

      opportunities.push({
        id: opportunityId++,
        userId: user.id,
        name: user.name,
        image: user.image,
        category,
        description: service,
        duration: Math.floor(Math.random() * 3 + 1) * 30, // 30, 60, or 90 minutes
        currentBid: Math.floor(Math.random() * 1500 + 500), // 500-2000 TON
        minBid: Math.floor(Math.random() * 300 + 200), // 200-500 TON
        totalBids: Math.floor(Math.random() * 10),
        rating: user.rating,
        expertise: user.expertise,
        availability: {
          nextAvailable: new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000), // Next 7 days
          timeZone: "UTC",
        },
        verified: user.verified,
        completedProjects: user.completedProjects
      });
    }
  });

  return opportunities;
};

export const opportunities = generateOpportunities();
export const getUser = (userId) => users.find(user => user.id === userId);
export default opportunities; 