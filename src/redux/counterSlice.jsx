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
  async (newProduct , { rejectWithValue }) => {
     try {
      const response = await axios.post(BASE_URL, newProduct);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
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
        state.loading = true;
        state.error = null;
      })
      .addCase(getData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // CREATE-add
      .addCase(addData.pending, (state, action) => {
        state.loading = true;
        const tempItem = { ...action.meta.arg, id: `temp-${Date.now()}`, _optimistic: true };
        state.data.push(tempItem); // dərhal UI-yə əlavə edirik
      })
      .addCase(addData.fulfilled, (state, action) => {
        state.loading = false;
        const tempIndex = state.data.findIndex((item) => item._optimistic);
        if (tempIndex !== -1) state.data[tempIndex] = action.payload; // real data ilə əvəz
      })
      .addCase(addData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.data = state.data.filter((item) => !item._optimistic); // geri sil
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
      .addCase(deleteData.pending, (state, action) => {
        const id = action.meta.arg;
        state.deletedItem = state.data.find((item) => item.id === id);
        state.data = state.data.filter((item) => item.id !== id); // dərhal sil
      })
      .addCase(deleteData.fulfilled, (state) => {
        state.deletedItem = null;
      })
      .addCase(deleteData.rejected,(state,action)=>{
        state.error = action.error.message
        if (state.deletedItem) state.data.push(state.deletedItem); // geri qaytar
      })
  },
});

export const {} = counterSlice.actions;
export default counterSlice.reducer;
