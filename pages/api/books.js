import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    return addBook(req, res);
  } else if (req.method === "GET") {
    return readBooks(req, res);
  } else {
    return res
      .status(405)
      .json({ message: "Method not allowed", success: false });
  }
}

async function readBooks(_req, res) {
  try {
    const books = await prisma.bookSuggestion.findMany();
    return res.status(200).json(books, { success: true });
  } catch (error) {
    console.error("Request error", error);
    res.status(500).json({ error: "Error fetching books", success: false });
  }
}

async function addBook(req, res) {
  const body = req.body;
  try {
    const newEntry = await prisma.bookSuggestion.create({
      data: {
        bookTitle: body.title,
        bookAuthor: body.author,
        bookGenre: body.genre,
      },
    });
    return res.status(200).json(newEntry, { success: true });
  } catch (error) {
    console.error("Request error", error);
    res.status(500).json({ error: "Error adding book", success: false });
  }
}
