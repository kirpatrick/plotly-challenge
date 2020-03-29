// Refer to the Plotly.js documentation (https://plot.ly/javascript/) when building the plots.

// // Check connection to app.js
// console.log("Connected to app.js");

/*****************************************************/
// 1. Use the D3 library to read in `samples.json`.
const url = "data/samples.json";
// Fetch the JSON data - Promise Pending
const data = d3.json(url);
// Log results
console.log("Data Promise: ", data);

let newData = Promise.resolve(data);

console.log("newData:", newData);

// Global selected_subject variable
let selected_subject = 940;
let selected_otu_index = 0;

// Utility to return the key given a value
const getKey = (obj,val) => Object.keys(obj).find(key => obj[key] === val);
// Test key 'getKey'
// console.log("metadata id key", getKey(selected_otu_metadata, ethnicity));

data.then((usableData) => {
  // 6. Update all of the plots any time that a new sample is selected.
  // Select the dropdown
  let dropdown = d3.select("#selDataset");
  // Test Subject ID No's to the dropdown
  // console.log("sample_names.length", localData.names.length);
  for (var j = 0; j < usableData.names.length; j++) {
    dropdown.append("option").text(usableData.names[j]);
  }
});

// optionChanged user input
function optionChanged(selection){
  selected_subject = selection;
  // console.log("selection: ", selected_subject);
  data.then((usableData) => {
    selected_otu_index = getKey(usableData.names, selected_subject);
    console.log(selected_otu_index," : ", usableData.names[selected_otu_index]);
    updatePlots(selected_otu_index);
  });
}

function updatePlots(subject_index){
  /*****************************************************/
  // 2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
  // Display data on html
  data.then((selectedData) => {

    // Store importedData to local varable
    let localData = selectedData;
    // Check localData in console
    console.log("localData: ", localData);

    // Store updated index otu index
    selected_otu_index = subject_index;    

    /**********************************************************************/
    // Prepare data for bargraph
    let selected_sample = localData.samples[selected_otu_index];
    // Sort the data array using the greekSearchResults value
    let top_ten_values = selected_sample.sample_values.sort(function (a, b) {
      return parseFloat(b.sample_values) - parseFloat(a.sample_values);
    });

    // Slice the first 10 objects for plotting
    top_ten_values = top_ten_values.slice(0, 10);

    // Reverse the array due to Plotly's defaults
    top_ten_values = top_ten_values.reverse();

    // Trace - Working but y-axis label still duplating (x2)
    let bar_trace = {
      x: top_ten_values,
      // y: selected_sample.sample_values.map(row => selected_sample.otu_ids),
      y: selected_sample.otu_ids.map(row => row).slice(0, 10),
      text: selected_sample.otu_labels.map(row => row).slice(0, 10),
      name: "OTU",
      type: "bar",
      orientation: "h"
    };
    console.log("bar_trace: ",bar_trace);

    // data
    let bar_chartData = [bar_trace];

    // Apply the group bar mode to the layout
    let layout = {
      margin: {
        l: 100,
        r: 100,
        t: 100,
        b: 100
      }
    };

    // Render the plot to the div tag with id "plot"
    Plotly.newPlot("bar", bar_chartData, layout);

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

    // data
    let bubble_chartData = [bubble_trace];

    // Render the plot to the div tag with id bubble""
    Plotly.newPlot("bubble", bubble_chartData, layout);

    /*****************************************************/
    // 4. Display the sample metadata, i.e., an individual's demographic information.
    // 5. Display each key-value pair from the metadata JSON object somewhere on the page.
    // Store metadata at index
    let selected_otu_metadata = localData.metadata[selected_otu_index];
    // Check names in console
    // console.log("selected_otu_metadata: ", selected_otu_metadata);
    // Check value returned
    // console.log("selected_otu_metadata[id]", selected_otu_metadata["id"]);

    // Store values
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

  });
}
/*****************************************************/

// Use D3 to create an event handler
  // d3.selectAll("body").on("change", optionChanged);

// Use D3 to create an event handler
// d3.selectAll("body").on("change", optionChanged);

// function optionChanged() {

//     // * Use `sample_values` as the values for the bar chart.
//     let dropdownMenu = d3.selectAll("#selDataset").node();
//     // Assign the value of the dropdown menu option to a varable
//     // let dataset = dropdownMenu.property("onchange");

//     // Assign the dropdown menu item ID to a varable
//     let dropdownMenuID = dropdownMenu.id;
//     // Assign the dropdown menu option to a varable
//     let selectedOption = dropdownMenu.onchange;

//     console.log("dropdownMenuID", dropdownMenuID);
//     console.log("selectedOption", selectedOption);


// }

// let dropdownMenu = d3.selectAll("#selDataset").node();
// // Assign the value of the dropdown menu option to a varable
// // let dataset = dropdownMenu.property("onchange");

// // Assign the dropdown menu item ID to a varable
// let dropdownMenuID = dropdownMenu.id;
// // Assign the dropdown menu option to a varable
// let selectedOption = dropdownMenu.onchange;

// console.log("dropdownMenuID", dropdownMenuID);
// console.log("selectedOption", selectedOption);

// // Map to sample_names (ids)
// let sample_names = localData.names;
// console.log("sample_names", sample_names);
// console.log("sample_names.length", sample_names.length);

// // dropdownMenuID.onchange.append(`<option> ${sample_names} </option>`);

