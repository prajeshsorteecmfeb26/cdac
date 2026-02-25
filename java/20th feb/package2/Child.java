package package2;

import package1.Parent;

public class Child extends Parent {
	
	void show1(){
		System.out.println(super.x);
	}
    public static void main(String[] args) {
		Child c = new Child();
		c.show1();
    }
} 