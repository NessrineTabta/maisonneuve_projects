package com.mycompany.example2coffee;


public class Coffee {
   
   //SAVEUR DU CAFÉ EXAMPLE CAPPUCINO
   protected final String flavourName; 
   
   //intilialise le constructeur
   Coffee(String flavourName) {
        this.flavourName = flavourName;

    }

    //retourne la saveur du café
    public String getFlavourName() {
        return flavourName;
    }

    
}
