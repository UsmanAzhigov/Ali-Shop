import React, { useEffect } from 'react';
import styles from './cart.module.scss';
import { Title } from '@mantine/core';
import axios from 'axios';
import CartEmpty from '../../components/СartEmpty/index';
import CardCart from '../../components/CardCart/index';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCartItems,
  fetchClearItems,
  fetchPayProduct,
  fetchRemoveItems,
  setItems,
} from '@/redux/cart/slice';

const Cart = () => {
  const { items, totalPrice } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCartItems());
  }, []);

  const clearAll = async () => {
    try {
      await dispatch(fetchClearItems(items));
      alert('Корзина очищена!');
    } catch (error) {
      console.error(error);
      alert('Не удалось очистить корзину');
    }
  };

  const removeProduct = async (id) => {
    try {
      await dispatch(fetchRemoveItems({ id }));
      dispatch(setItems(items.filter((obj) => obj.id !== id)));
    } catch (error) {
      console.error(error);
      alert('Не удалось удалить товар:(');
    }
  };

  const payProduct = async () => {
    try {
      await dispatch(fetchPayProduct({ items }));
      await dispatch(fetchClearItems(items));
      alert('Товары успешно добавлены в профиль:)');
    } catch (error) {
      console.error(error);
      alert('Не удалось добавить товары в профиль');
    }
  };

  return (
    <div className={styles.cart}>
      {items.length === 0 ? (
        <CartEmpty />
      ) : (
        <>
          <div className={styles.block}>
            <Title onClick={clearAll} className={styles.clearAll} fw={900} order={2}>
              Очистить всё
            </Title>
            <div className={styles.payBlock}>
              <div className={styles.totalPrice}>
                <span className={styles.total}>Итого</span>
                <span className={styles.price}>: {totalPrice} ₽</span>
              </div>
              <div className={styles.btnPay}>
                <button className={styles.payNow} onClick={payProduct}>
                  Оплатить сейчас
                </button>
              </div>
            </div>
          </div>
          <div className={styles.cartItems}>
            {items.map((item) => (
              <CardCart key={item.id} removeProduct={() => removeProduct(item.id)} {...item} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
