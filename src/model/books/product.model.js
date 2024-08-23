import mongoose from "mongoose";

import { bookSchema } from "./book.schema";

const bookModel = mongoose.model("book", bookSchema);

export default class BookRepository {
  async getAll() {
    return await bookModel.find();
  }
  async add(book, imageUrl) {
    try {
      let newBook = new bookModel({
        name: book.name,
        desc: book.description,
        price: book.price,
        imageUrl,
      });
      return await newBook.save();
    } catch (err) {
      console.log(err);
      return false;
    }
  }
  async searchBook(_id) {
    try {
      const book = await bookModel.findOne(_id);
      return book;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
  async update(book) {
    try {
      const book = await bookModel.findOne({ _id: book._id });
      book = {
        name: book.name,
        desc: book.description,
        price: book.price,
        imageUrl: book.img,
      };
      return await book.save();
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async delete(_id) {
    const book = await bookModel.deleteOne(_id);
    return book;
  }
}
