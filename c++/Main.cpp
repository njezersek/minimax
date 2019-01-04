#include <iostream>
#include "Igra.h"
#include "Minimax.h"
using namespace std;

int main()
{
	Igra igra(7,6,4,'X');
	Minimax algoritem(8);
	/*igra.postaviVStolpec(3);
	igra.postaviVStolpec(3);
	igra.postaviVStolpec(4);
	igra.postaviVStolpec(4);
	igra.postaviVStolpec(2);
	igra.postaviVStolpec(5);*/
	//igra.postaviVStolpec(1);

	igra.data = { 
		{' ', ' ', ' ', ' ', ' ', ' ', ' ' },
		{' ', ' ', ' ', 'O', ' ', ' ', ' ' },
		{' ', ' ', ' ', 'X', 'O', ' ', ' ' },
		{' ', ' ', ' ', 'O', 'X', ' ', ' ' },
		{' ', ' ', 'O', 'X', 'X', ' ', ' ' },
		{' ', ' ', 'X', 'O', 'X', ' ', ' ' }
	};
	
	igra.prikazi();
	cout << "zmaga: " << igra.ovrednoti() << "\n";

	Moznost odlocitev = algoritem.odlocitev(igra);
	std::cout << odlocitev.x << " " << odlocitev.y;
	
	std::cout << "\n --- end of prgram ---";

	int i;
	cin >> i;
	return 0;
}