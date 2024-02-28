class BarChart {
  constructor(obj) {
    //these properties are initialized from the object passed to the constructor.
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
    this.chartType = obj.chartType;

    // If the chart type is '100% stacked', process the data
    if (this.chartType === "100% stacked") {
      this.data = this.processData(this.data);
    }
  }

  processData(data) {
    return data.map((row) => {
      //These will hold the calculated percentages of males and females.
      let malePercentage = 0;
      let femalePercentage = 0;
      let total = Number(row.Total);
      let male = Number(row.Male);
      let female = Number(row.Female);
      // Check if 'total' is a finite number and not equal to 0. This is to prevent division by zero errors and ensure that 'total' is a valid number.
      if (Number.isFinite(total) && total !== 0) {
        // If 'total' is valid, check if both 'male' and 'female' are also finite numbers. This is to ensure that 'male' and 'female' are valid numbers before performing calculations.
        if (Number.isFinite(male) && Number.isFinite(female)) {
          malePercentage = (male / total) * 100;
          femalePercentage = (female / total) * 100;
        }
      }
      return {
        Year: row.Year,
        Male: malePercentage,
        Female: femalePercentage,
        Total: 100,
      };
    });
  }

  render() {
    push();
    translate(this.xPos, this.yPos);

    // Draw title
    textSize(24);
    textAlign(CENTER, CENTER);
    fill(this.chartTitleColour);
    text(this.chartTitle, this.chartWidth / 2, -this.chartHeight - 50); // Draw the title 50 pixels above the chart

    // Draw x label
    if (this.xLabel) {
      textSize(16);
      textAlign(CENTER, CENTER);
      text(this.xLabel, this.chartWidth / 2, this.chartHeight + 20 - 220); // Draw the x label
    }

    // Draw y label
    if (this.yLabel) {
      textSize(this.labelTextSize);
      textAlign(CENTER, CENTER);
      push();
      translate(-50 - 30, -this.chartHeight / 2 - 10); // Move the y label up
      rotate(-HALF_PI); // Rotate the text by 90 degrees
      text(this.yLabel, 0, 0); // Draw the y label
      pop();
    }

    if (this.chartType) {
      // Draw horizontal axis
      stroke(this.axisLineColour);
      line(0, 0, 0, -this.chartHeight);
      line(0, 0, this.chartWidth, 0);
    } else {
      // Draw vertical axis
      stroke(this.axisLineColour);
      line(0, 0, 0, -this.chartHeight);
      line(0, 0, this.chartWidth, 0);
    }

    // Calculate the gap between bars in the chart
    let gap =
      (this.chartWidth - this.data.length * this.barWidth) /
      (this.data.length + 1);
    let maxValue;

    // If the chart type is "stacked", calculate the maximum value as the maximum sum of y-values for each data point.
    if (this.chartType === "stacked") {
      maxValue = max(
        this.data.map((d) =>
          this.yValues.reduce((sum, yValue) => sum + d[yValue], 0)
        )
      );
    } else {
      // If the chart type is not "stacked", calculate the maximum value as the maximum y-value across all data points.
      maxValue = max(this.data.map((d) => d[this.yValue]));
    }
    // Create an array of labels from the x-values of the data points.
    let labels = this.data.map((d) => d[this.xValue]);
    // Calculate the scale factor for the chart by dividing the chart height by the maximum value.
    let scale = this.chartHeight / maxValue;
    push();
    translate(gap, 0);
    // Iterate over the data points to draw the bars.
    for (let i = 0; i < this.data.length; i++) {
      // If the chart type is not 'line', draw the bars.
      if (this.chartType !== "line") {
        if (this.chartType === "stacked") {
          // Initialize y0 to 0. This variable can be used to store the y-coordinate for the base of a bar in a bar chart
          let y0 = 0;
          for (let yValue of this.yValues) {
            // Set the fill color for the bar segment based on the y-value.
            fill(this.barColours[this.yValues.indexOf(yValue)]);
            stroke(this.tickColour);
            let barHeight = this.data[i][yValue] * scale;
            rect(0, -y0, this.barWidth, -barHeight);
            // Update the y-coordinate for the next bar segment.
            y0 += barHeight;
          }
        } else if (this.chartType === "100% stacked") {
          let y0 = 0;
          for (let yValue of this.yValues) {
            // Set the fill color for the bar segment based on the y-value.
            fill(this.barColours[this.yValues.indexOf(yValue)]);
            stroke(this.tickColour);
            // Calculate the height of the bar segment based on the percentage.
            let percentage = this.data[i][yValue];
            let barHeight = (percentage * this.chartHeight) / 100;
            rect(0, -y0, this.barWidth, -barHeight);
            // Update the y-coordinate for the next bar segment.
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
    if (this.chartType === "line") {
      beginShape();
      noFill();
      strokeWeight(this.lineThickness);
      stroke(this.lineColour);
      // Iterate over the data points to define the vertices of the shape.
      for (let i = 0; i < this.data.length; i++) {
        // Calculate the x-coordinate of the vertex, by dividing the chart width by the number of data points minus one, then multiplying by the index of the data point.
        let x = (i * this.chartWidth) / (this.data.length - 1);
        // Calculate the y-coordinate of the vertex, by multiplying the y-value of the data point by the scale factor.
        let y = this.data[i][this.yValue] * scale;
        vertex(x, -y);
      }
      endShape();
    }

    pop();
  }
}


