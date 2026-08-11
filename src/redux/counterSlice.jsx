import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL  = "https://6a79c891674f43f4db11c371.mockapi.io/product"

// datamap - get
export const getData =createAsyncThunk("product/getData" , async ()=>{
  const response = await axios.get(BASE_URL)
  return response.data
})
// Create-post
export const addData = createAsyncThunk("product/addData",async(newProduct)=>{
  const response = await axios.post(BASE_URL,newProduct)
  return response.data
})

//update - put
export const updateData =createAsyncThunk("products/updateProduct",async({ id, updatedData })=>{
const response = await axios.put(`${BASE_URL}/${id}`,updatedData)
return response.data
}) 

//delete 
export const deleteData =createAsyncThunk('products/deleteProduct',async(id)=>{
  await axios.delete(`${BASE_URL}/${id}`)
  return id
})

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
      //add
       .addCase(getData.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      //update
      .addCase(getData.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) state.items[index] = action.payload;
      })
      //detele
      .addCase(getData.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item.id !== action.payload
        );
      });
  }
});

export const {} = counterSlice.actions;
export default counterSlice.reducer;
