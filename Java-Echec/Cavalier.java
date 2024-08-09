public class Cavalier extends Piece{

    public Cavalier(Couleur couleur, String nomPiece, int x, int y) {
        super(couleur, nomPiece, x, y);
    }

    @Override
    public boolean mouvementPossible(int x, int y) {
        // ne peut pas capturer la meme piece avec le meme couleur
        if (this.memeCouleur(Board.getPiece(x, y)) == true) {
            return false;
        }

        if (Math.abs(this.getY() - y) == 2 && Math.abs(this.getX() - x) == 1
                || Math.abs(this.getY() - y) == 1 && Math.abs(this.getX() - x) == 2) {
            return true;
        }

        return false;
    }

    @Override
    public String toString() {
        if(this.getCouleur() == Couleur.Blanc){
            return  "♘";
        }else{
            return "♞";
        }
    }

    @Override
    public boolean peutDeplacer() {
        int x = this.getX();
        int y = this.getY();

        // gauche & haut
        if (this.testMouvement(x - 2, y - 1)) {
            return true;
        }
        if (this.testMouvement(x - 1, y - 2)) {
            return true;
        }

        // droite & haut
        if (this.testMouvement(x + 2, y - 1)) {
            return true;
        }
        if (this.testMouvement(x + 1, y - 2)) {
            return true;
        }

        // gauche & bas
        if (this.testMouvement(x - 2, y + 1)) {
            return true;
        }
        if (this.testMouvement(x - 1, y + 2)) {
            return true;
        }

        // droite & bas
        if (this.testMouvement(x + 2, y + 1)) {
            return true;
        }
        if (this.testMouvement(x + 1, y + 2)) {
            return true;
        }

        return false;
    }

}
