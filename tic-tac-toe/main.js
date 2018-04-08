const racunalnik = new Minimax();
const igra = new Igra(3,3,3,"X");
const ui = new Ui(document.getElementById("display"), igra);

/*igra.data = [
  ["O"," ","O"],
  [" ","X","X"],
  ["X"," ","O"]
];*/


igra.naPotezi = "X";

function postavi(x,y){
  igra.postavi(x,y);
  ui.posodobi();
  igra.prikazi();

  let odlocitev = racunalnik.odlocitev(igra);
  igra.postavi(odlocitev.x,odlocitev.y);
  ui.posodobi();
  igra.prikazi();
}
