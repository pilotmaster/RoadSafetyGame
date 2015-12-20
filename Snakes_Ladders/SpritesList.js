// Declare a list of sprite variables
var

//** INGAME DATA**//
// The board sprite 
spriteBoard,
// Invisible button for rolling the dice
rollDiceButton,
// array of the different dice images
spriteDice = new Array(6),
spritePieces = new Array(10),

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


// Function to load the initial main menu sprites
function LoadMenuSprites()
{
	// Splash Title
	var titleImage = new Image();
	titleImage.src = "res/SnakesTitle.jpg";
	title = new CSprite(titleImage, 0, 0, 1000, 167, 500, 5);
	
	// Load the sprite sheet image
	var sheetImage = new Image();
	sheetImage.src = "res/SpriteSheet.png";
	
	// Play button for main menu
	playButton = new CSprite(sheetImage, 840, 849, 525, 234, 700, 450);
	
	// Button Image
	var buttonImage = new Image();
	buttonImage.src = "";
	rollDiceButton = new CSprite(buttonImage, 0, 0, 221, 214, 5, 5);
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
	}
	
	// Load the sprite sheet image
	var sheetImage = new Image();
	sheetImage.src = "res/SpriteSheet.png";
	
	// These sprites will be created regardless of which board is chosen
	// Dice sprites - 6 sides, so 6 individual sprites
	spriteDice[0] = new CSprite(sheetImage, 11, 234, 221, 214, 5, 5);
	spriteDice[2] = new CSprite(sheetImage, 236, 234, 221, 214, 5, 5);
	spriteDice[5] = new CSprite(sheetImage, 461, 13, 221, 214, 5, 5);
	spriteDice[1] = new CSprite(sheetImage, 461, 234, 221, 214, 5, 5);
	spriteDice[3] = new CSprite(sheetImage, 235, 13, 221, 214, 5, 5);
	spriteDice[4] = new CSprite(sheetImage, 8, 13, 221, 214, 5, 5);
	
	// Player sprites
	spritePieces[0] = new CSprite(sheetImage, 708, 16, 69, 54, 5, 300);
	spritePieces[1] = new CSprite(sheetImage, 795, 16, 69, 54, 5, 380);
	spritePieces[2] = new CSprite(sheetImage, 882, 16, 69, 54, 5, 460);
	spritePieces[3] = new CSprite(sheetImage, 969, 16, 69, 54, 5, 520);
	spritePieces[4] = new CSprite(sheetImage, 1056, 16, 69, 54, 5, 600);
	spritePieces[5] = new CSprite(sheetImage, 708, 73, 69, 54, 5, 680);
	spritePieces[6] = new CSprite(sheetImage, 795, 73, 69, 54, 5, 760);
	spritePieces[7] = new CSprite(sheetImage, 882, 73, 69, 54, 5, 840);
	spritePieces[8] = new CSprite(sheetImage, 969, 73, 69, 54, 5, 920);
	spritePieces[9] = new CSprite(sheetImage, 1056, 73, 69, 54, 5, 1000);
}
