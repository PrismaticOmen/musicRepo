let inputMap = [];

function init()
{
	var userInput = document.getElementById("chordInput").toString();
	const userInputKeys = userInput.split(' ');
	for (let i = 0; i < userInputKeys.length; i++)
	{
		inputMap.push(userInputKeys[i]);
	}
	
	inputMap.push("chord progression");
}