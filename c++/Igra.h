#pragma once
#include "Moznost.h"
#include <vector>

class Igra
{
public:
	int w, h, vVrsto;
	char naPotezi, zmagovalec;
	std::vector<std::vector<char>> data;
	bool koncana = false;

	Igra(int wparam, int hparam, int n, char naPotezi);
	~Igra();

	void prikazi();
	int prostaPolja();
	std::vector<Moznost> moznosti();
	char ovrednoti();
	char poglej(int x, int y);
	bool postavi(int x, int y);
	bool postaviVStolpec(int stolpec);
	int visinaStolpca(int stolpec);
	Igra copy();
};

