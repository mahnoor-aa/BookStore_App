import clientPromise from "@/lib/mongodb";
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const { id } = req.query; 

  if (req.method === 'GET') {
    try {
      const client = await clientPromise;
      const db = client.db('bookstore'); 
      const authorObjectId = new ObjectId(id);

      const author = await db.collection('authors').findOne({ _id: authorObjectId });

      if (!author) {
        return res.status(404).json({ error: 'Author not found' });
      }

      const books = await db.collection('books').find({ authorId: authorObjectId }).toArray();

      const authorDetails = {
        ...author,
        books: books,
      };

      return res.status(200).json(authorDetails);
    } catch (error) {
      console.error('Error fetching author details:', error);
      return res.status(500).json({ error: 'Failed to fetch author details' });
    }
  } else {
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
