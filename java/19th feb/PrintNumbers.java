import java.util.Scanner;
import java.math.BigInteger;
import java.util.Arrays;
import java.util.List; 

// Print Numbers from 1 to N
class PrintNumbers{
	public static void main(String args[]){
		Scanner scanner = new Scanner(System.in);
		System.out.print("Enter a number : ");
		int N = scanner.nextInt();
		
		// For Loop
		for(int i=1; i<=N; i++){
			System.out.print(i + " ");
		}	
	}
}

// Print Multiples of 3
class PrintMultiples{
	public static void main(String args[]){
		Scanner scanner = new Scanner(System.in);
		System.out.print("Enter a number : ");
		int N = scanner.nextInt();
		
		// For Loop
		for(int i=1; i<=N; i++){
			if(i%3==0){
				System.out.print(i + " ");
			}			
		}	
	}
}

// Print Factorial
class Factorial{
	public static void main(String args[]){
		Scanner scanner = new Scanner(System.in);
		System.out.print("Enter a number : ");
		int N = scanner.nextInt();
		
		// For Loop
		BigInteger factorial = BigInteger.ONE;
		for(int i=1; i<=N; i++){
			factorial = factorial.multiply(BigInteger.valueOf(i));
		}
		System.out.print("Factorial of " + N + " is " + factorial);
	}
}

// Print Even Numbers
class EvenNumbers{
	public static void main(String args[]){
		Scanner scanner = new Scanner(System.in);
		System.out.print("Enter a number : ");
		int N = scanner.nextInt();
		
		// For Loop		
		for(int i=1; i<=N; i++){
			if(i%2==0){
				System.out.print(i + " ");
			}
		}
	}
}

// Print Sum Of Odds
class SumOfOdds{
	public static void main(String args[]){
		Scanner scanner = new Scanner(System.in);
		System.out.print("Enter a number : ");
		int N = scanner.nextInt();
		
		// For Loop	
		int sum = 0;
		for(int i=1; i<=N; i++){
			if(i%2==1){
				sum+=i;
			}
		}
		System.out.print("The sum of odd numbers from 1 to " + N + " is: " + sum);
	}
}

// Print Array Elements
class ArrayElements{
	public static void main(String args[]){
		Scanner scanner = new Scanner(System.in);
		System.out.println("Enter 5 integers:");
		
		
		//int N = scanner.nextInt();
		int arr[] = new int[5];
		
		// For Loop
		for(int i=0; i<arr.length; i++){
			arr[i] = scanner.nextInt();
		}
		
		for(int num:arr){
			System.out.print(num + " ");
		}
	}
}

// Question 7: Find the Sum of All Elements in an Array
class SumArrElements{
	public static void main(String args[]){
		Scanner scanner = new Scanner(System.in);
		System.out.println("Enter 5 integers:");
		
		
		//int N = scanner.nextInt();
		int arr[] = new int[5];
		
		// For Loop
		for(int i=0; i<arr.length; i++){
			arr[i] = scanner.nextInt();
		}
		
		int sum = 0;
		for(int num:arr){
			sum += num;
		}
		
		System.out.print("The sum of all numbers is: "+ sum);
	}
}

// Question 8: Print All Names in a String Array
class ArrNames{
	public static void main(String args[]){
		Scanner scanner = new Scanner(System.in);
		System.out.println("Enter 4 names:");
			
		String arr[] = new String[4];
		
		// For Loop
		for(int i=0; i<arr.length; i++){
			arr[i] = scanner.next();
		}
		
		for(String name:arr){
			System.out.println(name);
		}
	}
}

// Question 9: Find the largest element in an Array
class LargestArr{
	public static void main(String args[]){
		Scanner scanner = new Scanner(System.in);
		System.out.println("Enter 5 integers:");
		
		int arr[] = new int[5];
		
		// For Loop
		for(int i=0; i<arr.length; i++){
			arr[i] = scanner.nextInt();
		}
		
		//int largest = Arrays.stream(arr).max().getAsInt(); // using Arrays class
		int array[] = new int[5];
		Arrays.sort(arr);
		System.out.print("The largest element of array is: "+ arr[arr.length-1]);
		scanner.close();
	}
}

// Question 10: Find the Average of Elements in an Array
class AverageArr{
	public static void main(String args[]){
		Scanner scanner = new Scanner(System.in);
		System.out.println("Enter 5 integers:");
		
		int arr[] = new int[5];
		
		// For Loop
		for(int i=0; i<arr.length; i++){
			arr[i] = scanner.nextInt();
		}
		
		int sum = 0;
		for(int i=0; i<arr.length; i++){
			sum += arr[i];
		}
	
		float average = (sum)/arr.length;
		System.out.print("The average of the numbers is: "+ average);
		scanner.close();
	}
}

