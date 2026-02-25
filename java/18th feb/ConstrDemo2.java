class Student{
	int id; 
	String name;
	int age;
	float marks;
	static String batch="Feb26";

	Student(){
		id=100;
		name="Harsh";
		age=25;
		marks=85.0f;
	}
	
	Student(int a){
		System.out.println("In one para. constr.");
		System.out.println(a);
	}

	Student(int id, String name, int age, float marks){
		this.id = id;
		this.name = name;
		this.age = age;
		this.marks = marks;
	}

	void study(){ 
		System.out.println("Doing Study...");
	}
	void study(String s){ 
		System.out.println("Doing Study... "+s);
	}
	void study(int i){ 
		System.out.println(i);
	}

	
	 int studyHours(){
		int hrs = 16;
	return 	hrs;
	}
}

class ConstrDemo{
	public static void main(String vipul[]){
	
	Student s1 = new Student(1,"Vipul",30,50.0f);
		System.out.println(s1.name);

	Student s2 = new Student(1,"Prajesh",30,50.0f);
		System.out.println(s2.name);
	Student s3;
	s3=new Student();
	System.out.println(s3.name);
	



	int x;
	int x1=10;












		/*
		s1.study(); //Doing Study... 
		s1.study("abc"); //Doing Study... abc
		s1.study(1); // 1
		s1.study(1000);  // 1000
		*/
	}
}


