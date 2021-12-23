import { Chess } from '../services/chess/Chess';
import { render } from '../services/chess/render';


export const main = async () => {
  console.log('Chess stuff... ♔');
  const game = new Chess();

  console.log('Moves:');
  const moves = game.getAvailableMoves('c3');
  console.log(moves);

  console.log(render(game.board, { moves }));
};

main();
