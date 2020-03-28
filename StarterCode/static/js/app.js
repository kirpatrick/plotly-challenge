// // Check connection to app.js
console.log("Connected to app.js");

// Refer to the Plotly.js documentation (https://plot.ly/javascript/) when building the plots.

/*****************************************************/
// 1. Use the D3 library to read in `samples.json`.
const url = "data/samples.json";

// Fetch the JSON data - Promise Pending
const data = d3.json(url);
// Log results
// console.log("Data Promise: ", data);

// Unpack uitilty to extract child elements
function unpack(rows, index) {
  return rows.map(function (row) {
    return row[index];
  });
}

/*****************************************************/
// 2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.

// Will likely create a bar chart function that accepts 'id' to filter the dataset
// Mannually enter the otu index for now
data.then((selectedData) => {
  // Store index otu index
  var selected_otu_index = 0;

  // Check importedData in console
  // console.log("importedData: ", importedData);

  // Store importedData to local variable
  var localData = selectedData;

  // Check localData in console
  console.log("localData for bar chart: ", localData);

  // Store name at index
  var selected_otu = localData.names[selected_otu_index];
  // Check names in console
  // console.log("names: ", names);// names:  940

  /******* Use `sample_values` as the values for the bar chart. *******/
  // Map to sample_values
  var selected_sample_values = localData.samples[selected_otu_index].sample_values;
  // Check in console
  // console.log("selected_sample_values: ", selected_sample_values);
  /**********************************************************************/

  /******* Use `otu_ids` as the labels for the bar chart. *******/
  // Map to otu_ids
  var selected_otu_ids = localData.samples[selected_otu_index].otu_ids;
  // Check in console
  // console.log("selected_otu_ids: ", selected_otu_ids);
  /**********************************************************************/

  /******* Use `otu_labels` as the hovertext for the chart. *******/
  // Map to otu_labels
  var selected_otu_labels = localData.samples[selected_otu_index].otu_labels;
  // Check in console
  // console.log("selected_otu_labels: ", selected_otu_labels);
  /**********************************************************************/

  /**********************************************************************/
  // play with localData
  var testing = {
    x: selected_sample_values,
    y: selected_otu_ids,
    text: selected_otu_labels
  };
  console.log("testing: ", testing);
  /**********************************************************************/
  // Prepare data for bargraph
  var selected_sample = localData.samples[selected_otu_index];
  // Sort the data array using the greekSearchResults value
  selected_sample.sample_values.sort(function (a, b) {
    return parseFloat(b.sample_values) - parseFloat(a.sample_values);
  });

  // Slice the first 10 objects for plotting
  selected_sample.sample_values = selected_sample.sample_values.slice(0, 10);

  // Reverse the array due to Plotly's defaults
  selected_sample.sample_values = selected_sample.sample_values.reverse();

  // Trace1 - Working (all data for sample) for the OTU Data
  // var trace1 = {
  //     x: selected_sample_values,
  //     y: selected_otu_ids,
  //     text: selected_otu_labels,
  //     name: "OTU",
  //     type: "bar",
  //     orientation: "h"
  // };

  // Trace2 - Working; returns top ten samples BUT returns all ids and labels for selected otu
  // var trace2 = {
  //   x: selected_sample.sample_values,
  //   y: selected_sample.otu_ids,
  //   text: selected_sample.otu_labels,
  //   name: "OTU",
  //   type: "bar",
  //   orientation: "h"
  // };
  // console.log("trace2: ", trace2);

  // Trace3 - Working; returns top ten samples and all otu_ids only for selected otu
  // ... BUT out_labels not working AND otu_ids are duplating (x2)
  // var trace3 = {
  //   x: selected_sample.sample_values,
  //   y: selected_sample.sample_values.map(row => selected_sample.otu_ids),
  //   text: selected_sample.sample_values.map(row => selected_sample.otu_labels),
  //   name: "OTU",
  //   type: "bar",
  //   orientation: "h"
  // };
  // console.log("trace3: ", trace3);

  // Print values and index
  // selected_sample.sample_values.map((item, index) => {
  //   console.log(`Item:  ${item} Index:  ${index}`);
  // });

  // Trace4 - Working; returns top ten samples and all otu_ids only for selected otu
  // ... BUT out_labels not working AND otu_ids are duplating (x2)
  // var trace4 = {
  //   x: selected_sample.sample_values,
  //   y: selected_sample.sample_values.map(row => 
  //     selected_sample.otu_ids.map((item) => {
  //       item;
  //     })
  //   ),
  //   test1: selected_sample.sample_values.map(row => selected_sample.otu_ids),
  //   test2: selected_sample.sample_values.map(row => 
  //     // console.log(`Outer Row: ${row}`)
  //     // console.log(`Outer otu: ${selected_sample.otu_ids[row]}`)
  //     selected_sample.otu_ids.slice(0, 10)[0]

  //     // selected_sample.otu_ids.map((item, index) => {
  //     //   console.log(`Row: ${row} Item: ${item} Index: ${index}`);
  //     // })
  //   ),
  //   text: selected_sample.sample_values.map(row => selected_sample.otu_labels),
  //   name: "OTU",
  //   type: "bar",
  //   orientation: "h"
  // };
  // console.log("trace4: ", trace4);
  // console.log("trace4.test2: ", trace4.test2[0]); // Yatzee!!!

  // Trace5 - Working; returns top ten samples and all otu_ids only for selected otu
  // ... otu_labels show on hover BUT otu_ids on y-axis still duplating (x2)
  var trace5 = {
    x: selected_sample.sample_values,
    // y: selected_sample.otu_ids.map(row => row).slice(0, 10),
    y: selected_sample.sample_values.map(row => selected_sample.otu_ids),
    text: selected_sample.otu_labels.map(row => row).slice(0, 10),
    name: "OTU",
    type: "bar",
    orientation: "h"
  };
  console.log("trace5: ", trace5);

  // data
  var chartData = [trace5];

  // Apply the group bar mode to the layout
  var layout = {
    title: `OTU results for Test Subject ${selected_otu}`,
    margin: {
      l: 100,
      r: 100,
      t: 100,
      b: 100
    }
  };

  // Render the plot to the div tag with id "plot"
  Plotly.newPlot("bar", chartData, layout);
  /**********************************************************************/

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
  // Store metadata at index
  var selected_otu_metadata = localData.metadata[selected_otu_index];
  // Check names in console
  console.log("selected_otu_metadata: ", selected_otu_metadata);
  // Check value returned
  console.log("selected_otu_metadata[id]", selected_otu_metadata["id"]);

  // Store values
  let id = selected_otu_metadata["id"]
  let ethnicity = selected_otu_metadata["ethnicity"]
  let gender = selected_otu_metadata["gender"]
  let age = selected_otu_metadata["age"]
  let location = selected_otu_metadata["location"]
  let bbtype = selected_otu_metadata["bbtype"]
  let wfreq = selected_otu_metadata["wfreq"]

  // Utility to return the key given a value
  const getKey = (obj,val) => Object.keys(obj).find(key => obj[key] === val);

  // Test key 'getKey'
  console.log("metadata id key", getKey(selected_otu_metadata, ethnicity));

  var item = d3.select(".panel-body");
  item.html("");

  item.append("p").text(`${getKey(selected_otu_metadata, id)}: ${id}`);
  item.append("p").text(`${getKey(selected_otu_metadata, ethnicity)}: ${ethnicity}`);
  item.append("p").text(`${getKey(selected_otu_metadata, gender)}: ${gender}`);
  item.append("p").text(`${getKey(selected_otu_metadata, age)}: ${age}`);
  item.append("p").text(`${getKey(selected_otu_metadata, location)}: ${location}`);
  item.append("p").text(`${getKey(selected_otu_metadata, bbtype)}: ${bbtype}`);
  item.append("p").text(`${getKey(selected_otu_metadata, wfreq)}: ${wfreq}`);

  

  // let dropdown = d3.select("#selDataset");
  // dropdown.append("option").text()


  // d3.selectAll("#selDataset")
//     .data(localData)
//     .enter()
//     .append("option")
//     .html(function(d){
//         return d.names;
//         // return `<option value="${d.names}">${d.names}</option>`;
//     });
//     // .append("<option>" + names + "</option>");
  
  
  
  // localData.forEach((selected_otu_metadata) => {
  //   var row = sample_metadata.append("div");
  //   Object.entries(selected_otu_metadata).forEach(([key, value]) => {
  //     var cell = row.append("p");
  //     cell.text(key, value);
  //   });
  // });


});


