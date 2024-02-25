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
  createCanvas(1500, 1500);

  noLoop();

  numRows = data.rows.length; 
  for (let i = 0; i < numRows; i++) {
    cleanData.push(data.rows[i].obj);
  }

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
    chartTitle: "Statistic",
    labelTextSize: 15,
    labelPadding: 10,
    labelColour: "#d17c4b",
    labelRotation: 45,
    barColour: "#fa0202",
 

  };

  let barChart02 = {
    // x: 70,
    // y: 350,
    // w: 250,
    // h: 250,
    chartType: 'stacked',
    data: stackedData,
    xValue: "Year",
    yValues: ['Male', 'Female'],
    chartWidth: 300,
    chartHeight: 280,
    xPos: 600,
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
    labelTextSize: 15,
    labelPadding: 10,
    labelColour: "#d17c4b",
    labelRotation: 45,
    barColour: "#cf291d",
    barColours: ["#3366cc", "#f520d5"],
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
  chartWidth: 300,
  chartHeight: 280,
  xPos: 100,
  yPos: 800,
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
  labelTextSize: 15,
  labelPadding: 10,
  labelColour: "#d17c4b",
  labelRotation: 45,
  barColour: "#cf291d",
  barColours: ["#3366cc", "#f520d5"],
};

let barChart04 = {
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
  xPos: 600,
  yPos: 800,
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
  labelTextSize: 15,
  labelPadding: 10,
  labelColour: "#d17c4b",
  labelRotation: 45,
  barColour: "#cf291d",
  lineColour: "#cf291d",
  lineThickness: 1,


};


  barCharts.push(new BarChart(barChart01));
  barCharts.push(new BarChart(barChart02));
  barCharts.push(new BarChart(barChart03));
  barCharts.push(new BarChart(barChart04));
}

function draw() {
  background(50);
  barCharts.forEach(bar => bar.render());
}
