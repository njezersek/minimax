class Minimax{
  constructor(globina){
    this.globina = globina; //pamet algoritma
    this.nakljucnaIzbira = true; //ali naj algoritem izbere naključno med večimi
                                //enakkovrednimi izbirami
  }

  odlocitev(igra){
    this.znak = igra.naPotezi;
		let odlocitev = this.rekurzivnoDrevo(igra, this.globina);
    return odlocitev;
  }

  rekurzivnoDrevo(igra, n){
    let moznosti = igra.moznosti();

    for(let l=0; l<moznosti.length; l++){
      let moznost = moznosti[l];

      //ovrednoti moznost
      let novaIgra = igra.copy();
      novaIgra.postavi(moznost.x, moznost.y);
      let vrednost = novaIgra.ovrednoti().vrednost;
			let zmaga = novaIgra.ovrednoti().zmaga;

      //nastavi moznost
      moznost.oddaljenost = this.globina-n;
      moznost.zmaga = zmaga;
      moznost.vrednost = vrednost;

      //če ni nihče zmagal in nisi še presegel globine
      //in je še kakšno prosto polje, lahko se zgodi da so vsa polja polna in
      //je rezultat izenačeno potem pride error
      if(zmaga == 0 && novaIgra.prostaPolja() > 0 && n > 0){
        let ovrednotenaMoznost = this.rekurzivnoDrevo(novaIgra, n-1);

        moznost.zmaga = ovrednotenaMoznost.zmaga;
        moznost.vrednost = ovrednotenaMoznost.vrednost;
        moznost.oddaljenost = ovrednotenaMoznost.oddaljenost;
      }
    }

    //izberi moznosti
    let vrednosti = moznosti.map(
      // preprosto => vrednost (+/-) * bližina (bližje->večja vrednost)
      el => 10 * el.vrednost /* * (this.globina-el.oddaljenost)*/
            + Math.floor(Math.random()*10*this.nakljucnaIzbira)
             //na konec dodana stevka, ki zagotovi naključno izbiro poteze
    );

    //poišči min in max med ovrednotenimi možnostmi (veje)
    let imax = vrednosti.indexOf(Math.max(...vrednosti));
    let imin = vrednosti.indexOf(Math.min(...vrednosti));

    //če je na motezi nasprotnik išči min drugače pa max
    let index = igra.naPotezi == 1 ? imax : imin;

    return moznosti[index];
  }
}
