import { selector } from "recoil";
import { counterAtom } from "../atoms/counter.js";

export const isEvenSelector = selector({
  key: "isEvenSelector",
  get: function ({ get }) {
    const counterValue = get(counterAtom);

    const isEven = counterValue % 2 == 0;
    return isEven;
  },
});
