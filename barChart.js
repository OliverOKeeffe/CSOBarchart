class BarChart {
  constructor(obj) {
    // All these properties are initialized from the object passed to the constructor.
    // They represent various parameters for the bar chart, such as its position, size, data, and visual properties.
    this.x = obj.x;
    this.y = obj.y;
    this.w = obj.w;
    this.h = obj.h;
    this.data = obj.data;
    this.yValue = obj.yValue;
    this.yValues = obj.yValues;
    this.xValue = obj.xValue;
    this.chartWidth = obj.chartWidth;
    this.chartHeight = obj.chartHeight;
    this.xPos = obj.xPos;
    this.yPos = obj.yPos;
    this.yLabel = obj.yLabel;
    this.xLabel = obj.xLabel;
    this.axisLineColour = obj.axisLineColour;
    this.chartTitle = obj.chartTitle;
    this.chartTitleColour = obj.chartTitleColour;
    this.labelTextSize = obj.labelTextSize;
    this.labelPadding = obj.labelPadding;
    this.labelColour = obj.labelColour;
    this.labelRotation = obj.labelRotation;
    this.barWidth = obj.barWidth;
    this.barColour = obj.barColour;
    this.barColours = obj.barColours;
    this.tickColour = obj.tickColour;
    this.tickStrokeWeight = obj.tickStrokeWeight;
    this.tickStrokeLength = obj.tickStrokeLength;
    this.tickPadding = obj.tickPadding;
    this.numTicks = obj.numTicks;
    this.tickTextColour = obj.tickTextColour;
    this.tickTextSize = obj.tickTextSize;
    this.lineColour = obj.lineColour;
    this.lineThickness = obj.lineThickness;
    this.chartType = obj.chartType; // Add new property for chart type

    // If the chart type is '100% stacked', process the data
    if (this.chartType === '100% stacked') {
      this.data = this.processData(this.data);
    }
  }

  processData(data) {
    // This method is used to process the data for a '100% stacked' bar chart.
    // It calculates the percentage of male and female for each row.
    // The processed data is an array of objects, each representing a year with the calculated percentages and a total of 100.
    return data.map(row => {
      let malePercentage = 0;
      let femalePercentage = 0;
      let total = Number(row.Total);
      let male = Number(row.Male);
      let female = Number(row.Female);

      if (Number.isFinite(total) && total !== 0) {
        if (Number.isFinite(male) && Number.isFinite(female)) {
          malePercentage = (male / total) * 100;
          femalePercentage = (female / total) * 100;
        } 
      } 

      return {
        Year: row.Year,
        Male: malePercentage,
        Female: femalePercentage,
        Total: 100
      };
    });
  }

  render() {
    push();
    translate(this.xPos, this.yPos);

      // Draw title
      textSize(24); // Set the text size
      textAlign(CENTER, CENTER); // Center the text
      fill(this.chartTitleColour); // Set the text color
      text(this.chartTitle, this.chartWidth / 2, -this.chartHeight - 50); // Draw the title 50 pixels above the chart    
      
// Draw x label
if (this.xLabel) {
  textSize(16); // Set the text size
  textAlign(CENTER, CENTER); // Center the text
  text(this.xLabel, this.chartWidth / 2, this.chartHeight + 20 - 220); // Draw the x label
}

// Draw y label
if (this.yLabel) {
  textSize(this.labelTextSize); // Set the text size
  textAlign(CENTER, CENTER); // Center the text
  push();
  translate(-50 - 30, -this.chartHeight / 2 - 10); // Move the y label up
  rotate(-HALF_PI); // Rotate the text by 90 degrees
  text(this.yLabel, 0, 0); // Draw the y label
  pop();
}
      
    if (this.chartType === "horizontal") {
      // Draw horizontal axis
      stroke(this.axisLineColour);
      line(0, 0, 0, -this.chartHeight); // Vertical line
      line(0, 0, this.chartWidth, 0);  // Vertical line
    } else {
      // Draw vertical axis
      stroke(this.axisLineColour);
      line(0, 0, 0, -this.chartHeight); // Vertical line
      line(0, 0, this.chartWidth, 0); // Horizontal line
    }

    let gap = (this.chartWidth - this.data.length * this.barWidth) / (this.data.length + 1);
    let maxValue;

    if (this.chartType === "stacked") {
      maxValue = max(
        this.data.map((d) =>
          this.yValues.reduce((sum, yValue) => sum + d[yValue], 0)
        )
      );
    } else {
      maxValue = max(this.data.map((d) => d[this.yValue]));
    }
    let labels = this.data.map((d) => d[this.xValue]);
    let scale = this.chartHeight / maxValue;

    push();
    translate(gap, 0);
    for (let i = 0; i < this.data.length; i++) {
      if (this.chartType !== 'line') {
        if (this.chartType === "stacked") {
          let y0 = 0;
          for (let yValue of this.yValues) {
            fill(this.barColours[this.yValues.indexOf(yValue)]);
            stroke(this.tickColour);
            let barHeight = this.data[i][yValue] * scale;
            rect(0, -y0, this.barWidth, -barHeight);
            y0 += barHeight;
          }
        } else if (this.chartType === "100% stacked") {
          let y0 = 0;
          for (let yValue of this.yValues) {
            fill(this.barColours[this.yValues.indexOf(yValue)]);
            stroke(this.tickColour);
            let percentage = this.data[i][yValue];
            let barHeight = (percentage * this.chartHeight) / 100; // Calculate height based on percentage
            rect(0, -y0, this.barWidth, -barHeight);
            y0 += barHeight;
          }
        } else {
          fill(this.barColour);
          noStroke();
          rect(0, 0, this.barWidth, -this.data[i][this.yValue] * scale);
        }
      }

      fill(this.labelColour);
      noStroke();
      textSize(this.labelTextSize);
      textAlign(LEFT, CENTER);
      push();
      translate(this.barWidth / 2, this.labelPadding);
      rotate(this.labelRotation);
      text(labels[i], 0, 0);
      pop();

      translate(gap + this.barWidth, 0);
    }

    pop();

    let tickGap = this.chartHeight / this.numTicks;
    for (let i = 0; i <= this.numTicks; i++) {
      stroke(this.tickColour);
      strokeWeight(this.tickStrokeWeight);
      line(0, -i * tickGap, -this.tickStrokeLength, -i * tickGap);

      fill(this.tickTextColour);
      textSize(this.tickTextSize);
      textAlign(RIGHT, CENTER);
      let value = (maxValue / this.numTicks) * i;
      text(
        value.toFixed(this.tickDecimals),
        -this.tickPadding - this.tickStrokeLength,
        -i * tickGap
      );
    }

    // Draw line chart
    if (this.chartType === 'line') {
      beginShape();
      noFill();
      strokeWeight(this.lineThickness);
      stroke(this.lineColour);
      for (let i = 0; i < this.data.length; i++) {
        let x = i * this.chartWidth / (this.data.length - 1);
        let y = this.data[i][this.yValue] * scale;
        vertex(x, -y);
      }
      endShape();
    }

    pop();
  }
}
