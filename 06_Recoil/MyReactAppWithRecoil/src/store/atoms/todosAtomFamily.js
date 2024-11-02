import TODOs from "../../data/todos";
import { atomFamily } from "recoil";

export const todoAtomFamily = atomFamily({
  key: "todoAtomFamily",
  default: (id) => {
    return TODOs.find((x) => x.id === id);
  },
});
