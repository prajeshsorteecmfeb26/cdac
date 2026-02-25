// import Scanner class from java.util
// create a class LeapYear 
// Write conditional statement for checking leap year


import java.util.Scanner;
class LeapYear{
	public static void main(String args[]){
		Scanner scanner = new Scanner(System.in);
		System.out.print("Enter Year : ");
		int year = scanner.nextInt();
		if((year%4==0 && year%100!=0) || (year%400==0)){
			System.out.println(year + " is a leap year.");
		}else{
			System.out.println(year + " is not a leap year.");
		}
	}
}