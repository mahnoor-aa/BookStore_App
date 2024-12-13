import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const client = await clientPromise;
      const db = client.db('bookstore');
      const authors = await db.collection('authors').find({}).toArray();

      return res.status(200).json(authors);
    } catch (error) {
      console.error('Error fetching authors:', error);
      return res.status(500).json({ error: 'Failed to fetch authors' });
    }
  } else {
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
