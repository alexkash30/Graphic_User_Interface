// File: add-content.js
// GUI Assignment: Style a Site with External CSS
// Alex Kashian, UMass Lowell Computer Science,
// akashian@student.uml.edu
// Copyright (c) 2023 by Alex Kashian. All rights reserved. May be freely copied or
// excerpted for educational purposes with credit to the author.
// updated by AK on December 4th, 2023 at 10:18 PM


$(document).ready(function(){
	$("#tabs").tabs();
	$("#myForm").validate({
		//rules that through error messages if not properly input
		rules:{
			minCol: {
				required: true,
				max:50,
				min:-50
			},
			maxCol: {
				required: true,
				max:50,
				min:-50,
				greaterThan:"#minCol"
			},
			minRow: {
				required: true,
				max:50,
				min:-50
			},
			maxRow: {
				required: true,
				max:50,
				min:-50,
				greaterThan:"#minRow"
			}
		},
		//the messages based on the type of error
		messages: {
			minCol: {
				required: "Please Enter a Value",
				max:"Please enter a number less than 50",
				min:"Please enter a number greater than -50"
			},
			maxCol: {
				required: "Please Enter a Value",
				max:"Please enter a number less than 50",
				min:"Please enter a number greater than -50"
			},
			minRow: {
				required: "Please Enter a Value",
				max:"Please enter a number less than 50",
				min:"Please enter a number greater than -50"
			},
			maxRow: {
				required: "Please Enter a Value",
				max:"Please enter a number less than 50",
				min:"Please enter a number greater than -50"
			}
		}
		
	});
	
});

//the greater than method provided in the https://jqueryvalidation.org/ downloaded files
jQuery.validator.addMethod( "greaterThan", function( value, element, param ) {
    var target = $( param );
 if ( this.settings.onfocusout && target.not( ".validate-greaterThan-blur" ).length ) {
        target.addClass( "validate-greaterThan-blur" ).on( "blur.validate-greaterThan", function() {
            $( element ).valid();
        } );
    }
	var referenceValue = target.val();
	if ($.isNumeric(value) && $.isNumeric(referenceValue)) {
		value = parseInt(value);
		referenceValue = parseInt(referenceValue);
		return value > referenceValue;
	}
    return value > target.val();
}, "Please enter a greater value." );

function myFunction() {
	//make sure the form is valid before all of the logic
	if($('#myForm').valid()){
		var table = document.getElementById("myTable");
		table.innerHTML = "";

		let minC = document.getElementById("minCol").value;
		let maxC = document.getElementById("maxCol").value;
		let minR = document.getElementById("minRow").value;
		let maxR = document.getElementById("maxRow").value;

		var row = table.insertRow(0);
		var cellI = row.insertCell(0);
		cellI.innerHTML = "  ";
		//fill the top
		for(let a = Number(minC); a <= Number(maxC); a++){
			var cellI = row.insertCell(-1);
			cellI.innerHTML = a;
			cellI.classList.add("header-cell");

		}
		//fill the 
		for(let i = Number(minR); i <= Number(maxR); i++){
			var row = table.insertRow(-1);
			var cell1 = row.insertCell(0);
			cell1.innerHTML = i
			//populate the table
			for(let j = Number(minC); j <=Number(maxC); j++){
				var cell1 = row.insertCell(-1);
				cell1.innerHTML = j*i;
			}
		}
	}

  }

