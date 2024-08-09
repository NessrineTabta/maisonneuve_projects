package Atm;

public abstract class etatAtmMachine {
	
	abstract public void InsérerCarte(atmMachine a) ;
	abstract public void EjecterCarte(atmMachine a);
	abstract public void InsererPin(int pin,atmMachine a);
	abstract public void demanderMontant (float montantARetirer,atmMachine a);
	abstract public void déposerArgent(float montant,atmMachine a);

}
