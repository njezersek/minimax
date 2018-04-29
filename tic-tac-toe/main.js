let racunalnik, igra, ui, onemogoceno, konec;
function setup(){
  racunalnik = new Minimax();
  igra = new Igra(3,3,3,"X");
  ui = new Ui(document.getElementById("display"), igra);
  onemogoceno = false;
  konec = false;
}

function postavi(x,y){
  if(onemogoceno ||konec)return;
  if(!igra.postavi(x,y))return;

  onemogoceno = true;
  ui.posodobi();
  igra.prikazi();

  preveriZmago();

  setTimeout(postviRacunalnik, 100);
}

function postviRacunalnik(){
  if(konec)return;
  let odlocitev = racunalnik.odlocitev(igra);
  igra.postavi(odlocitev.x,odlocitev.y);
  ui.posodobi();
  igra.prikazi();

  onemogoceno = false;
  preveriZmago();
}

function preveriZmago(){
  let zmaga = igra.ovrednoti();
  if(zmaga != " " || igra.prostaPolja() == 0){
    ui.posodobi();
    konec = true;
  }
}
