import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const baseUrl = "http://localhost:5000";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || "",
};

export const loginRequest = createAsyncThunk(
  "login/loginRequest",
  async ({ email, password }) => {
    try {
      const response = await axios.post(`${baseUrl}/api/user/login`, {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      throw error.response.data.errorMessage;
    }
  }
);

const LoginSlice = createSlice({
  name: "login",
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(loginRequest.fulfilled, (state, action) => {
      localStorage.setItem("user", JSON.stringify(action.payload));
      state.user = action.payload;
    });
  },
  reducers: {
    logout: (state) => {
      state.user = "";
      localStorage.removeItem("user");
    },
  },
});

export default LoginSlice.reducer;
export const LoginSliceActions = LoginSlice.actions;
