class Minimax{
  constructor(){
    this.globina = 6; //pamet algoritma
  }

  odlocitev(igra){
    	this.znak = igra.naPotezi;
      return this.rekurzivnoDrevo(igra, this.globina);
  }

  //rekurzivna funkcije, ki vrne seznam možnih potez in jih ovrednoti
  rekurzivnoDrevo(igra, n){
    //poišči vse možne poteze
    let moznosti = igra.moznosti();

    for(let l=0; l<moznosti.length; l++){
      let moznost = moznosti[l];

      //ovrednoti moznost
      let novaIgra = igra.copy();
      novaIgra.postavi(moznost.x, moznost.y);
      let zmaga = novaIgra.ovrednoti();

      //nastavi moznost
      moznost.oddaljenost = this.globina-n;
      moznost.zmaga = zmaga;
      if(zmaga == this.znak)moznost.vrednost = 1;
      else if(zmaga == " ")moznost.vrednost = 0;
      else moznost.vrednost = -1;

      //če ni nihče zmagal in nisi še presegel globine
      if(zmaga == " " && n-1>0 && novaIgra.prostaPolja() > 0){
        let ovrednoteneMoznosti = this.rekurzivnoDrevo(novaIgra, n-1);

        //poišči min in max med ovrednotenimi možnostmi (veje)
        let imax = 0;
        let max = -100;
        let imin = 0;
        let min = 100;
        for(let k=0; k<ovrednoteneMoznosti.length; k++){
          if(ovrednoteneMoznosti[k].vrednost > max){
            max = ovrednoteneMoznosti[k].vrednost;
            imax = k;
          }
          if(ovrednoteneMoznosti[k].vrednost < min){
            min = ovrednoteneMoznosti[k].vrednost;
            imin = k;
          }
        }

        //če je na motezi nasprotnik išči min drugače pa max
        let index = novaIgra.naPotezi == this.znak ? imax : imin;

        moznost.zmaga = ovrednoteneMoznosti[index].zmaga;
        moznost.oddaljenost = ovrednoteneMoznosti[index].oddaljenost;

        if(moznost.zmaga == this.znak)moznost.vrednost = 1;
        else if(moznost.zmaga == " ")moznost.vrednost = 0;
        else moznost.vrednost = -1;
      }
    }
    return moznosti;
  }
}

class Igra{
  constructor(w, h, zacne){
    this.w = w;
    this.h = h;
    this.naPotezi = zacne;
    this.data = [];

    //napolni tabelo s " "
    for(let j=0; j<this.h; j++){
      let vrstica = [];
      for(let i=0; i<this.w; i++){
        vrstica.push(" ");
      }
      this.data.push(vrstica);
    }
  }

  prikazi(){
    //prikazi stanje igre v konzoli
    //tole je ena čarovnija za seminarsko napiši na bolj jasen način
    let tabela = this.data.map(
      vrstica => vrstica.join(" | ")
    ).join("\n"+("-".repeat(this.w*4-3))+"\n");

    console.log(tabela);
  }

  prostaPolja(){
    //vrni števolo prostih polj
    let st = 0;
    for(let j=0; j<this.h; j++){
      for(let i=0; i<this.w; i++){
        if(this.data[j][i] == " ")st++;
      }
    }
    return st;
  }

  moznosti(){
    //vrni vse možne poteze, ki so trenutno na voljo
    let moznosti = [];
    for(let j=0; j<this.h; j++){
      for(let i=0; i<this.w; i++){
        if(this.data[j][i] == " "){
          moznosti.push(new Moznost(i,j));
        }
      }
    }
    return moznosti;
  }

  ovrednoti(){
    //povej ali je kdo zmagal
    const n = 3; //koliko znakov mora biti v vrsti
    for(let j=0; j<this.h; j++){
      for(let i=0; i<this.w; i++){
        let znak = this.data[j][i];

        //če si na preznem polju ne preverjaj kdo je zmagal
        if(znak == " ")continue;

        //na začetku predvidevaš, da imas N v vrsto
        let vodoravno = true;
        let navpicno = true;
        let posevnoGor = true;
        let posevnoDol = true;
        for(let k=1; k<n; k++){
          //preveri vodoravno
          //če vrsta pade izven igralnega polja tukaj tudi ni zmage
          if(i+k < this.w && j < this.h){
            //če je vmes kakšen nepravilen znak ni zmage
            if(this.data[j][i+k] != znak) vodoravno = false;
          }
          else vodoravno = false;

          //preveri navpicno
          if(i < this.w && j+k < this.h){
            if(this.data[j+k][i] != znak) navpicno = false;
          }
          else {navpicno = false; }

          //preveri posevno navzdol
          if(i+k < this.w && j+k < this.h){
            if(this.data[j+k][i+k] != znak) posevnoDol = false;
          }
          else posevnoDol = false;

          //preveri posevno navzgor
          if(i-k < this.w && j+k < this.h){
            if(this.data[j+k][i-k] != znak) posevnoGor = false;
          }
          else posevnoGor = false;
        }
        if(navpicno || vodoravno || posevnoGor || posevnoDol){
          return znak;
        }
      }
    }
    return " "; //izenačeno
  }

  postavi(x,y){
    //če ni prosto polje ne postavi
    if(this.data[y][x] != " ")return;
    //če ni na igralni površini ne postavi
    if(x < 0 || y < 0 || x >= this.w || y >= this.h)return;

    this.data[y][x] = this.naPotezi;
    if(this.naPotezi == "X")this.naPotezi = "O";
    else this.naPotezi = "X";
  }

  copy(){
    //naredi nov objetkt z enakimi podatki
    let igra = new Igra(this.w, this.h, this.naPotezi);
    igra.data = this.data.map(arr => arr.slice());
    return igra;
  }
}

class Moznost{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.zmaga = " ";
    this.vrednost = -1;
    this.oddaljenost = 0;
  }
}

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
