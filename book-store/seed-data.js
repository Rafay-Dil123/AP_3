// saveDataToMongo.js

const { MongoClient } = require('mongodb');

// MongoDB URI and database name
const uri = 'mongodb+srv://tahasheikh111ts:L1F3eyBBa9XfdDhg@cluster0.2tgxa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; // Replace this with your MongoDB URI (e.g., mongodb://localhost:27017)
const dbName = 'Book-Store'; // You can change this to your desired database name

const data = {
  books: [
    { id: "1", title: "The Great Gatsby", authorId: "1", description: "A novel about the American dream and the disillusionment that comes with it.", price: 10.99, genreId: "1", rating: 4.4 },
    { id: "2", title: "To Kill a Mockingbird", authorId: "2", description: "A novel set in the Deep South and focused on themes of racial injustice and moral growth.", price: 12.99, genreId: "1", rating: 4.8 },
    { id: "3", title: "1984", authorId: "3", description: "A dystopian novel that explores the dangers of totalitarianism and extreme political ideology.", price: 14.99, genreId: "2", rating: 4.7 },
    { id: "4", title: "Pride and Prejudice", authorId: "4", description: "A romantic novel that charts the emotional development of the protagonist, Elizabeth Bennet.", price: 9.99, genreId: "3", rating: 4.6 },
    { id: "5", title: "The Catcher in the Rye", authorId: "5", description: "A story about teenage rebellion and alienation narrated by the protagonist Holden Caulfield.", price: 11.99, genreId: "1", rating: 4.0 },
    { id: "6", title: "The Alchemist", authorId: "6", description: "A philosophical book that tells the story of Santiago, a shepherd boy on a journey to discover his personal legend.", price: 13.99, genreId: "4", rating: 4.5 }
  ],
  genres: [
    { id: "1", name: "Fiction" },
    { id: "2", name: "Dystopian" },
    { id: "3", name: "Romance" },
    { id: "4", name: "Adventure" }
  ],
  authors: [
    { id: "1", name: "F. Scott Fitzgerald", biography: "An American novelist and short story writer." },
    { id: "2", name: "Harper Lee", biography: "An American novelist known for 'To Kill a Mockingbird'." },
    { id: "3", name: "George Orwell", biography: "An English novelist and essayist." },
    { id: "4", name: "Jane Austen", biography: "An English novelist known for her social commentary." },
    { id: "5", name: "J.D. Salinger", biography: "An American writer known for 'The Catcher in the Rye'." },
    { id: "6", name: "Paulo Coelho", biography: "A Brazilian lyricist and novelist." }
  ],
  reviews: [
    { id: "1", bookId: "1", userId: "101", rating: 5, comment: "A timeless classic!" },
    { id: "2", bookId: "2", userId: "102", rating: 4, comment: "A powerful story." },
    { id: "3", bookId: "3", userId: "103", rating: 5, comment: "Chilling and thought-provoking." },
    { id: "4", bookId: "4", userId: "104", rating: 4, comment: "A beautifully written love story." }
  ],
  users: [
    { id: "101", username: "reader1", email: "reader1@example.com" },
    { id: "102", username: "reader2", email: "reader2@example.com" },
    { id: "103", username: "reader3", email: "reader3@example.com" },
    { id: "104", username: "reader4", email: "reader4@example.com" }
  ]
};

async function saveDataToMongo() {
  // Create a new MongoClient
  const client = new MongoClient(uri);

  try {
    // Connect to the database
    await client.connect();

    // Get the database and collections
    const db = client.db(dbName);
    const booksCollection = db.collection('books');
    const genresCollection = db.collection('genres');
    const authorsCollection = db.collection('authors');
    const reviewsCollection = db.collection('reviews');
    const usersCollection = db.collection('users');

    // Insert the data into MongoDB
    await booksCollection.insertMany(data.books);
    await genresCollection.insertMany(data.genres);
    await authorsCollection.insertMany(data.authors);
    await reviewsCollection.insertMany(data.reviews);
    await usersCollection.insertMany(data.users);

    console.log('Data successfully inserted into MongoDB');
  } catch (error) {
    console.error('Error inserting data:', error);
  } finally {
    // Close the connection
    await client.close();
  }
}

saveDataToMongo();
