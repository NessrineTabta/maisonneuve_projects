package Atm;

public class atmMachine {
	float cashMachine;
	final static int pin=1234;
	boolean PinCorrect=false ;
	etatAtmMachine e;
	
	public atmMachine(etatAtmMachine e, float cashMachine ) {
		this.e= e;
		this.cashMachine= cashMachine;
	}
	
	public etatAtmMachine getE() {
		return e;
	}
	public void setE(etatAtmMachine e) {
		this.e = e;
	}

}
