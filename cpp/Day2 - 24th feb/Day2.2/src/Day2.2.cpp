//============================================================================
// Name        : 2.cpp
// Author      : shil
// Version     :
// Copyright   : Your copyright notice
// Description : Hello World in C++, Ansi-style
//============================================================================
#include <stdio.h>

int increment(int num, int incr){
	num = num + incr;
	return num;
}


int func(int n){
	if(n == 0)
		return 1;
	return func(n - 1);
}

int main1();
int main2();

int main(){
	main1();
	main2();
	func(5);

	return 0;
}





int add(int,int);	// function declaration/prototype

int main2(){
	int a = 10;
	int b = 20;

	int result = add(a,b);	// function call

	printf("%d\n",result);

	return 0;
}

int add(int a, int b){	// function definition
	return a+b;
}



int main1() {

	int num = 10;	//initilization

	int result = increment(num, 2);

	printf("num: %d\n", result); //print

	return 0;
}
