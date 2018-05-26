let racunalnik, igra, ui, onemogoceno;
let igralec1 = "clovek";
let igralec2 = "algoritem";
let simbol1 = "X";
let simbol2 = "O";
let globina1 = 6;
let globina2 = 6;
let zacne = 1;
let zamenjaniSimboli = false;
let zakasnitev = 100;
let stevecZmagO = 0;
let stevecZmagX = 0;
let stevecIzenaceno = 0;

function setup(){
  algoritem1 = new Minimax(globina1);
  algoritem2 = new Minimax(globina2);
  let z;
  if(zacne == 1 && !zamenjaniSimboli)z = "X";
  else z = "O";
  igra = new Igra(7,6,4,z);
  ui = new Ui(document.getElementById("display"), igra);

  onemogoceno = true;

  krog();
}

function krog(){
  if(igra.koncana){
    //posodobi stevce
    let zmaga = igra.zmagovalec;
    if(zmaga == "X")stevecZmagX++;
    if(zmaga == "O")stevecZmagO++;
    if(zmaga == " ")stevecIzenaceno++;
    ui.render();
    return;
  }

  let simbol = simbol1;
  if(zamenjaniSimboli)simbol = simbol2;
  if(igra.naPotezi == simbol){
    console.log("Igralec 1");
    postaviIgalec1();

  }
  else{
    console.log("Igralec 2");
    postaviIgalec2();
  }
}

function postaviIgalec1(){

  if(igralec1 == "clovek"){
    onemogoceno = false;
    ui.render();
  }
  else{
    let odlocitev = algoritem1.odlocitev(igra);
    igra.postavi(odlocitev.x,odlocitev.y);
    //ui.spustZetona(odlocitev.x);
    ui.render();

    setTimeout(krog, zakasnitev);
  }
}

function postaviIgalec2(){
  if(igralec2 == "clovek"){
    onemogoceno = false;
    ui.render();
  }
  else{
    let odlocitev = algoritem2.odlocitev(igra);
    igra.postavi(odlocitev.x,odlocitev.y);
    //ui.spustZetona(odlocitev.x);
    ui.render();

    setTimeout(krog, zakasnitev);
  }
}

function postavi(stolpec){
  if(onemogoceno || igra.koncana)return;
  if(!igra.postaviVStolpec(stolpec))return;

  onemogoceno = true;
  ui.render();
  //igra.prikazi();

  setTimeout(krog, zakasnitev);
}

function stevciReset(){
  stevecZmagO = 0;
  stevecZmagX = 0;
  stevecIzenaceno = 0;
}
