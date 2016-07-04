function TakePic(){
    navigator.camera.getPicture(onSuccess, onFail, { quality: 50, destinationType: Camera.DestinationType.FILE_URI });

    function onSuccess(imageURI) {
        var image = document.getElementById('myImage');
        image.src = imageURI;
    }

    function onFail(message) {
        alert('Failed because: ' + message);
    }
}

function getQueryVariable(parameter){
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i=0;i<vars.length;i++) {
		var pair = vars[i].split("=");
		if(pair[0] == parameter){return pair[1];}
	}
	return(false);
}

var loading = function() {
	// add the overlay with loading image to the page
	var over = '<div id="overlay">' +
	'<img id="loading" src="img/loading.gif">' +
	'</div>';
	$(over).appendTo('body');

	//click on the overlay to remove it
	$('#overlay').click(function() {
	   $(this).remove();
	});

};

var EventTitle = getQueryVariable('Title'),
	EventTitle = decodeURI(EventTitle);

//Menu Items
$(document).on("pageshow",function(){
	//alert('page show');
	var ActivePageN = $.mobile.activePage.attr('id');

	//alert(Menuto);
	if($( "#"+ActivePageN+" .PanelItems" ).has( "li" ).length == 0){
		//alert('no item');
		var MenuItems = null;

		MenuItems = '<li><a href="#HomePage" data-transition="flip" class="ui-btn ui-btn-icon-right ui-icon-carat-r">Home</a></li>';
		MenuItems = MenuItems + '<li><a href="allevents.html" data-transition="flip" class="ui-btn ui-btn-icon-right ui-icon-carat-r">All Events</a></li>';
		MenuItems = MenuItems + '<li><a href="featuredevents.html" data-transition="flip" class="ui-btn ui-btn-icon-right ui-icon-carat-r">Featured Events</a></li>';
		MenuItems = MenuItems + '<li><a href="ministries.html" data-transition="flip" class="ui-btn ui-btn-icon-right ui-icon-carat-r">Ministries</a></li>';
		MenuItems = MenuItems + '<li><a href="departments.html" data-transition="flip" class="ui-btn ui-btn-icon-right ui-icon-carat-r">Departments</a></li>';
		MenuItems = MenuItems + '<li><a href="calendarview.html" data-transition="flip" class="ui-btn ui-btn-icon-right ui-icon-carat-r">Calendar View</a></li>';
    
		$( "#"+ActivePageN+" .PanelItems" ).append(MenuItems);
	}
	else{
		//alert($( ".PanelItems" ).html());
	}


	$( "#"+ActivePageN+" .MyFooter h1" ).html("Copyright Gov.Kn 2016 &copy;");

});

