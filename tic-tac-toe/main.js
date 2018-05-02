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
  igra = new Igra(3,3,3,z);
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
    ui.posodobi();
    return;
  }

  let simbol = simbol1;
  if(zamenjaniSimboli)simbol = simbol2;
  if(igra.naPotezi == simbol){
    postaviIgalec1();
  }
  else{
    postaviIgalec2();
  }
}

function postaviIgalec1(){

  if(igralec1 == "clovek")onemogoceno = false;
  else{
    let odlocitev = algoritem1.odlocitev(igra);
    igra.postavi(odlocitev.x,odlocitev.y);
    ui.posodobi();

    setTimeout(krog, zakasnitev);
  }
}

function postaviIgalec2(){
  if(igralec2 == "clovek")onemogoceno = false;
  else{
    let odlocitev = algoritem2.odlocitev(igra);
    igra.postavi(odlocitev.x,odlocitev.y);
    ui.posodobi();

    setTimeout(krog, zakasnitev);
  }
}

function postavi(x,y){
  if(onemogoceno || igra.koncana)return;
  if(!igra.postavi(x,y))return;

  onemogoceno = true;
  ui.posodobi();
  igra.prikazi();

  setTimeout(krog, zakasnitev);
}

function stevciReset(){
  stevecZmagO = 0;
  stevecZmagX = 0;
  stevecIzenaceno = 0;
}

//nastavitve
function settings(){
  document.getElementById('game').style.display = "none";
  document.getElementById('settings').style.display = "block";

  if(igralec1 == "clovek"){
    document.getElementById('igralec1-globina-container').style.display = "none";
    document.getElementById('igralec1-nacin-clovek').className = "option selected";
    document.getElementById('igralec1-nacin-algoritem').className = "option";
  }
  else{
    document.getElementById('igralec1-globina-container').style.display = "block";
    document.getElementById('igralec1-nacin-clovek').className = "option";
    document.getElementById('igralec1-nacin-algoritem').className = "option selected";
  }

  if(igralec2 == "clovek"){
    document.getElementById('igralec2-globina-container').style.display = "none";
    document.getElementById('igralec2-nacin-clovek').className = "option selected";
    document.getElementById('igralec2-nacin-algoritem').className = "option";
  }
  else{
    document.getElementById('igralec2-globina-container').style.display = "block";
    document.getElementById('igralec2-nacin-clovek').className = "option";
    document.getElementById('igralec2-nacin-algoritem').className = "option selected";
  }

  document.getElementById('igralec1-globina').value = globina1;
  document.getElementById('igralec1-globina-vrednost').innerHTML = globina1;
  document.getElementById('igralec2-globina').value = globina2;
  document.getElementById('igralec2-globina-vrednost').innerHTML = globina2;

  document.getElementById('zakasnitev').value = zakasnitev;
  document.getElementById('zakasnitev-vrednost').innerHTML = zakasnitev;

  if(zamenjaniSimboli){
    document.getElementById('simbol-container').style.flexDirection = "row-reverse";
  }
  else{
    document.getElementById('simbol-container').style.flexDirection = "row";
  }

  if(zacne == 1){
    document.getElementById('zacne-igralec1').className = "option selected";
    document.getElementById('zacne-igralec2').className = "option";
  }
  else{
    document.getElementById('zacne-igralec1').className = "option";
    document.getElementById('zacne-igralec2').className = "option selected";
  }

}

function closeSettings(){
  document.getElementById('game').style.display = "block";
  document.getElementById('settings').style.display = "none";
  stevciReset();
  setup();
}

function nastaviZacne(igralec){
  zacne = igralec;
  settings();
}

function zamenjajSimbole(){
  if(zamenjaniSimboli){
    zamenjaniSimboli = false;
  }
  else{
    zamenjaniSimboli = true;
  }
  settings();
}

function nastaviNacin(igralec, nacin){
  if(igralec == 1){
    igralec1 = nacin;
  }
  else{
    igralec2 = nacin;
  }
  settings();
}

function nastaviGlobino(){
  globina1 = document.getElementById('igralec1-globina').value;
  globina2 = document.getElementById('igralec2-globina').value;
  settings();
}

function nastaviZakasnitev(){
  zakasnitev = document.getElementById('zakasnitev').value;
  settings();
}