/*****************************************************/
// 6. Update all of the plots any time that a new sample is selected.
// Call updatePlotly() when a change takes place to the DOM
// d3.selectAll("#selDataset").on("change", updatePlotly);



// Use D3 to create an event handler
// d3.selectAll("body").on("change", optionChanged);

// function optionChanged() {

    // // * Use `sample_values` as the values for the bar chart.
    // var dropdownMenu = d3.selectAll("#selDataset").node();
    // // Assign the value of the dropdown menu option to a variable
    // // var dataset = dropdownMenu.property("onchange");

    // // Assign the dropdown menu item ID to a variable
    // var dropdownMenuID = dropdownMenu.id;
    // // Assign the dropdown menu option to a variable
    // var selectedOption = dropdownMenu.onchange;

    // console.log("dropdownMenuID", dropdownMenuID);
    // console.log("selectedOption", selectedOption);


// }

// var dropdownMenu = d3.selectAll("#selDataset").node();
// // Assign the value of the dropdown menu option to a variable
// // var dataset = dropdownMenu.property("onchange");

// // Assign the dropdown menu item ID to a variable
// var dropdownMenuID = dropdownMenu.id;
// // Assign the dropdown menu option to a variable
// var selectedOption = dropdownMenu.onchange;

// console.log("dropdownMenuID", dropdownMenuID);
// console.log("selectedOption", selectedOption);

// // Map to sample_names (ids)
// var sample_names = localData.names;
// console.log("sample_names", sample_names);
// console.log("sample_names.length", sample_names.length);

// // dropdownMenuID.onchange.append(`<option> ${sample_names} </option>`);

// // dropdownMenu
// d3.selectAll("#selDataset")
//     .data(localData)
//     .enter()
//     .append("option")
//     .html(function(d){
//         return d.names;
//         // return `<option value="${d.names}">${d.names}</option>`;
//     });
//     // .append("<option>" + names + "</option>");

