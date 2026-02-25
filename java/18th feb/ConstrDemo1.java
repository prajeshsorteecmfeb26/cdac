
class Student{
	int id; 
	String name;
	int age;
	float marks;
	static String batch="Feb26";
	
	Student(){
		batch = "PGCP_AI & PGCP_AC Feb 2026";	
	}

static{
	batch = "feb 2026";
	//id=1; non-static var cannot be ref. from static context
		
	}
	
	{ 
		id=1;
		
	}
	
}

class ConstrDemo{
	public static void main(String vipul[]){
	
	System.out.println(Student.batch);
		

		Student s = new Student();
		System.out.println(s.batch);
		System.out.println(s.id);	
	}
}

/*

varibale
methods - methods overloading
contr - constroller overloading
static - static blocks
init - instance blocks





*/
