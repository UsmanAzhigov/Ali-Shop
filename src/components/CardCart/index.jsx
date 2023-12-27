import React from 'react';
import styles from './cardCart.module.scss';
import { Image, Title } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, minusItem } from '@/redux/cart/slice';

const CardCart = ({ removeProduct, id, title, imageUrl, price, color, count }) => {
  const dispatch = useDispatch();
  const onClickPlus = () => {
    dispatch(addItem({ id }));
  };

  const onClickMinus = () => {
    return dispatch(minusItem({ id }));
  };

  return (
    <>
      <div key={id} className={styles.product}>
        <Image className={styles.productImage} width={181} height={176} src={imageUrl} />
        <div className={styles.describe}>
          <p className={styles.productTitle}>{title}</p>
          <p className={styles.productColor}>Цвет: {color}</p>
          <p className={styles.productCity}>Назрань Ali Shop</p>
        </div>
        <div className={styles.counter}>
          <button disabled={count === 1} onClick={onClickMinus} className={styles.minus}>
            -
          </button>
          <p>{count}</p>
          <button onClick={onClickPlus} className={styles.plus}>
            +
          </button>
        </div>
        <div className={styles.deleteIcon}>
          <Title fw={400} order={2} className={styles.productPrice}>
            {price}₽
          </Title>
          <Image
            onClick={() => removeProduct(id)}
            className={styles.deleteImage}
            width={36}
            height={36}
            src="https://cdn-icons-png.flaticon.com/128/1450/1450571.png"
          />
        </div>
      </div>
    </>
  );
};

export default CardCart;
