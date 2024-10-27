// components/Header.js
import Link from 'next/link';
import styles from './Header.module.css'; // Create this CSS file for styling

export default function Header() {
    return (
        <header className={styles.header}>
            <nav>
                <ul className={styles.navList}>
                    <li className={styles.navItem}>
                        <Link href="/">Home</Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link href="/books/search">Search</Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link href="/authors">Authors</Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link href="/books">Books</Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link href="/genres">Genres</Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link href="/info/faq">Info</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