//Details Page
$(document).on("pageshow","#detailspage",function(){
	
	//alert("pageshow event fired - detailspage is now shown");
	
	$(document).ready(loading);

	var EventTitle = getQueryVariable('Title'),
		EventTitle = decodeURI(EventTitle);

	//alert('3');
	$.ajax({
		url: "https://stkittsnevisegovernmentplatform-test.mendixcloud.com/rest/wsc_getevents/?contenttype=json",
		data: {searchtitle : EventTitle},
		xhrFields: {
		// The 'xhrFields' property sets additional fields on the XMLHttpRequest.
		// This can be used to set the 'withCredentials' property.
		// Set the value to 'true' if you'd like to pass cookies to the server.
		// If this is enabled, your server must respond with the header
		// 'Access-Control-Allow-Credentials: true'.
		withCredentials: true
	},
	}).then(function(data) {
		var totalrec = 1;

		var finishid = totalrec - 1;
		
		for (var i = 0; i < totalrec; i++) {
			var title = data.eventsObjects[i].title,
			EventDate = new Date(data.eventsObjects[i].startDate),
			EventDate = EventDate.toDateString(),
			Details = data.eventsObjects[i].pageContent,
			Category = data.eventsObjects[i].eventCategories.categoryName,
			EventImg = data.eventsObjects[i].flyerFull,
			EventMins = data.eventsObjects[i].eventMinistries.name,
			EventDeps = data.eventsObjects[i].eventDepartments.name; 

			//alert(EventMins);
			//alert(EventDeps);
			if (data.eventsObjects[i].endDate != null) {
            	var EndDate = new Date(data.eventsObjects[i].endDate),
            		EndDate = EndDate.toDateString(),
            		Blank = ' - ',
            		DateDisplay = EventDate.concat(Blank,EndDate);
            }
            else{
            	DateDisplay = EventDate;
            }

			$('.EventTitle').append(title +' | '+ DateDisplay);
			$('.EventCategory').append(Category);
			$('.EventDetails').append(Details);
			$('.Ministries').append(EventMins);
			$('.Departments').append(EventDeps);
			$('.EventFlyer').attr('src', EventImg);

		};

		$('#overlay').remove();
	});

	// function AddToCal(){
	// 	// prep some variables
	// 	var startDate = new Date(2016,6,30,18,30,0,0,0); // beware: month 0 = january, 11 = december
	// 	var endDate = new Date(2016,6,15,30,30,0,0,0);
	// 	var title = "My nice event";
	// 	var location = "Home";
	// 	var notes = "Some notes about this event.";
	// 	var success = function(message) { alert("Success: " + JSON.stringify(message)); };
	// 	var error = function(message) { alert("Error: " + message); };

	// 	// create an event silently (on Android < 4 an interactive dialog is shown)
	// 	window.plugins.calendar.createEvent(title,location,notes,startDate,endDate,success,error);
	// }
});
//FeaturedEvents
$(document).on("pageshow","#FeaturedEvents",function(){
	
	//alert("pageshow event fired - detailspage is now shown");
	$(document).ready(loading);

	var EventTitle = getQueryVariable('Title'),
		EventTitle = decodeURI(EventTitle);

	//alert('3');

	$.ajax({
		url: "https://stkittsnevisegovernmentplatform-test.mendixcloud.com/rest/wsc_geteventsfeatured?contenttype=json",
		//data: {searchtitle : EventTitle},
		xhrFields: {
		// The 'xhrFields' property sets additional fields on the XMLHttpRequest.
		// This can be used to set the 'withCredentials' property.
		// Set the value to 'true' if you'd like to pass cookies to the server.
		// If this is enabled, your server must respond with the header
		// 'Access-Control-Allow-Credentials: true'.
		withCredentials: true
	},
	}).then(function(data) {
		var totalrec = data.eventsObjects.length,
			finishid = totalrec - 1,
			PerPage = 10,
			Pages = totalrec / PerPage;


		for (var i = 0; i < totalrec; i++) {
			//alert(totalrec);
			var title = data.eventsObjects[i].title,
			EventDate = new Date(data.eventsObjects[i].startDate),
			EventDate = EventDate.toDateString(),
			Details = data.eventsObjects[i].pageContent,
			Category = data.eventsObjects[i].eventCategory,
			EventImg = data.eventsObjects[i].flyerFull;

			if (data.eventsObjects[i].endDate != null) {
	        	var EndDate = new Date(data.eventsObjects[i].endDate),
	        		EndDate = EndDate.toDateString(),
	        		Blank = ' - ',
	        		DateDisplay = EventDate.concat(Blank,EndDate);
	        }
	        else{
	        	DateDisplay = EventDate;
	        }

			$('.featlistwhole').append('<li><a id="'+i+'" href="details.html?Title='+ title +'" data-transition="slide" class="EventListItem ui-btn ui-btn-icon-right ui-icon-carat-r"><h3>'+ title +'</h3><p>'+ DateDisplay +'</p></a></li>');

			
		};

		$('#overlay').remove();
	});

	//$(document).ready(LoadContent);
	
});


