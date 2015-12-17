// Declare a list of sprite variables
var
spriteBoard,
spriteButton,
spriteDice = new Array(6),
spritePlayers;



// Declare the Sprite class
function CSprite(image, posX, posY, width, height)
{
	// Attributes
	this.mImage = image;
	this.mPosX = posX;
	this.mPosY = posY;
	this.mWidth = width;
	this.mHeight = height;
	
	// Methods
	this.Draw = function(context, posX, posY)
	{
		// Draw the sprite at the provided location using the saved data
		context.drawImage(this.mImage, this.mPosX, this.mPosY, this.mWidth, this.mHeight, posX, posY, this.mWidth, this.mHeight);
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
		spriteBoard = new CSprite(boardImage, 0, 0, 946, 946);
		
		// Button Image
		var buttonImage = new Image();
		buttonImage.src = "res/duoarms.jpg";
		spriteButton = new CSprite(buttonImage, 0, 0, 424, 946);
		
			
		//alert(spriteBoard.mWidth + " " + spriteBoard.mHeight);
	}
	
	// Load the sprite sheet image
	var sheetImage = new Image();
	sheetImage.src = "res/SpriteSheet.png";
	
	// These sprites will be created regardless of which board is chosen
	// Dice sprites - 6 sides, so 6 individual sprites
	spriteDice[0] = new CSprite(sheetImage, 7, 5, 184, 172);
	spriteDice[1] = new CSprite(sheetImage, 246, 5, 424, 172);
	spriteDice[2] = new CSprite(sheetImage, 486, 5, 664, 172);
	spriteDice[3] = new CSprite(sheetImage, 7, 229, 184, 396);
	spriteDice[4] = new CSprite(sheetImage, 246, 229, 424, 396);
	spriteDice[5] = new CSprite(sheetImage, 486, 229, 664, 396);
	
	// Player sprites
	
}
