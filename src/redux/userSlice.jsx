import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = "https://6a79c891674f43f4db11c371.mockapi.io/product";

export const getUser = createAsyncThunk("user/getUser", async () => {
  const res = await axios.get(BASE_URL);
  return res.data;
});
// yaratmaq
export const createUser = createAsyncThunk(
  "user/createUser",
  async (newUser) => {
    const res = await axios.post(BASE_URL, newUser);
    return res.data;
  },
);
// duzelis etmek
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ id, updateUser }) => {
    const res = await axios.put(`${BASE_URL}/${id}`, updateUser);
    return res.data;
  },
);

export const deleteUser = createAsyncThunk("user/deleteUser", async (id) => {
  await axios.delete(`${BASE_URL}/${id}`);
  return id;
});

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    // ! get
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(getUser.pending, (state)=>{
        state.loading = true
        state.error = null
      })
      // ! add
      .addCase(createUser.fulfilled , (state,action)=>{
        state.loading = false
        state.data.push(action.payload)
      })//? push emri yazdiq
      .addCase(createUser.rejected, (state,action)=>{
        state.loading = false
        state.error = action.error.message
      })
      .addCase(createUser.pending,(state)=>{
        state.loading = true
        state.error = null
      })
      // ! update
    .addCase(updateUser.fulfilled , (state,action)=>{
        state.loading = false
        const index = state.data.findIndex((item)=>item.id === action.payload.id)
        if(index !== -1) state.data[index] = action.payload
    })
    .addCase(updateUser.rejected , (state,action)=>{
        state.loading = false
        state.error = action.error.message 
    })
    .addCase(updateUser.pending, (state)=>{
        state.loading = true
        state.error = null
    })

    // ! delete
    .addCase(deleteUser.fulfilled, (state,action)=>{
        state.loading = false
        state.data = state.data.filter(item=>item.id !== action.payload)
    })
    .addCase(deleteUser.rejected, (state,action)=>{
        state.loading = false
         state.error = action.error.message
    })
    .addCase(deleteUser.pending, (state)=>{
        state.loading = true
        state.error = null
    })

  },
});

export const {} = userSlice.actions;
export default userSlice.reducer;