//All Events Page
$(document).on("pageshow","#AllEvents",function(){
	
	//alert("pageshow event fired - detailspage is now shown");

	$(document).ready(loading);

	var EventTitle = getQueryVariable('Title'),
		EventTitle = decodeURI(EventTitle);

	$.ajax({
		url: "https://stkittsnevisegovernmentplatform-test.mendixcloud.com/rest/wsc_getevents/?contenttype=json",
		//data: {searchtitle : EventTitle},
		xhrFields: {
		// The 'xhrFields' property sets additional fields on the XMLHttpRequest.
		// This can be used to set the 'withCredentials' property.
		// Set the value to 'true' if you'd like to pass cookies to the server.
		// If this is enabled, your server must respond with the header
		// 'Access-Control-Allow-Credentials: true'.
		withCredentials: true
	},
	}).then(function(data) {
		var totalrec = data.eventsObjects.length,
			PerPage = 20,
			finishid = PerPage - 1,
			Start = 0;

		$(document).ready(ShowmoreEvents(Start));

		function ShowmoreEvents(amount){
			var run = 'true';
			var EndTo = amount + PerPage;

			if(EndTo > totalrec){
				var sub = EndTo - totalrec;
					PerPage = PerPage  - sub;
			}

			if(amount => totalrec){run = 'false';}
			if(run == 'true'){
				//alert('run');
				for (var i = 0; i < PerPage; i++) {
					//alert(totalrec);
					var title = data.eventsObjects[amount].title,
					EventDate = new Date(data.eventsObjects[amount].startDate),
					EventDate = EventDate.toDateString(),
					Details = data.eventsObjects[amount].pageContent,
					Category = data.eventsObjects[amount].eventCategory,
					EventImg = data.eventsObjects[amount].flyerFull;

					if (data.eventsObjects[amount].endDate != null) {
			        	var EndDate = new Date(data.eventsObjects[amount].endDate),
			        		EndDate = EndDate.toDateString(),
			        		Blank = ' - ',
			        		DateDisplay = EventDate.concat(Blank,EndDate);
			        }
			        else{
			        	DateDisplay = EventDate;
			        }

					$('.Eventlistitems').append('<li><a href="details.html?Title='+ title +'" data-transition="slide" class="EventListItem ui-btn ui-btn-icon-right ui-icon-carat-r"><h3>'+ title +'</h3><p>'+ DateDisplay +'</p></a></li>');

					

					var amount = amount + 1;
				};

				$('#overlay').remove();
			}

			
		}

		var ActivePageN = $.mobile.activePage.attr('id');

		if(ActivePageN == 'AllEvents'){
			$(document).bind("scrollstop", function() {
				if($(window).scrollTop() + $(window).height() == $(document).height()) {
					//alert("end of page");

					var Start = $( ".Eventlistitems li" ).length,
						Start = Start + 1;

					$(document).ready(ShowmoreEvents(Start));
				}
			});
		}
		
	});

	
});

