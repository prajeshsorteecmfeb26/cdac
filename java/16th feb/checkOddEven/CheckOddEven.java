import java.util.Scanner;
class CheckOddEven{
	public static void main(String args[]){
		Scanner scanner = new Scanner(System.in);
		System.out.print("Enter a Number: ");
		int num = scanner.nextInt();
		
		if(num%2==1){
			System.out.println("Number is Odd");
		}else{
			System.out.println("Number is Even");
		}
		scanner.close();
	}
}