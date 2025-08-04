// api/deleteRecipe.js
import clientPromise from '../lib/mongodb.js';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ success: false, message: 'Missing recipe ID' });
    }

    const client = await clientPromise;
    const db = client.db('coffee_calculator');
    const collection = db.collection('coffee_data');

    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 1) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(404).json({ success: false, message: 'Recipe not found' });
    }
  } catch (error) {
    console.error('Error deleting recipe:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}
