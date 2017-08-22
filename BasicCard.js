// Constructor function for the 'Basic Card' that accept two arguments: front and back.
function BasicCard(front, back) {
	//the front property that contains the text on the front of the card. 
    this.front = front;
    //the back property that contains the text on the back of the card. 
    this.back = back;

};

//exporting the constructor for creating basic flashcards.
module.exports = BasicCard;