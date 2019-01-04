#include "Igra.h"
#include <iostream>
#include <vector>


Igra::Igra(int wparam, int hparam, int n, char zacne)
{
	w = wparam;
	h = hparam;
	vVrsto = n;
	naPotezi = zacne;
	koncana = false;
	zmagovalec = ' ';
	data = std::vector<std::vector<char>>(h);
	for (int i = 0; i < h; i++) {
		data[i] = std::vector<char>(w);
		for (int j = 0; j < w; j++) {
			data[i][j] = ' ';
		}
	}
}


Igra::~Igra()
{
	
}

void Igra::prikazi()
{
	std::cout << "\n";
	for (int i = 0; i < h; i++) {
		for (int j = 0; j < data[i].size(); j++) {
			if (data[i][j] == ' ')std::cout << '.' << " ";
			else std::cout << data[i][j] << " ";
		}
		std::cout << "\n";
	}
}

int Igra::prostaPolja()
{
	//vrni števolo prostih polj
	int st = 0;
	for (int j = 0; j < h; j++) {
		for (int i = 0; i < w; i++) {
			if (data[j][i] == ' ')st++;
		}
	}
	if (st == 0)koncana = true;
	return st;
}

std::vector<Moznost> Igra::moznosti()
{
	//vrni vse možne poteze, ki so trenutno na voljo
	std::vector<Moznost> moznosti;
	for (int i = 0; i < w; i++) {
		for (int j = h - 1; j >= 0; j--) {
			if (data[j][i] == ' ') {
				moznosti.push_back(Moznost(i, j));
				break;
			}
		}
	}
	return moznosti;
}

char Igra::ovrednoti()
{
	//povej ali je kdo zmagal
	int n = vVrsto; //koliko znakov mora biti v vrsti
	for (int j = 0; j < h; j++) {
		for (int i = 0; i < w; i++) {
			char znak = poglej(i, j);

			//če si na preznem polju ne preverjaj kdo je zmagal
			if (znak == ' ')continue;

			//na začetku predvidevaš, da imas N v vrsto
			bool vodoravno = true;
			bool navpicno = true;
			bool posevnoGor = true;
			bool posevnoDol = true;
			for (int k = 1; k < n; k++) {
				//preveri vse 4 smeri, če je vmes kakšen nepravilen znak ni zmage
				if (poglej(i + k, j) != znak) vodoravno = false;
				if (poglej(i, j + k) != znak) navpicno = false;
				if (poglej(i + k, j + k) != znak) posevnoDol = false;
				if (poglej(i - k, j + k) != znak) posevnoGor = false;
			}
			if (navpicno || vodoravno || posevnoGor || posevnoDol) {
				koncana = true;
				zmagovalec = znak;
				return znak;
			}
		}
	}
	return ' '; //izenačeno
}

char Igra::poglej(int x, int y)
{
	if (x >= 0 && x < w && y >= 0 && y < h) {
		return data[y][x];
	}
	return ' ';
}

bool Igra::postavi(int x, int y)
{
	//če je igra končana ne postavi
	if (koncana)return false;
	//če ni na igralni površini ne postavi
	if (x < 0 || y < 0 || x >= w || y >= h)return false;
	//če ni prosto polje ne postavi
	if (data[y][x] != ' ')return false;

	data[y][x] = naPotezi;
	if (naPotezi == 'X')naPotezi = 'O';
	else naPotezi = 'X';

	//ovrednoti igro (nastavi koncana in zmagovalec)
	ovrednoti();
	prostaPolja();

	return true;
}

bool Igra::postaviVStolpec(int stolpec)
{
	auto m = moznosti();
	for (int i = 0; i < m.size(); i++) {
		if (m[i].x == stolpec) {
			postavi(m[i].x, m[i].y);
			return true;
		}
	}
	return false;
}

int Igra::visinaStolpca(int stolpec)
{
	auto m = moznosti();
	for (int i = 0; i < m.size(); i++) {
		if (m[i].x == stolpec) {
			return m[i].y;
		}
	}
	return -1;
}

Igra Igra::copy()
{
	Igra igra(w,h, vVrsto, naPotezi);
	igra.data = data;
	return igra;
}
