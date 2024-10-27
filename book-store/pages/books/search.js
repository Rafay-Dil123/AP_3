import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Search from '@/components/Search';
import books from '../../Data.json';
import styles from '@/styles/SearchResults.module.css';

export default function SearchResults({ initialResults }) {
  const router = useRouter();
  const { q } = router.query;
  const [results, setResults] = useState(initialResults);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    if (q) {
      const searchResults = books.books.filter(book => 
        book.title.toLowerCase().includes(q.toLowerCase()) ||
        books.authors.find(author => author.id === book.authorId)
          .name.toLowerCase().includes(q.toLowerCase())
      );
      setResults(searchResults);
    }
    setIsLoading(false);
  }, [q]);

  if (isLoading) {
    return (
      <div className={styles.container}>
        <Search isDisabled={false} />
        <div className={styles.loading}>
          <div className={styles.loadingSpinner} />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Search isDisabled={results.length > 0} />
      
      <h2 className={styles.resultsHeader}>
        {results.length > 0 
          ? `Search Results for "${q}"`
          : `No results found for "${q}"`}
      </h2>

      {results.length === 0 ? (
        <div className={styles.noResults}>
          Try searching for a different book or author
        </div>
      ) : (
        <div className={styles.resultsGrid}>
          {results.map(book => {
            const author = books.authors.find(a => a.id === book.authorId);
            return (
              <Link 
                href={`/books/${book.id}`}
                key={book.id}
                className={styles.bookCard}
              >
                <div className={styles.bookInfo}>
                  <h3 className={styles.bookTitle}>{book.title}</h3>
                  <p className={styles.authorName}>by {author.name}</p>
                  <p className={styles.description}>
                    {book.description.substring(0, 100)}...
                  </p>
                  <div className={styles.bookMeta}>
                    <span className={styles.price}>${book.price}</span>
                    <div className={styles.rating}>
                      <span className={styles.starIcon}>★</span>
                      <span className={styles.ratingValue}>{book.rating}</span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps({ query }) {
  const { q } = query;
  
  if (!q) {
    return {
      props: {
        initialResults: [],
      },
    };
  }

  const searchResults = books.books.filter(book => 
    book.title.toLowerCase().includes(q.toLowerCase()) ||
    books.authors.find(author => author.id === book.authorId)
      .name.toLowerCase().includes(q.toLowerCase())
  );

  return {
    props: {
      initialResults: searchResults,
    },
  };
}