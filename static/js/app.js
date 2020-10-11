function metaData(id) {

    d3.json("samples.json").then(function(data) {
        var demoData = data.metadata;
        var filteredData = demoData.filter(sample => sample.id.toString() === id)[0];
        var sampleMetadata = d3.select("#sample-metadata");
        
        // Use `.html("") to Clear any Existing Metadata
        sampleMetadata.html("");

        Object.entries(filteredData).forEach(([key, value]) => {
          sampleMetadata.append("h5").text(`${key}:${value}`);
        })

    });
};

function charts() {
    d3.json("samples.json").then(function(importedData) {
        var data = importedData;
        var samples = data.samples;

        const all_otu_ids = samples[0].otu_ids;
        const all_sample_values = samples[0].sample_values;
        const all_otu_labels = samples[0].otu_labels;
        // var sampleIds = samples.map(id => id);
        // var idIndex = sampleIds.findIndex(sampleId);
        const otu_ids = samples.map(({ otu_ids }) => otu_ids.slice(0, 10))[0];
        const otu_ids2 = otu_ids.map(x => "OTU" + " " + x);
        const otu_labels = samples.map(({ otu_labels }) => otu_labels.slice(0, 10))[0];
        const sample_values = samples.map(({ sample_values }) => sample_values.slice(0, 10))[0];

        var barData = [{
            x: sample_values.reverse(),
            y: otu_ids2.reverse(),
            text: otu_labels.reverse(),
            type: "bar",
            orientation: "h"
        }]
    
    Plotly.newPlot("bar", barData);

        var bubbleData = [{
            x: all_otu_ids,
            y: all_sample_values,
            text: all_otu_labels,
            mode: "markers",
            marker: {
                size: all_sample_values,
                color: all_otu_ids,
            }
        }]
    
    Plotly.newPlot("bubble", bubbleData);            

});
}

function optionChanged(id) {
    charts(id);
    metaData(id);
}


function dropdown() {

    // Use D3 to select the dropdown menu
    var dropdownMenu = d3.select("#selDataset");

    d3.json("samples.json").then(function(data) {
        console.log(data)

        data.names.forEach(function(sample) {
            dropdownMenu.append("option").text(sample).property("value", sample);

        });
        metaData(data.names[0]);
        charts(data.names[0]);
    });    
};

dropdown();