let barCharts = [];
let data;
let cleanData = [];
let numRows;

function preload() {
  data = loadTable("data/Combined.csv", "csv", "header");
}

function setup() {
  background(50);
  createCanvas(500, 500);

  noLoop();

  let numRows = data.rows.length;
  for (let i = 0; i < numRows; i++) {
    cleanData.push(data.rows[i].obj);
  }

  let barChart01 = {
    data: cleanData,
    yValue: "Total",
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

  console.log()

  barCharts.push(new BarChart(barChart01)); 

  //barCharts.push(new BarChart(cleanData,80,80,50,350,"#ff0000"));
  //barCharts.push(new BarChart(cleanData,400,400,50,450,"#d9d9d9"))
}

function draw() {
  background(50);
  barCharts.forEach((bar) => bar.render()); 
}
