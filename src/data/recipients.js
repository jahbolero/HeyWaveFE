const generateRecipients = (count) => {
  const categories = ['mentorship', 'funding', 'qa', 'development', 'design', 'marketing'];
  const expertise = ['Blockchain', 'DeFi', 'Smart Contracts', 'Web3', 'Frontend', 'Backend', 'UI/UX', 'TokenEconomics'];
  
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    name: `User ${index + 1}`,
    category: categories[Math.floor(Math.random() * categories.length)],
    expertise: expertise[Math.floor(Math.random() * expertise.length)],
    description: `Expert in ${expertise[Math.floor(Math.random() * expertise.length)]} with ${Math.floor(Math.random() * 10 + 1)} years of experience.`,
    bidMinimum: Math.floor(Math.random() * 900 + 100),
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${index}`,
    rating: (Math.random() * 2 + 3).toFixed(1),
    completedProjects: Math.floor(Math.random() * 50),
  }));
};

export const recipients = generateRecipients(100);
export default recipients; 