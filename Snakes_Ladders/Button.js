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
		
		var maxWidth = parseInt(this.mSprite.mDrawPosX) + parseInt(width);
		var maxHeight = parseInt(this.mSprite.mDrawPosY) + parseInt(height);
		
		if(mouseX > this.mSprite.mDrawPosX && mouseX < maxWidth
		   && mouseY > this.mSprite.mDrawPosY && mouseY < maxHeight)
		   {
			   alert("X Min: " + this.mSprite.mDrawPosX + "  X Max: " + maxWidth + 
			   "\nY Min: " + this.mSprite.mDrawPosY + "  Y Max: " + maxHeight +
			   "\nWidth: " + width + "  Height: " + height +
			   "\nMouse X: " + mouseX + "  Mouse Y: " + mouseY);
			   
			   if(this.mButtonType == EbuttonType.RollDice)
			   {
				   diceNum = Math.floor((Math.random() * 6));
			   }
		   }
	}
}