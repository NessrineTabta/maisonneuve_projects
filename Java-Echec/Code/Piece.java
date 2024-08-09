public abstract class Piece {

    private final Couleur couleur;

    private final String nomPiece;

    private int x, y;

    public boolean premierCoup;

    public Piece(Couleur couleur, String nomPiece, int x, int y) {
        this.couleur = couleur;
        this.nomPiece = nomPiece;
        this.x = x;
        this.y = y;

            if(this.getCouleur() == Couleur.Blanc){

                Board.blanc.add(this);

            }else if (this.getCouleur() == Couleur.Noir){

                Board.noir.add(this);

            }

    }

    public String getNomPiece() {
        return this.nomPiece;
    }

    public boolean correspondreNomPiece(String nomPiece){

        return this.nomPiece.equals(nomPiece);

    }

    public Couleur getCouleur() {
        return couleur;
    }

    public boolean memeCouleur(Piece autrePiece) {

        if (autrePiece == null){
            return false;
        }
        return (this.couleur == autrePiece.getCouleur());
    }

    public int getX() {
        return x;
    }

    public void setX(int x) {
        this.x = x;
    }

    public int getY() {
        return y;
    }

    public void setY(int y) {
        this.y = y;
    }

    public abstract boolean mouvementPossible(int x, int y);

    public int deplacer (int x, int y, Piece autreP) {

        if (this.mouvementPossible(x, y) != true){
            return -1;
        }

        Couleur couleur = this.getCouleur();
        int departX = this.getX();
        int departY = this.getY();

        /*si c'est le coup de blanc et la case est occupée
         par une autre piece avec un autre couleur la piece est
         supprimée dans la liste donc soit la liste "BLANC" ou "NOIR"*/

        if(this.getCouleur() == Couleur.Blanc) {

            Board.noir.remove(autreP);

        }else{

            Board.blanc.remove(autreP);

        }

        Board.setPiece(departX, departY, null);
        Board.setPiece(x, y, this);

        boolean estPremierCoup = this.premierCoup;
        this.premierCoup = false;

        if(Board.verificationEchec(couleur) == true) {

            if (autreP != null) {

                if(this.getCouleur() == Couleur.Blanc) {

                    Board.noir.add(autreP);

                } else{

                    Board.blanc.add(autreP);

                }

            }
            Board.setPiece(departX, departY, this);
            Board.setPiece(x, y, autreP);
            this.premierCoup = estPremierCoup;

            return -1;
        }

        return 0;
    }

    /*cette methode est utilisé dans
    la methode "peutDeplacer" par toutes
    les pièces pour pour voir s'il
    peut deplacer sur la case*/
    public boolean testMouvement (int x, int y){
        int departX = this.getX();
        int departY = this.getY();
        Piece autreP;
        boolean estPremier = this.premierCoup;

        if (x >= 0 && y >= 0 && x <= 7 && y <= 7){
            autreP = Board.getPiece(x, y);
            if(this.deplacer(x, y, autreP) == 0){
                // la pièce capturée est remise à sa position initiale
                Board.setPiece(x, y, autreP);
                // pièce sélectionnée mise à sa position d'origine
                Board.setPiece(departX, departY, this);
                premierCoup = estPremier;

                if (autreP != null) {
                    Board.blanc.add(autreP);
                }else {
                    Board.noir.add(autreP);
                }
                return true;
            }
        }
        return false;
    }


    /*cette méthode est pour transformer la symbole
    d'une piece blanc ou noir en UTF-8 dans chaque piece*/
    public abstract String toString();

    public abstract boolean peutDeplacer();
}
