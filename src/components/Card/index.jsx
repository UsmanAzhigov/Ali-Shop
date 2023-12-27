import { Image, Title } from '@mantine/core';
import React from 'react';
import styles from './card.module.scss';
import { Rate } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Card = ({
  id,
  title,
  imageUrl,
  price,
  color,
  rating,
  reviews,
  onAddProduct,
  isAdded,
  count,
}) => {
  const router = useRouter();
  const [checkAddProduct, setCheckAddProduct] = React.useState(false);

  const handleClick = () => {
    const obj = { id, title, imageUrl, price, color, rating, reviews, isAdded: !isAdded, count };
    onAddProduct(obj);
    setCheckAddProduct(true);
  };

  return (
    <div key={id} className={styles.product}>
      {router.pathname === '/profile' ? (
        <div className={styles.productImage}>
          <Image width={161} height={156} src={imageUrl} />
        </div>
      ) : (
        <div className={styles.productImage}>
          <Link href={`/cardInfo/${id}`} style={{ textDecoration: 'none', color: 'black' }}>
            <Image width={161} height={156} src={imageUrl} />
          </Link>
        </div>
      )}

      <p className={styles.productTitle}>{title}</p>
      <div className={styles.addProductBlock}>
        <Title fw={400} order={2}>
          {price} ₽
        </Title>
        {router.pathname === '/profile' ? null : (
          <button className={styles.addProduct} onClick={handleClick}>
            <Image
              width={34}
              height={34}
              src={
                checkAddProduct
                  ? 'https://cdn-icons-png.flaticon.com/128/7244/7244723.png'
                  : 'https://cdn-icons-png.flaticon.com/128/6737/6737600.png'
              }
            />
          </button>
        )}
      </div>
      <div className={styles.reviewsBlock}>
        <p className={styles.reviews}>{reviews}</p>
        <Rate
          style={{ color: 'rgba(255, 170, 0, 1)', fontSize: 15 }}
          disabled
          defaultValue={rating}
        />
      </div>
    </div>
  );
};

export default Card;
