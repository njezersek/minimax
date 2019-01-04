let Igra = require("./igra.js");
let Minimax = require("./minimax.js");

const igra = new Igra(7,6,4,"X");
const algoritem = new Minimax(5);

igra.data =
[ [ ' ', ' ', ' ', ' ', ' ', ' ', ' ' ],
  [ ' ', ' ', ' ', 'O', ' ', ' ', ' ' ],
  [ ' ', ' ', ' ', 'X', 'O', ' ', ' ' ],
  [ ' ', ' ', ' ', 'O', 'X', ' ', ' ' ],
  [ ' ', ' ', 'O', 'X', 'X', ' ', ' ' ],
  [ ' ', ' ', 'X', 'O', 'X', ' ', ' ' ] ];

igra.prikazi();

let odlocitev = algoritem.odlocitev(igra);

console.log("Odlocitev: ", odlocitev);
