import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  Chess,
  ChessBoard,
  ChessPlayer,
  ChessMove,
  startingBoard,
  WhitePlayer,
  GameStatus,
} from '../../services/chess'

interface ChessState {
  gameStarted: boolean;
  board: ChessBoard;
  player: ChessPlayer;
  moves: ChessMove[];
  status: GameStatus;
  notification?: string;
  error?: any;
}

const initialState: ChessState = {
  gameStarted: true,
  board: startingBoard,
  player: WhitePlayer,
  moves: [],
  status: 'WhiteToPlay',
}

export const chess = createSlice({
  name: 'chess',
  initialState,
  reducers: {
    reset: (state) => {
      state.gameStarted = true;
      state.board = initialState.board;
      state.player = initialState.player;
      state.moves = initialState.moves;
      state.status = initialState.status;
      state.notification = initialState.notification;
    },
    makeMove: (state, action: PayloadAction<ChessMove>) => {
      const move = action.payload;
      const { board, player, moves } = state;
      // Try to make the move
      try {
        const result = Chess.move({ board, player, move, moves });
        state.board = result.board;
        state.player = result.player;
        state.moves.push(result.move);
        state.status = result.status;
        console.log('STATUS:', result.status);
      } catch (error) {
        state.error = error;
        // TODO: Try to parse the error and set to notification?
      }
    }
  }
});

export const { reset, makeMove } = chess.actions;