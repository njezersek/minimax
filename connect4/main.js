let racunalnik, igra, ui;
let igralec1 = "clovek";
let igralec2 = "algoritem";
let simbol1 = 1;
let simbol2 = -1;
let globina1 = 6;
let globina2 = 6;
let zacne = 1;
let zamenjaniSimboli = false;
let zakasnitev = 0;
let stevecZmagO = 0;
let stevecZmagX = 0;
let stevecIzenaceno = 0;

function setup(){
  algoritem1 = new Minimax(globina1);
  algoritem2 = new Minimax(globina2);
  let z;
  if(zacne == 1 && !zamenjaniSimboli)z = 1;
  else z = -1;
  igra = new Igra(7,6,4,z);
  ui = new Ui(document.getElementById("display"), igra);

  ui.krog();
}

function stevciReset(){
  stevecZmagO = 0;
  stevecZmagX = 0;
  stevecIzenaceno = 0;
}
