import React, { useMemo } from 'react';
import { useProjectData } from '../hooks/useProjectData';
import { calculatePercentageFunded, formatCurrency } from '../utils/dataProcessing';
import TableRow from './TableRow';
import Pagination from './Pagination';
import styles from '../styles/ProjectTable.module.css';
import LoadingSkeleton from './LoadingSkeleton';

export default function ProjectTable() {
  const { 
    projects, 
    isLoading, 
    error, 
    page, 
    totalPages, 
    setPage 
  } = useProjectData();

  const processedProjects = useMemo(() => 
    projects.map((project, index) => ({
      ...project,
      sNo: (page - 1) * 5 + index + 1,
      percentageFunded: calculatePercentageFunded(project),
      formattedPledged: formatCurrency(project['amt.pledged'])
    })), 
    [projects, page]
  );

  
  const emptyRows = useMemo(() => {
    const rowsNeeded = 5 - processedProjects.length;
    return Array(Math.max(0, rowsNeeded)).fill(null);
  }, [processedProjects.length]);

  if (isLoading) {
    return (
      <div className={styles.tableContainer} role="region" aria-labelledby="project-table-title">
        <LoadingSkeleton />
      </div>
    );
  }
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className={styles.tableContainer} role="region" aria-labelledby="project-table-title">
      <h2 id="project-table-title" className="sr-only">Kickstarter Projects</h2>
      <table className={styles.table} aria-describedby="project-table-description">
        <caption id="project-table-description" className="sr-only">
          A table of Kickstarter projects showing serial number, percentage funded, and amount pledged
        </caption>
        <thead className={styles.tableHeader}>
          <tr>
            <th scope="col">S.No.</th>
            <th scope="col">Percentage Funded</th>
            <th scope="col">Amount Pledged</th>
          </tr>
        </thead>
        <tbody>
          {processedProjects.map(project => (
            <TableRow 
              key={project['s.no']} 
              project={project} 
            />
          ))}
          {emptyRows.map((_, index) => (
            <tr key={`empty-${index}`} className={styles.emptyRow}>
              <td className={styles.tableCell}>&nbsp;</td>
              <td className={styles.tableCell}>&nbsp;</td>
              <td className={styles.tableCell}>&nbsp;</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination 
        currentPage={page} 
        totalPages={totalPages} 
        onPageChange={setPage} 
      />
    </div>
  );
}
