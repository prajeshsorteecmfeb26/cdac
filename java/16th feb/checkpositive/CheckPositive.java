import java.util.Scanner;
class CheckPositive{
	public static void main(String args[]){
		Scanner scanner = new Scanner(System.in);
		System.out.print("Enter a Number: ");
		int num = scanner.nextInt();
		
		if(num > 0){
			System.out.println("Number is positive");
		}else{
			System.out.println("Number is negative or zero");
		}
		scanner.close();
	}
}