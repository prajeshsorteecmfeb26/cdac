//============================================================================
// Name        : 1.cpp
// Author      : shil
// Version     :
// Copyright   : Your copyright notice
// Description : Hello World in C++, Ansi-style
//============================================================================

#include <stdio.h>

int num = 100;	// global variable

int main() {

	printf("num: %d \n", num);

	int num = 10;	// local variable

	printf("num: %d \n", num);

	{
		printf("num: %d \n", num);
		int num = 20;	// block scope local variable
		printf("num: %d \n", num);
	} // scope ends here

	printf("num: %d \n", num);

	return 0;
}
