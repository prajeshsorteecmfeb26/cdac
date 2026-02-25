
class Student{
	int id; 
	String name;
	int age;
	float marks;
	static String batch="Feb26";

	
		
	
	Student(){
		System.out.println("In constr. block...");
	}

static{
		System.out.println("In static block...");
	}
	

	{ 
		System.out.println("In init block...");
	}
	
}

class ConstrDemo{
	public static void main(String vipul[]){
	
		Student s = new Student();	
	}
}