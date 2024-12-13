import clientPromise from "@/lib/mongodb";
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const client = await clientPromise;
      const db = client.db('bookstore');
      const bookObjectId = new ObjectId(id); 
      const book = await db.collection('books').findOne({ _id: bookObjectId });

      if (!book) {
        return res.status(404).json({ error: 'Book not found' });
      }

      const genre = await db.collection('genres').findOne({ _id: book.genreId });
      const author = await db.collection('authors').findOne({ _id: book.authorId });

      const reviews = await db.collection('reviews').find({ bookId: bookObjectId }).toArray();

      const reviewsWithUserDetails = await Promise.all(reviews.map(async (review) => {
        const user = await db.collection('users').findOne({ _id: new ObjectId(review.userId) });
        return {
          ...review,
          user: user ? { name: user.name, email: user.email } : { name: 'Anonymous', email: '' },
        };
      }));

      const bookDetails = {
        ...book,
        _id: book._id.toString(), 
        genre: genre ? genre.name : 'Unknown Genre',
        author: author ? author.name : 'Unknown Author',
        biography: author? author.biography :'No Biography',
        reviews: reviewsWithUserDetails,
      };

      return res.status(200).json(bookDetails);
    } catch (error) {
      console.error('Error fetching book details:', error);
      return res.status(500).json({ error: 'Failed to fetch book details' });
    }
  } else {
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
