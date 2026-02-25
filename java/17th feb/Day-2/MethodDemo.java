// Methods

class Student{
	
	int id; 
	String name;
	int age;
	float marks;
	static String batch="Feb26";

	void study(){ 
		System.out.println("Doing Study...");
	}
	
	int studyHours(){
		int hrs = 16;
		return 	hrs;
	}
}

class MethodDemo{
	public static void main(String vipul[]){
	System.out.println(Student.batch);
	Student s1 = new Student();
	s1.study();
	System.out.println(s1.studyHours());
	}
}



