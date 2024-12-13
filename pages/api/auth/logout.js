export default function handler(req, res) {
    if (req.method === "POST") {
      res.status(200).json({ message: "Logout successful" });
    } else {
      res.setHeader("Allow", ["POST"]);
      res.status(405).json({ message: `Method ${req.method} not allowed` });
    }
  }
  