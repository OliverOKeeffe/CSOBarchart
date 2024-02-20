let barCharts = [];
let data;
let cleanData = [];
let numRows;

function preload() {
  data = loadTable("data/Combined.csv", "csv", "header");
  // console.log(data);
}

function setup() {
  background(50);
  createCanvas(800, 800);

  noLoop();

  numRows = data.rows.length; 
  for (let i = 0; i < numRows; i++) {
    cleanData.push(data.rows[i].obj);
  }
  // console.log(cleanData);

  let barChart01 = {
    x: 70,
    y: 350,
    w: 250,
    h: 250,
    data: cleanData,
    yValue: "VALUE",
    xValue: "Year",
    chartWidth: 300,
    chartHeight: 280,
    xPos: 170,
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
}

function draw() {
  background(50);
  barCharts.forEach(bar => bar.render());
}
