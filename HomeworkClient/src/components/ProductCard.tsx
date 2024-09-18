import React from 'react';
import { Product } from '../types/types';
import styles from '../styles/ProductCard.module.css';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const renderStars = (rating: number): string => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    return '★'.repeat(fullStars) + (hasHalfStar ? '½' : '') + '☆'.repeat(5 - fullStars - (hasHalfStar ? 1 : 0));
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={product.thumbnail} alt={product.title} className={styles.image} />
      </div>
      <div className={styles.details}>
        <h3 className={styles.title}>{product.title}</h3>
        <p className={styles.description}>{product.description}</p>
        <p className={styles.price}>${product.price.toFixed(2)}</p>
        <p className={styles.rating}>{renderStars(product.rating)}</p>
      </div>
    </div>
  );
};

export default React.memo(ProductCard);