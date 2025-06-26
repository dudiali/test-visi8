import { ArticleIndex } from "@/lib/zodScheme";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SessionState {
  token: string | null;
  data: ArticleIndex[];
}

const initialState: SessionState = {
  token: null,
  data: [],
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    clearToken: (state) => {
      state.token = null;
    },
    setData: (state, action: PayloadAction<ArticleIndex[]>) => {
      state.data = action.payload;
    },
  },
});

export const { setToken, clearToken, setData } = sessionSlice.actions;
export default sessionSlice.reducer;
