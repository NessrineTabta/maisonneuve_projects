public class Reine extends Piece{

    public Reine(Couleur couleur, String nomPiece, int x, int y) {
        super(couleur, nomPiece, x, y);
    }

    @Override
    public boolean mouvementPossible(int x, int y) {
        // ne peut pas capturer la piece s'ils ont le meme couleur
        if (this.memeCouleur(Board.getPiece(x, y)) == true) {
            return false;
        }
        // obstacle une piece bloque la reine et ne peut pas la deplacer
        if (Board.aucunObstacle(getX(), getY(), x, y) != true) {
            return false;
        }
        // fou
        if (Math.abs(getX() - x) == Math.abs(getY() - y)) { // bishop
            return true;
        }
        // tour
        if (Math.abs(getX() - x) != 0 && Math.abs(getY() - y) == 0
                || Math.abs(getX() - x) == 0 && Math.abs(getY() - y) != 0) {
            return true;
        }
        return false;
    }

    @Override
    public String toString() {
        if(this.getCouleur() == Couleur.Blanc){
            return  "♕";
        }else{
            return "♛";
        }
    }

    @Override
    public boolean peutDeplacer() {
        int x = this.getX();
        int y = this.getY();

        // fou
        // en haut à gauche
        while ((--x) >= 0 && (--y) >= 0) {
            if (this.testMouvement(x, y)) {
                return true;
            }
        }

        x = this.getX();
        y = this.getY();
        // en haut à droite
        while ((++x) <= 7 && (--y) >= 0) {
            if (this.testMouvement(x, y)) {
                return true;
            }
        }

        x = this.getX();
        y = this.getY();
        // en bas à gauche
        while ((--x) >= 0 && (++y) <= 7) {
            if (this.testMouvement(x, y)) {
                return true;
            }
        }

        x = this.getX();
        y = this.getY();
        // en bas à droite
        while ((++x) <= 7 && (++y) <= 7) {
            if (this.testMouvement(x, y)) {
                return true;
            }
        }

        x = this.getX();
        y = this.getY();
        // tour
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
