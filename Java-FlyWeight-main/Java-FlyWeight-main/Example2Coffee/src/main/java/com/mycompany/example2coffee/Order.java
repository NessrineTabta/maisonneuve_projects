package com.mycompany.example2coffee;

public class Order {
    
    protected Coffee coffee;
    public Order(Coffee coffee) {
        this.coffee = coffee;
    }

    //Requeste du client a partir de la saveur et du numero de sa table
    public static Order orderOf(String flavourName, int nombreTable) {
        Coffee coffee = CoffeeFactory.makeCoffee(flavourName);
        System.out.printf("Serving to table '%d'.\n", nombreTable);
        System.out.println("------------------------------------------------------");
        return new Order(coffee);
    }

    public Coffee getCoffee() {
        return coffee;
    }


}
