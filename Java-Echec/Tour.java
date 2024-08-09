public class Tour extends Piece{

    public Tour(Couleur couleur, String nomPiece, int x, int y) {
        super(couleur, nomPiece, x, y);
    }

    @Override
    public boolean mouvementPossible(int x, int y) {
        // ne peut pas capturer sa propre pièce s'ils ont le meme couleur
        if (this.memeCouleur(Board.getPiece(x, y)) == true) {
            return false;
        }
        // coup invalide pour la tour
        if (Math.abs(getX() - x) != 0 && Math.abs(getY() - y) != 0) {
            return false;
        }

        if (Board.aucunObstacle(getX(), getY(), x, y)) {
            return true;
        }
        return false;
    }

    @Override
    public String toString() {
        if(this.getCouleur() == Couleur.Blanc){
            return  "♖";
        }else{
            return "♜";
        }
    }

    @Override
    public boolean peutDeplacer() {
        int x = this.getX();
        int y = this.getY();

        // gauche
        while ((--x) >= 0 && y >= 0) {
            if (this.testMouvement(x, y)) {
                return true;
            }
        }
        x = this.getX();
        y = this.getY();
        // droite
        while ((++x) <= 7 && y >= 0) {
            if (this.testMouvement(x, y)) {
                return true;
            }
        }
        x = this.getX();
        y = this.getY();
        // bas
        while (x >= 0 && (++y) <= 7) {
            if (this.testMouvement(x, y)) {
                return true;
            }
        }
        x = this.getX();
        y = this.getY();
        // haut
        while (x <= 7 && (--y) >= 0) {
            if (this.testMouvement(x, y)) {
                return true;
            }
        }

        return false;
    }

}
