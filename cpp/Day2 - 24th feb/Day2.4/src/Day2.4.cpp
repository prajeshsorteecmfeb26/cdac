//============================================================================
// Name        : 4.cpp
// Author      : shil
// Version     :
// Copyright   : Your copyright notice
// Description : Hello World in C++, Ansi-style
//============================================================================

#include <stdio.h>;

void func(int val){
	printf("inside int func");
}

void func(int *val){
	printf("%p", *val);
}


int main(){
	int num = 10;
	switch(num){
	case 1:
		printf("number is 1");
		break;
	case 9:
		printf("number is 9");
		break;
	default:
	    printf("number is nether 1 nor 9");
	}
	return 0;
}

int main1() {
	int num = 10;

	int &n = num;	// reference variable

	int *ptrNum = &num;	// pointer to

//	int *ptrNum;		// GB_Value -> Wild Pointer

//	int *ptr = NULL;		//NULL: Macro which has a value 0;
//	int *p = nullptr;	//nullptr: represents pointer

//	int* ptrNum = &num; // valid
//
//	int * ptrNum = &num;	//valid


	printf("num: %d \n", num);
	printf("address of num: %p \n", &num);
//	printf("address of n: %p \n", &n);

//	*pointer_variable_name : Dereferecing
	*ptrNum = 20;	// allowed

	printf("ptrNum: %p \n", ptrNum);
	printf("address of ptrNum: %p \n", &ptrNum);
	printf("value of num via ptrNum: %d \n", *ptrNum);

	printf("num: %d \n", num);
	return 0;
}
