import { useState } from 'react'
import { appContainer, board, buttons, deleteBoardButton, loggerButton } from './App.css'
import BoardList from './components/BoardList/BoardList.tsx'
import ListsContainer from './components/ListsContainer/ListsContainer.tsx';
import { useTypedDispatch, useTypedSelecter } from './hooks/redux.ts';
import EditModal from './components/EditModal/EditModal.tsx';
import LoggerModal from './components/LoggerModal/LoggerModal.tsx';
import { deleteBoard } from './store/slices/boardsSlice.ts';
import { addLog } from './store/slices/loggerSlice.ts';
import { v4 } from 'uuid';

function App() {
  const dispatch = useTypedDispatch();
  const [isLoggerOpen, setIsLoggerOpen] = useState(false)
  const [activeBoardId, setActiveBoardId] = useState('board-0');
  const modalActive = useTypedSelecter(state => state.board.modalActive);
  const boards = useTypedSelecter(state => state.board.boardArray);
  const getActiveBoard = boards.filter(board => board.boardId === activeBoardId)[0];
  const lists = getActiveBoard.lists;
  const hancleDeleteBoard = () => {
    if(boards.length > 1) {
      dispatch(
        deleteBoard({boardId: getActiveBoard.boardId})
      )
      dispatch(
        addLog({
          logId: v4(),
          logMessage: `게시판 지우기: ${getActiveBoard.boardName}`,
          logAuthor: 'User',
          logTimestamp: String(Date.now())
        })
      )

      const newIndexToSet = () => {
        const indexToBeDeleted = boards.findIndex(
          board => board.boardId === activeBoardId
        )
        return indexToBeDeleted === 0 
        ? indexToBeDeleted + 1
        : indexToBeDeleted - 1
      }

      setActiveBoardId(boards[newIndexToSet()].boardId)
    } else {
      alert('최소 게시판 개수는 한 개입니다.')
    }
  }

  return(
    <div className={appContainer}>
      {isLoggerOpen ? <LoggerModal setIsLoggerOpen={setIsLoggerOpen} /> : null}
      {modalActive ? <EditModal /> : null} 
      <BoardList 
         activeBoardId={activeBoardId}
         setActiveBoardId={setActiveBoardId}>
         </BoardList>

      <div className={board}>
         <ListsContainer lists = {lists} boardId={getActiveBoard.boardId}/>
      </div>
      <div className={buttons}>
        <button className={deleteBoardButton} onClick={hancleDeleteBoard}>
          이 게시판 삭제하기
        </button>
        <button className={loggerButton} onClick={() => setIsLoggerOpen(!isLoggerOpen)}>
          {isLoggerOpen ? "활동 목록 숨기기" : "활동 목록 보이기"}
        </button>
      </div>
    </div>
  )
}

export default App