//Home Page
$(document).on("pageshow","#HomePage",function(){
//alert('show');
	if($( "#HomePage .listitems" ).has( "li" ).length == 0){
		//alert("hi");
		
		$(document).ready(loading);
		//$('.listitems').empty();

		//Featured Events
		$.ajax({
	        url: "https://stkittsnevisegovernmentplatform-test.mendixcloud.com/rest/wsc_geteventsfeatured?contenttype=json",
	        //https://stkittsnevisegovernmentplatform-test.mendixcloud.com/rest/wsc_getevents/?contenttype=json
	        //data: {q : 'Van Gogh'},
	        xhrFields: {
	            // The 'xhrFields' property sets additional fields on the XMLHttpRequest.
	            // This can be used to set the 'withCredentials' property.
	            // Set the value to 'true' if you'd like to pass cookies to the server.
	            // If this is enabled, your server must respond with the header
	            // 'Access-Control-Allow-Credentials: true'.
	            withCredentials: true
	        },
	    }).then(function(data) {
	        var totalrec = 5; //data.eventsObjects.length;
	        /*if(totalrec > 10){
	            var totalrec = 10;
	        }*/
	        var finishid = totalrec - 1;
	        for (var i = 0; i < totalrec; i++) {
	            var title = data.eventsObjects[i].title,
	                EventDate = new Date(data.eventsObjects[i].startDate),
	                EventDate = EventDate.toDateString(),
	                imgthumb = data.eventsObjects[i].flyerThumbnail;

	                if (data.eventsObjects[i].endDate != null) {
	                	var EndDate = new Date(data.eventsObjects[i].endDate),
	                		EndDate = EndDate.toDateString(),
	                		Blank = ' - ',
	                		DateDisplay = EventDate.concat(Blank,EndDate);
	                }
	                else{
	                	DateDisplay = EventDate;
	                }
	                
            	$('.featlist').append('<li id="'+i+'" class="featlistitems"><a href="details.html?Title='+ title +'" data-transition="slide"><img src="'+imgthumb+'" width="100" height="100"><h3 style="margin-top:5px;">'+title+'</h3><p>'+ DateDisplay +'</p</a></li>');
            	$('.featlistpagination').append('<li id="pz'+i+'" class=""></li>');
	            
	            if(i == finishid){
	            	$('.featlistpagination #pz0').addClass('active');

	                $(".featlistitems").on("swipeleft",function(){
			            var FeatAmt = $( ".featlistitems" ).has( "li" ).length,
			                id = this.id,
			                nextid = parseInt(id) + 1;
			            
			            if($(this).is(':last-child') == false){

			            	$('.featlistpagination li').removeClass('active');
			                $(this).fadeOut("fast", function(){
			                    $(this).next().fadeIn();
			                    $('.featlistpagination #pz'+nextid).addClass('active');
			                });
			            }
			            // else{
			            // 	$('.featlistpagination li').removeClass('active');
			            // 	$(this).fadeOut("fast", function(){
			            //         $('featlist #lpz0').fadeIn();
			            //         $('.featlistpagination #pz0').addClass('active');
			            //     });
			            // }
			        });

			        $(".featlistitems").on("swiperight",function(){
			            var FeatAmt = $( ".featlistitems" ).has( "li" ).length,
			                id = this.id,
			                nextid = parseInt(id) - 1;
			            
			            if($(this).is(':first-child') == false){

			            	$('.featlistpagination li').removeClass('active');
			                $(this).fadeOut("fast", function(){
			                    $(this).prev().fadeIn();
			                    $('.featlistpagination #pz'+nextid).addClass('active');
			                });
			            }
			            // else{
			            // 	$('.featlistpagination li').removeClass('active');
			            // 	$(this).fadeOut("fast", function(){
			            //         $('featlist #lpz4').fadeIn();
			            //         $('.featlistpagination #pz4').addClass('active');
			            //     });
			            // }
			        });
	            }
	        };
	    });
		
		//Upcoming Events
		$.ajax({
	        url: "https://stkittsnevisegovernmentplatform-test.mendixcloud.com/rest/wsc_getevents/?contenttype=json",
	        //https://stkittsnevisegovernmentplatform-test.mendixcloud.com/rest/wsc_getevents/?contenttype=json
	        data: {forcalendar : false},
	        xhrFields: {
	            // The 'xhrFields' property sets additional fields on the XMLHttpRequest.
	            // This can be used to set the 'withCredentials' property.
	            // Set the value to 'true' if you'd like to pass cookies to the server.
	            // If this is enabled, your server must respond with the header
	            // 'Access-Control-Allow-Credentials: true'.
	            withCredentials: true
	        },
	    }).then(function(data) {
	    	var totalrec = 50,
				PerPage = 10,
				finishid = PerPage - 1,
				Start = 0;

			$(document).ready(ShowmoreUpcom(Start));

			function ShowmoreUpcom(amount){
				var run = 'true';
				var EndTo = amount + PerPage;

				if(EndTo > totalrec){
					var sub = EndTo - totalrec;
						PerPage = PerPage  - sub;
				}

				if(amount > totalrec){run = 'false';}
				if(run == 'true'){
					//alert('run');
					for (var i = 0; i < PerPage; i++) {
						//alert(totalrec);
						var title = data.eventsObjects[amount].title,
						EventDate = new Date(data.eventsObjects[amount].startDate),
						EventDate = EventDate.toDateString(),
						Details = data.eventsObjects[amount].pageContent,
						Category = data.eventsObjects[amount].eventCategory,
						EventImg = data.eventsObjects[amount].flyerFull;

						if (data.eventsObjects[amount].endDate != null) {
				        	var EndDate = new Date(data.eventsObjects[amount].endDate),
				        		EndDate = EndDate.toDateString(),
				        		Blank = ' - ',
				        		DateDisplay = EventDate.concat(Blank,EndDate);
				        }
				        else{
				        	DateDisplay = EventDate;
				        }

						$('.listitems').append('<li><a href="details.html?Title='+ title +'" data-transition="slide" class="EventListItem ui-btn ui-btn-icon-right ui-icon-carat-r"><h3>'+ title +'</h3><p>'+ DateDisplay +'</p></a></li>');

						

						var amount = amount + 1;
					};

					$('#overlay').remove();
				}

				
			}

			var ActivePageN = $.mobile.activePage.attr('id');

			if(ActivePageN == 'HomePage'){
				$(document).bind("scrollstop", function() {
					if($(window).scrollTop() + $(window).height() == $(document).height()) {
						//alert("end of page");

						var Start = $( ".listitems li" ).length,
							Start = Start + 1;

						$(document).ready(ShowmoreUpcom(Start));
					}
				});
			}

	    });
	}
});

