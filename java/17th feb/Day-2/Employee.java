class Employee{
	int id;
	String firstName;
	float salary;
	String department;
	String designation;
	String lastName;
	
	Employee(){
		id = 1;
		firstName = "Prajesh";
		salary = 85000.0f;
		designation = "Senior Software Developer";
		lastName = "Sortee";		
	}
	
	Employee(String firstname, String lastname, String des, float sal){
		firstName = firstname;
		lastName = lastname;
		designation = des;
		salary = sal;
	}
	
	int work(int hours){
		int Hours = hours;
		return Hours;
	}
	
	public static void main(String args[]){
		Employee prajesh = new Employee();
		System.out.println("Prajesh Salary : "+ prajesh.salary);
		
		Employee rajesh = new Employee("Rajesh", "Thakur", "Junior Software Developer", 45000.0f);
		System.out.println("Rajesh Salary : "+ rajesh.salary);
		
		int rajesh_working_hours = rajesh.work(10);
		System.out.println("Rajesh Working Hours : "+ rajesh_working_hours);
	}
}