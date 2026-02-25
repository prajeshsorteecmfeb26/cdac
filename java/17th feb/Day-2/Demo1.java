// static variables

class Student{
	
	int id; 
	String name;
	int age;
	float marks;
	static String batch="Feb26";

	void study(){ 
		System.out.println("Doing Study...");
	}
}
class Demo{
	public static void main(String vipul[]){
		System.out.println(Student.batch);
		Student s1 = new Student();
		System.out.println(s1.batch);
		Student s2 = new Student();
		System.out.println(s2.batch);
		s2.batch = "C-DAC Mumbai";
		System.out.println(s1.batch);
		System.out.println(s2.batch);


	}
}

class Demo1{
	public static void main(String vipul[]){
		System.out.println(Student.batch);
		

	}
}



