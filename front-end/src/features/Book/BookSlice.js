import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "../../axiosInstance";

const baseUrl = "http://localhost:5000";

const initialState = {
  book: "",
  books: [],
};

export const getBooks = createAsyncThunk("book/getBooks", async () => {
  try {
    const response = await axiosInstance.get(`/book/getBooks`);
    return response.data;
  } catch (error) {
    throw error.response.data.errorMessage;
  }
});

export const addBook = createAsyncThunk("book/addBook", async (formData) => {
  try {
    const response = await axios.post(`${baseUrl}/api/book/add`, formData);
    return response.data;
  } catch (error) {
    throw error.response.data.errorMessage;
  }
});

export const editBook = createAsyncThunk(
  "book/editBook",
  async ({ _id, title, description, publishedDate }) => {
    try {
      const response = await axios.patch(
        `${baseUrl}/api/book/editBook/${_id}`,
        {
          title,
          description,
          publishedDate,
        }
      );
      return response.data;
    } catch (error) {
      throw error.response.data.errorMessage;
    }
  }
);

export const deleteBook = createAsyncThunk(
  "book/deleteBook",
  async ({ _id }) => {
    try {
      const response = await axios.delete(
        `${baseUrl}/api/book/deleteBook/${_id}`
      );
      return response.data;
    } catch (error) {
      throw error.response.data.errorMessage;
    }
  }
);

const BookSlice = createSlice({
  name: "book",
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(getBooks.fulfilled, (state, action) => {
      console.log("getBooks", action.payload);
      state.books = action.payload;
    });

    builder.addCase(addBook.fulfilled, (state, action) => {
      console.log("addBook fullfilled!", action.payload);
      state.book = action.payload;
    });

    builder.addCase(editBook.fulfilled, (state, action) => {
      console.log("editBook fullfilled", action.payload);
      state.book = action.payload;
    });

    builder.addCase(deleteBook.fulfilled, (state, action) => {
      console.log("deleteBook fullfilled", action.payload);
      state.book = action.payload;
    });
  },
  reducers: {
    logout: (state) => {
      state.user = "";
      localStorage.removeItem("user");
    },
  },
});

export default BookSlice.reducer;
export const BookSliceAction = BookSlice.actions;
