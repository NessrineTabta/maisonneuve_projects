import java.util.ArrayList;

public class Board {

    public static ArrayList<Piece> noir = new ArrayList<>();
    public static ArrayList<Piece> blanc = new ArrayList<>();

    static Piece[][] board = new Piece[8][8];

    /*   y 0 1 2 3 4 5 6 7
        x
        0
        1
        2
        3
        4
        5
        6
        7
      */

    static void afficherBoard(){
        System.out.println("    A   B   C   D   E   F   G   H");

        System.out.println("  ---------------------------------");

        int ligne = 8;

        for (int i = 0; i < 8; i++){

            System.out.print(ligne + " ");
            System.out.print("| ");

            for (int j = 0; j < 8; j++){

                /*case vide*/
                if (board[i][j] == null){

                    System.out.print("  | ");

                } else{
                    /*placer les pieces dans leur propres coordonnées dans le board*/
                    System.out.print(board[i][j] + " | ");

                }

            }
            System.out.print(ligne);
            ligne--;
            System.out.println();
            System.out.println("  ---------------------------------");

        }

        System.out.println("    A   B   C   D   E   F   G   H");
        System.out.println();

    }

    static void commencerLeJeu (){

        System.out.println("Comment jouer :") ;
        System.out.println("Pour les pions, tapez \"pion\" suivi de la lettre de la colonne. Par exemple, \"pionA\"") ;
        System.out.println("Pour les évêques, les cavaliers et les tours, mettez \"Q\" ou \"K\" pour spécifier le côté de la reine ou du roi") ;
        System.out.println("Indiquez un espace puis entrez un carreau valide. Par exemple, \"fouK c4\"") ;
        System.out.println("Pour faire un roque, tapez roque, suivi d'un espace puis d'un K ou Q majuscule pour indiquer un côté. \"roque Q\"\n") ;


        //les positions des pièces noires
        board[0][0] = new Tour (Couleur.Noir, "tourQ", 0, 0);
        board[0][1] = new Cavalier (Couleur.Noir, "cavalierQ", 1,0);
        board[0][2] = new Fou (Couleur.Noir, "fouQ", 2, 0);
        board[0][3] = new Reine (Couleur.Noir, "reine", 3, 0);
        board[0][4] = new Roi (Couleur.Noir, "roi", 4, 0);
        board[0][5] = new Fou (Couleur.Noir, "fouK", 5, 0);
        board[0][6] = new Cavalier (Couleur.Noir, "cavalierK", 6, 0);
        board[0][7] = new Tour (Couleur.Noir, "tourK", 7, 0);

        board[1][0] = new Pion (Couleur.Noir, "pionA", 0, 1);
        board[1][1] = new Pion (Couleur.Noir, "pionB", 1, 1);
        board[1][2] = new Pion (Couleur.Noir, "pionC", 2, 1);
        board[1][3] = new Pion (Couleur.Noir, "pionD", 3, 1);
        board[1][4] = new Pion (Couleur.Noir, "pionE", 4, 1);
        board[1][5] = new Pion (Couleur.Noir, "pionF", 5, 1);
        board[1][6] = new Pion (Couleur.Noir, "pionG", 6, 1);
        board[1][7] = new Pion (Couleur.Noir, "pionH", 7, 1);

        //les positions des pièces blancs
        board[7][0] = new Tour (Couleur.Blanc, "tourQ", 0, 7);
        board[7][1] = new Cavalier (Couleur.Blanc, "cavalierQ", 1,7);
        board[7][2] = new Fou (Couleur.Blanc, "fouQ", 2, 7);
        board[7][3] = new Reine (Couleur.Blanc, "reine", 3, 7);
        board[7][4] = new Roi (Couleur.Blanc, "roi", 4, 7);
        board[7][5] = new Fou (Couleur.Blanc, "fouK", 5, 7);
        board[7][6] = new Cavalier (Couleur.Blanc, "cavalierK", 6, 7);
        board[7][7] = new Tour (Couleur.Blanc, "tourK", 7, 7);

        board[6][0] = new Pion (Couleur.Blanc, "pionA", 0, 6);
        board[6][1] = new Pion (Couleur.Blanc, "pionB", 1, 6);
        board[6][2] = new Pion (Couleur.Blanc, "pionC", 2, 6);
        board[6][3] = new Pion (Couleur.Blanc, "pionD", 3, 6);
        board[6][4] = new Pion (Couleur.Blanc, "pionE", 4, 6);
        board[6][5] = new Pion (Couleur.Blanc, "pionF", 5, 6);
        board[6][6] = new Pion (Couleur.Blanc, "pionG", 6, 6);
        board[6][7] = new Pion (Couleur.Blanc, "pionH", 7, 6);

    }

