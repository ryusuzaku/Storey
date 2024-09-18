import React, { useEffect, useState, useCallback } from 'react';
import ProductCard from './components/ProductCard';
import Header from './components/Header';
import { Product } from './types/types';
import { fetchProducts } from './api/axios';
import styles from './styles/App.module.css';

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const fetchedProducts = await fetchProducts();
        setProducts(fetchedProducts);
        setFilteredProducts(fetchedProducts);
      } catch (err) {
        setError('Failed to fetch products. Please try again later.');
      }
    };
    getProducts();
  }, []);

  const handleSearch = useCallback((term: string) => {
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [products]);

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <>
      <Header onSearch={handleSearch} />
      <div className={styles.container}>
        <main className={styles.grid}>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </main>
      </div>
    </>
  );
};

export default App;