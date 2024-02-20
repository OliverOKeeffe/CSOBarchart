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
    data: cleanData,
    yValue: "VALUE",
    xValue: "Year",
    chartWidth: 200,
    chartHeight: 200,
    xPos: 100,
    yPos: 350,
    axisLineColour: "#d9d9d9",
    barWidth: 10,
    labelTextSize: 20,
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
