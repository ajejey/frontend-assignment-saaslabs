import React from 'react';
import styles from '../styles/ProjectTable.module.css';

const TableRow = React.memo(({ project }) => {
  return (
    <tr 
      className={styles.tableRow} 
      aria-label={`Project ${project.sNo}`}
    >
      <td 
        className={styles.tableCell} 
        aria-label={`Serial Number ${project.sNo}`}
      >
        {project.sNo}
      </td>
      <td 
        className={styles.tableCell} 
        aria-label={`Percentage Funded ${project.percentageFunded}%`}
      >
        {project.percentageFunded}%
      </td>
      <td 
        className={styles.tableCell} 
        aria-label={`Amount Pledged ${project.formattedPledged}`}
      >
        {project.formattedPledged}
      </td>
    </tr>
  );
});

TableRow.displayName = 'TableRow';

export default TableRow;
