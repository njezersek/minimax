#pragma once
#include "Igra.h";
#include "Moznost.h";
class Minimax
{
public:
	int globina, nakljucnaIzbira;
	char naPotezi;

	Minimax(int globinaparam);
	~Minimax();

	Moznost odlocitev(Igra igra);
	Moznost rekurzivnoDrevo(Igra igra, int n);
};

