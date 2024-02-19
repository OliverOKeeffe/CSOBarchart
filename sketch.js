let data;
let cleanData = [];
let barCharts = [];

let canvasWidth = 600;
let canvasHeight = 600;

// Colours
let backgroundColour = "#e3e3e3";
let axisColour = "#474747";
let axisThickness = 3;
let barColour = "#416096";

function preload() {
	data = loadTable("data/Road.csv", "csv", "header");
}

function setup() {
	createCanvas(canvasWidth, canvasHeight);

	for (let i = 0; i < data.rows.length; i++) {
		cleanData.push(data.rows[i].obj);
	}

	numBars = cleanData.length;

	barCharts.push(new BarChart(cleanData, 400, 400, 100, 500, 30));
}
console.log(cleanData)

function draw() {
	background(backgroundColour);
	barCharts.forEach((barChart) => barChart.render());
}
