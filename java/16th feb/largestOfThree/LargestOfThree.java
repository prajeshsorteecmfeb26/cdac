class LargestOfThree{
	public static void main(String args[]){
		int n1 = 46;
		int n2 = 86;
		int n3 = 65;
		
		if(n1>=n2 && n1>=n3){
			System.out.println(n1);
		}else if(n2>=n1 && n2>=n3){
			System.out.println(n2);
		}else{
			System.out.println(n3);
		}
	}
}