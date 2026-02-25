import java.time.LocalTime;
class GoodMorning{
	public static void main(String args[]){
		LocalTime currentTime = LocalTime.now();
		int hour = currentTime.getHour();
		if(hour>=5 && hour<12){
				System.out.println("GoodMorning");
		}else{
				System.out.println("Not Morning");
		}
	}
}