import React, { useState, useCallback } from 'react';
import styles from '../styles/Header.module.css';

interface HeaderProps {
  onSearch: (term: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newTerm = e.target.value;
    setSearchTerm(newTerm);
    onSearch(newTerm);
  }, [onSearch]);

  return (
    <header className={styles.header}>
      <h1 className={styles.siteName}>Homey Store</h1>
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={handleSearchChange}
        className={styles.searchInput}
      />
    </header>
  );
};

export default React.memo(Header);