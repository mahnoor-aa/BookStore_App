import jwt from "jsonwebtoken";
import clientPromise from "../../../lib/mongodb";

const JWT_SECRET = process.env.JWT_SECRET;

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    try {
      const client = await clientPromise;
      const db = client.db('bookstore');
      const usersCollection = db.collection("users");

      const user = await usersCollection.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      if (password !== user.password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const { password: omittedPassword, ...userWithoutPassword } = user;

      const token = jwt.sign(
        { userId: user._id, email: user.email, name: user.name },
        JWT_SECRET,
        { expiresIn: "1d" }
      );

      return res.status(200).json({ token, user: userWithoutPassword }); 

    } catch (error) {
      console.error("Error during login:", error);
      return res.status(500).json({ message: "Server error" });
    }
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
