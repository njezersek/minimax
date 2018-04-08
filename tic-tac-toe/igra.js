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
        let znak = this.poglej(i,j);

        //če si na preznem polju ne preverjaj kdo je zmagal
        if(znak == " ")continue;

        //na začetku predvidevaš, da imas N v vrsto
        let vodoravno = true;
        let navpicno = true;
        let posevnoGor = true;
        let posevnoDol = true;
        for(let k=1; k<n; k++){
          //preveri vse 4 smeri, če je vmes kakšen nepravilen znak ni zmage
          if(this.poglej(i+k, j) != znak) vodoravno = false;
          if(this.poglej(i, j+k) != znak) navpicno = false;
          if(this.poglej(i+k, j+k) != znak) posevnoDol = false;
          if(this.poglej(i-k, j+k) != znak) posevnoGor = false;
        }
        if(navpicno || vodoravno || posevnoGor || posevnoDol){
          return znak;
        }
      }
    }
    return " "; //izenačeno
  }

  poglej(x,y){
    if(x >= 0 && x < this.w && y >= 0 && y < this.h){
      return this.data[y][x];
    }
    return;
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
