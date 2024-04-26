window.onload = init;
let sliders;
let printedValues;
let xValues = [];
let yValues = [];
let musicGraph;

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
				backgroundColor: "rgba(0, 0, 0, 1.0)",
				pointRadius: 1,
				data: yValues
			}]
		},
		options:
		{
			title: 
			{
				display: true,
				text: "music"
			},
			responsive: true,
			maintainAspectRatio: false,
			scales: 
			{
				yAxes: 
				[{
					
					ticks: 
					{
						stepSize: 1
					}
				}]
			}
		}
	})

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
		console.log(f + (s*i) + (a**i));
		yValues[i] = f + parseFloat(s*i) + parseFloat(a**2);
		
	}
	if (musicGraph != undefined)
	{
		musicGraph.update();
	}
};
	
