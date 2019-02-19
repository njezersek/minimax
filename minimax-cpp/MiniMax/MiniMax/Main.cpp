#include <iostream>
#include "Igra.h"
#include "Minimax.h"
using namespace std;

int main() {
	Igra igra(7, 6, 4, 1);
	Minimax algoritem(5);

	// preberi stanje igre iz std::cin
	char input;
	std::cin >> input;
	if (input == 'X')igra.naPotezi = 1;
	if (input == 'O')igra.naPotezi = -1;
	for (int j = 0; j < igra.h; j++) {
		for (int i = 0; i < igra.w; i++) {
			std::cin >> input;
			if(input == 'X')igra.data[j][i] = 1;
			if(input == 'O')igra.data[j][i] = -1;
		}
	}


	/*igra.data = {
		{0, 0, 0, 0, 0, 0, 0 },
		{0, 0, 0,-1, 0, 0, 0 },
		{0, 0, 0, 1,-1, 0, 0 },
		{0, 0, 0,-1, 1, 0, 0 },
		{0, 0,-1, 1, 1, 0, 0 },
		{0,-1, 1,-1, 1, 0, 0 }
	};*/
	/*
	igra.data = {
		{ 0, 0, 1,-1,-1, 0, 0 },
		{ 0, 0,-1, 1,-1, 0, 0 },
		{ 1, 0,-1,-1, 1, 0, 1 },
		{-1, 0, 1, 1,-1, 0,-1 },
		{ 1, 0,-1,-1, 1, 1, 1 },
		{-1, 0, 1, 1,-1,-1, 1 }
	};*/

	//igra.prikazi();
	//cout << "zmaga: " << igra.ovrednoti() << "\n";
	//cout << "vrednost: " << igra.vrednost << "\n";

	Moznost odlocitev = algoritem.odlocitev(igra);
	std::cout << odlocitev.x << " " << odlocitev.y;

	//std::cout << "\n --- end of prgram ---";

	/*
	// igra
	while (!igra.koncana) {
		igra.prikazi();
		if (igra.naPotezi == 1) {
			std::cout << "(X) Izberi stolpec [0-6]: ";
			int stolpec;
			std::cin >> stolpec;
			if (igra.postaviVStolpec(stolpec)) {
					
			}
			else {
				std::cout << "# neveljevna poteza\n";
			}
		}
		else {
			std::cout << "(O) Preracunavam ... ";
			Moznost odlocitev = algoritem.odlocitev(igra);
			std::cout << "izbral sem stolpec " << odlocitev.x << "\n";
			igra.postaviVStolpec(odlocitev.x);
		}
	}
	igra.prikazi();
	std::cout << " --- konec igre, zmagal je " << (igra.zmagovalec == 1 ? "X" : "O") << " --- \n";
	*/
	/*int i;
	cin >> i;
	return 0;*/
}