//Categories Page
$(document).on("pageshow","#Categories",function(){

	$(document).ready(loading);
	//$('.listitems').empty();

	$.ajax({
        url: "https://stkittsnevisegovernmentplatform-test.mendixcloud.com/rest/wsc_geteventcategories/?contenttype=json",
        //https://stkittsnevisegovernmentplatform-test.mendixcloud.com/rest/wsc_getevents/?contenttype=json
        //data: {q : 'Van Gogh'},
        xhrFields: {
            // The 'xhrFields' property sets additional fields on the XMLHttpRequest.
            // This can be used to set the 'withCredentials' property.
            // Set the value to 'true' if you'd like to pass cookies to the server.
            // If this is enabled, your server must respond with the header
            // 'Access-Control-Allow-Credentials: true'.
            withCredentials: true
        },
    }).then(function(data) {
        var totalrec = data.eventCategoriesObjects.length;
        /*if(totalrec > 10){
            var totalrec = 10;
        }*/
        var finishid = totalrec - 1;
        for (var i = 0; i < totalrec; i++) {
            var title = data.eventCategoriesObjects[i].categoryName,
                Descr = data.eventCategoriesObjects[i].categoryDescription;
                
            
            $('.Catslistitems').append('<li><a href="groupevents.html?CatType=Categories&Cats='+title+'" class="ui-btn ui-btn-icon-right ui-icon-carat-r">'+title+'</a></li>');
            
            
        };

        $('#overlay').remove();
    });
});


//Departments Page
$(document).on("pageshow","#Departments",function(){

	$(document).ready(loading);
	//$('.listitems').empty();

	$.ajax({
        url: "https://stkittsnevisegovernmentplatform-test.mendixcloud.com/rest/wsc_getdepartments/?contenttype=json",
        //https://stkittsnevisegovernmentplatform-test.mendixcloud.com/rest/wsc_getevents/?contenttype=json
        //data: {q : 'Van Gogh'},
        xhrFields: {
            // The 'xhrFields' property sets additional fields on the XMLHttpRequest.
            // This can be used to set the 'withCredentials' property.
            // Set the value to 'true' if you'd like to pass cookies to the server.
            // If this is enabled, your server must respond with the header
            // 'Access-Control-Allow-Credentials: true'.
            withCredentials: true
        },
    }).then(function(data) {
        var totalrec = data.departments.length,
        	PerPage = 20,
			finishid = PerPage - 1,
			Start = 0;

		$(document).ready(ShowmoreDep(Start));

		function ShowmoreDep(amount){
			var run = 'true';
			var EndTo = amount + PerPage;

			if(EndTo > totalrec){
				var sub = EndTo - totalrec;
					PerPage = PerPage  - sub;
			}

			if(amount > totalrec){run = 'false';}
			if(run == 'true'){
				//alert('run');
				for (var i = 0; i < PerPage; i++) {
		            var title = data.departments[amount].name,
		                Descr = data.departments[amount].summary;
		                
		            
		            $('.DepartmentListing').append('<li><a href="groupevents.html?CatType=Departments&Dep='+title+'" class="ui-btn ui-btn-icon-right ui-icon-carat-r">'+title+'</a></li>');

		            var amount = amount + 1;
		        };

				$('#overlay').remove();
			}

			
		}

		var ActivePageN = $.mobile.activePage.attr('id');

		if(ActivePageN == 'Departments'){
			$(document).bind("scrollstop", function() {
				if($(window).scrollTop() + $(window).height() == $(document).height()) {
					//alert("end of page");

					var Start = $( ".DepartmentListing li" ).length,
						Start = Start + 1;

					$(document).ready(ShowmoreDep(Start));
				}
			});
		}
    });
});

