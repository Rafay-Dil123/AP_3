import clientPromise from '../../../lib/mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db('Book-Store');

  if (req.method === 'GET') {
    const genres = await db.collection('genres').find({}).toArray();
    res.status(200).json(genres);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
