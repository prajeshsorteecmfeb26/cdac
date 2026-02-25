// Import Scanner Class from java.util package
// Make a class name GradeSystem
// Create Average non static method to calculate the average marks of the student.
// Create Grade non static method to calculate the grade of the student.
// Define main method and take inputs from the user of student marks.
// Call methods Average() and Grade() and display the result.

import java.util.Scanner;
class GradeSystem{
	
	// Avg method
	float Average(int math, int science, int history){
		float averageMarks = ((float)math + science + history)/3;
		return averageMarks;
	}
	
	// Grade Method
	String Grade(float averageMarks){
		if (averageMarks >= 90){
			return "A";
		}else if(averageMarks >=70 && averageMarks<90){
			return "B";
		}else if(averageMarks >=50 && averageMarks<70){
			return "C";
		}else if(averageMarks >=30 && averageMarks<50){
			return "D";
		}else{
			return "Fail";
		}
	}
	
	public static void main(String args[]){
		// Create a scanner object
		Scanner scanner = new Scanner(System.in);
		System.out.print("Enter marks in maths : ");
		int mathMarks = scanner.nextInt();
		System.out.print("Enter marks in science : ");
		int scienceMarks = scanner.nextInt();
		System.out.print("Enter marks in history : ");
		int historyMarks = scanner.nextInt();
		
		// Create an object from a class to call non static method in main()
		GradeSystem S1 = new GradeSystem();
		float averageMarks = S1.Average(mathMarks, scienceMarks, historyMarks);
		String grade = S1.Grade(averageMarks);
		
		// Result
		System.out.println("Average Marks: "+averageMarks);
		System.out.println("Grade: "+grade);
	}	
}