import axios from "axios";
import { atom, selector } from "recoil";

export const dataAtom = atom({
  key: "dataAtom",
  default: selector({
    key: "dataSelector",
    get: async () => {
      //simulating delay
      //await new Promise((r) => setTimeout(r, 2000)); //sleeps for 2 sec -- stops the entire site from loading
      const resp = await axios.get(
        "https://jsonplaceholder.typicode.com/posts/1",
      );
      return resp.data;
    },
  }),
});
