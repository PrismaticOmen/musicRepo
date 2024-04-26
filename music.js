var slider = document.getElementById("range");
var printedValue = document.getElementById("value");
printedValue.innerHTML = slider.value;

slider.onInput = function()
{
	printedValue.innerHTML = this.value;
}
