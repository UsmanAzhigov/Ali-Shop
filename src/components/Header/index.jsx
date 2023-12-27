import React from 'react';
import styles from './header.module.scss';
import { Title, Image } from '@mantine/core';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { AppContext } from '../../pages/index';

const Header = () => {
  const router = useRouter();
  const { searchValue, setSearchValue } = React.useContext(AppContext);

  return (
    <div className={styles.header}>
      <div className={styles.searchProduct}>
        {router.pathname === '/' ? (
          <Title className={styles.titleShop} fw={400} order={1}>
            Ali Shop
          </Title>
        ) : (
          <Link style={{ textDecoration: 'none', color: 'black' }} href="/">
            <Title className={styles.titleShop} fw={400} order={1}>
              Ali Shop
            </Title>
          </Link>
        )}
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className={styles.searchInput}
          placeholder="Введите товар..."
        />
      </div>
      <div className={styles.menu}>
        <Link href="/cart">
          <button className={styles.btnCart}>
            <Image
              radius="md"
              width={34}
              height={34}
              src="https://cdn-icons-png.flaticon.com/128/2636/2636890.png"
            />
          </button>
        </Link>
        <Link href="/profile">
          <button className={styles.btnProfile}>
            <Image
              radius="md"
              width={34}
              height={34}
              src="https://cdn-icons-png.flaticon.com/128/1144/1144760.png"
            />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
