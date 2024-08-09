package Atm;

public class avecCarte extends etatAtmMachine{

	@Override
	public void InsérerCarte(atmMachine a) {
		System.out.println("Vous avez déjâ inséré votre carte donc option pas disponible");
		
	}

	@Override
	public void EjecterCarte(atmMachine a) {
		System.out.println("Parfait, votre carte sera éjecté");
		a.setE(new sansCarte());		
	}

	@Override
	public void InsererPin(int pin, atmMachine a) {
		System.out.println("Parfait! Nous allons désormais passé a l'état avec pin");
		a.setE(new pinSaisi());		
	}

	@Override
	public void demanderMontant(float montantARetirer, atmMachine a) {
		System.out.println("Veuillez d'abord saisir votre Pin!");
	}

	@Override
	public void déposerArgent(float montant, atmMachine a) {
		System.out.println("Veuillez d'abord saisir votre Pin!");
		
	}



}
