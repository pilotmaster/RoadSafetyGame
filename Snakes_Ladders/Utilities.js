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
	this.mTargetGridPos = 0;
	this.mPlayerGridPos;
	
	// Move function for the player object
	this.Move = function()
	{
		if (this.mPiece.mSprite.mDrawPosX != boardArray.mBoardArray[this.mTargetGridPos].mPosX)
		{
			if (this.mPiece.mSprite.mDrawPosX < boardArray.mBoardArray[this.mTargetGridPos].mPosX)
			{
				this.mPiece.mSprite.mDrawPosX += 1;
			}
			else
			{
				this.mPiece.mSprite.mDrawPosX -= 1;
			}
		}
		if (this.mPiece.mSprite.mDrawPosY != boardArray.mBoardArray[this.mTargetGridPos].mPosY)
		{
			if (this.mPiece.mSprite.mDrawPosY < boardArray.mBoardArray[this.mTargetGridPos].mPosY)
			{
				this.mPiece.mSprite.mDrawPosY += 1;
			}
			else
			{
				this.mPiece.mSprite.mDrawPosY -= 1;
			}				
		}		
		if (this.mPiece.mSprite.mDrawPosX == boardArray.mBoardArray[this.mTargetGridPos].mPosX && this.mPiece.mSprite.mDrawPosY == boardArray.mBoardArray[this.mTargetGridPos].mPosY)
		{
			amountToMove = amountToMove - 1;
			this.mTargetGridPos++;
			this.mPlayerGridPos = parseInt(this.mTargetGridPos - 1);
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
	this.mReversingBoard = false;
	
	this.mFillArray = function()
	{
		// Count though the array tiles for the board
		for(var i = 0; i < 100; i++)
		{		
			// If the tile's x is == to the 10th tile
			if(this.mTileIncrementX == 10)
			{
				// decrease it to 9 so it doesnt go off the board
				this.mTileIncrementX = 9;
				// increase the Y by 1 as it goes up to the next row
				this.mTileIncrementY++;
				// activate reversal of array from right to left
				this.mReversingBoard = true;
			}
			// if the tile's x = to -1 and the tile is in the reversed row
			if(this.mTileIncrementX == -1 && this.mReversingBoard == true)
			{
				// increase the titl's x to stop from going of the edge of the board
				this.mTileIncrementX++
				// set the reversal bool back to going in the correct direction
				this.mReversingBoard = false;
				// go up on the y to the next row
				this.mTileIncrementY++;
			}
				
			// used to get the top left of the tiles incrementally 
			var tileMonitarX = parseInt(this.mTileIncrementX) * parseInt(this.mDimentions);
			var tileMonitarY = parseInt(this.mTileIncrementY) * parseInt(this.mDimentions);
			
			// create a tile on the board and insert it into an array (positions are realtive to the board sprite)
			this.mBoardArray[i] = new CBoardTile(parseInt(this.mBoard.mDrawPosX) + 115 + parseInt(tileMonitarX), parseInt(this.mBoard.mDrawPosY) + 760 - parseInt(tileMonitarY));
			
			// if the row on is not a reversed row then increment from left to right
			if(this.mReversingBoard == false)
			{
				this.mTileIncrementX++;
			}
			else
			{
				// else increment from right to left
				this.mTileIncrementX--;
			}
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


// Lerping function
function LerpToVal(startVal, endVal, time)
{
	// Check if time is less than 0 or greater than 1
	time = time < 0 ? 0 : time;
	time = time > 1 ? 1 : time;
	// Return the lerp value
	return parseInt(startVal) + parseInt((endVal - startVal)) * time;
}
