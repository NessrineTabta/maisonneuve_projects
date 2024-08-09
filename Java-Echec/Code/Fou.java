public class Fou extends Piece{

    public Fou(Couleur couleur, String nomPiece, int x, int y) {
        super(couleur, nomPiece, x, y);
    }

    @Override
    public boolean mouvementPossible(int x, int y) {
        // ne peut pas capturer sa propre pièce s'ils ont le meme couleur
        if (this.memeCouleur(Board.getPiece(x, y)) == true) {
            return false;
        }
        // coup invalid pour le fou
        if (Math.abs(getX() - x) != Math.abs(getY() - y)) {
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
            return  "♗";
        }else{
            return "♝";
        }
    }

    @Override
    public boolean peutDeplacer() {

        int departX =this.getX();
        int departY = this.getY();

        // réinitialiser x et y à la position originale après chaque boucle while
        int x = departX;
        int y = departY;

        // en haut à gauche
        while ((--x) >= 0 && (--y) >= 0) {
            if (this.testMouvement(x, y)) {
                return true;
            }
        }
        x = departX;
        y = departY;
        // en haut à droite
        while ((++x) <= 7 && (--y) >= 0) {
            if (this.testMouvement(x, y)) {
                return true;
            }
        }
        x = departX;
        y = departY;
        // en bas à gauche
        while ((--x) >= 0 && (++y) <= 7) {
            if (this.testMouvement(x, y)) {
                return true;
            }
        }
        x = departX;
        y = departY;
        // en bas à droite
        while ((++x) <= 7 && (++y) <= 7) {
            if (this.testMouvement(x, y)) {
                return true;
            }
        }
        return false;
    }

}
