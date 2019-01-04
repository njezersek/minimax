#include "Minimax.h"
#include <stdlib.h>     /* srand, rand */
#include <time.h>       /* time */
#include <iostream>
#include <string>


Minimax::Minimax(int globinaparam)
{
	globina = globinaparam;
	nakljucnaIzbira = 1;

	srand(time(NULL));
}


Minimax::~Minimax()
{
}

Moznost Minimax::odlocitev(Igra igra)
{
	naPotezi = igra.naPotezi;
	return rekurzivnoDrevo(igra, globina);
}

Moznost Minimax::rekurzivnoDrevo(Igra igra, int n)
{
	std::vector<Moznost> moznosti = igra.moznosti();

	if (n > 0) {
		for (int l = 0; l < moznosti.size(); l++) {
			Moznost& moznost = moznosti[l];

			//ovrednoti moznost
			Igra novaIgra = igra.copy();
			novaIgra.postavi(moznost.x, moznost.y);
			//std::cout << "moznost: (x: " << moznost.x << ", y: " << moznost.y << ")" ;
			//novaIgra.prikazi();
			char zmaga = novaIgra.ovrednoti();

			//nastavi moznost
			moznost.oddaljenost = globina - n;
			moznost.zmaga = zmaga;
			if (zmaga == naPotezi)moznost.vrednost = 1;
			else if (zmaga == ' ')moznost.vrednost = 0;
			else moznost.vrednost = -1;

			//std::cout << "vrednost" << moznost.vrednost << "\n";

			//če ni nihče zmagal in nisi še presegel globine
			//in je še kakšno prosto polje, lahko se zgodi da so vsa polja polna in
			//je rezultat izenačeno potem pride error
			if (zmaga == ' ' && novaIgra.prostaPolja() > 0) {
				Moznost ovrednotenaMoznost = rekurzivnoDrevo(novaIgra, n - 1);

				moznost.zmaga = ovrednotenaMoznost.zmaga;
				moznost.vrednost = ovrednotenaMoznost.vrednost;
				moznost.oddaljenost = ovrednotenaMoznost.oddaljenost;
			}
		}
	}

	/*if (n == globina) {
		std::cout << "na potezi: " << naPotezi << "\n";
		std::string out1 = " * ";
		std::string out2 = " * ";
		for (int index = 0; index < moznosti.size(); index++) {
			std::cout << "x: " << moznosti[index].x << " z:" << moznosti[index].vrednost << ":\n";
		}
		//std::cout << "\n " << out1 << "\n " << out2 << "\n";

	}*/

	//izberi moznosti
	int vmax = -1000000;
	int vmin = 1000000;
	int imax = -1;
	int imin = -1;
	for (int i = 0; i < moznosti.size(); i++) {
		Moznost m = moznosti[i];
		//na konec dodana stevka, ki zagotovi naključno izbiro poteze
		int v = 10 * m.vrednost * (globina - m.oddaljenost) + (rand() % 10) * nakljucnaIzbira;
		//poišči min in max med ovrednotenimi možnostmi (veje)
		if (v > vmax) {
			vmax = v;
			imax = i;
		}
		if (v < vmin) {
			vmin = v;
			imin = i;
		}
	}
	//če je na motezi nasprotnik išči min drugače pa max
	int index = igra.naPotezi == naPotezi ? imax : imin;

	return moznosti[index];
}
