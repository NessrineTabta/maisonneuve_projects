
package com.mycompany.example2coffee;
import java.util.HashMap; 

public class CoffeeFactory {
    
    //liste hashmap pour stocké saveur par café
    private static final HashMap<String, Coffee> mapCoffees = new HashMap();
    
    //création de café
    public static Coffee makeCoffee(String flavourName) {
        
    //On récupère le caffee s'il est présent dans la map list
    Coffee coffee = (Coffee)mapCoffees.get(flavourName);
    
    
    //Dans le cas contraire on fait une nouvelle instance de Coffee
     if(coffee == null) {
         coffee = new Coffee(flavourName);
         mapCoffees.put(flavourName, coffee);
         System.out.println("Création d'une saveur de caffée : " + coffee);
     }
      return coffee;
   }
    
    
    //affiche nombre total de café present dans la hash list
    public static int getNumberCoffee() {
        return mapCoffees.size();
    }

  }
    

