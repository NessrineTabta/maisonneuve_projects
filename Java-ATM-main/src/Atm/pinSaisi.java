package Atm;

public class pinSaisi extends etatAtmMachine {

	@Override
	public void InsérerCarte(atmMachine a) {
		System.out.println("Vous avez déjâ inséré votre carte donc option pas disponible");
		
	}

	@Override
	public void EjecterCarte(atmMachine a) {
		System.out.println("Parfait, votre carte sera éjecté");
		a.setE(new sansCarte());
	}

	public void InsererPin(int pin, atmMachine a) {
		System.out.println("Votre Pin a deja été saisi!");
	}

	@Override
	public void demanderMontant(float montantARetirer, atmMachine a) {
		if (montantARetirer > a.cashMachine) {
			System.out.println("Malheuresement la machine est vide");
			a.setE(new sansCash());
		}else {
			System.out.println("Nous allons retirer votre montant");
			a.cashMachine= a.cashMachine-montantARetirer;
		}		
	}

	@Override
	public void déposerArgent(float montant, atmMachine a) {
		System.out.println("Parfait nous allons déposer votre fond");
		a.cashMachine= a.cashMachine+ montant;		
	}

}
