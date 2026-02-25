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
//int id;
//static int a;

	public static void main(String vipul[]){
		
		//System.out.println(id);

		System.out.println(Student.batch);

		Student s1 = new Student();
		/*System.out.println(s1.id);
		System.out.println(s1.name);
		System.out.println(s1.age);
		System.out.println(s1.marks);*/
		System.out.println(s1.batch);

		
		Student s2 = new Student();
		/*System.out.println(s2.id);
		System.out.println(s2.name);
		System.out.println(s2.age);
		System.out.println(s2.marks);*/
		System.out.println(s2.batch);

		s2.batch = "C-DAC Mumbai";
		System.out.println(s1.batch);
		System.out.println(s2.batch);


	}
}






/*

return type:
1. void
2. PT
3. object


*/

