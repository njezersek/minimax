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
