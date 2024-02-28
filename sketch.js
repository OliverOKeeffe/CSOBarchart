let barCharts = [];
let data;
let cleanData = [];
let numRows;

function preload() {
  data = loadTable("data/Reoffending.csv", "csv", "header");
}
// MedianDispasableincome
// Reoffending

function setup() {
  background(50);
  createCanvas(1500, 1200);

  noLoop();

  numRows = data.rows.length; 
  for (let i = 0; i < numRows; i++) {
    cleanData.push(data.rows[i].obj);
  }

// To make male and female numbers, so they can be used for the stakced charts
  let stackedData = [];
for (let i = 0; i < cleanData.length; i++) {
    let yearData = cleanData[i];
    stackedData.push({
        Year: yearData.Year,
        Male: parseInt(yearData.Male),
        Female: parseInt(yearData.Female)
    });
}

  let barChart01 = {
    // x: 70,
    // y: 350,
    // w: 250,
    // h: 250,
    data: cleanData,
    yValue: "Total",
    xValue: "Year",
    chartWidth: 300,
    chartHeight: 280,
    xPos: 100,
    yPos: 400,
    axisLineColour: "#d9d9d9",
    barWidth: 20,
    tickColour: "#d9d9d9",
    tickStrokeWeight: 1,
    tickStrokeLength: 10,
    tickPadding: 10,
    numTicks: 5,
    tickTextColour: "d9d9d9",
    tickTextSize: 15,
    tickDecimals: 0,
    chartTitle: "Re-offended within 3 years",
    chartTitleColour: "#ffffff",
    xLabel: 'Year',
    yLabel: 'Total',
    labelTextSize: 18,
    labelPadding: 10,
    labelColour: "#ffffff",
    labelRotation: 45,
    barColour: "#1ce64b",
 

  };

  let barChart02 = {
    // x: 70,
    // y: 350,
    // w: 250,
    // h: 250,
    chartType: 'stacked',
    data: stackedData,
    chartTitle: "Re-offended within 3 years",
    chartTitleColour: "#ffffff",
    xValue: "Year",
    yValues: ['Male', 'Female'],
    chartWidth: 300,
    chartHeight: 280,
    xPos: 800,
    yPos: 400,
    axisLineColour: "#d9d9d9",
    barWidth: 20,
    tickColour: "#d9d9d9",
    tickStrokeWeight: 1,
    tickStrokeLength: 10,
    tickPadding: 10,
    numTicks: 5,
    tickTextColour: "#d9d9d9",
    tickTextSize: 15,
    tickDecimals: 0,
    xLabel: 'Year',
    yLabel: 'Total',
    labelTextSize: 18,
    labelPadding: 10,
    labelColour: "#ffffff",
    labelRotation: 45,
    barColour: "#cf291d",
    barColours: ["#3366cc", "#f086ec"],
};

let barChart03 = {
  // x: 70,
  // y: 350,
  // w: 250,
  // h: 250,
  chartType: '100% stacked',
  data: cleanData,
  xValue: "Year",
  yValue: "Total",
  yValues: ['Male', 'Female'],
  chartTitle: "Re-offended within 3 years",
  chartTitleColour: "#ffffff",
  chartWidth: 300,
  chartHeight: 280,
  xPos: 100,
  yPos: 900,
  axisLineColour: "#d9d9d9",
  barWidth: 20,
  tickColour: "#d9d9d9",
  tickStrokeWeight: 1,
  tickStrokeLength: 10,
  tickPadding: 10,
  numTicks: 5,
  tickTextColour: "#d9d9d9",
  tickTextSize: 15,
  tickDecimals: 0,
  xLabel: 'Year',
  yLabel: 'Total',
  labelTextSize: 18,
  labelPadding: 10,
  labelColour: "#ffffff",
  labelRotation: 45,
  barColour: "#cf291d",
  barColours: ["#1625c9", "#db12bd"],
};

let lineChart = {
  // x: 70,
  // y: 350,
  // w: 250,
  // h: 250,
  chartType: 'line',
  data: cleanData,
  yValue: "Total",
  xValue: "Year",
  chartWidth: 300,
  chartHeight: 280,
  xPos: 800,
  yPos: 900,
  chartTitle: "Re-offended within 3 years",
  chartTitleColour: "#ffffff",
  axisLineColour: "#d9d9d9",
  barWidth: 20,
  tickColour: "#d9d9d9",
  tickStrokeWeight: 1,
  tickStrokeLength: 10,
  tickPadding: 10,
  numTicks: 5,
  tickTextColour: "d9d9d9",
  tickTextSize: 15,
  tickDecimals: 0,
  xLabel: 'Year',
  yLabel: 'Total',
  labelTextSize: 18,
  labelPadding: 10,
  labelColour: "ffffff",
  labelRotation: 45,
  lineColour: "#faef16",
  lineThickness: 2,


};


  barCharts.push(new BarChart(barChart01));
  barCharts.push(new BarChart(barChart02));
  barCharts.push(new BarChart(barChart03));
  barCharts.push(new BarChart(lineChart));
}

function draw() {
  background(20);
  barCharts.forEach(bar => bar.render());
}