//Ministries Page
$(document).on("pageshow","#Ministries",function(){

	$(document).ready(loading);
	//$('.listitems').empty();

	$.ajax({
        url: "https://stkittsnevisegovernmentplatform-test.mendixcloud.com/rest/wsc_getministries/?contenttype=json",
        //https://stkittsnevisegovernmentplatform-test.mendixcloud.com/rest/wsc_getevents/?contenttype=json
        //data: {q : 'Van Gogh'},
        xhrFields: {
            // The 'xhrFields' property sets additional fields on the XMLHttpRequest.
            // This can be used to set the 'withCredentials' property.
            // Set the value to 'true' if you'd like to pass cookies to the server.
            // If this is enabled, your server must respond with the header
            // 'Access-Control-Allow-Credentials: true'.
            withCredentials: true
        },
    }).then(function(data) {
        var totalrec = data.ministries.length,
        	PerPage = 20,
			finishid = PerPage - 1,
			Start = 0;

		$(document).ready(ShowmoreMin(Start));

		function ShowmoreMin(amount){
			var run = 'true';
			var EndTo = amount + PerPage;

			if(EndTo > totalrec){
				var sub = EndTo - totalrec;
					PerPage = PerPage  - sub;
			}

			if(amount > totalrec){run = 'false';}
			if(run == 'true'){
				//alert('run');
				for (var i = 0; i < PerPage; i++) {
		            var title = data.ministries[amount].name,
		                Descr = data.ministries[amount].summary;
		                
		            
		            $('.MinistryListingPH').append('<li><a href="groupevents.html?CatType=Ministries&Min='+title+'" class="ui-btn ui-btn-icon-right ui-icon-carat-r">'+title+'</a></li>');

		            

		            var amount = amount + 1;
		        };

		        $('#overlay').remove();
				
			}

			
		}

		var ActivePageN = $.mobile.activePage.attr('id');

		if(ActivePageN == 'Ministries'){
			$(document).bind("scrollstop", function() {
				if($(window).scrollTop() + $(window).height() == $(document).height()) {
					//alert("end of page");

					var Start = $( ".MinistryListingPH li" ).length,
						Start = Start + 1;

					$(document).ready(ShowmoreMin(Start));
				}
			});
		}
    });
});


