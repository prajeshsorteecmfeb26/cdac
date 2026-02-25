import java.util.Scanner;
class CheckNegative{
	public static void main(String args[]){
		Scanner scanner = new Scanner(System.in);
		System.out.print("Enter a Number: ");
		int num = scanner.nextInt();
		
		if(num < 0){
			System.out.println("Number is negative");
		}else{
			System.out.println("Number is not negative");
		}
		scanner.close();
	}
}