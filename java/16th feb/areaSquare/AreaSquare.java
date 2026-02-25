import java.util.Scanner;
class AreaSquare{
	public static void main(String args[]){
		Scanner scanner = new Scanner(System.in);
		System.out.print("Enter a Side Of Square: ");
		int side = scanner.nextInt();
		int area = side*side;
		System.out.println("Area of square is : "+ area);
		scanner.close();
	}
}