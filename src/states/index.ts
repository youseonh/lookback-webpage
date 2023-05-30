import { atom } from "recoil";
import { LOCALSTORAGEKEY } from "@enums/common";

export interface ILocalStorage {
  name?: string;
  url?: string;
}

export const localStorageAtom = atom<ILocalStorage[]>({
  key: "common/localStorage",
  default: [],
  effects: [
    ({ setSelf, onSet }) => {
      if (typeof window === "undefined") {
        return;
      }
      const savedData = window.localStorage.getItem(LOCALSTORAGEKEY.LOOKWEB);
      // setSelf: atom 값을 설정 혹은 재설정
      if (savedData) setSelf(JSON.parse(savedData));
      onSet((newValue, _, isReset) => {
        isReset
          ? window.localStorage.removeItem(LOCALSTORAGEKEY.LOOKWEB)
          : window.localStorage.setItem(LOCALSTORAGEKEY.LOOKWEB, JSON.stringify(newValue));
      });
    },
  ],
});
