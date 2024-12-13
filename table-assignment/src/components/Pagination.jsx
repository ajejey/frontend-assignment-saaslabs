import React, { useMemo } from 'react';
import styles from '../styles/ProjectTable.module.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = useMemo(() => {
    const result = new Array(7).fill(null);
    
    result[0] = 1;
    result[6] = totalPages;

    if (currentPage <= 4) {
      for (let i = 1; i < 6 && i < totalPages; i++) {
        result[i] = i + 1;
      }
      if (totalPages > 6) {
        result[5] = '...';
      }
    } else if (currentPage >= totalPages - 3) {
      if (totalPages > 6) {
        result[1] = '...';
      }
      for (let i = Math.max(2, totalPages - 4); i < totalPages; i++) {
        result[i - Math.max(2, totalPages - 4) + 2] = i;
      }
    } else {
      result[1] = '...';
      result[2] = currentPage - 1;
      result[3] = currentPage;
      result[4] = currentPage + 1;
      result[5] = '...';
    }

    return result;
  }, [currentPage, totalPages]);

  return (
    <nav 
      aria-label="Project table pagination" 
      className={styles.paginationContainer}
    >
      <div className={styles.paginationWrapper}>
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className={`${styles.paginationButton} ${styles.navButton}`}
          aria-label="Previous page"
        >
          ←
        </button>

        {pageNumbers.map((number, index) => (
          <button
            key={`page-${index}`}
            onClick={() => typeof number === 'number' ? onPageChange(number) : null}
            disabled={typeof number !== 'number'}
            aria-current={currentPage === number ? 'page' : undefined}
            className={`
              ${styles.paginationButton}
              ${currentPage === number ? styles.active : ''}
              ${typeof number !== 'number' ? styles.dots : ''}
            `}
          >
            {number}
          </button>
        ))}

        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className={`${styles.paginationButton} ${styles.navButton}`}
          aria-label="Next page"
        >
          →
        </button>
      </div>
    </nav>
  );
};

export default React.memo(Pagination);
