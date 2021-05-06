import { createSlice } from '@reduxjs/toolkit'

export const movieSlice = createSlice({
  name: 'movie',
  initialState: {
    recentInfo: null,
    popularInfo: null,
    searchInfo: null,
  },
  reducers: {
    getRecentSuccess: (state, action) => {
      return {
          ...state,
          recentInfo: action.payload
      }
    },
    getPopularSuccess: (state, action) => {
      return {
          ...state,
          popularInfo: action.payload
      }
    },
    searchSuccess: (state, action) => {
        return {
            ...state,
            searchInfo: action.payload
        }
      },
  },
});

export const {
    getRecentSuccess,
    searchSuccess,
    getPopularSuccess
} = movieSlice.actions
export default movieSlice.reducer
