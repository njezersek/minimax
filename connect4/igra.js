class Igra{
  constructor(w, h, n, zacne){
    this.w = w;
    this.h = h;
    this.vVrsto = n;
    this.naPotezi = zacne;
    this.data = [];
    this.koncana = false;
    this.zmagovalec = 0;

    //napolni tabelo s 0
    for(let j=0; j<this.h; j++){
      let vrstica = [];
      for(let i=0; i<this.w; i++){
        vrstica.push(0);
      }
      this.data.push(vrstica);
    }
  }

  prikazi(){
    //prikazi stanje igre v konzoli
    //tole je ena čarovnija za seminarsko napiši na bolj jasen način
    let tabela = this.data.map(
      vrstica => vrstica.map(polje => polje == 1 ? "X" : polje == -1 ? "O" : " ").join(" | ")
    ).join("\n"+("-".repeat(this.w*4-3))+"\n");

    console.log(tabela);
  }

  prostaPolja(){
    //vrni števolo prostih polj
    let st = 0;
    for(let j=0; j<this.h; j++){
      for(let i=0; i<this.w; i++){
        if(this.data[j][i] == 0)st++;
      }
    }
    if(st == 0)this.koncana = true;
    return st;
  }

  moznosti(){
    //vrni vse možne poteze, ki so trenutno na voljo
    let moznosti = [];
    for(let i=0; i<this.w; i++){
      for(let j=this.h-1; j>=0; j--){
        if(this.data[j][i] == 0){
          moznosti.push(new Moznost(i,j));
          break;
        }
      }
    }
    return moznosti;
  }

  ovrednoti(){
    //povej ali je kdo zmagal
    const n = this.vVrsto; //koliko znakov mora biti v vrsti
		let vrednost = 0;
		let zmaga = 0;
		const smeri = [
			{x: 1, y: 0}, // vodoravno
			{x: 0, y: 1}, // navpicno
			{x: 1, y: 1}, // posevno dol
			{x: -1, y: 1}, // posevno gor
		];
		for(let s=0; s<smeri.length; s++){
			const smer = smeri[s];
	    for(let j=0-Math.min(smer.y, 0); j<=this.h - Math.max(smer.y,0)*n; j++){
	      for(let i=0-Math.min(smer.x,0); i<=this.w - Math.max(smer.x,0)*n; i++){
	        // prestej koliko znakov je v vrsti
					let vrstaA = 0;
					let vrstaB = 0;
					let vrstaMogoca = true;

					for(let k=0; k<n; k++){
						if(this.poglej(i+smer.x*k,j+smer.y*k) == 1)vrstaA++;
						if(this.poglej(i+smer.x*k,j+smer.y*k) == -1)vrstaB++;
						if(this.poglej(i+smer.x*k,j+smer.y*k) === undefined)vrstaMogoca = false;
					}

					if(vrstaMogoca){
						if(vrstaA == 0)vrednost -= 10**vrstaB;
						if(vrstaB == 0)vrednost += 10**vrstaA;
					}
					if(vrstaA == 4)zmaga = 1;
					if(vrstaB == 4)zmaga = -1;
	      }
			}
    }
		if(zmaga != 0){
			this.koncana = true;
      this.zmagovalec = zmaga;
		}
    return {vrednost: vrednost, zmaga: zmaga}; //izenačeno
  }

  poglej(x,y){
    if(x >= 0 && x < this.w && y >= 0 && y < this.h){
      return this.data[y][x];
    }
    return;
  }

  postavi(x,y){
    //če je igra končana ne postavi
    if(this.koncana)return false;
    //če ni na igralni površini ne postavi
    if(x < 0 || y < 0 || x >= this.w || y >= this.h)return false;
    //če ni prosto polje ne postavi
    if(this.data[y][x] != 0)return false;

    this.data[y][x] = this.naPotezi;
    if(this.naPotezi == 1)this.naPotezi = -1;
    else this.naPotezi = 1;

    //ovrednoti igro (nastavi koncana in zmagovalec)
    this.ovrednoti();
    this.prostaPolja();

    return true;
  }

  postaviVStolpec(stolpec){
    let moznosti = this.moznosti();
    for(let i=0; i<moznosti.length; i++){
      if(moznosti[i].x == stolpec){
        this.postavi(moznosti[i].x, moznosti[i].y);
        return true;
      }
    }
    return false;
  }

  visinaStolpca(stolpec){
    let moznosti = this.moznosti();
    for(let i=0; i<moznosti.length; i++){
      if(moznosti[i].x == stolpec){
        return moznosti[i].y;
      }
    }
    return -1;
  }

  copy(){
    //naredi nov objetkt z enakimi podatki
    let igra = new Igra(this.w, this.h, this.vVrsto, this.naPotezi);
    igra.data = this.data.map(arr => arr.slice());
    return igra;
  }
}
