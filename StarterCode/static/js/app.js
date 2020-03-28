// // Check connection to app.js
console.log("Connected to app.js");

// Refer to the Plotly.js documentation (https://plot.ly/javascript/) when building the plots.

/*****************************************************/
// 1. Use the D3 library to read in `samples.json`.
const url = "data/samples.json";

// Fetch the JSON data - Promise Pending
const data = d3.json(url);
// Log results
console.log("Data Promise: ", data);

// Unpack uitilty to extract child elements
function unpack(rows, index) {
    return rows.map(function(row) {
      return row[index];
    });
  }

/*****************************************************/
// 2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.

// Use D3 to create an event handler
// d3.selectAll("body").on("change", optionChanged);

// function optionChanged() {

    // * Use `sample_values` as the values for the bar chart.
    var dropdownMenu = d3.selectAll("#selDataset").node();
    // Assign the value of the dropdown menu option to a variable
    // var dataset = dropdownMenu.property("onchange");

    // Assign the dropdown menu item ID to a variable
    var dropdownMenuID = dropdownMenu.id;
    // Assign the dropdown menu option to a variable
    var selectedOption = dropdownMenu.onchange;

    console.log("dropdownMenuID", dropdownMenuID);
    console.log("selectedOption", selectedOption);


// }
// * Use `otu_ids` as the labels for the bar chart.

// * Use `otu_labels` as the hovertext for the chart.


data.then((importedData) => {
    // Check importedData in console
    // console.log("importedData: ", importedData);

    // Store importedData to local variable
    var localData = importedData;

    // Check localData in console
    console.log("localData for bar chart: ", localData);

    // Store name at index '0'
    var names = localData.names[0];
    // Check names in console
    console.log("names: ", names);// names:  940

    function filteredSample(name) {
        return name.names[0];
    }

    // Map to sample_names (ids)
    var sample_names = localData.names;
    console.log("sample_names", sample_names);
    console.log("sample_names.length", sample_names.length);

    // Map to sample_values
    var selected_sample_values = localData.samples[0].sample_values;
    // Check in console
    console.log("selected_sample_values: ", selected_sample_values);

    // Map to otu_ids
    var selected_otu_ids = localData.samples[0].otu_ids;
    // Check in console
    console.log("selected_otu_ids: ", selected_otu_ids);
    
    // Map to otu_labels
    var selected_otu_labels = localData.samples[0].otu_labels;
    // Check in console
    console.log("selected_otu_labels: ", selected_otu_labels);

    // // Sort the data array using the greekSearchResults value
    // localData.sort(function(a, b) {
    //   return parseFloat(b.sample_values) - parseFloat(a.sample_values);
    // });
  
    // // Slice the first 10 objects for plotting
    // localData = localData.slice(0, 10);
  
    // // Reverse the array due to Plotly's defaults
    // localData = localData.reverse();
  
    // // Trace1 for the Greek Data
    // var trace1 = {
    //   x: localData.map(row => row.greekSearchResults),
    //   y: localData.map(row => row.greekName),
    //   text: localData.map(row => row.greekName),
    //   name: "Greek",
    //   type: "bar",
    //   orientation: "h"
    // };
  
    // // data
    // var chartData = [trace1];
  
    // // Apply the group bar mode to the layout
    // var layout = {
    //   title: "Greek gods search results",
    //   margin: {
    //     l: 100,
    //     r: 100,
    //     t: 100,
    //     b: 100
    //   }
    // };
  
    // // Render the plot to the div tag with id "plot"
    // Plotly.newPlot("plot", chartData, layout);
  });
  
/*****************************************************/
// 3. Create a bubble chart that displays each sample.

// * Use `otu_ids` for the x values.

// * Use `sample_values` for the y values.

// * Use `sample_values` for the marker size.

// * Use `otu_ids` for the marker colors.

// * Use `otu_labels` for the text values.


/*****************************************************/
// 4. Display the sample metadata, i.e., an individual's demographic information.
// 5. Display each key-value pair from the metadata JSON object somewhere on the page.


/*****************************************************/
// 6. Update all of the plots any time that a new sample is selected.
// Call updatePlotly() when a change takes place to the DOM
// d3.selectAll("#selDataset").on("change", updatePlotly);