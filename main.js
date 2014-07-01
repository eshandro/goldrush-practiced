
$(document).on('ready', function() {
  
  var boulder = new GMaps({
  div: '#map',
  lat: 40.017347,
  lng: -105.258860,
  zoom: 12
});

	var numberOfXs = 0;
	
	$('#map').on('click',function(event){
		// add little icon 'x-marks the spot'
		// this should have position:absolute, at x = event.pageX, y= event.pageY

		var x = 100*event.pageX/$(document).width();
		var y = 100*event.pageY/$(document).height();
		$('#map').append("<img src='x-icon.png' class='x-icon' id="+numberOfXs+">");
		$('#'+numberOfXs).css({ 'top':y+'%','left':x+'%' });
		$('#'+numberOfXs).css({ 'margin-top':-10,'margin-left':-10 });

		// Pop up a textarea
		$('#map').append("<textarea class='popup-note' id='pop"+numberOfXs+"' placeholder='Enter info about the gold' autofocus></textarea>");
		$('#pop'+numberOfXs).css({ 'top':y+'%','left':x+'%'  });
		$('#pop'+numberOfXs).css({ 'margin-top':+10,'margin-left':+10 });

		numberOfXs +=1;
	});


	$('#map').on('click', '.x-icon', function(event){
		//	Stop the parent #map from creating a new  x-icon
		event.stopPropagation();
		// Remove the clicked-upon x and its text area:
		$(this).next().remove();
		$(this).remove();

	});

	// Don't allow clicks on the text area to make new x-icons
	$('#map').on('click', '.popup-note', function(event) {
		event.stopPropagation();
	})

	// Hide the text area on blur.
	$('#map').on('blur mouseout', '.popup-note', function(event) {
		$(this).attr('readonly','true')
		$(this).fadeOut(2000);
	});

	// Show the text area when an x-icon is moused over.
	$('#map').on('mouseover', '.x-icon', function(event) {
		event.stopPropagation();
		$(this).next().fadeIn(2000);
	});

	// Two seconds after mouseout, make the textarea dissappear.
	$('#map').on('mouseout', '.x-icon', function(event) {
		event.stopPropagation();
		var elem = $(this);
		setTimeout(function() { 
			if( ! elem.next().is(':focus') ) elem.next().fadeOut(2000);
		}, 2000);
	});


});