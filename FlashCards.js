// require Node built in fs library package for filesystem access
var fs = require("fs");
// requiring the collection of common interactive command line user interfaces
var inquirer = require("inquirer");
// requiring the cardLibrary JSON file
var library = require("./cardLibrary.json");
// requiring the BasicCard module exported from BasicCard.js
var BasicCard = require("./BasicCard.js")
// requiring the ClozeCard module exported from ClozeCard.js
var ClozeCard = require("./ClozeCard.js")
// npm install colors to style some of the text
var colors = require('colors');


var count = 0;
var drawnCard;
var usedCard;


//initially give option to the user to start, show all cards or exit the app.
function openMenu() {
  //use inquirer to ask question	
  inquirer.prompt([															
      {		//type list gives user a list of options
          type: "list",
          //message shown to the user														
          message: "\nPlease choose a menu option from the list below?",	
          //options that show in list
          choices: ["Start", "Show All", "Exit"],
          //refrence name of object	
          name: "menuOptions"												
      }
      //Once inquirer gets answer then...
  ]).then(function (answer) {												
    var waitMsg;
    //use the switch method to go over the user list selection and excute the chosen function.
    switch (answer.menuOptions) {


        case 'Start':
            console.log("OK lets run through the deck...");
            waitMsg = setTimeout(askQuestions, 1000);
            break;

        case 'Show All':
            console.log("OK I'll print all cards in the deck to your screen...");
            waitMsg = setTimeout(showCards, 1000);
            break;

        case 'Exit':
            console.log("Thank you for using the Flashcard-Generator")
            return;
            break;

        default:
            console.log("");
            console.log("Sorry I don't understand");
            console.log("");
    }

  });

}

openMenu();



//function used to get the question from the drawnCard in the askQuestions function
function getQuestion(card) {
	//If the cards type is "BasicCard" then....
    if (card.type === "BasicCard") {
    	//drawnCard becomes a new instance of BasicCard constuctor with its front and back passed in						
        drawnCard = new BasicCard(card.front, card.back);
        //Return the front of the card (the questions side)	
        return drawnCard.front;	
        //If the card type is "Cloze Card" then...							
    } else if (card.type === "ClozeCard") {	
    	//drawnCard becomes a new instance of ClozeCard constuctor with its text and cloze passed in				
        drawnCard = new ClozeCard(card.text, card.cloze)
        //Return the ClozeCard prototpe method clozeRemoved to show the question missing the cloze	
        return drawnCard.clozeRemoved();					
    }
};

//function to ask questions from all stored card in the library
function askQuestions() {
	//if current count (starts at 0) is less than the number of cards in the library....
    if (count < library.length) {
    	//usedCard stores the question from the card with index equal to the current counter.					
        usedCard = getQuestion(library[count]);	
        //inquirer used to ask the question from the usedCard.
        inquirer.prompt([							
            {
                type: "input",
                message: usedCard,
                name: "question"
            }
        ]).then(function (answer) {					//once the user answers
        	//if the users answer equals .back or .cloze of the usedCard run a message "You are correct."
            if (answer.question === library[count].back || answer.question === library[count].cloze) {
                console.log(colors.green("You are correct."));
            } else {
            	
            	//if card has a front then it is a Basic card
                if (drawnCard.front !== undefined) { 
                	//grabs & shows correct answer
                    console.log(colors.red("Sorry, the correct answer was ") + library[count].back + "."); 
                   // otherwise it is a Cloze card 
                } else { 
                	//grabs & shows correct answer
                    console.log(colors.red("Sorry, the correct answer was ") + library[count].cloze + ".");
                }
            }
            //increase the counter for the next run through
            count++; 	
            //recursion. call the function within the function to keep it running. It will stop when counter=library.length	
            askQuestions(); 
        });
    } else {
    	//reset counter to 0 once loop ends
      	count=0;
      	//call the menu for the user to continue using the app			
      	openMenu();			
    }
};



//function to print all cards on screen for user to read through
function showCards () {

  var library = require("./cardLibrary.json");
  //if counter stays below the length of the library array
  if (count < library.length) {                     
    
    //if card has a front then it is a Basic card
    if (library[count].front !== undefined) { 
        console.log("");
        console.log(colors.yellow("++++++++++++++++++ Basic Card ++++++++++++++++++"));
        console.log(colors.yellow("++++++++++++++++++++++++++++++++++++++++++++++++"));
        //grabs & shows card question
        console.log("Front: " + library[count].front); 
        console.log("------------------------------------------------");
        //grabs & shows card question
        console.log("Back: " + library[count].back + "."); 
        console.log(colors.yellow("++++++++++++++++++++++++++++++++++++++++++++++++"));
        console.log("");

      // otherwise it is a Cloze card
    } else { 
        console.log("");
        console.log(colors.yellow("++++++++++++++++++ Cloze Card ++++++++++++++++++"));
        console.log(colors.yellow("++++++++++++++++++++++++++++++++++++++++++++++++"));
        //grabs & shows card question
        console.log("Text: " + library[count].text); 
        console.log("------------------------------------------------");
        //grabs & shows card question
        console.log("Cloze: " + library[count].cloze + "."); 
        console.log(colors.yellow("++++++++++++++++++++++++++++++++++++++++++++++++"));
        console.log("");
    }
    //increase the counter each round
    count++;
    //re-call the function with in itself. recursion.		
    showCards();	
  } else {
  	//reset counter to 0 once loop ends
    count=0;
    //call the menu for the user to continue using the app		
    openMenu();		
  }
}
