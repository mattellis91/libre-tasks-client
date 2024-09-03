
"use client"

import { Button } from "@/components/ui/button";
import { Board, CreateBoard, useBoard } from "@/hooks/use-boards";
import { createId } from "@paralleldrive/cuid2";

const OrganizationIdPage = () => {

    const onBoardCreate = useBoard((state) => state.onCreate);
    const boards = useBoard((state) => state.boards);

    async function create(formData: FormData) {
        
        const { title } = CreateBoard.parse({
            title: formData.get("title")
        });

        const board:Board = {
            id:createId(),
            title:title
        }
        onBoardCreate(board);
    }

    return (
        <div className="fex flex-col space-y-4">
            <form action={create}
            >
                <input type="text" id="title" name="title" required placeholder="Enter a board title" className="border-black border p-1" />
                <Button type="submit">Create Board</Button>
            </form>
        </div>
    )
}

export default OrganizationIdPage;