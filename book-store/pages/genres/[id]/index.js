import { useRouter } from "next/router";
import { getBooksByGenre, getAllGenres } from "@/helpers/api-utils";
import { Booklist } from "@/components/Booklist"; // Adjust the path as per your structure

export default function GenreBooksPage({ books }) {
  const router = useRouter();
  const { id } = router.query;

  // Handle fallback state for SSG
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Books</h1>
      {/* Use the Booklist component here to display the books */}
      <Booklist books={books} />
    </div>
  );
}

export async function getStaticPaths() {
  const genres = getAllGenres();
  const paths = genres.map((genre) => ({
    params: { id: genre.id.toString() },
  }));

  return {
    paths,
    fallback: true, // Enable fallback to load new genres dynamically
  };
}

export async function getStaticProps(context) {
  const { params } = context;
  const books = getBooksByGenre(params.id);

  return {
    props: {
      books,
    },
  };
}