    // vérifier la place sur le tableau
    public static Piece getPiece (int x, int y){
        return board[y][x];
    }

    // placer la pièce aux coordonnées fournies
    public static void setPiece (int x, int y, Piece piece) {

        if (piece != null){
            piece.setX(x);
            piece.setY(y);
        }

        board[y][x] = piece;

    }

    //correspondre la pièce de l'utilisateur avec Piece sur board.
    public static Piece getPiece(String piece, Couleur couleur){

        if(couleur == Couleur.Blanc) {
            /*Si "couleur" de la pièce est "BLANC"
            la boucle position la piece dans liste blanc
            et return la piece qui correspondre avec*/
            for (int i = 0; i < blanc.size(); i++) {
                Piece p = blanc.get(i);
                if (p.correspondreNomPiece(piece)){
                    return p;
                }
            }
        }
        /*Si "couleur" de la pièce est "NOIR"
        la boucle position la piece dans liste
        et return la piece qui correspondre avec*/
        else if (couleur == Couleur.Noir){
            for (int i = 0; i < noir.size(); i++) {
                Piece p = noir.get(i);
                if (p.correspondreNomPiece(piece)){
                    return p;
                }
            }
        }
        return null;
    }

    public static boolean aucunObstacle(int x1, int y1, int x2, int y2) {
        /*"xDistance est x1 position initale/départ de la piece - x2
        la position où on veut mettre la piece */
        int xDistance = x2 - x1;
        /*"xDistance est y1 position initale/départ de la piece - y2
        la position où on veut mettre la piece */
        int yDistance = y2 - y1;

        int xDir = 0;
        int yDir = 0;
        int size = 0;

        /*l'axe "x" de noirs piece noir*/
        if (xDistance < 0) {
            xDir = -1;
        } else if (xDistance > 0) { /*l'axe "x" des pieces blanc*/
            xDir = 1;
        }
        /*l'axe "y" des pieces noir*/
        if (yDistance < 0) {
            yDir = -1;
        } else if (yDistance > 0) {
            yDir = 1;
        }

        /*changer sur x et y */
        if (xDistance != 0) {
            size = Math.abs(xDistance) - 1;
        } else {
            size = Math.abs(yDistance) - 1;
        }


        for (int i = 0; i < size; i++) {
            x1 += xDir;
            y1 += yDir;
            /*return false qu'il ne peut pas deplacer
            à la position choisi par le jouer car une piece occupe la case*/
            if (getPiece(x1, y1) != null) {
                return false;
            }
        }
        /*return true quand il n'y a pas une piece qui occupe la case
         où le jouer veut deplacer la pièce*/
        return true;
    }

