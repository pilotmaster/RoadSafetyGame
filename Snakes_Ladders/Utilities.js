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
	RollDice: 0, StartGame: 2, PlayerSelection: 3, RemoveMessageBox: 4
};

// Enumeration of all the colours of the pieces
var EPieceColours = 
{
	RED: 0, ORANGE: 1, LILAC: 2, CYAN: 3, PURPLE: 4,
	BLUE: 5, GREEN: 6, YELLOW: 7, BLACK: 8, WHITE: 9
};


// Button class - handles the interaction of button objects
function Button(sprite, buttonType, selectedPlayerNumber)
{
	// Type of button
	this.mButtonType = buttonType;
	// The sprite that will be used for the button
	this.mSprite = sprite;
	this.mPlayersNumber = selectedPlayerNumber;
	
	// Function to handle what occurs when this button is clicked
	this.BeenClicked = function()
	{
		var posX = this.mSprite.mDrawPosX * scale;
		var posY = this.mSprite.mDrawPosY * scale;
		var width = this.mSprite.mWidth * scale;
		var height = this.mSprite.mHeight * scale;
		
		var maxWidth = parseInt(posX) + parseInt(width);
		var maxHeight = parseInt(posY) + parseInt(height);
		
		if(mouseX > posX && mouseX < maxWidth && mouseY > posY && mouseY < maxHeight)
		{   
			if (this.mButtonType == EbuttonType.StartGame)
			{
				MenuClick.play();
				if(curState == EStates.SPLASH)
				{
					// Call the initialise game function
					InitialiseGame();
				}
			}
			   
			if (this.mButtonType == EbuttonType.RollDice)
			{
				// Only execute this part if the game is in the WAITING phase
				if (curTurnPhase == ETurnPhase.WAITING && curState == EStates.GAME)
				{	
					diceRoll.play();
					// Set the phase to be rolling the dice
					curTurnPhase = ETurnPhase.ROLLING_DICE;				   
					// Determine how many jumps the dice does before settling on a number
					diceRolls = Math.floor((Math.random() * 15)) + 5;
				}
			}
			
			if (this.mButtonType == EbuttonType.PlayerSelection)
			{			
				if (curState == EStates.SPLASH)
				{
					MenuClick.play();
					numPlayers = this.mPlayersNumber;
				}			
			}
			
			if (this.mButtonType == EbuttonType.RemoveMessageBox)
			{
				MenuClick.play();
				// Determine the state of the game
					if(curTurnPhase == ETurnPhase.READ_MESSAGE)
					{
						// Set message box title to be nothing
						messageBoxTitle.textContent = "";
						messageBoxMessage.textContent = "";
						messageBoxTitle.style.borderWidth = "0px";
						messageBoxMessage.style.borderWidth = "0px";
							
						// Any key press will close the message box - simply make the state to be moving
						curTurnPhase = ETurnPhase.MOVING;					
					}
					
					
					if(curState == EStates.WINNER)
					{
						// Set message box title to be nothing
						messageBoxTitle.textContent = "";
						messageBoxMessage.textContent = "";
						messageBoxTitle.style.borderWidth = "0px";
						messageBoxMessage.style.borderWidth = "0px";

						curState =	EStates.SPLASH;	
						curTurnPhase = ETurnPhase.WAITING;						
					}
							
			}
			
		}
	}
}


