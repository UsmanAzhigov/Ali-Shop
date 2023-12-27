import axios from 'axios';
import React from 'react';
import styles from './profile.module.scss';
import Card from '../../components/Card/index';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfileItems } from '@/redux/profile/slice';

const Profile = () => {
  const { items } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchProfileItems());
  }, []);
  return (
    <div className={styles.profilePage}>
      <div className={styles.decoratedProduct}>
        {items.map((item) => {
          return <Card {...item} />;
        })}
      </div>
    </div>
  );
};

export default Profile;
