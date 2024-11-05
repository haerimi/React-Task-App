import { useState } from 'react'
import { appContainer, board, buttons } from './App.css'
import BoardList from './components/BoardList/BoardList.tsx'
import ListsContainer from './components/ListsContainer/ListsContainer.tsx';
import { useTypedSelecter } from './hooks/redux.ts';

function App() {
  const [activeBoardId, setActiveBoardId] = useState('board-0');
  const boards = useTypedSelecter(state => state.board.boardArray);
  const getActiveBoard = boards.filter(board => board.boardId === activeBoardId)[0];
  const lists = getActiveBoard.lists;
  return(
    <div className={appContainer}>
      <BoardList 
         activeBoardId={activeBoardId}
         setActiveBoardId={setActiveBoardId}>
         </BoardList>

      <div className={board}>
         <ListsContainer lists = {lists} boardId={getActiveBoard.boardId}/>
      </div>
      <div className={buttons}>
        <button>
          이 게시판 삭제하기
        </button>
        <button>
          활동 목록 보이기
        </button>
      </div>
    </div>
  )
}

export default App
