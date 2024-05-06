import { create } from "zustand";

interface useSearchModelProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useSearchModel = create<useSearchModelProps>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export default useSearchModel;