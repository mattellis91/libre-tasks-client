import React from "react";
import "./board.scss";
import { motion } from "framer-motion";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { reorderTaskDragDrop } from "../../features/boards/boardSlice";
import {
  closeAllModals,
  closeViewTaskModal,
  openModal,
} from "../../features/global/modalSlice";
import Sidebar from "../Sidebar/Sidebar";
import Column from "../Column/Column";
import ActionBoardModal from "../Modal/BoardModal/ActionBoardModal";
import AddTaskModal from "../Modal/TaskModal/AddTaskModal";
import AddBoardModal from "../Modal/BoardModal/AddBoardModal";
import EditBoardModal from "../Modal/BoardModal/EditBoardModal";
import EditTaskModal from "../Modal/TaskModal/EditTaskModal";
import { DragDropContext } from "react-beautiful-dnd";
import ViewTaskModal from "../Modal/TaskModal/ViewTaskModal";
import { RootState } from "../../app/store";

const Board = () => {
  const dispatch = useDispatch();
  const boards = useSelector((state:RootState) => state.boards.boards);
  const activeBoard = boards.find((board) => board.active === true);

  // Modals
  const deleteBoardModal = useSelector((state:RootState) => state.modal.deleteBoardModal);
  const clearBoardModal = useSelector((state:RootState) => state.modal.clearBoardModal);
  const resetBoardsModal = useSelector((state:RootState) => state.modal.resetBoardsModal);
  const editBoardModal = useSelector((state:RootState) => state.modal.editBoardModal);
  const addBoardModal = useSelector((state:RootState) => state.modal.addBoardModal);
  const addTaskModal = useSelector((state:RootState) => state.modal.addTaskModal);
  const viewTaskModal = useSelector((state:RootState) => state.modal.viewTaskModal);
  const editTaskModal = useSelector((state:RootState) => state.modal.editTaskModal);
  const deleteTaskModal = useSelector((state:RootState) => state.modal.deleteTaskModal);

  const handleOnDragEnd = (result:any) => {
    if (!result.destination) return;
    dispatch(reorderTaskDragDrop(result));
  };
  return (
    <>
      <div className="sidebar-board-outer">
        <Sidebar />
        <div className="board">
          {activeBoard && activeBoard.columns.length > 0 ? (
            <>
              <>
                <DragDropContext onDragEnd={handleOnDragEnd}>
                  {activeBoard.columns.map((column, colIndex) => (
                    <Column
                      key={column.id}
                      column={column}
                      boardID={activeBoard.id}
                      colIndex={colIndex}
                    />
                  ))}
                </DragDropContext>
              </>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="column__new bg-new-column"
                onClick={() => dispatch(openModal("editBoardModal"))}
              >
                <span>+ New Column</span>
              </motion.button>
            </>
          ) : (
            <div className="board__empty">
              <h1 className="board__empty-text">
                This board is empty. Create a new column to get started.
              </h1>
              <div
                className=" btn-primary-l board__empty__add"
                style={{ "width": "174px" }}
                onClick={() => dispatch(openModal("editBoardModal"))}
              >
                + Add a column
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Modals */}

      {clearBoardModal.open && <ActionBoardModal action="clear" />}
      {deleteBoardModal.open && <ActionBoardModal action="delete" />}
      {resetBoardsModal.open && <ActionBoardModal action="reset" />}
      {deleteTaskModal.open && <ActionBoardModal action="deleteTask" />}
      {editBoardModal.open && <EditBoardModal />}
      {addBoardModal.open && <AddBoardModal />}
      {addTaskModal.open && <AddTaskModal />}
      {viewTaskModal.open && (
        <ViewTaskModal
          handleClose={() => {
            dispatch(closeAllModals());
            dispatch(closeViewTaskModal());
          }}
        />
      )}
      {editTaskModal.open && <EditTaskModal />}
    </>
  );
};

export default Board;
