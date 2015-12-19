// Declare the variables required by this section of code
var 
// The mouse's position on screen - updated each frame
mouseX,
mouseY,

// When the dice is rolled, this value will change
diceNum = 0,

// Determines how many random values are shown on the dice before it settles
diceRolls = 0,
amountToMove = 0,

// List of pieces in the game
piecesList = new Array(10),

// Board array
boardArray,

// Enumeration of button types
EbuttonType =
{
	RollDice: 0, StartGame: 2
};

// Enumeration of all the colours of the pieces
var EPieceColours = 
{
	RED: 0, ORANGE: 1, LILAC: 2, CYAN: 3, PURPLE: 4,
	BLUE: 5, GREEN: 6, YELLOW: 7, BLACK: 8, WHITE: 9
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
		var width = this.mSprite.mWidth;
		var height = this.mSprite.mHeight;
		
		var maxWidth = parseInt(this.mSprite.mDrawPosX) + parseInt(width);
		var maxHeight = parseInt(this.mSprite.mDrawPosY) + parseInt(height);
		
		if(mouseX > this.mSprite.mDrawPosX && mouseX < maxWidth
		   && mouseY > this.mSprite.mDrawPosY && mouseY < maxHeight)
		{   
			if (this.mButtonType == EbuttonType.StartGame)
			{
				// Call the initialise game function
				InitialiseGame();
			}
			   
			if (this.mButtonType == EbuttonType.RollDice)
			{
				// Only execute this part if the game is in the WAITING phase
				if (curTurnPhase == ETurnPhase.WAITING && curState == EStates.GAME)
				{
					// Set the phase to be rolling the dice
					curTurnPhase = ETurnPhase.ROLLING_DICE;
					   
					// Determine how many jumps the dice does before settling on a number
					diceRolls = Math.floor((Math.random() * 15)) + 5;
				}
			}
		}
	}
}


// Piece class - contains a sprite object, and an enum stating which type it is. Also contains a state for whether or not it has already been chosen
function CPiece(sprite, colour)
{
	this.mSprite = sprite;
	this.mColour = colour;
	this.mBeenChosen = false;
	
	// Function to render this piece
	this.Render = function(context)
	{
		// Call the render function for the sprite
		this.mSprite.Draw(context, this.mSprite.mWidth, this.mSprite.mHeight);
	}
}


// Player class - stores piece the player has chosen, the grid position of the player, as well as other values
function CPlayer(piece)
{
	this.mPiece = piece;
	this.mGridPos = 0;
	
	// Move function for the player object
	this.Move = function()
	{
			if(this.mPiece.mSprite.mDrawPosX != boardArray.mBoardArray[this.mGridPos].mPosX)
			{
				if(this.mPiece.mSprite.mDrawPosX < boardArray.mBoardArray[this.mGridPos].mPosX)
				{
					this.mPiece.mSprite.mDrawPosX += 1;
				}
				else
				{
					this.mPiece.mSprite.mDrawPosX -= 1;
				}
			}
			if(this.mPiece.mSprite.mDrawPosY != boardArray.mBoardArray[this.mGridPos].mPosY)
			{
				if(this.mPiece.mSprite.mDrawPosY < boardArray.mBoardArray[this.mGridPos].mPosY)
				{
					this.mPiece.mSprite.mDrawPosY += 1;
				}
				else
				{
					this.mPiece.mSprite.mDrawPosY -= 1;
				}				
			}		
			if(this.mPiece.mSprite.mDrawPosX == boardArray.mBoardArray[this.mGridPos].mPosX && this.mPiece.mSprite.mDrawPosY == boardArray.mBoardArray[0].mPosY)
			{
				amountToMove = amountToMove - 1;
				this.mGridPos++;
			}		
	}
	
	// Function to render this player
	this.Render = function(context)
	{
		// Call the render function for the piece
		this.mPiece.Render(context);
	}
}

function CBoardTile(posX, posY)
{
	this.mPosX = posX;
	this.mPosY = posY;
}

function CBoardRoadSafety(board)
{
	this.mBoard = board;
	this.mBoardArray = new Array(100);
	this.mDimentions = 71;
	this.mTileIncrementX = 0;
	this.mTileIncrementY = 0;
	
	this.mFillArray = function()
	{
		for(var i = 0; i < 100; i++)
		{
			if(this.mTileIncrementX == 11)
			{
				this.mTileIncrementX = 0;
				this.mTileIncrementY++;
			}
			
			var tileMonitarX = parseInt(this.mTileIncrementX) * parseInt(this.mDimentions);
			var tileMonitarY = parseInt(this.mTileIncrementY) * parseInt(this.mDimentions);
			
			this.mBoardArray[i] = new CBoardTile(parseInt(this.mBoard.mDrawPosX) + 115 + parseInt(tileMonitarX), parseInt(this.mBoard.mDrawPosY) + 760 - parseInt(tileMonitarY));
			this.mTileIncrementX++;
		}
	}
}

// Function to initialise the game objects
function InitialiseGame()
{
	// Set the current state to be the game
	curState = EStates.GAME;
			
	// Load sprites takes either RS or SD depending on which board is being used
	LoadSprites("RS");
	
	boardArray = new CBoardRoadSafety(spriteBoard);
	boardArray.mFillArray();
	//alert(boardArray.mBoardArray[5].mPosY);
	
	// Initialise the pieces objects
	InitialisePieces();
	
	// Initialise the players
	playersList = new Array(numPlayers);
	playersList[0] = new CPlayer(piecesList[0]);
	playersList[1] = new CPlayer(piecesList[1]);
	playersList[2] = new CPlayer(piecesList[2]);
	playersList[3] = new CPlayer(piecesList[3]);
	playersList[4] = new CPlayer(piecesList[4]);
	playersList[5] = new CPlayer(piecesList[5]);
}


// Function to initialise the pieces used
function InitialisePieces()
{
	// Go through and create each piece object
	for (i = 0; i < 10; i++)
	{
		piecesList[i] = new CPiece(spritePieces[i], i);
	}
}
