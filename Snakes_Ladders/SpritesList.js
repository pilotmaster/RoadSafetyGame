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
spriteGlows = new Array(10),
spriteNumPlayersGlow,
spriteMessageBox,
spriteMessageBoxButton,

spriteMute,
spriteUnMute,

//** MAIN MENU DATA **//
title,
playButton,
playersSelectionSprite = new Array(6);


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
		context.drawImage(this.mImage, this.mPosX, this.mPosY, this.mWidth, this.mHeight, this.mDrawPosX * scale, this.mDrawPosY * scale, this.mWidth * scale, this.mHeight * scale);
	}
	
	this.SetDrawPositionWithOffset = function(drawPosX, drawPosY)
	{
		this.mDrawPosX = drawPosX - (this.mWidth / 2);
		this.mDrawPosY = drawPosY - (this.mHeight / 2);
	}
	
	this.CenterDrawPosX = function()
	{
		var val = parseInt(this.mDrawPosX) + parseInt((this.mWidth / 2));
		return val;
	}
	
	this.CenterDrawPosY = function()
	{
		var val = parseInt(this.mDrawPosY) + parseInt((this.mHeight / 2));
		return val;
	}
}

// Function to load the initial main menu sprites
function LoadMenuSprites()
{
	// Load the sprite sheet image
	var sheetImage = new Image();
	sheetImage.src = "res/SpriteSheet.png";
	
	// Load the main menu title
	title = new CSprite(sheetImage, 627, 1110, 836, 583, 500, 30);
	
	// Play button for main menu
	playButton = new CSprite(sheetImage, 840, 849, 525, 234, 620, 650);
	
	// Button Image
	rollDiceButton = new CSprite(sheetImage, 0, 464, 305, 287, 4, 4);
	
	// MessageBoxButton Sprite
	spriteMessageBoxButton = new CSprite(new Image() ,47, 1111, 277, 266, 1160, 630);
	
	// Player selection sprites
	playersSelectionSprite[0] = new CSprite(sheetImage, 1382, 853, 145, 224, 90, 340);
	playersSelectionSprite[1] = new CSprite(sheetImage, 42, 853, 145, 224, 390, 340);
	playersSelectionSprite[2] = new CSprite(sheetImage, 199, 853, 145, 224, 690, 340);
	playersSelectionSprite[3] = new CSprite(sheetImage, 366, 853, 145, 224, 990, 340);
	playersSelectionSprite[4] = new CSprite(sheetImage, 521, 853, 145, 224, 1290, 340);
	playersSelectionSprite[5] = new CSprite(sheetImage, 690, 853, 145, 224, 1590, 340);
	
	// Player selection glow sprite
	spriteNumPlayersGlow = new CSprite(sheetImage, 481, 460, 219, 300, 0, 0);
	
	// Load in the mute and unmute sprites
	spriteMute = new CSprite(sheetImage, 51, 1148, 141, 139, 1400, 5);
	spriteUnmute = new CSprite(sheetImage, 51, 1321, 141, 139, 1400, 5);
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
	
	// Set the dice position along with button
	for (i = 0; i < 6; i++)
	{
		spriteDice[i].SetDrawPositionWithOffset(150, 150);
	}
	rollDiceButton.SetDrawPositionWithOffset(150, 150);
	
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
	
	// Player glows
	spriteGlows[0] = new CSprite(sheetImage, 1131, 1, 82, 68, 5, 300);
	spriteGlows[1] = new CSprite(sheetImage, 1210, 1, 82, 68, 5, 300);
	spriteGlows[2] = new CSprite(sheetImage, 1292, 1, 82, 68, 5, 300);
	spriteGlows[3] = new CSprite(sheetImage, 1376, 1, 82, 68, 5, 300);
	spriteGlows[4] = new CSprite(sheetImage, 1460, 1, 82, 68, 5, 300);
	spriteGlows[5] = new CSprite(sheetImage, 1131, 72, 82, 68, 5, 300);
	spriteGlows[6] = new CSprite(sheetImage, 1210, 72, 82, 68, 5, 300);
	spriteGlows[7] = new CSprite(sheetImage, 1291, 72, 82, 68, 5, 300);
	spriteGlows[8] = new CSprite(sheetImage, 1376, 72, 82, 68, 5, 300);
	spriteGlows[9] = new CSprite(sheetImage, 1462, 72, 82, 68, 5, 300);
	
	// Position pieces and glows correctly
	for (i = 0; i < 10; i++)
	{
		spritePieces[i].SetDrawPositionWithOffset(50, 300 + (i * 80));
		spriteGlows[i].SetDrawPositionWithOffset(50, 300 + (i * 80));
	}
	
	// Message box sprite
	spriteMessageBox = new CSprite(sheetImage, 805, 188, 985, 645, 400, 200);
}
