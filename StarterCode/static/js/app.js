// Refer to the Plotly.js documentation (https://plot.ly/javascript/) when building the plots.

// Check connection to app.js
console.log("Connected to app.js");

/*****************************************************/
// 1. Use the D3 library to read in `samples.json`.
const url = "data/samples.json";
// Fetch the JSON data - Promise Pending
const data = d3.json(url);
// Log results
// console.log("Data Promise: ", data);

// Global selected_subject variables
let selected_subject = 940;
let selected_subject_index = 0;

// Display plots for first subject by default
updatePlots(selected_subject_index);

// Utility to return the key given a value
const getKey = (obj,val) => Object.keys(obj).find(key => obj[key] === val);
// Test key 'getKey'
// console.log("metadata id key", getKey(selected_otu_metadata, ethnicity));

// optionChanged user input
function optionChanged(selection){
  selected_subject = selection;
  // console.log("selection: ", selected_subject);
  data.then((usableData) => {
    selected_subject_index = getKey(usableData.names, selected_subject);
    console.log(selected_subject_index," : ", usableData.names[selected_subject_index]);
    updatePlots(selected_subject_index);
  });
}

function updatePlots(subject_index){
  /*****************************************************/
  // 2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
  // Display data on html
  data.then((usableData) => {

    // Store importedData to local varable
    let localData = usableData;
    // Check localData in console
    console.log("localData: ", localData);

    // Store updated index otu index
    selected_subject_index = subject_index;    

    /**********************************************************************/
    // Prepare data for bargraph
    let selected_sample = localData.samples[selected_subject_index];
    // Sort the data array using the greekSearchResults value
    let top_ten_values = selected_sample.sample_values.sort(function (a, b) {
      return parseFloat(b.sample_values) - parseFloat(a.sample_values);
    });

    // Slice the first 10 objects for plotting
    top_ten_values = top_ten_values.slice(0, 10);

    // Reverse the array due to Plotly's defaults
    top_ten_values = top_ten_values.reverse();

    // Trace
    let bar_trace = {
      x: top_ten_values,
      y: selected_sample.otu_ids.map(row => selected_sample.otu_ids), // double value bug
      text: selected_sample.otu_labels.map(row => row).slice(0, 10),
      name: "OTU",
      type: "bar",
      orientation: "h"
    };
    console.log("bar_trace: ",bar_trace);

    // data
    let bar_chartData = [bar_trace];

    // Apply the group bar mode to the layout
    let bar_layout = {
      margin: {
        l: 100,
        r: 100,
        t: 100,
        b: 100
      }
    };

    // Render the plot to the div tag with id "plot"
    Plotly.newPlot("bar", bar_chartData, bar_layout);

    /**********************************************************************/
    // 3. Create a bubble chart that displays each sample.
    // Trace - Working but y-axis label still duplating (x2)
    let bubble_trace = {
      // * Use `otu_ids` for the x values.
      x: selected_sample.otu_ids,
      // * Use `sample_values` for the y values.
      y: selected_sample.sample_values,
      // * Use `otu_labels` for the text values.
      text: selected_sample.otu_labels,
      name: "OTU",
      type: "scatter",
      mode: "markers",
      marker: {
        // * Use `otu_ids` for the marker colors.
        color: selected_sample.otu_ids,
        // * Use `sample_values` for the marker size.
        size: selected_sample.sample_values,
        symbol: 'circle'
      },
      orientation: "h"
    };
    console.log("bubble_trace: ", bubble_trace);
    
    // Apply the group bar mode to the layout
    let bubble_layout = {
      margin: {
        l: 25,
        r: 25,
        t: 25,
        b: 25
      }
    };

    // data
    let bubble_chartData = [bubble_trace];

    // Render the plot to the div tag with id bubble""
    Plotly.newPlot("bubble", bubble_chartData, bubble_layout);

    /*****************************************************/
    // 4. Display the sample metadata, i.e., an individual's demographic information.
    // 5. Display each key-value pair from the metadata JSON object somewhere on the page.
    // Store metadata at index
    let selected_otu_metadata = localData.metadata[selected_subject_index];
    // Check names in console
    // console.log("selected_otu_metadata: ", selected_otu_metadata);
    // Check value returned

    // Store selected demographics
    let id = selected_otu_metadata["id"]
    let ethnicity = selected_otu_metadata["ethnicity"]
    let gender = selected_otu_metadata["gender"]
    let age = selected_otu_metadata["age"]
    let location = selected_otu_metadata["location"]
    let bbtype = selected_otu_metadata["bbtype"]
    let wfreq = selected_otu_metadata["wfreq"]

    // Select Demographic Info panel
    let item = d3.select(".panel-body");
    item.html("");

    item.append("p").text(`${getKey(selected_otu_metadata, id)}: ${id}`);
    item.append("p").text(`${getKey(selected_otu_metadata, ethnicity)}: ${ethnicity}`);
    item.append("p").text(`${getKey(selected_otu_metadata, gender)}: ${gender}`);
    item.append("p").text(`${getKey(selected_otu_metadata, age)}: ${age}`);
    item.append("p").text(`${getKey(selected_otu_metadata, location)}: ${location}`);
    item.append("p").text(`${getKey(selected_otu_metadata, bbtype)}: ${bbtype}`);
    item.append("p").text(`${getKey(selected_otu_metadata, wfreq)}: ${wfreq}`);

    
    /**********************************************************************/
    // Prepare data for bonus
    var data = [
      {
        type: "indicator",
        mode: "gauge+number+delta",
        value: id,
        title: { text: "Belly Button Washing Frequency", font: { size: 24 } },
        delta: { reference: 100, increasing: { color: "RebeccaPurple" } },
        gauge: {
          axis: { range: [null, 10], tickwidth: 1, tickcolor: "darkblue" },
          bar: { color: "darkblue" },
          bgcolor: "white",
          borderwidth: 2,
          bordercolor: "gray",
          steps: [
            { range: [0, 1], color: "gray" },
            { range: [1, 2], color: "gray" },
            { range: [2, 3], color: "gray" },
            { range: [3, 4], color: "gray" },
            { range: [4, 5], color: "gray" },
            { range: [5, 6], color: "gray" },
            { range: [6, 7], color: "gray" },
            { range: [7, 1], color: "gray" },
            { range: [8, 9], color: "gray" }
          ],
          threshold: {
            line: { color: "red", width: 4 },
            thickness: 1.75,
            value: wfreq
          }
        }
      }
    ];
    
    var gauge_layout = {
      width: 500,
      height: 400,
      margin: { t: 25, r: 25, l: 25, b: 25 },
      paper_bgcolor: "lavender",
      font: { color: "darkblue", family: "Arial" }
    };
    
    Plotly.newPlot('gauge', data, gauge_layout);
  });
}

/*****************************************************/
// 6. Update all of the plots any time that a new sample is selected.
data.then((usableData) => {
  // Select the dropdown
  let dropdown = d3.select("#selDataset");
  // Test Subject ID No's to the dropdown
  // console.log("sample_names.length", localData.names.length);
  for (var j = 0; j < usableData.names.length; j++) {
    dropdown.append("option").text(usableData.names[j]);
  }
});