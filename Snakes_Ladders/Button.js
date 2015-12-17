var 
mouseX,
mouseY,
diceNum = 3,

EbuttonType =
{
	RollDice: 0, Gay: 1, Gayyer: 2, Gayyyer: 3
};

function Button(sprite, buttonType)
{
	this.mButtonType = buttonType;
	this.mSprite = sprite;
	this.BeenClicked = function()
	{
		var width  = this.mSprite.mWidth;
		var height = this.mSprite.mHeight;
		
		if(mouseX > this.mSprite.mDrawPosX && mouseX < this.mSprite.mDrawPosX + width
		   && mouseY > this.mSprite.mDrawPosY && mouseY < this.mSprite.mDrawPosY + height)
		   {
			   if(this.mButtonType == EbuttonType.RollDice)
			   {
				   diceNum = Math.floor((Math.random() * 6));
			   }
		   }
	}
}