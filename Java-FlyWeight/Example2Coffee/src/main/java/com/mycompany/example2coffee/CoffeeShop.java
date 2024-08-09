package com.mycompany.example2coffee;
import java.util.ArrayList;

public class CoffeeShop {
    
    //liste de tout les ordres des clients
    private static final ArrayList<Order> orders = new ArrayList<>();
    
    //methode pour prendre l'ordre du client
    public void takeOrder(String flavourName,int tableNumber) {
       orders.add(Order.orderOf(flavourName, tableNumber));
    }

    //afficher tout les ordres demandés
    public static int getNumberOfOrders() {
       return orders.size();
    }
    
}
