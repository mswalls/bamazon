const mysql = require("mysql");
const inquirer = require("inquirer");
require("console.table");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
});

connection.connect(err => {
    if (err) {
        console.error(`error connecting: ${err}`);
    }

    console.log(`connected!`);
    loadProducts();
});

const loadProducts = () => {
    connection.query("SELECT * FROM products", (err, res) => {
        if (err) {
            throw err;
        }
        console.table(res);
        promptCustomerForItem(res);
    });
}

const promptCustomerForItem = inventory => {
    inquirer
        .prompt([
            {
                type: "input",
                name: "choice",
                message: "What is the ID of the item you would you like to purchase? [Quit with Q]",
                validate: function (val) {
                    return !isNaN(val) || val.toLowerCase() === "q";
                }
            }
        ])
        .then(val => {
           

            checkIfShouldExit(val.choice);
            const choiceId = parseInt(val.choice);
            const product = checkInventory(choiceId, inventory);

           

            if (product) {

                
                promptCustomerForQuantity(product);
            }
            else {
                
                console.log("\nThat item is not in the inventory.");
                loadProducts();
            }
        });
}

const checkInventory = (choiceId, inventory) => {


    const item = inventory.filter(item => item.item_id === choiceId);
    console.log(item);
    return item.length > 0 ? item[0] : null;
}
const makePurchase = (product, quantity) => {
    connection.query(
        "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
        [quantity, product.item_id],
        function (err, res) {
           
            console.log("\nSuccessfully purchased " + quantity + " " + product.product_name + "'s!");
            loadProducts();
        }
    );
}
const promptCustomerForQuantity = product => {
    inquirer
        .prompt([
            {
                type: "input",
                name: "quantity",
                message: "How many would you like? [Quit with Q]",
                validate: function (val) {
                    return val > 0 || val.toLowerCase() === "q";
                }
            }
        ])
        .then(function (val) {
            
            checkIfShouldExit(val.quantity);
            const quantity = parseInt(val.quantity);

            
            if (quantity > product.stock_quantity) {
                console.log("\nInsufficient quantity!\n");
                loadProducts();
            }
            else {
                
                makePurchase(product, quantity);
            }
        });

}
const checkIfShouldExit = choice => {
    if (choice.toLowerCase() === "q") {
        console.log(`Don't let the screen door hit you.`);
        process.exit(0);
    }
}