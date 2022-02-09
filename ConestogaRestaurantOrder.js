const Order = require("./Order");

// Emoji Icons
const plate = '\&#x1f37d;';
const yummy = '\&#x1f60b;';
const pizza = '\&#x1f355;';
const hamburger = '\&#x1f354;';
const sandwich = '\&#x1f96a;'; 

// Item Prices
const pizzaOrder_price = 15;
const burgerOrder_price = 4.5;
const sandwichOrder_price = 4;
const small_price = 2.5;
const medium_price = 3.5;
const large_price = 4.5;
const toppings_price = 4;
const drinks_price = 2.5;
const fries_price = 3.5;
const nuggets_price = 4;
const chicken_price = 7.5;
// ON Tax
const tax = 0.13; 

var orderCount = 0;

const OrderState = Object.freeze({
  WELCOMING:              Symbol("welcoming"),
  MENU:                   Symbol("menu"),
  SIZE:                   Symbol("size"),
  TOPPINGS_PIZZA:         Symbol("toppings"),
  TOPPINGS_BURGER:        Symbol("toppings"),
  TOPPINGS_SANDWICH:      Symbol("toppings"),
  ADDITIONAL_TOPPINGS:    Symbol("additional_toppings"),
  CONFIRMATION_TOPPINGS:  Symbol("confirmation_toppings"),
  OPTIONAL_DRINK:         Symbol("optional_drinks"),
  CONFIRMATION_DRINK:     Symbol("confirmation_drinks"),
  SELECTED_DRINK:         Symbol("selected_drinks"),
  UPSELL_ITEMS:           Symbol("upsell"),
  UPSELL_CHOICE:          Symbol("upsell_choice"),
  CONFIRMATION:           Symbol("confirmation"),
  RECEIPT:                Symbol("receipt"),
  ADDITIONAL_ORDER:       Symbol("additional_order"),
  CONFIRMATION_ORDER:     Symbol("confirmation_order"),
  CHECKOUT:               Symbol("checkout"),
  PAYMENT:                Symbol("payment")
});

