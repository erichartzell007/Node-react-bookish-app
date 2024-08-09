import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const baseUrl = "http://localhost:5000";

const initialState = {};

export const signupRequest = createAsyncThunk(
  "user/signup",
  async ({ username, email, password, role }) => {
    try {
      const response = await axios.post(`${baseUrl}/api/user/signup`, {
        username,
        email,
        password,
        role,
      });
      return response.data;
    } catch (error) {
      throw error.response.data.errorMessage;
    }
  }
);

const SignupSlice = createSlice({
  name: "signup",
  initialState,
});

export default SignupSlice.reducer;
