

export const calculatePercentageFunded = (project) => {
  return project['percentage.funded'] || 0;
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount || 0);
};

export const sortProjects = (projects, sortKey = 'percentage.funded', ascending = false) => {
  return [...projects].sort((a, b) => {
    const valueA = a[sortKey] || 0;
    const valueB = b[sortKey] || 0;
    
    return ascending 
      ? valueA - valueB 
      : valueB - valueA;
  });
};
