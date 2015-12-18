// Declare the variables required by this section of code
var 
// The mouse's position on screen - updated each frame
mouseX,
mouseY,

// When the dice is rolled, this value will change
diceNum = 0,

// Enumeration of button types
EbuttonType =
{
	RollDice: 0, PlayerPiece: 1, StartGame: 2, Gayyyer: 3
};

// Button class - handles the interaction of button objects
function Button(sprite, buttonType)
{
	// Type of button
	this.mButtonType = buttonType;
	// The sprite that will be used for the button
	this.mSprite = sprite;
	
	// Function to handle what occurs when this button is clicked
	this.BeenClicked = function()
	{
		var width  = this.mSprite.mWidth;
		var height = this.mSprite.mHeight;
		
		var maxWidth = parseInt(this.mSprite.mDrawPosX) + parseInt(width);
		var maxHeight = parseInt(this.mSprite.mDrawPosY) + parseInt(height);
		
		if(mouseX > this.mSprite.mDrawPosX && mouseX < maxWidth
		   && mouseY > this.mSprite.mDrawPosY && mouseY < maxHeight)
		   {   
				
			   if(this.mButtonType == EbuttonType.StartGame)
			   {
				   curState = EStates.GAME;
			   }
			   
			   if(this.mButtonType == EbuttonType.RollDice)
			   {
				   diceNum = Math.floor((Math.random() * 6));
			   }
			   
			   if(this.mButtonType == EbuttonType.PlayerPiece)
			   {
				   
			   }
		   }
	}
}