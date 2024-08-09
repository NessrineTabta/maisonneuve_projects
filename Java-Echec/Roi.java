public class Roi extends Piece {

    public Roi(Couleur couleur, String nomPiece, int x, int y) {
        super(couleur, nomPiece, x, y);
    }

    @Override
    public boolean mouvementPossible(int x, int y) {

        // ne peut pas capturer la piece avec le meme couleur
        if (this.memeCouleur(Board.getPiece(x, y)) == true) {
            return false;
        }
        // fou un case diagonale
        else if (Math.abs(getX() - x) == 1 && Math.abs(getY() - y) == 1) {
            return true;
        }
        // tour un case droite gauche bas haut
        else if (Math.abs(getX() - x) == 1 && Math.abs(getY() - y) == 0
                || Math.abs(getX() - x) == 0 && Math.abs(getY() - y) == 1) {
            return true;
        }
        return false;
    }

    @Override
    public String toString() {
        if(this.getCouleur() == Couleur.Blanc){
            return  "♔";
        }else{
            return "♚";
        }
    }

    public int roque(String cote) {
        Tour tour = (Tour) Board.getPiece("tour" + cote, this.getCouleur());
        int departX = this.getX();
        int departY = this.getY();

        if(this.premierCoup = false ){
            System.out.println("Impossible de roquer si le roi ou la tour a déjà bougé.");
            return -1;
        }

        if(Board.aucunObstacle(this.getX(), this.getY(), tour.getX(), tour.getY()) != true){
            System.out.println("Impossible de roquer à travers une ligne de contrôle");
            return -1;
        }

        if (this.getCouleur() == Couleur.Blanc) {

            if (cote.equals("K")) {
                // cant castle accross a line of check
                if (this.deplacer(5, 7, null) == 0 && this.deplacer(6, 7, null) == 0) {
                    Board.setPiece(tour.getX(), tour.getY(), null);
                    Board.setPiece(5, 7, tour);
                    return 0;
                } else {
                    Board.setPiece(this.getX(), this.getY(), null);
                    Board.setPiece(departX, departY, this);
                    return -1;
                }
            }

            else if (cote.equals("Q")) {
                if (this.deplacer(3, 7, null) == 0 && this.deplacer(2, 7, null) == 0) {
                    Board.setPiece(tour.getX(), tour.getY(), null);
                    Board.setPiece(3, 7, tour);
                    return 0;
                } else {
                    Board.setPiece(this.getX(), this.getY(), null);
                    Board.setPiece(departX, departY, this);
                    return -1;
                }
            }
        }

        if (this.getCouleur() == Couleur.Noir) {
            if (cote.equals("K")) {
                if (this.deplacer(5, 0, null) == 0 && this.deplacer(6, 0, null) == 0) {
                    Board.setPiece(tour.getX(), tour.getY(), null);
                    Board.setPiece(5, 0, tour);
                    return 0;
                } else {
                    Board.setPiece(this.getX(), this.getY(), null);
                    Board.setPiece(departX, departY, this);
                    return -1;
                }
            }

            else if (cote.equals("Q")) {
                if (this.deplacer(3, 0, null) == 0 && this.deplacer(2, 0, null) == 0) {
                    Board.setPiece(tour.getX(), tour.getY(), null);
                    Board.setPiece(3, 0, tour);
                    return 0;
                } else {
                    Board.setPiece(this.getX(), this.getY(), null);
                    Board.setPiece(departX, departY, this);
                    return -1;
                }
            }
        }
        return -1;

    }

    @Override
    public boolean peutDeplacer() {
        int x = this.getX();
        int y = this.getY();

        // fou
        // en haut à gauche
        if (this.testMouvement(x - 1, y - 1)) {
            return true;
        }
        // en haut à droite
        if (this.testMouvement(x + 1, y - 1)) {
            return true;
        }
        // en bas à gauche
        if (this.testMouvement(x - 1, y + 1)) {
            return true;
        }
        // en bas à droite
        if (this.testMouvement(x + 1, y + 1)) {
            return true;
        }

        // tour
        // gauche
        if (this.testMouvement(x - 1, y)) {
            return true;
        }
        // droit
        if (this.testMouvement(x + 1, y)) {
            return true;
        }
        // bas
        if (this.testMouvement(x, y + 1)) {
            return true;
        }
        // haut
        if (this.testMouvement(x, y - 1)) {
            return true;
        }
        return false;
    
    }

}
