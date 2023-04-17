import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: {
        email: '',
        family_name: '',
        given_name: '',
        userId: '',
        picture: '',
        verifiedEmail: null
    }
}

export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    }
  },
})

export const { setUser } = userInfoSlice.actions;
export const selectCurrentUser = (state) => state.userInfo.user;
export default userInfoSlice.reducer;