# Chess
Basic functionality for playing a game of chess.

### `ChessBoard`

The chess board has 2 different representations: Keyed object and Array.
The Array board is what is generally used for lookup and determining moves.
It is structured with tiles in the following spaces:

```typescript
[
  [ a8 , b8 , c8 , d8 , e8 , f8 , g8 , h8 ],
  [ a7 , b7 , c7 , d7 , e7 , f7 , g7 , h7 ],
  [ a6 , b6 , c6 , d6 , e6 , f6 , g6 , h6 ],
  [ a5 , b5 , c5 , d5 , e5 , f5 , g5 , h5 ],
  [ a4 , b4 , c4 , d4 , e4 , f4 , g4 , h4 ],
  [ a3 , b3 , c3 , d3 , e3 , f3 , g3 , h3 ],
  [ a2 , b2 , c2 , d2 , e2 , f2 , g2 , h2 ],
  [ a1 , b1 , c1 , d1 , e1 , f1 , g1 , h1 ],
]
```

### `ChessMove`

TODO

### `ChessPiece`

## Roadmap
- [x] Type Definitions
  - [x] Board object
  - [x] Move object
  - [x] Piece object
  - [x] Game object
- [ ] Engine
  - [ ] Move validation
    - [x] Pawn
      - [x] Basic move
      - [x] First move
      - [x] Attack
      - [ ] Promotion
      - [x] En passant
    - [x] Rook
    - [x] Knight
    - [x] Bishop
    - [x] Queen
    - [ ] King
      - [x] Basic move
      - [x] Castling
      - [ ] No move into check
  - [ ] Possible moves for piece
  - [ ] Make move
  - [x] Check validation
  - [x] Checkamte validation
  - [x] Stalemate validation (Need to verify still)
  - [ ] Game notation output
  - [ ] Basic AI engine
- [ ] UI
  - [ ] Moveable board pieces
  - [ ] Pawn Promotion
  - [ ] Moves list
  - [ ] Time traveling
  - [ ] 