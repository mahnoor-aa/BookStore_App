import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const client = await clientPromise;
      const db = client.db('bookstore'); 
      const books = await db.collection('books').find({}).toArray();

      const booksWithDetails = await Promise.all(books.map(async (book) => {
        const genre = await db.collection('genres').findOne({ _id: book.genreId });
        const author = await db.collection('authors').findOne({ _id: book.authorId });

        return {
          ...book,
          _id: book._id.toString(), 
          genreName: genre ? genre.name : 'Unknown Genre',
          authorName: author ? author.name : 'Unknown Author',
        };
      }));

      return res.status(200).json(booksWithDetails);
    } catch (error) {
      console.error('Error fetching books:', error);
      return res.status(500).json({ error: 'Failed to fetch books' });
    }
  } else {
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
