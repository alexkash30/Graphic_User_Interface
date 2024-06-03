// File: slider.js
// GUI Assignment: Style a Site with External CSS
// Alex Kashian, UMass Lowell Computer Science,
// akashian@student.uml.edu
// Copyright (c) 2023 by Alex Kashian. All rights reserved. May be freely copied or
// excerpted for educational purposes with credit to the author.
// updated by AK on December 4th, 2023 at 10:18 PM

$(document).ready(function(){

	slider();
	function slider(){
		//set the same rules for each slider to fix the paramaters of the assignment
		$('#minColSlider').slider({
			min: -50,
			max: 50,
			value: 0,
			slide:function(event, ui) {
                $("#minCol").val(ui.value);
				//slider updates the text field 
				$(ui.value).val($('#minCol').val());
				createTable();
			}
		});
		//text field updates the slider postion
		$("#minCol").change(function() {
			$("#minColSlider").slider("value", $(this).val());
		});

		//applying the same logic as earlier 
		$('#maxColSlider').slider({
			min: -50,
			max: 50,
			value: 0,
			slide:function(event, ui) {
                $("#maxCol").val(ui.value);
				$(ui.value).val($('#maxCol').val());
				createTable();
			}
		});
		$("#maxCol").change(function() {
			$("#maxColSlider").slider("value", $(this).val());
		});

		//applying the same logic as earlier 
		$('#minRowSlider').slider({
			min: -50,
			max: 50,
			value: 0,
			slide:function(event, ui) {
                $("#minRow").val(ui.value);
				$(ui.value).val($('#minRow').val());
				createTable();
			}
		});
		$("#minRow").change(function() {
			$("#minRowSlider").slider("value", $(this).val());
		});

		//applying the same logic as earlier 
		$('#maxRowSlider').slider({
			min: -50,
			max: 50,
			value: 0,
			slide:function(event, ui) {
                $("#maxRow").val(ui.value);
				$(ui.value).val($('#maxRow').val());
				createTable();
			}
		});
		$("#maxRow").change(function() {
			$("#maxRowSlider").slider("value", $(this).val());
		});
	}
});




