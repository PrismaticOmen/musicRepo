window.onload = init;

function init()
{
	var slider = document.getElementById("range");
	var printedValue = document.getElementById("sliderValue");
	printedValue.innerHTML = slider.value;
	
	slider.oninput = function()
	{
		printedValue.innerHTML = this.value;
	}
}
