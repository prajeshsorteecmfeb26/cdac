//============================================================================
// Name        : 3.cpp
// Author      : shil
// Version     :
// Copyright   : Your copyright notice
// Description : Hello World in C++, Ansi-style
//============================================================================

#include <stdio.h>

int add(int a, int b){
	a = 100;
	b = 200;

	printf("Inside add \n");
	printf("Address of a: %p \n", &a);
	printf("Address of b: %p \n", &b);

	return a+b;
}

int addd(int &a, int &b){
	a = 100;
	b = 200;

	printf("Inside add \n");
	printf("Address of a: %p \n", &a);
	printf("Address of b: %p \n", &b);

	return a+b;
}

int main() {
	int a = 10;
	int b = 20;

	printf("a: %d \n", a);
	printf("b: %d \n", b);
	printf("Address of a: %p \n", &a);
	printf("Address of b: %p \n", &b);

	int res = add(a,b);

	printf("res: %d \n", res);

	printf("a: %d \n", a);
	printf("b: %d \n", b);

	return 0;
}
