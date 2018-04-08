const racunalnik = new Minimax();

const igra = new Igra(3,3,"X");

igra.data = [
  ["O"," ","O"],
  [" ","X","X"],
  ["X"," ","O"]
];


igra.naPotezi = "X";

function postavi(x,y){
  igra.postavi(x,y);
  igra.prikazi(x,y);
}
