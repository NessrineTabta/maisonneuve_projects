package Atm;

public class sansCash extends etatAtmMachine {

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
		System.out.println("Vous avez deja saisi votre Pin!");
	}

	@Override
	public void demanderMontant(float montantARetirer, atmMachine a) {
		System.out.println("Il n y a pas de cash dans la machine! Option pas disponible");
	}

	@Override
	public void déposerArgent(float montant, atmMachine a) {
		System.out.println("Parfait nous allons déposer votre fond");
		a.cashMachine= a.cashMachine+ montant;			
	}

}
