// import Scanner class from java.util
// Create a class with main method and the switch case statement.

import java.util.Scanner;
class DayOfWeek{
	public static void main(String args[]){
		Scanner scanner = new Scanner(System.in);
		System.out.print("Day number : ");
		int dayOfWeek = scanner.nextInt();
		
		// Use switch statement
		switch(dayOfWeek){
			case 1:
				System.out.println("The day is Monday.");
				break;
			case 2:
				System.out.println("The day is Tuesday.");
				break;
			case 3:
				System.out.println("The day is Wednesday.");
				break;
			case 4:
				System.out.println("The day is Thrusday.");
				break;
			case 5:
				System.out.println("The day is Friday.");
				break;
			case 6:
				System.out.println("The day is Saturday.");
				break;
			case 7:
				System.out.println("The day is Sunday.");
				break;
			default:
				System.out.println("Invalid day number");				
		}
	}
}