module.exports = class RestaurantOrder extends Order{
  constructor(sNumber, sUrl){
      super(sNumber, sUrl);
      this.stateCur = OrderState.WELCOMING;
      this.sMenu = "";
      this.sItem = "";
      this.sItemMsg = `Please choose from the available menu only \n Pizza ${pizza}, \n Burger ${hamburger}, \n or Sandwich ${sandwich} only.`;
      this.sSize = "";
      this.sSizeMsg = "What size would you like? \n small - $2.5\n medium - $3.5\n or large - $4.5";
      this.sToppings_Selected = "";
      this.sToppings = "";
      this.sPizzaToppingsMsg = "What pizza toppings would you like to add @ $4? \n 1. Pepperoni, \n 2. Supreme, \n 3. Hawaiian or \n 4. BBQ only";
      this.sBurgerToppingsMsg = "What burger toppings would you like to add @ $4.5? \n 1. Bacon \n 2. Barbeque \n 3. Cheese or \n 4. Steak only";
      this.sSandwichToppingsMsg = "What sandwich fillings would you like to add @ $4.5? \n 1. Cheese \n 2. Ham \n 3. Sausage or \n 4. Egg only";
      this.sDrinks = "";
      this.sDrinksMsg = "Drinks available: \n 1. Coke \n 2. Sprite \n 3. Pineapple \n 4. Tea or \n 5. Coffee only.";
      this.sUpSell = "";
      this.sUpsellMsg = "Would you like to add some side orders? \n 1. Medium Fries - $3.5, \n 2. 6pcs Chicken Nuggets - $4, \n 3. Chicken Wings - $7.5 only";
      this.sOrders = "";
      this.sPrice = 0;
      this.sTax = 0;
      this.sTotalAmount = 0;
      this.deliveryAddress = "";
  }
  handleInput(sInput){
    let aReturn = [];
    switch(this.stateCur){
      // Welcoming Message 
      case OrderState.WELCOMING:
        aReturn.push(`Welcome to Glenn's Restaurant ${yummy} ${plate} ${pizza} ${hamburger} ${sandwich} ${plate} ${yummy} \n`);
      case OrderState.MENU:
        this.stateCur = OrderState.SIZE;
        aReturn.push(`What would you like to order from the available menu: \n 1. ${pizza} Pizza - $15\n 2. ${hamburger} Burger - 4.5\n 3. ${sandwich} Sandwich - $4`);
        break;

      // Choose Items From The Menu
      case OrderState.SIZE:
        this.sItem = sInput;
        switch(this.sItem.toLowerCase()){
        // Check The Order Item And Save The Price
          case 'pizza':
            this.stateCur = OrderState.TOPPINGS_PIZZA;
            this.sPrice += pizzaOrder_price;
            aReturn.push(this.sSizeMsg);
            break;
          case 'burger':
            this.stateCur = OrderState.TOPPINGS_BURGER;
            this.sPrice += burgerOrder_price;
            aReturn.push(this.sSizeMsg);
            break;
          case 'sandwich':
            this.stateCur = OrderState.TOPPINGS_SANDWICH;
            this.sPrice += sandwichOrder_price;
            aReturn.push(this.sSizeMsg);
            break;
          default:
            aReturn.push(`Sorry! We are unable to processed your order request for ${this.sItem.bold()}.`);
            aReturn.push(this.sItemMsg);
            this.stateCur = OrderState.SIZE;
            break;
        }
      break;

      // Choose Toppings For Pizza
      case OrderState.TOPPINGS_PIZZA:
        this.sSize = sInput;
        this.stateCur = OrderState.ADDITIONAL_TOPPINGS
        // Check The Item Size Selected And Add The Corresponding Price
        if (this.sSize.toLowerCase() == "small" || this.sSize.toLowerCase() == "medium" || this.sSize.toLowerCase() == "large") { 
          switch(this.sSize) {
            case 'small':
              this.sPrice += small_price;
              break;
            case 'medium': 
              this.sPrice += medium_price;
              break;
            case 'large':
              this.sPrice += large_price;
              break;
          }
          aReturn.push(this.sPizzaToppingsMsg);
        }
        else {
          aReturn.push(`Sorry! We are unable to processed your request for ${this.sSize.bold()} size.`) &&
          aReturn.push("Please choose from the available size between \n Small, \n Medium, \n or Large only.");
          this.stateCur = OrderState.TOPPINGS_PIZZA;
          break;
        }
        break;

      // Choose Toppings For Burger
      case OrderState.TOPPINGS_BURGER:
        this.sSize = sInput;
        this.stateCur = OrderState.ADDITIONAL_TOPPINGS
        // Check The Item Size Selected And Add The Price 
        if (this.sSize.toLowerCase() == "small" || this.sSize.toLowerCase() == "medium" || this.sSize.toLowerCase() == "large") { 
          switch(this.sSize) {
            case 'small':
              this.sPrice += small_price;
              break;
            case 'medium': 
              this.sPrice += medium_price;
              break;
            case 'large':
              this.sPrice += large_price;
              break;
          }
          aReturn.push(this.sBurgerToppingsMsg);
        }
        else {
          aReturn.push(`Sorry! We are unable to processed your request for size ${this.sSize.bold()}.`) &&
          aReturn.push("Please choose from the available size between \n Small, \n Medium, \n or Large only.");
          this.stateCur = OrderState.TOPPINGS_BURGER;
          break;
        }
      break;

      // Choose Toppings For Sandwich
      case OrderState.TOPPINGS_SANDWICH:
        this.sSize = sInput;
        this.stateCur = OrderState.ADDITIONAL_TOPPINGS
        // Check The Item Size Selected And Add The Price 
        if (this.sSize.toLowerCase() == "small" || this.sSize.toLowerCase() == "medium" || this.sSize.toLowerCase() == "large") { 
          switch(this.sSize) {
            case 'small':
              this.sPrice += small_price;
              break;
            case 'medium': 
              this.sPrice += medium_price;
              break;
            case 'large':
              this.sPrice += large_price;
              break;
          }
          aReturn.push(this.sSandwichToppingsMsg);
        }
        else {
          aReturn.push(`Sorry! We are unable to processed your request for size ${this.sSize.bold()}.`) &&
          aReturn.push("Please choose from the available size between \n Small, \n Medium, \n or Large only.");
          this.stateCur = OrderState.TOPPINGS_SANDWICH;
          break;
        }
      break;

      // Additional Toppings
      case OrderState.ADDITIONAL_TOPPINGS:
        this.sToppings_Selected = sInput;
        this.stateCur = OrderState.CONFIRMATION_TOPPINGS
        // Check For Selected Toppings/Fillings
        // Pizza Toppings
        if (this.sToppings_Selected.toLowerCase() == "pepperoni" || this.sToppings_Selected.toLowerCase() == "supreme" || this.sToppings_Selected.toLowerCase() == "hawaiian" || this.sToppings_Selected.toLowerCase() == "bbq") {
          this.sToppings += this.sToppings_Selected + ", ";
          this.sPrice += toppings_price; 
          aReturn.push("Would you like to add additional pizza toppings?");
        } 
        // Burger Toppings
        else if (this.sToppings_Selected.toLowerCase() == "bacon" || this.sToppings_Selected.toLowerCase() == "barbeque" || this.sToppings_Selected.toLowerCase() == "cheese" || this.sToppings_Selected.toLowerCase() == "steak") {
          this.sToppings += this.sToppings_Selected + ", ";
          this.sPrice += toppings_price;  
          aReturn.push("Would you like to add additional burger toppings?");
        } 
        // Sandwich Fillings
        else if (this.sToppings_Selected.toLowerCase() == "cheese" || this.sToppings_Selected.toLowerCase() == "ham" || this.sToppings_Selected.toLowerCase() == "sausage" || this.sToppings_Selected.toLowerCase() == "egg") {
          this.sToppings += this.sToppings_Selected + ", ";
          this.sPrice += toppings_price;  
          aReturn.push("Would you like to add additional sandwich fillings?");
        }
        else {
          this.stateCur = OrderState.ADDITIONAL_TOPPINGS;
          aReturn.push(`Sorry! We are unable to processed your ${this.sToppings_Selected.bold()} toppings/fillings request.`) &&
          aReturn.push("Please choose from the available toppings/fillings only.");
          switch (this.sItem.toLowerCase()) {
            case 'pizza':
              aReturn.push(this.sPizzaToppingsMsg);
              break;
            case 'burger':
              aReturn.push(this.sBurgerToppingsMsg);
              break;
            case 'sandwich':
              aReturn.push(this.sSandwichToppingsMsg);
              break;
          }
          break;
        }
        break;

      // Additional Toppings Confirmation
      case OrderState.CONFIRMATION_TOPPINGS:
        this.sAdditional_Toppings = sInput;
        switch(this.sAdditional_Toppings.toLowerCase()){
          case 'yes':
            switch(this.sItem.toLowerCase()) {
              // Pizza Toppings
              case 'pizza':
                this.stateCur = OrderState.ADDITIONAL_TOPPINGS;
                aReturn.push(this.sPizzaToppingsMsg);
                break;
              // Burger Toppings
              case 'burger':
                this.stateCur = OrderState.ADDITIONAL_TOPPINGS;
                aReturn.push(this.sBurgerToppingsMsg);
                break;
              // Sandwich Fillings
              case 'sandwich':
                this.stateCur = OrderState.ADDITIONAL_TOPPINGS;
                aReturn.push(this.sSandwichToppingsMsg);
                break;
            }
            break;
          case 'no':
            aReturn.push("Would you like to have a drinks or beverages @ $2.5?");
            this.stateCur = OrderState.SELECTED_DRINK
            break;
          default:    
            aReturn.push(`Sorry! We are unable to processed your ${this.sAdditional_Toppings.bold()} order confirmation.`);
            aReturn.push("Is that a 'Yes' or 'No'?");     
            this.stateCur = OrderState.CONFIRMATION_TOPPINGS
            break;
        } 
        break;

      // Selected Choice Of Drinks
      case OrderState.SELECTED_DRINK:
        this.sOptional_Drink = sInput;
        switch(this.sOptional_Drink.toLowerCase()){
          case 'yes':
            aReturn.push(this.sDrinksMsg);
            this.stateCur = OrderState.UPSELL_ITEMS
            break;
          case 'no':
            aReturn.push("Are you sure you don't want to add any drinks?");
            this.stateCur = OrderState.CONFIRMATION_DRINK
            break;
          default:    
            aReturn.push(`Sorry! We are unable to processed your ${this.sOptional_Drink.bold()} order confirmation.`);
            aReturn.push("Is that a 'Yes' or 'No'?");
            this.stateCur = OrderState.SELECTED_DRINK
            break;
        }
        break;

      // Drinks Order Confirmation  
      case OrderState.CONFIRMATION_DRINK:
        this.sConfirmation_Drink = sInput;
        this.stateCur = OrderState.UPSELL_ITEMS
        switch(this.sConfirmation_Drink.toLowerCase()) {
          case 'yes': 
            this.sDrinks = "without any drinks/beverages,";
            aReturn.push(this.sUpsellMsg);
            this.stateCur = OrderState.UPSELL_CHOICE
            break;
          case 'no':
            aReturn.push("Would you like to have a drinks or beverages @ $2.5 instead?");
            this.stateCur = OrderState.SELECTED_DRINK
            break;
          default:    
            aReturn.push(`Sorry! We are unable to processed your ${this.sConfirmation_Drink.bold()} order confirmation.`);
            aReturn.push("Is that a 'Yes' or 'No'?");
            this.stateCur = OrderState.CONFIRMATION_DRINK
            break;
        }
        break;

      // Up Selling Other Items
      case OrderState.UPSELL_ITEMS:
        this.sSelected_Drink = sInput;                
        this.stateCur = OrderState.UPSELL_CHOICE
        if (this.sSelected_Drink.toLowerCase() == "coke" || this.sSelected_Drink.toLowerCase() == "sprite" || this.sSelected_Drink.toLowerCase() == "pineapple" || this.sSelected_Drink.toLowerCase() == "tea" || this.sSelected_Drink.toLowerCase() == "coffee") {
          switch(this.sSelected_Drink.toLowerCase()) {
            case 'coke':
              this.sDrinks = `and a drink of ${this.sSelected_Drink}`;
              this.sPrice += drinks_price;
              break;
            case 'sprite':
              this.sDrinks = `and a drink of ${this.sSelected_Drink}`;
              this.sPrice += drinks_price;
              break;
            case 'pineapple':
              this.sDrinks = `and a drink of ${this.sSelected_Drink}`;
              this.sPrice += drinks_price;
              break;
            case 'tea':
              this.sDrinks = `and a drink of ${this.sSelected_Drink}`;
              this.sPrice += drinks_price;
              break;
            case 'coffee':
              this.sDrinks = `and a drink of ${this.sSelected_Drink}`;
              this.sPrice += drinks_price;
              break;
          }
        } 
        else {
          aReturn.push(`Sorry! We are unable to processed your selected ${this.sSelected_Drink.bold()} drinks/beverages.`);
          aReturn.push("Please choose from the available drinks/beverages: Coke, \n Sprite, \n Pineapple, \n Tea, or \n or Coffee only.");
          this.stateCur = OrderState.UPSELL_ITEMS
          break;
        }
        aReturn.push(this.sUpsellMsg);
        break;

      // Up Selling Options
      case OrderState.UPSELL_CHOICE:
        this.sUpsell_Items = sInput;
        if (this.sUpsell_Items.toLowerCase() == "yes" || this.sUpsell_Items.toLowerCase() == "no") {
          switch(this.sUpsell_Items.toLowerCase()) {
            case 'yes':
              this.stateCur = OrderState.CONFIRMATION
              aReturn.push("Which item would you like to add Fries, Nuggets or Chicken?");
              break;
            case 'no':
              this.stateCur = OrderState.RECEIPT
              aReturn.push("Do you want to add another order?");
              this.sUpsell = "without any additional fries, nuggets or chicken wings.";
              break;
          }
        }
        else {
          aReturn.push(`Sorry! We are unable to processed ${this.sUpsell_Items.bold()} order confirmation.`);
          aReturn.push("Please enter your selection with a 'Yes' or 'No'.");
          this.stateCur = OrderState.UPSELL_CHOICE
          break;
        }
        break;

      // Order Confirmation    
      case OrderState.CONFIRMATION:
        this.sUpsell_Choice = sInput;
        this.stateCur = OrderState.RECEIPT
        switch(this.sUpsell_Choice.toLowerCase()) {
          case 'fries':
            this.sUpsell = `with an additional item of medium size ${this.sUpsell_Choice}`;
            this.sPrice += fries_price;
            aReturn.push("Do you want to add another order?");
            break;
          case 'nuggets':
            this.sUpsell = `with an additional item of 6pcs ${this.sUpsell_Choice}`;
            this.sPrice += nuggets_price;
            aReturn.push("Do you want to add another order?");
            break;
          case 'chicken':
            this.sUpsell = `with an additional item of ${this.sUpsell_Choice} wings`;
            this.sPrice += chicken_price;
            aReturn.push("Do you want to add another order?");
            break;    
          default:
            aReturn.push(`Sorry! We are unable to processed your additional ${this.sUpsell_Choice.bold()} request.`);
            aReturn.push("Please enter your selection with a 'Fries', 'Nuggets' or 'Chicken' only.");
            this.stateCur = OrderState.CONFIRMATION
            break;
        }
        break;

      // Receipt    
      case OrderState.RECEIPT:
        this.sConfirmation = sInput;
        switch(this.sConfirmation.toLowerCase()) {
          case 'yes': 
            this.stateCur = OrderState.ADDITIONAL_ORDER
            aReturn.push("Are you sure you want to add another order?");
            break;
          case 'no':
            this.stateCur = OrderState.CHECKOUT
            orderCount += 1;
            aReturn.push("Thank you for your order of ");
            this.sOrders += `${orderCount}. ${this.sSize} ${this.sItem} with toppings/fillings of ${this.sToppings} ${this.sDrinks} ${this.sUpsell}\n`;
            aReturn.push(this.sOrders)
            aReturn.push("Do you wish to proceed to checkout?");
            break;
          default:
            aReturn.push(`Sorry! We are unable to processed your ${this.sConfirmation.bold()} order confirmation.`);
            aReturn.push("Please enter your selection with a 'Yes' or 'No'.");
            this.stateCur = OrderState.RECEIPT
            break;
        }
        break;

      // Additional Order    
      case OrderState.ADDITIONAL_ORDER:
        this.sReceipt = sInput;
        switch(this.sReceipt.toLowerCase()) {
          case 'yes': 
            this.stateCur = OrderState.SIZE
            orderCount += 1;
            aReturn.push("What would you like to order? \n Available Menu: \n 1. Pizza @ $7.5\n 2. Burger @ 1.5\n 3. Sandwich @ $3");
            this.sOrders += `${orderCount}. ${this.sSize} ${this.sItem} with toppings/fillings of ${this.sToppings} ${this.sDrinks} ${this.sUpsell} \n`;
            // Set The Toppings To Empty For The New Order
            this.sToppings = "";
            break;
          case 'no': 
            this.stateCur = OrderState.CHECKOUT
            orderCount += 1;
            aReturn.push("Thank you for your order of ");
            this.sOrders += `${orderCount}. ${this.sSize} ${this.sItem} with toppings/fillings of ${this.sToppings} ${this.sDrinks} ${this.sUpsell} \n`;
            aReturn.push(this.sOrders)
            aReturn.push("Do you wish to proceed to checkout?");
            break;
        }
        break;

      // Additional Order Confirmation    
      case OrderState.CONFIRMATION_ORDER:
        this.sCheckout = sInput;
        switch(this.sCheckout.toLowerCase()) {
          // If Customer Change His/Her Mind Before Checkout
          case 'yes': 
            this.stateCur = OrderState.SIZE
            aReturn.push("What would you like to order? \n Available Menu: \n 1. Pizza @ $7.5\n 2. Burger @ 1.5\n 3. Sandwich @ $3");
            // Set The Toppings To Empty For The New Order
            this.sToppings = "";
            break;
          case 'no': 
            this.stateCur = OrderState.CHECKOUT            
            aReturn.push("Do you wish to proceed to checkout?");
            break;
          default:
            aReturn.push(`Sorry! We are unable to processed your ${this.sCheckout.bold()} request to confirm for additional order.`);
            aReturn.push("Please enter your selection with a 'Yes' or 'No'.");
            this.stateCur = OrderState.CONFIRMATION_ORDER
            break;
        }  
        break;

      // Checkout  
      case OrderState.CHECKOUT:
        this.sAdditional_Order = sInput;    
        switch(this.sAdditional_Order.toLowerCase()) {
          case 'yes': 
            this.stateCur = OrderState.PAYMENT
            this.sTax = this.sPrice * tax;
            this.sTotalAmount = this.sPrice + this.sTax;
            this.nOrder = this.sTotalAmount.toFixed(2);
            aReturn.push(`The total amount of your order is $${this.sTotalAmount.toFixed(2).bold()}. Please pay the amount by clicking the link below: \n ${this.sUrl}/payment/${this.sNumber}/`);
            break;
          case 'no':
            this.stateCur = OrderState.CONFIRMATION_ORDER
            aReturn.push("Do you want to add another order instead?");
            break;
          default:
            aReturn.push(`Sorry! We are unable to processed your ${this.sAdditional_Order.bold()} checkout confirmation.`);
            aReturn.push("Please enter your selection with a 'Yes' or 'No'.");
            this.stateCur = OrderState.CHECKOUT
            break;
          }
          break;

      // Payment    
      case OrderState.PAYMENT:
        this.isDone(true); 
        console.log(sInput);  
        let payeeAdresss = sInput.purchase_units[0].shipping.address;
        let custAddress = payeeAdresss.address_line_1;
        let custCity = payeeAdresss.admin_area_2;
        let custProvince = payeeAdresss.admin_area_1;
        let custPostal = payeeAdresss.postal_code;
        let custCountry = payeeAdresss.country_code;
        let shippingAddress = `${custAddress} ${custCity}, ${custProvince} ${custPostal} ${custCountry}`;

        let d = new Date(); 
        d.setMinutes(d.getMinutes() + 20);
        aReturn.push(`Your payment of $${this.nOrder.bold()} is complete. Your order will be delivered at the following shipping address \n ${shippingAddress.bold()} \n at ${d.toTimeString()}`);
        break; 
    }
    return aReturn;
  }

renderForm(sTitle = "-1", sAmount = "-1"){
  // your client id should be kept private
  if(sTitle != "-1"){
    this.sItem = sTitle;
  }
  if(sAmount != "-1"){
    this.nOrder = sAmount;
  }
  const sClientID = process.env.SB_CLIENT_ID || 'put your client id here for testing ... Make sure that you delete it before committing'
  return(`
    <!DOCTYPE html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1"> <!-- Ensures optimal rendering on mobile devices. -->
        <meta http-equiv="X-UA-Compatible" content="IE=edge" /> <!-- Optimal Internet Explorer compatibility -->
      </head>
      
      <body>
        <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
        <script
          src="https://www.paypal.com/sdk/js?client-id=${sClientID}"> // Required. Replace SB_CLIENT_ID with your sandbox client ID.
        </script>
          Thank you ${this.sNumber} for your order. Please pay the total amount of $${this.nOrder}.
          <div id="paypal-button-container"></div>
        <script>
          paypal.Buttons({
            createOrder: function(data, actions) {
              // This function sets up the details of the transaction, including the amount and line item details.
              return actions.order.create({
                purchase_units: [{
                  amount: {
                    value: '${this.nOrder}'
                  }
                }]
              });
            },
            onApprove: function(data, actions) {
              // This function captures the funds from the transaction.
              return actions.order.capture().then(function(details) {
              // This function shows a transaction success message to your buyer.
              $.post(".", details, ()=>{
                window.open("", "_self");
                window.close(); 
                });
              });
            }
          }).render('#paypal-button-container');
          // This function displays Smart Payment Buttons on your web page.
        </script>
      </body>
    `);
  }
}