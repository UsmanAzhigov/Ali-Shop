import React, { useEffect } from 'react';
import styles from './cardInfo.module.scss';
import { Image, Title } from '@mantine/core';
import { Rate } from 'antd';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCardInfo } from '@/redux/cardInfo/slice';
import { fetchAddItems, fetchPayProduct } from '@/redux/cart/slice';

const CardInfo = () => {
  const { items } = useSelector((state) => state.cardInfo);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const id = router.query.id;
    dispatch(fetchCardInfo({ id }));
  }, [router.query.id]); // Removed unnecessary spaces

  const addToCart = (item) => {
    try {
      dispatch(fetchAddItems({ item }));
      alert('Товар успешно добавлен в корзину:)');
      router.push('/');
    } catch (error) {
      console.error(error);
      alert('Не удалось добавить товар в корзину:(');
    }
  };

  const payProduct = async (item) => {
    try {
      await dispatch(fetchPayProduct([item]));
      alert('Товар успешно оформлен и добавлен в профиль:)');
      router.push('/');
    } catch (error) {
      console.error(error);
      alert('Не удалось добавить товар в профиль');
    }
  };

  return (
    <div className={styles.cardInfo}>
      {items.map((item) => (
        <React.Fragment key={item.id}>
          <Title order={2}>{item.title}</Title>
          <div className={styles.cardBlock}>
            <div className={styles.productImage}>
              <Image width={328} height={329} src={item.imageUrl} />
            </div>
            <div className={styles.productPrice}>
              <div className={styles.price}>
                <Title style={{ fontSize: 44 }}>{item.price} ₽</Title>
                <Title className={styles.noDiscount} style={{ color: 'grey' }} order={2}>
                  {item.discount} ₽
                </Title>
              </div>
              <div className={styles.addToCart}>
                <button className={styles.addBtn} onClick={() => addToCart(item)}>
                  Добавить в корзину
                </button>
                <button className={styles.payNow} onClick={() => payProduct(item)}>
                  Купить сейчас
                </button>
              </div>
              <div className={styles.reviews}>
                <Title className={styles.greyText} order={3}>
                  {item.reviews}
                </Title>
                <p className={styles.greyText}>•</p>
                <Rate className={styles.rating} defaultValue={item.rating} />
              </div>
            </div>
          </div>
          <div className={styles.describe}>
            <Title order={3}>Цвет: {item.color}</Title>
            <Title order={3}>Питание</Title>
            <Title order={3}>Время зарядки: {item.timeCharging}</Title>
            <Title order={3}>Время работы от аккумулятора: {item.lifeBattery}</Title>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default CardInfo;
