var mouseX;
var mouseY;

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
		
		if(mouseX > width - width && mouseX < width 
		   mouseY > height - height && mouseY < height)
		   {
			   if(m_ButtonType == EbuttonType.RollDice)
			   {
				   
			   }
		   }
	}
	
	
	
}