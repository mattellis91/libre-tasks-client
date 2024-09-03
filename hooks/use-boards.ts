import { create } from "zustand";
import { z } from "zod";

export interface Board {
    id:string;
    title:string;
}

export const CreateBoard = z.object({
    title: z.string()
})

type BoardsStore = {
    boards: any[];
    onCreate: (board:Board) => void;
    onDelete: (boardId:string) => void;
}

export const useBoard = create<BoardsStore>((set) => ({
    boards: [],
    onCreate: (board:Board) => set((state) => ({boards: [...state.boards, board]})),
    onDelete: (boardId:string) => set((state) => {
        const foundIndex = state.boards.findIndex((board) => board.Id === boardId);
        if(foundIndex) {
            return {boards: state.boards.splice(foundIndex, 1)};
        }
        return {boards: state.boards};
    })
}));