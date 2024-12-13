import clientPromise from "@/lib/mongodb";
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const client = await clientPromise;
      const db = client.db('bookstore');
      const genreObjectId = new ObjectId(id);

      const books = await db.collection('books').find({ genreId: genreObjectId }).toArray();

      const genre = await db.collection('genres').findOne({ _id: genreObjectId });

      if (!genre) {
        return res.status(404).json({ error: 'Genre not found' });
      }

      if (books.length === 0) {
        return res.status(404).json({ error: 'No books found for this genre', genreName: genre.name });
      }

      return res.status(200).json({ books, genreName: genre.name });
    } catch (error) {
      console.error('Error fetching books by genre:', error);
      return res.status(500).json({ error: 'Failed to fetch books by genre' });
    }
  } else {
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
