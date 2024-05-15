export default function handler(req, res) {
  if (req.method === "GET") {
    // Gérer la requête GET
    res.status(200).json({ message: "Hello World" });
  } else if (req.method === "POST") {
    // Gérer la requête POST
    const { name } = req.body;
    res.status(200).json({ message: `Hello ${name}` });
  } else {
    // Gérer les autres méthodes HTTP
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
