import java.util.Scanner;

public class Game {

    public static void main(String[] args){

        Scanner choixDeDelpacment = new Scanner(System.in);


        while (true) {

            Board.commencerLeJeu();

            int coup = 0;
            Couleur couleur;

            while (true) {

                Board.afficherBoard();

                if (coup % 2 == 0) {
                    couleur = Couleur.Blanc;
                }else {
                    couleur = Couleur.Noir;
                }

                /*PAT ne fonctionne pas donc on l'a mis en commentaire
                if(Board.pat(couleur) == true){
                    System.out.println("Jeu Terminé!, PAT!");
                    break;
                }*/

                if (Board.verificationEchec(couleur) == true){

                    if(Board.mat(couleur) == true){

                        System.out.printf("Échec et MAT, %s gagné \n",couleur == Couleur.Blanc ? "Noir" : "Blanc");

                        break;

                    }

                    System.out.printf("%s est dans Échec! \n", couleur == Couleur.Blanc ? "Blanc" : "Noir");

                }

                //choix de déplacement
                System.out.printf("coup de %s \n", couleur == Couleur.Blanc ? "Blanc" : "Noir");

                String deplacer = choixDeDelpacment.nextLine();
                // faire deplacer la piece
                if(Board.faireDeplacer(deplacer, couleur) == 0){

                    coup++;

                }else{

                    System.out.println("Déplacement illégal");

                }

            }

            System.out.println("Voulez-vous jouer à nouveau ? y/n");
            if(choixDeDelpacment.next().equals("y")){
                continue;
            } else{
                System.exit(0);
            }

        }


    }

}
