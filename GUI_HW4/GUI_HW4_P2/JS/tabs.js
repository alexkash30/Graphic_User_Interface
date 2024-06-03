// File: tabs.js
// GUI Assignment: Style a Site with External CSS
// Alex Kashian, UMass Lowell Computer Science,
// akashian@student.uml.edu
// Copyright (c) 2023 by Alex Kashian. All rights reserved. May be freely copied or
// excerpted for educational purposes with credit to the author.
// updated by AK on December 4th, 2023 at 10:18 PM


//logic for making the table. changed it from my other function so I could have easier acess changing and editing things. got help from a classmate on how to implement it this way.
function generateTable(minC, maxC, minR, maxR) {
    let tableHTML = '<table>';

    tableHTML += '<tr><th></th>';
    for (let i = minC; i <= maxC; i++) {
        tableHTML += `<th>${i}</th>`;
    }
    tableHTML += '</tr>';

    for (let i = minR; i <= maxR; i++) {
        tableHTML += '<tr>';
        tableHTML += `<th>${i}</th>`;
        for (let j = minC; j <= maxC; j++) {
            tableHTML += `<td>${i * j}</td>`;
        }
        tableHTML += '</tr>';
    }

    tableHTML += '</table>';
    return tableHTML;
}

//creating the table by calling out generate function
function createTable() {
    // Gets values from the form
    const minC = parseInt($("#minCol").val());
    const maxC = parseInt($("#maxCol").val());
    const minR = parseInt($("#minRow").val());
    const maxR = parseInt($("#maxRow").val());


    if ($("#myForm").valid()) {
        const tabContent = generateTable(minC, maxC, minR, maxR);
        $("#tableContainer").html(tabContent);
        // Unhide the table when there are no validation errors
        $("#tableContainer").css("display", "block");
    } else {
        // If validation fails, hide the table
        $("#tableContainer").css("display", "none");
    }
}

function createNewTab(minC, maxC, minR, maxR) {
    const tabTitle = minC + "-" + maxC + minR + "-" + maxR;

    const existingTab = $(`#tabs a:contains('${tabTitle}')`);
    if (existingTab.length) {
        // Set the current tab index to the existing tab's index
        $("#tabs").tabs("option", "active", existingTab.parent().index());
    } else {
        const tabId = "tabs-" + tabTitle;
        const tabContent = generateTable(minC, maxC, minR, maxR);
        
        // Create a new tab with a delete button
        const tabElement = $('<div id="' + tabId + '" class="scrollable-tab-content">' +tabContent + '</div>');
        const tabTitleElement = $('<li class = "tabTitleElement"><a href="#' + tabId + '">' + tabTitle + '</a></li>');
        const deleteButton = $('<span class="xTab ui-icon ui-icon-close delete-tab-button" role="presentation">Remove Tab</span>');

        deleteButton.appendTo(tabTitleElement);
        tabTitleElement.appendTo('#tabs ul');
        tabElement.appendTo('#tabs');
        
        $("#tabs").tabs("refresh");
        // Set the active tab index to the newly created tab's index
        $("#tabs").tabs("option", "active", -1);
    }
}

//doesnt seem to be fully functional but this was to be to delete each tab indivually along with the lines in the generate table
$(document).ready(function(){
	$("#tabs").on("click", ".xTab", function() {
		let id = $(this).parent().attr("aria-controls");
		$(this).parent().remove();
		$("#" + id).remove();
		$("#tabs").tabs("refresh");
	})
});

//delete all the tabs
function deleteTab() {
    $("#tabs ul li").remove();
    $("#tabs div").remove();
    $("#tabs").tabs("refresh");
}



//on click of save tab. if valid save a new tab
$(document).on('click', '#saveButton', function (event) {
	if($('#myForm').valid()){
		event.preventDefault();
		
		const minC = parseInt($("#minCol").val());
		const maxC = parseInt($("#maxCol").val());
		const minR = parseInt($("#minRow").val());
		const maxR = parseInt($("#maxRow").val());
		const currentTabIndex = $("#tabs").tabs("option", "active"); // Get the current table index

		createNewTab(minC, maxC, minR, maxR);

		$("#tabs").tabs("option", "active", currentTabIndex);

	}
});