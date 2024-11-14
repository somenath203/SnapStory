import { create } from "zustand";


export const useResponseModelState = create(() => {
    return {
        responseFromModel: '',
    }
});