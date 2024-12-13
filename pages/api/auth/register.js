import jwt from "jsonwebtoken";
import clientPromise from "../../../lib/mongodb";

const JWT_SECRET = process.env.JWT_SECRET;

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    try {
      const client = await clientPromise;
      const db = client.db("bookstore");
      const usersCollection = db.collection("users");

      const existingUser = await usersCollection.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      const newUser = {
        name,
        email,
        password, 
      };

      const result = await usersCollection.insertOne(newUser);
      const createdUser = await usersCollection.findOne({ _id: result.insertedId });

      const { password: omittedPassword, ...userWithoutPassword } = createdUser;

      const token = jwt.sign(
        { userId: createdUser._id, email: createdUser.email, name: createdUser.name },
        JWT_SECRET,
        { expiresIn: "1d" }
      );

      return res.status(200).json({ token, user: userWithoutPassword });
    } catch (error) {
      console.error("Error during registration:", error);
      return res.status(500).json({ message: "Server error" });
    }
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
