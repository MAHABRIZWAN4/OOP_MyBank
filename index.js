import inquirer from "inquirer";
import chalk from "chalk";
import gradient from "gradient-string";
const gradientText = gradient([
    "red",
    "yellow",
    "red",
    "yellow",
    "green",
    "yellow",
    "red",
    "yellow",
    "red",
    "yellow",
]);
// Make Class => Bank Account Class 
class bankAccount {
    accountNumber;
    balance;
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    // Debit Money
    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(chalk.bgRed.bold.italic(`\nWithdrawal of $${amount} successful.Remaining balance is $${this.balance}\n`));
        }
        else {
            console.log(chalk.bgYellow.bold.italic("\nInsufficient Balance.\n"));
        }
    }
    // Credit Money
    deposit(amount) {
        if (amount > 100) {
            amount -= 1;
            this.balance += amount; // $1 fee Dollar charged if more than $100 is Deposited.
            console.log(chalk.bgGray.bold.italic(`\nDeposit of $${amount} successfully.Now Your Balance is $${this.balance}\n`));
        }
    }
    // Check Balance
    checkbalance() {
        console.log(chalk.magenta.bold.italic(`\nCurrent Balance: $${this.balance}\n`));
    }
}
// Customer Class
class Customer {
    firstName;
    lastName;
    gender;
    age;
    mobileNumber;
    Account;
    constructor(firstName, lastName, gender, age, mobileNumber, Account) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.Account = Account;
    }
}
// Create Bank Account
const Account = [
    new bankAccount(1001, 100000),
    new bankAccount(1002, 200000),
    new bankAccount(1003, 300000)
];
// Create Customer
const customer = [
    new Customer("Rizwan", "Muhummad Ibrahim", "Male", 47, 3140254545, Account[0]),
    new Customer("Mahab", "Muhummad Rizwan", "female", 20, 3123541988, Account[1]),
    new Customer("Ahmed", "Muhummad Rizwan", "Male", 17, 3140234801, Account[2])
];
// Function to interact Bank Account
async function service() {
    do {
        const AccountNumberInput = await inquirer.prompt({
            name: "AccountNumber",
            type: "number",
            message: chalk.bold.italic.blue("Enter Your Account Number:")
        });
        // Checking
        const customers = customer.find(customer => customer.Account.accountNumber === AccountNumberInput.AccountNumber);
        if (customers) {
            console.log(chalk.red.bold.italic(`\nWelcome, ${customers.firstName} ${customers.lastName}!\n`));
            let ans = await inquirer.prompt([{
                    name: "select",
                    type: "list",
                    message: "Select an operation?",
                    choices: ["Deposit", "Withdraw", "Check Balance", "Exit"]
                }]);
            // Use switch case for Deposit
            switch (ans.select) {
                case "Deposit":
                    const DepositAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: chalk.bold.italic.blue("Enter the amount to deposit:")
                    });
                    customers.Account.deposit(DepositAmount.amount);
                    break;
            }
            // Use Switch case for Withdraw
            switch (ans.select) {
                case "Withdraw":
                    const WithdrawAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: chalk.bold.italic.blue("Enter the amount to Withdraw:")
                    });
                    customers.Account.withdraw(WithdrawAmount.amount);
                    break;
                // Use Case for Check Balance
                case "Check Balance":
                    customers.Account.checkbalance();
                    break;
                // Use Case for Exit
                case "Exit":
                    console.log(gradientText("\nExiting Bank Program...."));
                    console.log(gradientText("\n**************************Thank you for using our bank service.Have a Great Day!**************************"));
                    return;
            }
        }
        else {
            console.log(chalk.red.bold.italic("Invalid Account Number.Please Try Again."));
        }
    } while (true);
}
service();
