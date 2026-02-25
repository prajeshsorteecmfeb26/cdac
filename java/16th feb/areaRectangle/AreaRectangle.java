import java.util.Scanner;
class AreaRectangle{
	public static void main(String args[]){
		Scanner scanner = new Scanner(System.in);
		System.out.print("Enter Length Of Rectangle: ");
		double length = scanner.nextDouble();
		System.out.print("Enter Width Of Rectangle: ");
		double width = scanner.nextDouble();		
		double area = length*width;
		System.out.println("Area of Rectangle is : "+ area);
		scanner.close();
	}
}