    static int faireDeplacer (String deplacer, Couleur couleur){

        /*apres le nom de la pièce est taper
          on met une espace pour mettre
          les coordonées*/
        String[] splitString = deplacer.split(" ");

        String piece = splitString[0];

        /*si on tape roque puis espace avec
        les lettres K côté roi ou Q côté reine
        roi va roquer. ATTENTION! ON A DES PROBLEMES AVEC
        CETTE MÉTHODE*/
        if (piece.equals("roque")){
            Roi roi = (Roi) getPiece("roi", couleur);
            return roi.roque(splitString[1]);
        }


        // pièce sélectionnée pour être déplacée
        Piece p = getPiece(piece, couleur);
        if (p == null) {
            System.out.println("Pièce non valide, veuillez taper la pièce pour la déplacer.");
            return -1;
        }

        String coordonnees = splitString[1];
        /*si les coordonnées entree respecte pas la regle
         de 2 caractère à entrer apres l'espace "print case non valide"*/
        if (coordonnees.length() != 2){
            System.out.println("Case non valide, veuillez réessayer");
        }

        int colonnes = coordonnees.charAt(0) - 'a'; // axe y
        int rangees = 7 - (coordonnees.charAt(1) - '1'); // axe x

        if (rangees < 0 || rangees > 7 || colonnes < 0 ||colonnes > 7) {
            System.out.println("Case non valide, veuillez réessayer");
            return -1;
        }
        /*metttre la piece à la case choisi par le jouer*/
        Piece autreP = getPiece(colonnes, rangees);

        return p.deplacer(colonnes, rangees, autreP);

    }

    public static boolean verificationEchec (Couleur couleur){

        Piece roi = getPiece("roi", couleur);

        if (couleur == Couleur.Blanc) {
            /*si noir est dans echec par une piece blanc
            on vérifie dans "la liste noir"
            si notre coup est encore possible
            si possible return true et
            on peut encore deplacer nos pièces*/
            for (int i = 0; i < noir.size(); i++){

                Piece p = noir.get(i);

                if (p.mouvementPossible(roi.getX(), roi.getY())){

                    return true;

                }

            }

        }

        else if (couleur == Couleur.Noir) {
            /*si blanc est dans echec par une piece noir
            on vérifie dans "la liste blanc"
            si notre coup est encore possible
            si possible return true et
            on peut encore deplacer nos pièces*/
            for (int i = 0; i < blanc.size(); i++){

                Piece p = blanc.get(i);

                if (p.mouvementPossible(roi.getX(), roi.getY())){

                    return true;

                }

            }

        }
        return false;
    }

    public static boolean mat(Couleur couleur){

        if(couleur ==  Couleur.Blanc){
            /*on cherche dans la liste blanc
            s'il y une possibilité de déplacer
            sinon return false et on est echec et mat*/
            for(int i = 0; i < blanc.size(); i++){

                Piece p = blanc.get(i);

                if (p.peutDeplacer()){
                    return false;
                }

            }

        }else if (couleur == Couleur.Noir){

            /*on cherche dans la liste noir
            s'il y une possibilité de déplacer
            sinon return false et on est echec et mat*/
            for (int i = 0; i < noir.size(); i++){

                Piece p = noir.get(i);

                if(p.peutDeplacer()){
                    return false;
                }

            }

        }
        return true;
    }
    /* On a pas réussi faire PAT!
    public static boolean pat (Couleur couleur) {

        Piece cavalierK = getPiece("cavalierK", couleur);
        Piece cavalierQ = getPiece("cavalierQ", couleur);
        Piece fouK = getPiece("fouK", couleur);
        Piece fouQ = getPiece("fouQ", couleur);

        if (blanc.size() == 2 && noir.size() == 2) {
             if (blanc.contains(fouK) || blanc.contains(fouQ) || blanc.contains(cavalierK)
                    || blanc.contains(cavalierQ)) {
                return true;
            }
            if (noir.contains(fouK) || noir.contains(fouQ) || noir.contains(cavalierK)
                    || blanc.contains(cavalierQ)) {
                return true;
            }

        }
        if (blanc.size() == 1 && blanc.get(0) instanceof Roi && noir.size() == 1 && noir.get(0) instanceof Roi) {
            return true;
        }

        // aucun coup légal pat
        if (mat(couleur) == true && verificationEchec(couleur) == false) {
            return true;
        }

        return false;

    }
    */


}
