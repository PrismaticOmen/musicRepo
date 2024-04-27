window.onload = init;
let sliders;
let printedValues;
let xValues = [];
let yValues = [];
let musicGraph;
let audioCt;
var oscNode;

function init()
{
	sliders = document.getElementsByClassName("slider");
	printedValues = document.getElementsByClassName("sliderValue");
	console.log("init");
	for (let i = 0; i < sliders.length; i++)
	{
		updateSlider(i);
	}
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
					
					ticks: 
					{
						min: 0,
						max: 1100,
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
	
	audioCtx = new AudioContext();
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

};

function playSound()
{
	oscNode = new OscillatorNode(audioCtx, 
	{
		type: "sine",
		frequency: 440,
	});

	const gainNode = new GainNode(audioCtx, 
	{
		gain: 0.5,
	});

	oscNode.connect(gainNode).connect(audioCtx.destination);
	if(typeof AudioContext != "undefined" || typeof webkitAudioContext != "undefined") 
	{
		audioCtx.resume();
		oscNode.start();
		setTimeout(oscNode.stop(), 10000);
	}
}
	
