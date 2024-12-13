import React from 'react';
import styles from '../styles/ProjectTable.module.css';

const SkeletonRow = () => (
  <tr className={styles.skeletonRow}>
    <td className={styles.skeletonCell}></td>
    <td className={styles.skeletonCell}></td>
    <td className={styles.skeletonCell}></td>
  </tr>
);

const LoadingSkeleton = () => {
  return (
    <>
      <table className={styles.table}>
        <thead className={styles.tableHeader}>
          <tr>
            <th>S.No.</th>
            <th>Percentage Funded</th>
            <th>Amount Pledged</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(5)].map((_, index) => (
            <SkeletonRow key={index} />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default LoadingSkeleton;