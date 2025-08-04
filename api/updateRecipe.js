// /api/updateRecipe.js
import clientPromise from '../lib/mongodb.js';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    const { _id, ...updateFields } = req.body;
    const client = await clientPromise;
    const db = client.db('coffee_calculator');
    const collection = db.collection('coffee_data');

    const result = await collection.updateOne(
      { _id: new ObjectId(_id) },
      { $set: updateFields }
    );

    if (result.modifiedCount === 1) {
      res.status(200).json({ success: true });
    } else {
      res.status(404).json({ success: false, message: 'Recipe not found.' });
    }
  } catch (error) {
    console.error('Error updating recipe:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}
