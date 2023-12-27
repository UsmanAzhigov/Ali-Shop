import React, { createContext } from 'react';
import styles from '../styles/Home.module.scss';
import axios from 'axios';
import Card from '../components/Card/index';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems } from '@/redux/home/slice';
import { fetchAddItems } from '@/redux/cart/slice';

//сделай код чуть-чуть красивее(отступы выровни)

export const AppContext = createContext();

const Home = () => {
  const { items } = useSelector((state) => state.home);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchItems());
  }, []);
  const { searchValue } = React.useContext(AppContext);

  const addProduct = async (obj) => {
    try {
      dispatch(fetchAddItems({ obj }));
    } catch (error) {
      console.log(error);
      alert('Не удалось добавить товар в корзину');
    }
  };

  const filterProducts = items.filter((item) =>
    item.title.toLowerCase().includes(searchValue.toLowerCase()),
  );

  return (
    <main className={styles.home}>
      <div className={styles.homeBody}>
        {filterProducts.map((items) => (
          <Card onAddProduct={(obj) => addProduct(obj)} key={items.id} {...items} />
        ))}
      </div>
    </main>
  );
};
export default Home;
