import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const client = await clientPromise;
      const db = client.db('bookstore'); 
      const genres = await db.collection('genres').find({}).toArray();

      return res.status(200).json(genres);
    } catch (error) {
      console.error('Error fetching genres:', error);
      return res.status(500).json({ error: 'Failed to fetch genres' });
    }
  } else {
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
