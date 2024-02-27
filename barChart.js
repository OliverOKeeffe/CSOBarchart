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

  // The function processData is declared, which takes one argument 'data'.
  // 'data' is expected to be an array of objects, where each object represents a year with the number of males, females, and a total count.
  processData(data) {
    // The map() function is called on the 'data' array. map() creates a new array with the results of calling a provided function on every element in the array.
    // In this case, the provided function is an arrow function that takes 'row' as an argument, where 'row' represents an individual object in the 'data' array.
    return data.map((row) => {
      // Initialize two variables, malePercentage and femalePercentage, to 0. These will hold the calculated percentages of males and females.
      let malePercentage = 0;
      let femalePercentage = 0;
      // Extract the 'Total', 'Male', and 'Female' properties from the 'row' object and convert them to numbers using the Number() function.
      let total = Number(row.Total);
      let male = Number(row.Male);
      let female = Number(row.Female);
      // Check if 'total' is a finite number and not equal to 0. This is to prevent division by zero errors and ensure that 'total' is a valid number.
      if (Number.isFinite(total) && total !== 0) {
        // If 'total' is valid, check if both 'male' and 'female' are also finite numbers. This is to ensure that 'male' and 'female' are valid numbers before performing calculations.
        if (Number.isFinite(male) && Number.isFinite(female)) {
          // If 'male' and 'female' are valid, calculate the percentage of males and females by dividing the number of males or females by the total and multiplying by 100.
          malePercentage = (male / total) * 100;
          femalePercentage = (female / total) * 100;
        }
      }
      // Return a new object for each year with the calculated male and female percentages and a total of 100.
      // This object will be an element in the new array created by the map() function.
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

    if (this.chartType) {
      // Draw horizontal axis
      stroke(this.axisLineColour);
      line(0, 0, 0, -this.chartHeight); // Vertical line
      line(0, 0, this.chartWidth, 0); // Vertical line
    } else {
      // Draw vertical axis
      stroke(this.axisLineColour);
      line(0, 0, 0, -this.chartHeight); // Vertical line
      line(0, 0, this.chartWidth, 0); // Horizontal line
    }

    // Calculate the gap between bars in the chart. This is done by subtracting the total width of all bars from the chart width, then dividing by the number of gaps (which is one more than the number of bars).
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
    // Save the current drawing style and transformations.
    push();
    // Translate the origin of the coordinate system by the calculated gap. This is done to position the first bar correctly.
    translate(gap, 0);
    // Iterate over the data points to draw the bars.
    for (let i = 0; i < this.data.length; i++) {
      // If the chart type is not 'line', draw the bars.
      if (this.chartType !== "line") {
        // If the chart type is "stacked", draw a stacked bar for each data point.
        if (this.chartType === "stacked") {
          let y0 = 0;
          for (let yValue of this.yValues) {
            // Set the fill color for the bar segment based on the y-value.
            fill(this.barColours[this.yValues.indexOf(yValue)]);
            // Set the stroke color for the bar segment.
            stroke(this.tickColour);
            // Calculate the height of the bar segment.
            let barHeight = this.data[i][yValue] * scale;
            // Draw the bar segment.
            rect(0, -y0, this.barWidth, -barHeight);
            // Update the y-coordinate for the next bar segment.
            y0 += barHeight;
          }
        } else if (this.chartType === "100% stacked") {
          // If the chart type is "100% stacked", draw a 100% stacked bar for each data point.
          let y0 = 0;
          for (let yValue of this.yValues) {
            // Set the fill color for the bar segment based on the y-value.
            fill(this.barColours[this.yValues.indexOf(yValue)]);
            // Set the stroke color for the bar segment.
            stroke(this.tickColour);
            // Calculate the height of the bar segment based on the percentage.
            let percentage = this.data[i][yValue];
            let barHeight = (percentage * this.chartHeight) / 100;
            // Draw the bar segment.
            rect(0, -y0, this.barWidth, -barHeight);
            // Update the y-coordinate for the next bar segment.
            y0 += barHeight;
          }
        } else {
          // If the chart type is neither "stacked" nor "100% stacked", draw a regular bar for each data point.
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
      // Move the origin of the coordinate system by half the bar width to the right and by the amount of `labelPadding` downwards. This is done to position the label correctly relative to the bar.
      translate(this.barWidth / 2, this.labelPadding);
      rotate(this.labelRotation);
      // Draw the label text at the origin of the coordinate system. The text is taken from the `labels` array at index `i`.
      text(labels[i], 0, 0);
      pop();
      // Move the origin of the coordinate system to the right by the width of one bar plus one gap. This is done to position the coordinate system for the next bar and label.
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
        // Calculate the x-coordinate of the vertex. This is done by dividing the chart width by the number of data points minus one, then multiplying by the index of the data point.
        let x = (i * this.chartWidth) / (this.data.length - 1);
        // Calculate the y-coordinate of the vertex. This is done by multiplying the y-value of the data point by the scale factor.
        let y = this.data[i][this.yValue] * scale;
        vertex(x, -y);
      }
      endShape();
    }

    pop();
  }
}