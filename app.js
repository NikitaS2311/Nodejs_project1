// Importing readline module to handle user input from the command line
import readline from 'readline';

// Creating an interface to read from standard input and write to standard output
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// This array will store all the todo items
const todos = [];

// Function to display the menu options to the user
const showMenu = () => {
    console.log("\n1. Add Todo");         // Option to add a new todo
    console.log("2. View Todos");         // Option to view all todos
    console.log("3. Delete Todo");        // Option to delete a specific todo
    console.log("4. Exit");               // Option to exit the application
    rl.question("Choose an option: ", handleInput); // Ask user to choose an option
};

// Function to handle user input and perform the chosen operation
const handleInput = (option) => {
    switch (option) {
        // If user selects '1' - Add a new todo
        case '1':
            rl.question("Enter todo: ", (todo) => {
                todos.push(todo);  // Add the input todo to the array
                console.log(`Todo added: ${todo}`); // Confirm addition
                showMenu(); // Show the menu again
            });
            break;

        // If user selects '2' - View all todos
        case '2':
            console.log("Todos:");
            todos.forEach((todo, index) => {
                console.log(`${index + 1}. ${todo}`); // Print each todo with its number and our number starts from 1
            });
            showMenu(); // Show the menu again
            break;

        // If user selects '3' - Delete a todo
        case '3':
            rl.question("Enter the index of the todo to delete: ", (index) => {
                const todoIndex = parseInt(index) - 1; // Convert to number and adjust to 0-based index
                if (todoIndex >= 0 && todoIndex < todos.length) {
                    const deletedTodo = todos.splice(todoIndex, 1); // Remove the selected todo
                    console.log(`Todo deleted: ${deletedTodo}`); // Confirm deletion
                } else {
                    console.log("Invalid index"); // Show error if index is out of range
                }
                showMenu(); // Show the menu again
            });
            break;

        // If user selects '4' - Exit the app
        case '4':
            console.log("Exiting...");
            rl.close(); // Close the readline interface and end the program
            break;

        // If user enters an invalid option
        default:
            console.log("Invalid option. Try again.");
            showMenu(); // Show the menu again
    }
};

// Start the application by showing the menu
showMenu();
