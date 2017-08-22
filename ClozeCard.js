// Constructor function for the 'Cloze Card' that accept two arguments: text and cloze.
function ClozeCard(text, cloze) {
	//the text property that contains the text on the the card. 
    this.text = text.split(cloze);
    //the cloze property that that contains only the cloze-deleted portion of the text. 
    this.cloze = cloze;

};

// Constructor that creates a prototype of ClozeCard to return the question missing cloze
function ClozeCardPrototype() {

    this.clozeRemoved = function () {
    	//Template literal enclosed by the back-tick ` allows embedded expressions wrapped with ${}
        return `${this.text[0]} ... ${this.text[1]}`;  
    };											
};

ClozeCard.prototype = new ClozeCardPrototype();

module.exports = ClozeCard; 