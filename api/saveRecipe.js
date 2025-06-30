import clientPromise from '../lib/mongodb.js';

export default async function handler(req, res) {
    console.log('saveRecipe started')
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    const data = req.body;
    console.log('typoOF', typeof(data), data)

    // Basic validation (optional)
  /*   if (!data.name || !data.output || !data.beans) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    } */

    const client = await clientPromise;
    const db = client.db('coffee_calculator');
    const collection = db.collection('coffee_data');

    const result = await collection.insertOne(data);

    res.status(200).json({ success: true, insertedId: result.insertedId });
  } catch (error) {
    console.error('Error saving recipe:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}
