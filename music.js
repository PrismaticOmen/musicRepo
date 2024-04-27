window.onload = init;
let sliders;
let printedValues;
let xValues = [];
let yValues = [];
let musicGraph;
let audioContext;
var oscNode;
var gainNode;

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
	
	//set up play button
	var button = document.getElementById("playSoundButton").addEventListener("click", playSound());
}

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
	
	console.log(f);
	oscNode.frequency.value = f;

};

function playSound()
{
	audioContext.resume();
	const timeDelay = 0.02;
	const beepLength = 0.5;
	
	const now = audioContext.currentTime;
	gainNode.gain.setTargetAtTime(1, now, timeDelay);
	gainNode.gain.setTargetAtTime(0, now + beepLength, timeDelay);
}
	
