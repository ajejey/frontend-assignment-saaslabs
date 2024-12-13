import { useState, useEffect, useRef } from 'react';

export function useProjectData() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 5;
  const fetchedRef = useRef(false);

  const fetchProjects = async () => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;
    
    setIsLoading(true);
    try {
      const response = await fetch('https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json');
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      setProjects(data);
    } catch (err) {
      setError(err);
      fetchedRef.current = false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Pagination logic
  const paginatedProjects = projects.slice(
    (page - 1) * ITEMS_PER_PAGE, 
    page * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE);

  return {
    projects: paginatedProjects,
    isLoading,
    error,
    page,
    totalPages,
    setPage
  };
}
