
package com.mycompany.example2coffee;


public class Main {
    public static void main(String[] args) {
        //list pour prendre ordre des clients
        CoffeeShop shop = new CoffeeShop();
        shop.takeOrder("CAPPUCCINO", 5);
        shop.takeOrder("AFFOGATO", 4);
        shop.takeOrder("ESPRESSO", 2);
        shop.takeOrder("LATTE", 10);
        shop.takeOrder("CAPPUCCINO", 9);
        shop.takeOrder("ESPRESSO", 8);
        shop.takeOrder("AFFOGATO", 7);
        shop.takeOrder("CAPPUCCINO", 3);
        shop.takeOrder("LATTE", 6);
        shop.takeOrder("FRAPPUCCINO", 1);

        //afficher nombre d'objets ORDER ET COFFEE
        System.out.println("------------------------------------------------------------");
        System.out.println("Number of Order Objects: " + CoffeeShop.getNumberOfOrders());
        System.out.println("Number of Coffee Objects: " + CoffeeFactory.getNumberCoffee());
        
    }
}