//Group Event Listing Page
$(document).on("pageshow","#GroupEvents",function(){
	
	//alert("pageshow event fired - detailspage is now shown");
	
	$(document).ready(loading);

	var CatType = getQueryVariable('CatType'),
		CatType = decodeURI(CatType);

	if(CatType == 'Ministries'){
		var SearchParam = getQueryVariable('Min'),
			SearchParamz = decodeURI(SearchParam),

			ServiceUrl = 'https://stkittsnevisegovernmentplatform-test.mendixcloud.com/rest/wsc_geteventsforministry/?contenttype=json&ministry='+SearchParam+'';
	}
	else if(CatType == 'Departments'){
		var SearchParam = getQueryVariable('Dep'),
			SearchParamz = decodeURI(SearchParam),
			ServiceUrl = 'https://stkittsnevisegovernmentplatform-test.mendixcloud.com/rest/wsc_geteventsfordepartment/?contenttype=json&department='+SearchParam+'';
	}
	else if(CatType == 'Categories'){
		var SearchParam = getQueryVariable('Cats'),
			SearchParamz = decodeURI(SearchParam),
			ServiceUrl = 'https://stkittsnevisegovernmentplatform-test.mendixcloud.com/rest/wsc_geteventsforcategory/?contenttype=json&category='+SearchParam+'';
	}

	//alert('3');
	$.ajax({
		url: ServiceUrl,
		//data: {searchtitle : EventTitle},
		xhrFields: {
		// The 'xhrFields' property sets additional fields on the XMLHttpRequest.
		// This can be used to set the 'withCredentials' property.
		// Set the value to 'true' if you'd like to pass cookies to the server.
		// If this is enabled, your server must respond with the header
		// 'Access-Control-Allow-Credentials: true'.
		withCredentials: true
	},
	}).then(function(data) {
		var totalrec = data.eventsObjects.length;

		var finishid = totalrec - 1;

		$('.EventHeader').append('Events for '+SearchParamz);
		
		if(totalrec < 15){$('.SearchEventsInput').css('display', 'none');}
		if(totalrec == 0){
			$('.GroupEventlistitems').append('<li><a href="" data-transition="slide" class="EventListItem ui-btn ui-btn-icon-right ui-icon-carat-r"><h3>No Events</h3></a></li>');
			$('#overlay').remove();

		}
		else{
			for (var i = 0; i < totalrec; i++) {
				var title = data.eventsObjects[i].title,
				EventDate = new Date(data.eventsObjects[i].startDate),
				EventDate = EventDate.toDateString(),
				Details = data.eventsObjects[i].pageContent,
				Category = data.eventsObjects[i].eventCategories.categoryName;

				//alert(EventMins);
				//alert(EventDeps);
				if (data.eventsObjects[i].endDate != null) {
	            	var EndDate = new Date(data.eventsObjects[i].endDate),
	            		EndDate = EndDate.toDateString(),
	            		Blank = ' - ',
	            		DateDisplay = EventDate.concat(Blank,EndDate);
	            }
	            else{
	            	DateDisplay = EventDate;
	            }

				$('.GroupEventlistitems').append('<li><a id="'+i+'" href="details.html?Title='+ title +'" data-transition="slide" class="EventListItem ui-btn ui-btn-icon-right ui-icon-carat-r"><h3>'+ title +'</h3><p>'+ DateDisplay +'</p></a></li>');

				
			};

			$('#overlay').remove();
		}
	});
});

$(document).on("pageshow","#CalendarView",function(){

	function formatDate(date) {
	    var d = new Date(date),
	        month = '' + (d.getMonth() + 1),
	        day = '' + d.getDate(),
	        year = d.getFullYear();

	    if (month.length < 2) month = '0' + month;
	    if (day.length < 2) day = '0' + day;

	    return [year, month, day].join('-');
	}

	//$(document).ready(loading);

	//alert('before');
	$.ajax({
		url: 'https://stkittsnevisegovernmentplatform-test.mendixcloud.com/rest/wsc_getevents/?contenttype=json',
		data: {forcalendar : true},
		xhrFields: {
		// The 'xhrFields' property sets additional fields on the XMLHttpRequest.
		// This can be used to set the 'withCredentials' property.
		// Set the value to 'true' if you'd like to pass cookies to the server.
		// If this is enabled, your server must respond with the header
		// 'Access-Control-Allow-Credentials: true'.
		withCredentials: true
	},
	}).then(function(data) {
		var totalrec = data.eventsObjects.length;
		var finishid = totalrec - 1;

		var CalDataString = null;
		var events = [];
		for (var i = 0; i < totalrec; i++) {
			//if(i == 0){var CalDataString = '['}
			
			var title = data.eventsObjects[i].title,
			EventDate = formatDate(data.eventsObjects[i].startDate);

			if (data.eventsObjects[i].endDate != null) {
            	var EndDate = formatDate(data.eventsObjects[i].endDate);
            		//EndDate = EndDate.toDateString();
            }
            else{
            	var EndDate = '';
            }

			// if(i == finishid){
			// 	CalDataString = CalDataString + '{ title: '+title+', start: '+EventDate+' }';	
			// 	//$('#testzzz').append(CalDataString);
			// }	
			// else{
			// 	CalDataString = CalDataString + '{ title: '+title+', start: '+EventDate+'},';	
			// }

			events.push({
                title: title,
                start: EventDate,
                end: EndDate
            });

		};

		$(document).ready(function() {
	    	//alert('ready');
	    	//CalDataString = String(CalDataString);
	        $('#calendarz').fullCalendar({
	            defaultDate: new Date(),
	            header: {
					left: 'prev,next today',
					right: 'title'
					//right: 'month,agendaWeek,agendaDay'
				},
				eventClick: function(calEvent, jsEvent, view) {
                    //alert('Event: ' + calEvent.title);
                    //window.open('details.html?Title='+calEvent.title+'','_self');
                    $.mobile.navigate( 'details.html?Title='+calEvent.title );
                },
    //             loading: function(bool) {
    //             	alert(bool);
				// 	$('#overlay').toggle('fast',bool);
				// },
	            editable: false,
	            eventLimit: true, // allow "more" link when too many events
	            events: events,
	            eventBackgroundColor: 'black', 
                eventTextColor: 'white'
	        });

	        //$('#overlay').remove();
	    });

	});
    
});

