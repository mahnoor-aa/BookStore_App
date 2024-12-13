import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db('bookstore');

  if (req.method === 'GET') {
    try {
      const userHistory = await db.collection('history').find().toArray();
      return res.status(200).json(userHistory);
    } catch (error) {
      console.error('Error fetching search history:', error);
      return res.status(500).json({ error: 'Failed to fetch search history' });
    }
  } else if (req.method === 'POST') {
    try {
      const { searchTerm } = req.body;

      if (!searchTerm) {
        return res.status(400).json({ error: 'Search term is required' });
      }

      await db.collection('history').insertOne({ searchTerm, date: new Date() });

      return res.status(200).json({ message: 'Search term added to history' });
    } catch (error) {
      console.error('Error adding search history:', error);
      return res.status(500).json({ error: 'Failed to add search history' });
    }
  } else {
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
