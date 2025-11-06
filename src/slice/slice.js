
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Mock API function - replace with real API


// Async thunk for user registration
export const registerUser = createAsyncThunk(
  'api/users/register',async (payLoad)=>{
       const response = await  axios.post("http://192.168.0.21:5000/api/users/register",payLoad,
        {
          headers:{
            "Content-Type":"multipart/form-data"
          }
        }
       )
       
       
  }       
);

const initialState = {
  user: null,
  loading: false,
  error: null,
  success: false
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    // Simple reducer to log something
    logMessage: (state, action) => {
      console.log('Redux Log:', action.payload);
    },
    clearState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      console.log('Redux: State cleared');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        console.log('Redux: Registration pending...');
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.success = true;
        state.error = null;
        console.log('Redux: Registration fulfilled with:', action.payload);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
        console.log('Redux: Registration rejected with:', action.payload);
      });
  }
});

export const { logMessage, clearState } = authSlice.actions;
export default authSlice.reducer;
