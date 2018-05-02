class Minimax{
  constructor(globina){
    this.globina = globina; //pamet algoritma
    this.nakljucnaIzbira = true; //ali naj algoritem izbere naključno med večimi
                                //enakkovrednimi izbirami
  }

  odlocitev(igra){
    this.znak = igra.naPotezi;
    return this.rekurzivnoDrevo(igra, this.globina);
  }

  rekurzivnoDrevo(igra, n){
    let moznosti = igra.moznosti();

    if(n > 0){
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
        if(zmaga == " " && novaIgra.prostaPolja() > 0){
          let ovrednotenaMoznost = this.rekurzivnoDrevo(novaIgra, n-1);

          moznost.zmaga = ovrednotenaMoznost.zmaga;
          moznost.vrednost = ovrednotenaMoznost.vrednost;
          moznost.oddaljenost = ovrednotenaMoznost.oddaljenost;
        }
      }
    }

    //if(n == this.globina)console.log(moznosti);

    //izberi moznosti
    let vrednosti = moznosti.map(
      // preprosto => vrednost (+/-) * bližina (bližje->večja vrednost)
      el => 10 * el.vrednost * (this.globina-el.oddaljenost)
            + Math.floor(Math.random()*10*this.nakljucnaIzbira)
             //na konec dodana stevka, ki zagotovi naključno izbiro poteze
    );

    //poišči min in max med ovrednotenimi možnostmi (veje)
    let imax = vrednosti.indexOf(Math.max(...vrednosti));
    let imin = vrednosti.indexOf(Math.min(...vrednosti));

    //če je na motezi nasprotnik išči min drugače pa max
    let index = igra.naPotezi == this.znak ? imax : imin;

    //console.log(moznosti);
    return moznosti[index];
  }
}
