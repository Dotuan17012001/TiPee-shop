import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  isAuthenticated: 0,
  user: {
    email: '',
    phone: '',
    fullName: '',
    role: '',
    avatar: '',
    id: ''
  }
};

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    doLoginAction: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user
    },
    doGetAccountAction: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user
    },
   
  },
  
  extraReducers: (builder) => {
      
  },

});

export const { doLoginAction, doGetAccountAction } = accountSlice.actions;

export default accountSlice.reducer;
