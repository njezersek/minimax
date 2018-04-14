class Minimax{
  constructor(){
    this.globina = 9; //pamet algoritma
  }

  odlocitev(igra){
    	this.znak = igra.naPotezi;
      let moznosti = this.rekurzivnoDrevo(igra, this.globina);
      console.log(moznosti);
      let vrednosti = moznosti.map(
        el => el.vrednost * (this.globina-el.oddaljenost)
      );
      return moznosti[vrednosti.indexOf(Math.max(...vrednosti))];
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
      //in je še kakšno prosto polje, lahko se zgodi da so vsa polja polna in
      //je rezultat izenačeno potem pride error
      if(zmaga == " " && n-1>0 && novaIgra.prostaPolja() > 0){
        let ovrednoteneMoznosti = this.rekurzivnoDrevo(novaIgra, n-1);

        //poišči min in max med ovrednotenimi možnostmi (veje)
        let vrednosti = ovrednoteneMoznosti.map(el => el.vrednost);
        let imax = vrednosti.indexOf(Math.max(...vrednosti));
        let imin = vrednosti.indexOf(Math.min(...vrednosti));

        //če je na motezi nasprotnik išči min drugače pa max
        let index = novaIgra.naPotezi == this.znak ? imax : imin;

        moznost.zmaga = ovrednoteneMoznosti[index].zmaga;
        moznost.vrednost = ovrednoteneMoznosti[index].vrednost;
        moznost.oddaljenost = ovrednoteneMoznosti[index].oddaljenost;
      }
    }
    return moznosti;
  }
}
