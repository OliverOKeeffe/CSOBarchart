let data;
let cleanData = [];
let barCharts = [];

let canvasWidth = 1600;
let canvasHeight = 1600;

// Colours
let backgroundColour = "#e3e3e3";
let axisColour = "#474747";
let axisThickness = 3;
let barColour = "#416096";

// function preload() {
// 	data = loadTable("data/CJA01.20240219T170251.csv", "csv", "header");
// }
// console.log(data)

function preload() {
    // Load CSV file with callback function onDataLoaded
    data = loadTable("data/CJA01.20240219T170251.csv", "csv", "header", onDataLoaded);
}

function onDataLoaded(table) {
    // Callback function to handle loaded data
    data = table; // Assign loaded data to global variable
    console.log(data); // Log loaded data
}

function setup() {
	createCanvas(canvasWidth, canvasHeight);

	for (let i = 0; i < data.rows.length; i++) {
		cleanData.push(data.rows[i].obj);
	}

	numBars = cleanData.length;

	let barChart01 = {
		data: cleanData,
		chartWidth: 400,
		chartHeight: 400,
		x: 100,
		y: 500,
		barWidth: 30,
	};

	barCharts.push(new BarChart(barChart01));
}
console.log(cleanData)

function draw() {
	background(backgroundColour);
	barCharts.forEach((barChart01) => barChart01.render());
}
