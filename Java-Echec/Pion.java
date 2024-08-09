public class Pion extends Piece{

    public Pion(Couleur couleur, String nomPiece, int x, int y) {
        super(couleur, nomPiece, x, y);
    }

    @Override
    public boolean mouvementPossible(int x, int y) {if (this.getCouleur() == Couleur.Blanc) {

        // 2 cases avant
        if (this.getY() - y == 2 && this.getX() - x == 0
                && Board.aucunObstacle(getX(), getY(), x, y) && Board.getPiece(x, y) == null) {
            return true;
        }

        // 1 case avant
        if (this.getY() - y == 1 && this.getX() - x == 0 && Board.getPiece(x, y) == null) {
            return true;
        }

        // diagonale pour capturer une piece noir
        if (this.getY() - y == 1 && Math.abs(this.getX() - x) == 1 && Board.getPiece(x, y) != null
                && this.memeCouleur(Board.getPiece(x, y)) == false) {
            return true;
        }
    }

        if (this.getCouleur() == Couleur.Noir) {
            // 2 cases avant
            if (this.getY() - y == -2 && this.getX() - x == 0
                    && Board.aucunObstacle(getX(), getY(), x, y) && Board.getPiece(x, y) == null) {
                return true;
            }
            // 1 case avant
            if (this.getY() - y == -1 && this.getX() - x == 0 && Board.getPiece(x, y) == null) {
                return true;
            }

            // diagonale pour capturer une piece blanc
            if (this.getY() - y == -1 && Math.abs(this.getX() - x) == 1 && Board.getPiece(x, y) != null
                    && this.memeCouleur(Board.getPiece(x, y)) == false) {
                return true;
            }
        }
        return false;
    }

    @Override
    public String toString() {
        if(this.getCouleur() == Couleur.Blanc){
            return  "♙";
        }else{
            return "♟";
        }
    }

    @Override
    public boolean peutDeplacer() {
        int x = this.getX();
        int y = this.getY();

        if (this.getCouleur() == Couleur.Blanc) {

            if (this.testMouvement(x, y - 1)) {
                return true;
            }

            if (this.testMouvement(x, y - 2)) {
                return true;
            }

            if (this.testMouvement(x - 1, y - 1)) {
                return true;
            }

            if (this.testMouvement(x + 1, y - 1)) {
                return true;
            }

        }
        if (this.getCouleur() == Couleur.Noir) {

            if (this.testMouvement(x, y + 1)) {
                return true;
            }

            if (this.testMouvement(x, y + 2)) {
                return true;
            }

            if (this.testMouvement(x - 1, y - 1)) {
                return true;
            }

            if (this.testMouvement(x + 1, y + 1)) {
                return true;
            }
        }

        return false;
    }

}
