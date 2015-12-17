// Declare a list of sprite variables
var

//** INGAME DATA**//
// The board sprite 
spriteBoard,
// invis button for rolling the dice
rollDiceButton,
// array of the diffrent dice images
spriteDice = new Array(6),

//** MAIN MENU DATA **//
title,
playButton;

// Declare the Sprite class
function CSprite(image, posX, posY, width, height, drawPosX, drawPosY)
{
	// Attributes
	this.mImage = image;
	this.mPosX = posX;
	this.mPosY = posY;
	this.mWidth = width;
	this.mHeight = height;
	this.mDrawPosX = drawPosX;
	this.mDrawPosY = drawPosY;
	
	// Methods
	this.Draw = function(context)
	{
		// Draw the sprite at the provided location using the saved data
		context.drawImage(this.mImage, this.mPosX, this.mPosY, this.mWidth, this.mHeight, this.mDrawPosX, this.mDrawPosY, this.mWidth, this.mHeight);
	}
}


// Function to initialise all the sprites
function LoadSprites(board)
{
	// There are two boards available: Road Safety and Sustainable Development
	// Determine which one has been chosen
	if (board == "RS")
	{
		// Board Image
		var boardImage = new Image();
		boardImage.src = "res/RoadSafetyBoard.png";
		spriteBoard = new CSprite(boardImage, 0, 0, 946, 946, 400, 0);
		
		// Button Image
		var buttonImage = new Image();
		buttonImage.src = "";
		rollDiceButton = new CSprite(buttonImage, 0, 0, 177, 167, 5, 5);
		
		// Splash Title
		var titleImage = new Image();
		titleImage.src = "res/SnakesTitle.jpg";
		title = new CSprite(titleImage, 0, 0, 1000, 167, 500, 5);
		
		var playButtonImage = new Image();
		playButtonImage.src = "res/Play.png";
		playButton = new CSprite(playButtonImage, 0, 0, 1000, 137, 700, 450);
				
		//alert(spriteBoard.mWidth + " " + spriteBoard.mHeight);
	}
	
	// Load the sprite sheet image
	var sheetImage = new Image();
	sheetImage.src = "res/SpriteSheet.png";
	
	// These sprites will be created regardless of which board is chosen
	// Dice sprites - 6 sides, so 6 individual sprites
	spriteDice[0] = new CSprite(sheetImage, 7, 5, 177, 167, 5, 5);
	spriteDice[2] = new CSprite(sheetImage, 246, 5, 177, 167, 5, 5);
	spriteDice[5] = new CSprite(sheetImage, 486, 5, 177, 167, 5, 5);
	spriteDice[1] = new CSprite(sheetImage, 7, 229, 177, 167, 5, 5);
	spriteDice[3] = new CSprite(sheetImage, 246, 229, 177, 167, 5, 5);
	spriteDice[4] = new CSprite(sheetImage, 486, 229, 177, 167, 5, 5);
	
	
	// Player sprites
	playerPieces[0] = new CSprite(sheetImage, 690, 3, 177, 95, 5, 300);
	
}
