// Declare a list of sprite variables
var
spriteBoard,
spriteButton;



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
}
