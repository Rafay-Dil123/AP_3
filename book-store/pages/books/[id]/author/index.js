import { getBookById, getAuthorById, getAllbooks } from "@/helpers/api-utils";
import { useRouter } from "next/router";
import styles from "@/styles/AuthorDetail.module.css";

export default function AuthorDetail({ author }) {
  const router = useRouter();

  // Handle loading state when fallback is true
  if (router.isFallback) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.name}>{author.name}</h1>
      <h3 className={styles.biographyTitle}>Biography</h3>
      <p className={styles.biography}>{author.biography}</p>
      <button onClick={() => router.back()} className={styles.backButton}>
        Back
      </button>
    </div>
  );
}

export async function getStaticProps(context) {
  const { params } = context;
  const bookId = params.id;

  // Get the book details to find the author ID
  const book = getBookById(bookId);

  if (!book) {
    return {
      notFound: true, // 404 if book doesn't exist
    };
  }

  // Fetch the author using the authorId from the book
  const author = getAuthorById(book.authorId);

  return {
    props: {
      author, // Pass author data as props
    },
  };
}

export async function getStaticPaths() {
  // Generate paths for each book's author page
  const books = getAllbooks();
  const paths = books.map((book) => ({ params: { id: String(book.id) } }));

  return {
    paths, // Pre-generate author detail pages based on book IDs
    fallback: true, // Render new paths on demand if they haven't been generated yet
  };
}
