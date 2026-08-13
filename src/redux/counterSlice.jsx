import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://6a79c891674f43f4db11c371.mockapi.io/product";

// datamap - get
export const getData = createAsyncThunk("product/getData", async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
});
// Create-post
export const addData = createAsyncThunk(
  "product/addData",
  async (newProduct) => {
    const response = await axios.post(BASE_URL, newProduct);
    return response.data;
  },
);

//update - put
export const updateData = createAsyncThunk(
  "products/updateProduct",
  async ({ id, updatedData }) => {
    const response = await axios.put(`${BASE_URL}/${id}`, updatedData);
    return response.data;
  },
);

//delete
export const deleteData = createAsyncThunk(
  "products/deleteProduct",
  async (id) => {
    await axios.delete(`${BASE_URL}/${id}`);
    return id;
  },
);

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //get
      .addCase(getData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getData.pending, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(getData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // CREATE-add
      .addCase(addData.pending, (state) => {
        state.loading = true;
      })
      .addCase(addData.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(addData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      //update
      .addCase(updateData.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (item) => item.id === action.payload.id,
        );
        if (index !== -1) state.data[index] = action.payload;
      })
      .addCase(updateData.rejected, (state, action) => {
        state.error = action.error.message;
      })

      //detele
      .addCase(deleteData.fulfilled, (state, action) => {
        state.data = state.data.filter((item) => item.id !== action.payload);
      })
      .addCase(deleteData.rejected,(state,action)=>{
        state.error = action.error.message
      })
  },
});

export const {} = counterSlice.actions;
export default counterSlice.reducer;
