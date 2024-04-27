window.onload = init;
let sliders;
let printedValues;
let xValues = [];
let yValues = [];
let musicGraph;
let audioContext;
var oscNode;
var gainNode;
let inputMap = [];
var userInputButton;

function init()
{
	//set up audio
	audioContext = new AudioContext();
	gainNode = audioContext.createGain();
	gainNode.connect(audioContext.destination);
	gainNode.gain.setValueAtTime(0, audioContext.currentTime);
	oscNode = audioContext.createOscillator();
	oscNode.type = "sine";
	oscNode.frequency = 440;
	oscNode.connect(gainNode);
	oscNode.start();
	
	
	//set up sliders
	sliders = document.getElementsByClassName("slider");
	printedValues = document.getElementsByClassName("sliderValue");
	console.log("init");
	for (let i = 0; i < sliders.length; i++)
	{
		updateSlider(i);
	}
	
	//set up graph
	updateData();
	musicGraph = new Chart("musicGraph", 
	{
		type: "line",
		data: 
		{
			labels: xValues,
			datasets: 
			[{
				fill: false,
				borderColor: "rgba(0, 154, 219, 1.0)",
				backgroundColor: "rgba(0, 0, 0, 0)",
				pointRadius: 1,
				data: yValues
			}]
		},
		options:
		{
			title: 
			{
				display: false,
			},
			legend:
			{
				display: false
			},
			responsive: true,
			maintainAspectRatio: false,
			backgroundColor: "rgba(0,0,0,0)",
			scales: 
			{
				xAxes:
				[{
					display: false,
					ticks: 
					{
						min: 0,
						max: 100,
						stepSize: 1
					}, 
					gridLines:
					{
						display: false,
						drawBorder: false
					}
				}],
				yAxes: 
				[{
					display: false,
					ticks: 
					{
						min: 0,
						max: 20000,
						stepSize: 1
					},
					gridLines:
					{
						display: false,
						drawBorder: false
					}
				}]
			}
		}
	})
	
	var userInputButton = document.getElementById("chordInput").addEventListener('keydown', updateUserInput(event));
}

//updates info on screen, and the chart on screen
function updateSlider(x)
{
	var slider = sliders[x];
	var printedValue = printedValues[x];
	printedValue.innerHTML = slider.value;
	updateData();
}

function updateData()
{
	var f = parseFloat(document.getElementById("frequency").value);
	var s = parseFloat(document.getElementById("speed").value);
	var a = parseFloat(document.getElementById("acceleration").value);
	for (let i = 0; i < 100; i++)
	{
		xValues[i] = (i);
		yValues[i] = f + parseFloat(s*i) + parseFloat((i**2) * a);
		
	}
	if (musicGraph != undefined)
	{
		musicGraph.update();
	}
	
	oscNode.frequency.value = f;

};

//plays the series of sounds based on user settings
function playSound()
{
	audioContext.resume();
	const timeDelay = 0.02;
	var speed = parseFloat(document.getElementById("speed").value);
	var accel = parseFloat(document.getElementById("acceleration").value);
	var timeInput = parseFloat(document.getElementById("time").value);
	var notes = parseInt(document.getElementById("notes").value);
	var totalTime = 0;
	const startingTime = audioContext.currentTime;
	if (notes > 1 && timeInput > 0)
	{
		var now = audioContext.currentTime;
		
		for (let i = 1; i < notes; i++)
		{
			const noteTime = roundToTwoDec((timeInput / notes / speed) * (accel / i));
			//console.log(noteTime);
			var newFrequency = getRandInt(4000);
			//console.log(newFrequency);
			oscNode.frequency.linearRampToValueAtTime(newFrequency, now + noteTime)
			
			totalTime += noteTime;
			now       += noteTime;

		}
		gainNode.gain.setTargetAtTime(1, startingTime, timeDelay);
		gainNode.gain.setTargetAtTime(0, startingTime + totalTime, timeDelay);
	}
}


function sleep(ms) 
{
  return new Promise(resolve => setTimeout(resolve, ms));
  console.log("sleep");
}

function getRandInt(max)
{
	return Math.floor(Math.random() * max);
}
	
	
function roundToTwoDec(number)
{
	return (Math.floor(number * 100)) / 100;
}

//takes in user input
function updateUserInput()
{
	var userInput = document.getElementById("chordInput").value.toString();
	console.log(userInput);
	const userInputKeys = userInput.split(' ');
	for (let i = 0; i < userInputKeys.length; i++)
	{
		inputMap.push(userInputKeys[i]);
	}
	
	inputMap.push("chord progression");
	document.getElementById("chordInput").value = "";
}
