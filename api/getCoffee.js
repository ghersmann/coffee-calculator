// api/getCoffee.js
import clientPromise from '../lib/mongodb.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const client = await clientPromise;
    const db = client.db('coffee_calculator');
    const collection = db.collection('ratios');

    const data = await collection.find({}).toArray();

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Failed to fetch data:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}
