import { useEffect, useState } from "react";

export default function Home() {
  const [bookTitle, setBookTitle] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [bookGenre, setBookGenre] = useState("");
  const [allBooks, setAllBooks] = useState(null);

  useEffect(() => {
    readDb();
  }, []);

  const readDb = async () => {
    try {
      const response = await fetch("/api/books", {
        method: "GET",
      });
      if (response.status !== 200) {
        console.log("something went wrong");
        //set an error banner here
      } else {
        setAllBooks(await response.json());
        console.log("form submitted successfully !!!");
        //set a success banner here
      }
    } catch (error) {
      console.log("there was an error when reading from the db", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = { title: bookTitle, author: bookAuthor, genre: bookGenre };
    try {
      const response = await fetch("/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (response.status !== 200) {
        console.log("something went wrong");
        //set an error banner here
      } else {
        resetForm();
        console.log("form submitted successfully !!!");
        //set a success banner here
      }
      //check response, if success is false, dont take them to success page
    } catch (error) {
      console.log("there was an error submitting", error);
    }
  };

  const resetForm = () => {
    setBookTitle("");
    setBookAuthor("");
    setBookGenre("");
  };

  return (
    <div className="flex flex-col">
      <div className="h-screen w-screen flex flex-col justify-center items-center">
        <div className="text-3xl">Suggest me Books!</div>
        <div className="p-4" />
        <form onSubmit={handleSubmit} className="w-full md:w-1/2 lg:w-1/3">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-xs font-bold mb-2"
              htmlFor="book-title">
              Book Title
            </label>
            <input
              onChange={(e) => setBookTitle(e.target.value)}
              className="text-gray-800 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              type="text"
              id="book-title"
              placeholder="Book Title"></input>
          </div>
          <div className="p-2" />
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-xs font-bold mb-2"
              htmlFor="author">
              Author
            </label>
            <input
              onChange={(e) => setBookAuthor(e.target.value)}
              className="text-gray-800 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4  leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              type="text"
              id="author"
              placeholder="Author"></input>
          </div>
          <div className="p-2" />
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-xs font-bold mb-2"
              htmlFor="genre">
              Genre
            </label>
            <input
              onChange={(e) => setBookGenre(e.target.value)}
              className="text-gray-800 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              type="text"
              id="genre"
              placeholder="Genre"></input>
          </div>
          <div className="p-4" />
          <div className="w-full px-3">
            <button
              className="w-full tracking-wide text-xs shadow bg-purple-500 hover:bg-purple-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="submit">
              Submit Suggestion
            </button>
          </div>
        </form>
      </div>

      <div className="w-screen flex flex-col justify-center items-center">
        <div className="grid grid-cols-3 gap-4 w-1/2 ">
          {allBooks?.map((book, idx) => (
            <>
              <div className="tracking-wide text-lg font-semibold ">
                {book.id}
              </div>
              <div className="tracking-wide text-lg font-semibold ">
                {book.bookTitle}
              </div>
              <div className="tracking-wide text-lg font-semibold ">
                {book.bookAuthor}
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
