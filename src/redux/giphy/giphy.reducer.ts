import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface GiphyProps {
  loading: boolean;
  error: boolean;
  errorMessage: string;
  giphyDetail: Giphy[];
}

export interface Giphy {
    id: string;
    images: Images;
}

export interface Images {
    fixed_height: ImageProp;
}

export interface ImageProp {
    height: string,
    url: string,
    width: string
}

export const initialState: GiphyProps = {
  giphyDetail: [],
  loading: false,
  error: false,
  errorMessage: "",
};

const apiKey = "tVaJe9QRTL6VZp9xhBkogbNWFTI9hYnJ";

// asyncThunk generate three extraReducers
export const fetchGiphy = createAsyncThunk("repo/fetchGiphy", async (limit: string) => {
  try {
    const response = await axios("https://api.giphy.com/v1/gifs/trending", {
        params: {
          api_key: apiKey,
          limit: limit
        }
      });
    const data: Giphy[] = response.data;
    return data;
  } catch (error) {
    return error;
  }
});

export const searchGiphy = createAsyncThunk("repo/searchGiphy", async ({ search, limit }: { search: string, limit: string }) => {
    try {
      const response = await axios("https://api.giphy.com/v1/gifs/search", {
          params: {
            api_key: apiKey,
            q: search,
            limit: limit
          }
        });
      const data: Giphy[] = response.data;
      return data;
    } catch (error) {
      return error;
    }
  });

export const giphySlice = createSlice({
  name: "giphy",
  initialState,
  reducers: {
  },
  extraReducers: {
    [fetchGiphy.pending.type]: (state, action) => {
      state.loading = true;
      state.error = false;
      state.errorMessage = "";
    },
    [fetchGiphy.fulfilled.type]: (state, action) => {
      if (action.payload) {
        const data: Giphy[] = action.payload.data;
        state.giphyDetail = data.map(item => item);
      } else {
        state.error = true;
        state.errorMessage = "" + action.payload + "";
      }
      state.loading = false;
    },
    [searchGiphy.pending.type]: (state, action) => {
        state.loading = true;
        state.error = false;
        state.errorMessage = "";
      },
    [searchGiphy.fulfilled.type]: (state, action) => {
        if (action.payload) {
          const data: Giphy[] = action.payload.data;
          state.giphyDetail = data.map(item => item);
        } else {
          state.error = true;
          state.errorMessage = "" + action.payload + "";
        }
        state.loading = false;
      },
  },
});

export default giphySlice.reducer