// Question 11: Count Positive and Negative count of elements in an array
class CountPosNeg{
	public static void main(String args[]){
		Scanner scanner = new Scanner(System.in);
		System.out.println("Enter 6 integers:");
		
		int arr[] = new int[6];
		
		// For Loop
		for(int i=0; i<arr.length; i++){
			arr[i] = scanner.nextInt();
		}
		
		int positives = 0;
		int negatives = 0;
		
		for(int i=0; i<arr.length; i++){
			if(arr[i]>0){
				positives+=1;
			}else if(arr[i]<0){
				negatives+=1;
			}else{
				
			}
		}
	
		/*float average = (sum)/arr.length;*/
		System.out.println("Positive Numbers: "+ positives);
		System.out.println("Negative Numbers: "+ negatives);
		scanner.close();
	}
}

// Question 12: Sort an Array in Ascending Order
class SortArr{
	public static void main(String args[]){
		Scanner scanner = new Scanner(System.in);
		System.out.println("Enter 5 integers:");
		
		int arr[] = new int[5];
		
		// For Loop
		for(int i=0; i<arr.length; i++){
			arr[i] = scanner.nextInt();
		}
	
		Arrays.sort(arr);
		
		System.out.print("Sorted Array: ");
		for(int i=0; i<arr.length; i++){
			System.out.print(arr[i] + " ");
		}
		
		scanner.close();
	}
}

