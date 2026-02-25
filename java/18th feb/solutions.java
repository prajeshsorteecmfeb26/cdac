import java.util.Scanner;

class Solutions{
	// Question: sum of two numbers
	int sumOfTwoNumbers(int x, int y){
		int sum = x + y;
		return sum;
	}
	
	String checkAgeCategory(int age){
		if(age <= 15){
			return "minor";
		}else if(age <= 60){
			return "adult";
		}else{
			return "senior citizen";
		}
	}
	
	void printEvenNumbers(int initial, int end){
		int i=initial;
		while(i<=end){
			if(i%2==0){
				System.out.print(i+" ");
			}
			i++;
		}
	}
	
	int askForPositiveNumber(){
		Scanner sc = new Scanner(System.in);
		int num;
		do{
			System.out.print("Enter a positive number:");
			num = sc.nextInt();
		}while(num <= 0);
		return num;
	}
	
	void printMultiplicationTable(int N){
		for(int i=1;i<=10;i++){
			System.out.println(N*i);
		}
	}
	
	int calculateSum(int N){
		int sum = 0;
		for(int i=1; i<=N; i++){
			sum+=i;
		}
		return sum;
	}
	
	public static void main(String args[]){
		/*Scanner sc = new Scanner(System.in);
		System.out.print("Enter Your Age:");
		int age = sc.nextInt();
		//int x2 = sc.nextInt();
		Solutions s1 = new Solutions();
		String category = s1.checkAgeCategory(age);
		System.out.print("You are a " + category);
		sc.close();*/
		
		/* print even numbers from 1 to 10 using while loop
		Scanner sc = new Scanner(System.in);
		System.out.println("Enter initial and final value:");
		int initial = sc.nextInt();
		int end = sc.nextInt();
		Solutions s1 = new Solutions();
		s1.printEvenNumbers(initial, end);*/
		
		/* ask the user for positive input
		Solutions s1 = new Solutions();
		int numberEntered = s1.askForPositiveNumber();
		System.out.print("You entered a positive number : "+numberEntered);*/
		
		/* PrintTable
		Scanner sc = new Scanner(System.in);
		System.out.print("Enter Number:");
		int N = sc.nextInt();
		Solutions s1 = new Solutions();
		s1.printMultiplicationTable(N);*/
		
		Scanner sc = new Scanner(System.in);
		System.out.print("Enter Number:");
		int N = sc.nextInt();
		Solutions s1 = new Solutions();
		int sum = s1.calculateSum(N);
		System.out.print("The sum of numbers from 1 to "+ N + " is "+ sum);
		sc.close();
	}
}