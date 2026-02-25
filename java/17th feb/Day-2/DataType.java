class DataType{

	public static void main(String vipul[]){
	
	// Type casting
	//byte b = (byte) 129; Range : -128 to 127 and moves in this limit only if values go beyond 127.
	//short b = (short)32767; Range : -32768 to 32767
	short b = (short)32768;
	//System.out.println(b);

	
	int a = b;
	System.out.println("int "+a);

	short s1 = (short)a;
	System.out.println(s1);
	
	
	float f = a;
	System.out.println("float : "+ f);

	int x = (int)f;
	System.out.println("int  "+x);

	float x1 = (float)10;
	System.out.println("int  "+x1);

	int z=10; // It is declared but not defined yet
	System.out.println("int  "+z);
	
	char c = 'a';
	System.out.println(c);
	
	String str = ""+c;
	System.out.println("String "+str);

	
	}
}









/*
byte range
-128   -127   -126 .... 0 ..... 126 127

*/