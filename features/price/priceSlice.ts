import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PriceState {
  value: string;
}

const initialState: PriceState = {
  value: "1.25",
};
export const priceSlice = createSlice({
  name: "price",
  initialState,
  reducers: {
    update: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});
export const { update } = priceSlice.actions;

export default priceSlice.reducer;
