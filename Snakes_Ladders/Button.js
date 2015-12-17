var mouseX;
var mouseY;
var diceNum = 3;

EbuttonType =
{
	RollDice: 0, Gay: 1, Gayyer: 2, Gayyyer: 3
},

function Button(sprite, buttonType)
{
	this.m_ButtonType = buttonType;
	this.m_Sprite = sprite;
	this.BeenClicked = function()
	{
		var width  = m_Sprite.width;
		var height = m_Sprite.height;
		
		if(mouseX > m_Sprite.mPosX && mouseX < m_Sprite.mPosX + width
		   && mouseY > m_Sprite.mPosY && mouseY < m_Sprite.mPosY + height)
		   {
			   if(m_ButtonType == EbuttonType.RollDice)
			   {
				   diceNum = Math.floor((Math.random() * 5) + 0);
			   }
		   }
	}
	
	
	
}