// Search an element
class Search{
	public static void main(String args[]){
		/*Scanner scanner = new Scanner(System.in);
		System.out.println("Enter 5 integers:");
		
		Integer arr[] = new Integer[5];
		
		// For Loop
		for(int i=0; i<arr.length; i++){
			arr[i] = scanner.nextInt();
		}
	
		System.out.print("Enter the number to search:");
		int searchNum = scanner.nextInt();
		List<Integer> list = Arrays.asList(arr);
		
		int found = 0;
		for(Integer num:list){
			if(num == searchNum){
				System.out.print("Found");
				found+=1;
				break;
			}
		}
		
		if(found==0){
			System.out.print("Not Found");
		}
		
		// BinarySearch
		System.out.print("Enter the number:");
		int N = scanner.nextInt();
		Arrays.sort(arr);
		int index = Arrays.binarySearch(arr, N);
		if(index>=0){
			System.out.print("The "+N+" found at index number: "+index);
		}else{
			System.out.print("Not found");
		}
		scanner.close();
		
		// Write the program to print the following pattern
		// Create 2d array first with random numbers
		int arr[] = {1, 2, 3, 4, 5, 5, 4, 3, 2};
		
		// Dry Code
		//i=0 j=0 1 
		//i=1 j=0 2*
        //i=1 j=1 2*2
		//i=2 j=0 3*3*3
		for(int i=0;i<arr.length;i++){
			for(int j=0; j<arr[i]; j++){
				if(j!=(arr[i]-1)){
					System.out.print(arr[i]+"*");
				}else{
					System.out.print(arr[i]);
				}
			}
			System.out.println();
		}*/
		
		// Write the code to follow different output pattern
		/*output - 1
		           1*2
				   1*2*3
				   1*2*3*4
				   1*2*3*4*5

		int arr[] = {1, 2, 3, 4, 5};
		for(int i=0;i<arr.length;i++){
			for(int j=0; j<arr[i]; j++){
				if(j==(arr[i]-1)){
					System.out.print(arr[j]);
				}else{
					System.out.print(arr[j] + "*");
				}
			}
			System.out.println();
		}*/
		
		// Write the code to follow different output pattern
		/*output - 1
		           1*3
				   1*3*5
				   1*3*5*7
				   1*3*5*7*9
				   
		int arr[] = {1, 3, 5, 7, 9};
		for(int i=0;i<arr.length;i++){
			for(int j=0; j<=i; j++){
				if(arr[j] == arr[i]){
					System.out.print(arr[j]);
				}else{
					System.out.print(arr[j] + "*");
				}
			}
			System.out.println();
		}*/

		// Write the code to follow different output pattern
		/*output - 11111
		           22222
				   33333
				   44444
				   55555
				   
				   
		int arr[] = {1,2,3,4,5};
		for(int i=0;i<arr.length;i++){
			for(int j=0; j<arr.length; j++){
				System.out.print(arr[i]);
			}
			System.out.println();
		}*/
		
		// Write the code to follow different output pattern
		/*output - 1
		           12
				   123
				   1234
				   12345
				   
				   
		int arr[] = {1,2,3,4,5};
		for(int i=0;i<arr.length;i++){
			for(int j=0; j<arr[i]; j++){
				System.out.print(arr[j]);
			}
			System.out.println();
		}*/
		
		// Write the code to follow different output pattern
		/*output - 1
		           2 3
				   4 5 6
				   7 8 9 10
				   11 12 13 14 15
				 		   
		int arr[] = new int[15];
		 
		for(int i=0;i<arr.length;i++){
			arr[i] = i + 1;
		}
		
		row=1 col=1 index=0 output=1 
		row=2 col=1 index=1 output=2
		row=2 col=2 index=2 output=2 3
		
		
		int index = 0;
		for(int row=1;row<=5;row++){
			for(int col=1;col<=row;col++){
				System.out.print(arr[index] + " ");
				index++;
			}
			System.out.println();
		}*/
		// Write the code to follow different output pattern
		/*output - ******
		  
		           *    *

				   *    *
				   
				   *    *
				   
				   *    *
				   
				   ******
		*/		
		// Dry Run
		/*i=1 j=1 to 6 ******
		i=2 j=1 to 6 *    *
		i=3 j=1 to 6 *    *
                    		
		for(int i=1;i<=6;i++){
			for(int j=1;j<=6;j++){
				if(i==1 || i==6 || j==1 || j==6){
					System.out.print("*");
				}else{
					System.out.print(" ");
				}
			}
			System.out.println();
			
		}*/
		
		// Write a program to print the following pattern
		/*    *
		     ***
			*****
		   *******
		  *********
		 ***********
		  *********
		   *******
		    *****
			 ***
			  *
	    
		
        int n = 5; // number of rows (half diamond)

        // Upper part
        for (int i = 1; i <= n; i++) {

            // print spaces
            for (int j = 1; j <= n - i; j++) {
                System.out.print(" ");
            }

            // print stars
            for (int j = 1; j <= (2 * i - 1); j++) {
                System.out.print("*");
            }

            System.out.println();
        }

        // Lower part
        for (int i = n - 1; i >= 1; i--) {

            // print spaces
            for (int j = 1; j <= n - i; j++) {
                System.out.print(" ");
            }

            // print stars
            for (int j = 1; j <= (2 * i - 1); j++) {
                System.out.print("*");
            }

            System.out.println();
        }
    }*/
	
	// Write a Java program that asks the user for a string and then prints the reverse of that string
	
		/*Scanner sc = new Scanner(System.in);
		System.out.print("Enter a string:");
		String str = sc.next();
		String revStr="";
		for(int i=(str.length()-1);i>=0;i--){
			revStr+=str.charAt(i);
		}
		System.out.print(revStr);*/
		
	// Count vowels in a string
	/*Scanner sc = new Scanner(System.in);
	System.out.print("Enter a string:");
	String str = sc.next();
	char arr[] = {'a', 'e', 'i', 'o', 'u'};
	int count=0;
	 dry code
	i=0 j=0 count=0
	i=1 j=0 count=0
	i=1 j=1 count=1
	
	for(int i=0;i<arr.length;i++){
		for(int j=0;j<str.length();j++){
			if(arr[i]==str.charAt(j)){
				count+=1;
			}
		}
	}
	System.out.print("The number of vowels in "+ str + " is:" + count);
	}*/
	
	// check for palindrome string
		/*Scanner sc = new Scanner(System.in);
		System.out.print("Enter a string:");
		String str = sc.next();
		String revStr="";
		for(int i=(str.length()-1);i>=0;i--){
			revStr+=str.charAt(i);
		}
		if(str.equals(revStr)){
			System.out.print("The string "+ str + " is palindrome");
		}else{
			System.out.print("The string "+ str + " is not a palindrome");
		}*/
		
	/*Question 27: String Literal and Object Creation
	String str1 = "hello"; 
	String str2 = "hello";
	
	Question 28:
	String str1 = new String("hello");
	String str2 = new String("hello"); 
	
	boolean bool = (str1==str2);
	boolean bool= str1.equals(str2);
	System.out.print("Both variables point to the same object:"+ bool);
	
	It is understood from the problem that both variables are pointing to the same object as no extraa memory
	is used to create the value of str2 as it is referring str1 value only in string constant pool inside heap memory.
    and str1 and str2 are in a stack memory from which they are pointing to the direction of value "hello" inside scp
	.equals() function is used when String is created with new operator and string object is created that value is stored inside heap memory only but as an object
	
	why strings are immutable?
	because everytime when we try to update any string value it tries to change its memory location inside memory without
	touching its previuos values and as string is available with the latest values garbage collector will delete all unused values.*/
	
	
	// Question 29
	/* Concatenation and checking for pointing to the same location
	String str1 = "hello"; //scp
	String str2 = "world"; //scp
	String str3 = str1 + str2; // New String object created inside heap memory
	boolean bool = (str3==str1); // == compares memory addresses(location) not the content
	System.out.print("Is str3 pointing to the same object as str1?"+bool);*/
	
	// Question 30: String Pool with intern() Method
	/*String s1 = new String("hello");
	String s2 = s1.intern();
	String s3 = "hello";
	boolean bool = (s2==s3);
	System.out.print("Is s2 and s3 pointing to the same object?"+bool);
	}*/
	
	// Question 31: Multiple String Literals with Same Content
		String s1 = "java";
		String s2 = "java";
		String s3 = "ava";
		boolean bool = s1==s2?s2==s3:false;
		System.out.print("All strings point to the same object?"+bool); //They are pointing to the same object inside scp
	}
}