//Search Listing Page
$(document).on("pageshow","#SearchEvents",function(){
	
	//alert("pageshow event fired - detailspage is now shown");
	
	$(document).ready(loading);

	var EventTitle = getQueryVariable('Title'),
		EventTitle = decodeURI(EventTitle),
		ServiceUrl = 'https://stkittsnevisegovernmentplatform-test.mendixcloud.com/rest/wsc_getevents/?contenttype=json';
	

	//alert('3');
	$.ajax({
		url: ServiceUrl,
		data: {searchtitle : EventTitle},
		xhrFields: {
		// The 'xhrFields' property sets additional fields on the XMLHttpRequest.
		// This can be used to set the 'withCredentials' property.
		// Set the value to 'true' if you'd like to pass cookies to the server.
		// If this is enabled, your server must respond with the header
		// 'Access-Control-Allow-Credentials: true'.
		withCredentials: true
	},
	}).then(function(data) {
		var totalrec = data.eventsObjects.length;
		if(PerPage > totalrec){
			var PerPage = totalrec;
		}
		else{
			var PerPage = 20;
		}
		var	finishid = PerPage - 1,
			Start = 0;

		$('.ResultHeader').append('Showing results for "'+EventTitle+'"');


		if(totalrec == 0){
			$('.resultlistitems').append('<li><a href="" data-transition="slide" class="EventListItem ui-btn ui-btn-icon-right ui-icon-carat-r"><h3>No Events</h3></a></li>');
			$('#overlay').remove();
		}
		else{
			$(document).ready(ShowmoreRes(Start));
		}

		function ShowmoreRes(amount){
			var run = 'true';
			var EndTo = amount + PerPage;

			if(EndTo > totalrec){
				var sub = EndTo - totalrec;
					PerPage = PerPage  - sub;
			}

			if(amount > totalrec){run = 'false';}
			if(run == 'true'){
				//alert('run');
				for (var i = 0; i < PerPage; i++) {
					var title = data.eventsObjects[amount].title,
					EventDate = new Date(data.eventsObjects[amount].startDate),
					EventDate = EventDate.toDateString();

					//alert(EventMins);
					//alert(EventDeps);
					if (data.eventsObjects[i].endDate != null) {
		            	var EndDate = new Date(data.eventsObjects[amount].endDate),
		            		EndDate = EndDate.toDateString(),
		            		Blank = ' - ',
		            		DateDisplay = EventDate.concat(Blank,EndDate);
		            }
		            else{
		            	DateDisplay = EventDate;
		            }

					$('.resultlistitems').append('<li><a id="'+i+'" href="details.html?Title='+ title +'" data-transition="slide" class="EventListItem ui-btn ui-btn-icon-right ui-icon-carat-r"><h3>'+ title +'</h3><p>'+ DateDisplay +'</p></a></li>');

					var amount = amount + 1;
				};

				$('#overlay').remove();
			}

			
		}

		var ActivePageN = $.mobile.activePage.attr('id');

		if(ActivePageN == 'SearchEvents'){
			$(document).bind("scrollstop", function() {
				if($(window).scrollTop() + $(window).height() == $(document).height()) {
					//alert("end of page");

					var Start = $( ".resultlistitems li" ).length,
						Start = Start + 1;

					$(document).ready(ShowmoreRes(Start));
				}
			});
		}
	});
});

$(document).on("pageshow","#CategoriesListing",function(){
	alert('Listing');
});