// Piece class - contains a sprite object, and an enum stating which type it is. Also contains a state for whether or not it has already been chosen
function CPiece(sprite, glow)
{
	this.mSprite = sprite;
	this.mGlow = glow;
	this.mBeenChosen = false;
	
	// Function to draw a glow behind a piece
	this.DrawGlow = function()
	{
		// Update position of glow
		this.mGlow.SetDrawPositionWithOffset(this.mSprite.CenterDrawPosX(), this.mSprite.CenterDrawPosY())
		
		// Draw the glow
		this.mGlow.Draw(context, this.mGlow.mWidth, this.mGlow.mHeight);
	}
	
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
	this.mPlayerGridPos = 0;
	this.mTargetPos = 0;
	this.mLerpSpeed = 0.00005;
	this.mLerpTime = 0;
	
	// Move function for the player object
	this.Move = function()
	{
		// Increment the lerp time
		this.mLerpTime += frameTime * this.mLerpSpeed;
		
		// Lerp to the next position with both X and Y co-ordinates
		this.mPiece.mSprite.mDrawPosX = LerpToVal(this.mPiece.mSprite.mDrawPosX, boardArray.mBoardArray[this.mTargetPos].mPosX, frameTime * this.mLerpTime);
		this.mPiece.mSprite.mDrawPosY = LerpToVal(this.mPiece.mSprite.mDrawPosY, boardArray.mBoardArray[this.mTargetPos].mPosY, frameTime * this.mLerpTime);
		
		// Check if the player has reached their destination
		if (this.mPiece.mSprite.mDrawPosX == boardArray.mBoardArray[this.mTargetPos].mPosX && this.mPiece.mSprite.mDrawPosY == boardArray.mBoardArray[this.mTargetPos].mPosY)
		{
			amountToMove = amountToMove - 1;
			this.mPlayerGridPos = this.mTargetPos;
			this.mTargetPos++;
			this.mLerpTime = 0;			
		}	
		
		if(this.mPlayerGridPos == 99)
		{
				curState = EStates.WINNER;
				amountToMove = 0;
				return;
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
	this.mHasAlternateDestination = false;
	this.mAltDestinationIndex;
	this.mMessage;
	
	// Function to set an alternate destination along with message
	this.SetAltDestination = function(altIndex, message)
	{
		this.mHasAlternateDestination = true;
		this.mAltDestinationIndex = altIndex;
		this.mMessage = message;
	}
}

function CBoardRoadSafety(board)
{
	this.mBoard = board;
	this.mBoardArray = new Array(100);
	this.mDimentionX = 72;
	this.mDimentionY = 71.5;
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
			var tileMonitarX = parseInt(this.mTileIncrementX) * parseInt(this.mDimentionX);
			var tileMonitarY = parseInt(this.mTileIncrementY) * parseInt(this.mDimentionY);
			
			// create a tile on the board and insert it into an array (positions are realtive to the board sprite)
			this.mBoardArray[i] = new CBoardTile(parseInt(this.mBoard.mDrawPosX) + 114 + parseInt(tileMonitarX), parseInt(this.mBoard.mDrawPosY) + 767 - parseInt(tileMonitarY));
			
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
		
		// Insert whether a tile moves to another tile
		this.mBoardArray[0].SetAltDestination(21, "You held hands as you walked along");
		this.mBoardArray[6].SetAltDestination(25, "You kept looking and listening as you crossed the road");
		this.mBoardArray[8].SetAltDestination(10, "You put your ball in a bag to carry to the park");
		this.mBoardArray[20].SetAltDestination(15, "You played with a ball on the pavement!");
		this.mBoardArray[30].SetAltDestination(51, "You crossed the road at the zebra crossing");
		this.mBoardArray[35].SetAltDestination(2, "You did not look and listen for traffic!");
		this.mBoardArray[37].SetAltDestination(61, "You kept holding hands as you looked in the shop window");
		this.mBoardArray[46].SetAltDestination(88, "You waited until you saw the green man showing on the pelican crossing");
		this.mBoardArray[52].SetAltDestination(29, "You did not hold hands as you crossed the road!");
		this.mBoardArray[54].SetAltDestination(24, "You nearly crossed the road when the red man was showing on the pelican!");
		this.mBoardArray[55].SetAltDestination(63, "You hold hands as you crossed the road");
		this.mBoardArray[57].SetAltDestination(12, "You ran along the pavement near the kerb!");
		this.mBoardArray[79].SetAltDestination(98, "You rode your bike on the cycle path");
		this.mBoardArray[82].SetAltDestination(38, "You set off to get your ball when it rolled in the road!");
		this.mBoardArray[85].SetAltDestination(93, "You kept well away from the kerb when walking");
		this.mBoardArray[87].SetAltDestination(65, "You started to cross the road when the green man was flashing at the pelican!");
		this.mBoardArray[90].SetAltDestination(68, "You and your friend pushed each other near the road!");
		this.mBoardArray[96].SetAltDestination(66, "You started to cross the road before you made sure the traffic had stopped!");
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
	for (i = 0; i < numPlayers; i++)
	{
		playersList[i] = new CPlayer(piecesList[i]);
	}
	
	// Set the current player
	curPlayer = 0;
}


// Function to initialise the pieces used
function InitialisePieces()
{
	// Go through and create each piece object
	for (i = 0; i < 10; i++)
	{
		piecesList[i] = new CPiece(spritePieces[i], spriteGlows[i]);
	}
}


// Lerping function
function LerpToVal(startVal, endVal, time)
{
	// Check if time is less than 0 or greater than 1
	time = time < 0 ? 0 : time;
	time = time > 1 ? 1 : time;
	// Return the lerp value
	var newVal = parseInt(startVal) + parseInt((endVal - startVal)) * time;
	
	// Check if the new value is 'close enough'
	var dist = Math.abs(endVal - newVal);
	if (dist <= 5)
	{
		return endVal;
	}
	else
	{
		return newVal;
	}
}
