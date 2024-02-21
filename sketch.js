let barCharts = [];
let data;
let cleanData = [];
let numRows;

function preload() {
  data = loadTable("data/Arson.csv", "csv", "header");
}

function setup() {
  background(50);
  createCanvas(1000, 800);

  noLoop();

  numRows = data.rows.length; 
  for (let i = 0; i < numRows; i++) {
    cleanData.push(data.rows[i].obj);
  }


  let barChart01 = {
    // x: 70,
    // y: 350,
    // w: 250,
    // h: 250,
    data: cleanData,
    yValue: "VALUE",
    xValue: "Year",
    chartWidth: 300,
    chartHeight: 280,
    xPos: 100,
    yPos: 400,
    axisLineColour: "#d9d9d9",
    barWidth: 15,
    tickColour: "#d9d9d9",
    tickStrokeWeight: 1,
    tickStrokeLength: 10,
    tickPadding: 10,
    numTicks: 5,
    tickTextColour: "d9d9d9",
    tickTextSize: 15,
    tickDecimals: 0,
    labelTextSize: 15,
    labelPadding: 10,
    labelColour: "#d17c4b",
    labelRotation: 45,
    barColour: "#cf291d",

  };

  let barChart02 = {
    // x: 70,
    // y: 350,
    // w: 250,
    // h: 250,
    data: cleanData,
    yValue: "VALUE",
    xValue: "Year",
    chartWidth: 300,
    chartHeight: 280,
    xPos: 600,
    yPos: 400,
    axisLineColour: "#d9d9d9",
    barWidth: 15,
    tickColour: "#d9d9d9",
    tickStrokeWeight: 1,
    tickStrokeLength: 10,
    tickPadding: 10,
    numTicks: 5,
    tickTextColour: "d9d9d9",
    tickTextSize: 15,
    tickDecimals: 0,
    labelTextSize: 15,
    labelPadding: 10,
    labelColour: "#d17c4b",
    labelRotation: 45,
    barColour: "#cf291d",

  };


  barCharts.push(new BarChart(barChart01));
  barCharts.push(new BarChart(barChart02));
}

function draw() {
  background(50);
  barCharts.forEach(bar => bar.render());
}
