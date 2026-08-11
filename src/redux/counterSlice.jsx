import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL  = "https://6a79c891674f43f4db11c371.mockapi.io/product"

export const getData =createAsyncThunk("product/getData" , async ()=>{
  const response = await axios.get(BASE_URL)
  return response.data
})
export const addData = createAsyncThunk("product/addData",async()=>{})

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {},
  extraReducers:(builder)=>{
    builder
    //get
      .addCase(getData.fulfilled,(state,action)=>{
        state.loading = false
        state.data = action.payload
      })
      .addCase(getData.pending, (state)=>{
        state.loading = false
        state.error = null
      })
      .addCase(getData.rejected, (state,action)=>{
        state.loading = false
        state.error = action.error.message
      })
      //post
  }
});

export const {} = counterSlice.actions;
export default counterSlice.reducer;
