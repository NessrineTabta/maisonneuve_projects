package Atm;

public class sansCarte extends etatAtmMachine {

	@Override
	public void InsérerCarte(atmMachine a) {
		System.out.println("Veuillez insérer votre carte");
		a.setE(new avecCarte());
	}

	@Override
	public void EjecterCarte(atmMachine a) {
		System.out.println("Vous n'avez pas insérer de carte donc option pas disponible");
	}

	@Override
	public void InsererPin(int pin, atmMachine a) {
		System.out.println("Vous n'avez pas insérer de carte donc option pas disponible");		
	}

	@Override
	public void demanderMontant(float montantARetirer, atmMachine a) {
		System.out.println("Vous n'avez pas insérer de carte donc option pas disponible");		
	}

	@Override
	public void déposerArgent(float montant, atmMachine a) {
		System.out.println("Vous n'avez pas insérer de carte donc option pas disponible");		
	}


}
