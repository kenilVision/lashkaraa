import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axios";
import Cookies from "js-cookie";



export const signupUser = createAsyncThunk(
  "user/signup",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/auth/signup", formData,{
        headers: {
          "Content-Type": "application/json"
        }}
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/login",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/auth/login", formData,
        {
          headers: {
            "Content-Type": "application/json"
        }}
      );
      console.log("Login response:", res); 
      const userData = res;

      // Store token in cookie
      Cookies.set("Token", userData.token, { expires: 1 }); 

      return res;
    } catch (err) {
      return rejectWithValue(err.response?.data || err);
    }
  }
);

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/auth/user");
      return res;
    } catch (err) {
      return rejectWithValue(err.response?.data || err);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "user/UpdateProfile",
  async (updatedData, { rejectWithValue }) => {
    try {
      console.log(updatedData)
      const res = await axiosInstance.put("/auth/update", updatedData);
      console.log(res)
      return res;
    } catch (err) {
      return rejectWithValue(err.response?.data || err);
    }
  }
)
// --- Slice ---

const userSlice = createSlice({
  name: "user",
  initialState: {
    _id: null,
    firstname: "",
    lastname: "",
    email: "",
    address: {},
    token: "",
    isActive: false,
    login: false,
    loading: false,
    error: null,
  },
  reducers: {
    
    logout: (state) => {
      Cookies.remove("Token"); 
      return {
        _id: null,
        firstname: "",
        lastname: "",
        email: "",
        token: "",
        isActive: false,
        address: {},
        login: false,
        loading: false,
        error: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const user = action.payload.deliveryAgent;
        state._id = user.userId;
        state.firstname = user.firstname;
        state.lastname = user.lastname;
        state.email = user.email;
        state.address = user.address || {};
        state.token = user.token;
        state.isActive = user.isActive;
        state.login = true;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        const user = action.payload.user;
        state._id = user.userId;
        state.firstname = user.firstname;
        state.lastname = user.lastname;
        state.email = user.email;
        state.address = user.address || {};
        state.token = user.token;
        state.isActive = user.isActive;
        state.login = true;
        state.loading = false;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        const user = action.payload.user;
        state._id = user.userId;
        state.firstname = user.firstname;
        state.lastname = user.lastname;
        state.email = user.email;
        state.address = user.address || {};
        state.token = user.token;
        state.isActive = user.isActive;
        state.login = true;
        state.loading = false;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

// --- Exports ---

export const {
  setAddress,
  updateAddress,
  removeAddress,
  logout,
} = userSlice.actions;

export default userSlice.reducer;
