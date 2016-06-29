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

function AddEvent(){
    
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

	// click on the overlay to remove it
	//$('#overlay').click(function() {
	//    $(this).remove();
	//});

	// hit escape to close the overlay
	//$(document).keyup(function(e) {
	//	if (e.which === 27) {
	//		$('#overlay').remove();
	//	}
	//});
};

var EventTitle = getQueryVariable('Title'),
	EventTitle = decodeURI(EventTitle);

// var LoadContent = $.ajax({
// 	url: "https://stkittsnevisegovernmentplatform-test.mendixcloud.com/rest/wsc_getevents/?contenttype=json",
// 	data: {searchtitle : EventTitle},
// 	xhrFields: {
// 	// The 'xhrFields' property sets additional fields on the XMLHttpRequest.
// 	// This can be used to set the 'withCredentials' property.
// 	// Set the value to 'true' if you'd like to pass cookies to the server.
// 	// If this is enabled, your server must respond with the header
// 	// 'Access-Control-Allow-Credentials: true'.
// 	withCredentials: true
// },
// }).then(function(data) {
// 	var totalrec = data.eventsObjects.length,
// 		finishid = PerPage - 1,
// 		PerPage = 10,
// 		Pages = totalrec / PerPage;

// 	for (var i = 1; i <= Pages; i++) {
// 		$('.Pages').append('<li><a id="'+i+'" class="PageClickOff">'+i+'</a></li>');
// 	};

// 	for (var i = 0; i < totalrec; i++) {
// 		alert(totalrec);
// 		var title = data.eventsObjects[i].title,
// 		EventDate = new Date(data.eventsObjects[i].startDate),
// 		EventDate = EventDate.toDateString(),
// 		Details = data.eventsObjects[i].pageContent,
// 		Category = data.eventsObjects[i].eventCategory,
// 		EventImg = data.eventsObjects[i].flyerFull;

// 		if (data.eventsObjects[i].endDate != null) {
//         	var EndDate = new Date(data.eventsObjects[i].endDate),
//         		EndDate = EndDate.toDateString(),
//         		Blank = ' - ',
//         		DateDisplay = EventDate.concat(Blank,EndDate);
//         }
//         else{
//         	DateDisplay = EventDate;
//         }

// 		$('.listitems').append('<li><a id="'+i+'" href="details.html?Title='+ title +'" data-transition="slide" class="EventListItem ui-btn ui-btn-icon-right ui-icon-carat-r"><h3>'+ title +'</h3><p>'+ DateDisplay +'</p></a></li>');

// 		if(i == finishid){
// 			$('#overlay').remove();
// 			//alert('done');
// 		}
// 	};
// });

// $(document).on("pageshow",function(){
// 	//alert('page show');
// 	if ( $.mobile.activePage.jqmData( "panel" ) !== "open" ) {
// 		$("body").on("swipeleft",function(){
// 			//alert('swipe left');
//             $( "#myPanel" ).panel( "open" );
// 		});
//     }
// });	

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
		MenuItems = MenuItems + '<li><a href="categories.html" data-transition="flip" class="ui-btn ui-btn-icon-right ui-icon-carat-r">Categories</a></li>';
		MenuItems = MenuItems + '<li><a href="ministries.html" data-transition="flip" class="ui-btn ui-btn-icon-right ui-icon-carat-r">Ministries</a></li>';
		MenuItems = MenuItems + '<li><a href="departments.html" data-transition="flip" class="ui-btn ui-btn-icon-right ui-icon-carat-r">Departments</a></li>';
		MenuItems = MenuItems + '<li><a href="featuredevents.html" data-transition="flip" class="ui-btn ui-btn-icon-right ui-icon-carat-r">Featured Events</a></li>';
		MenuItems = MenuItems + '<li><a href="calendarview.html" data-transition="flip" class="ui-btn ui-btn-icon-right ui-icon-carat-r">Calendar View</a></li>';
    
		$( "#"+ActivePageN+" .PanelItems" ).append(MenuItems);
	}
	else{
		//alert($( ".PanelItems" ).html());
	}


	$( "#"+ActivePageN+" .MyFooter h1" ).html("Copyright 2016 &copy;");
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

			if(i == finishid){
				$('#overlay').remove();
			}
		};
	});
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

			if(i == finishid){
				$('#overlay').remove();
				//alert('done');
			}
		};
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

		$(document).ready(Showmore(Start));

		function Showmore(amount){
			var run = 'true';
			if(run == 'true'){
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

					if(i == finishid){
						$('#overlay').remove();
						//alert('done');
					}

					var amount = amount + 1;
				};
			}

			
		}

		$(document).bind("scrollstop", function() {
			if($(window).scrollTop() + $(window).height() == $(document).height()) {
				alert("end of page");

				var Start = $( ".Eventlistitems li" ).length,
					Start = Start + 1;

				$(document).ready(Showmore(Start));
			}
		});

		
	});

	
});

//Home Page
$(document).on("pageshow","#HomePage",function(){

	if($( "#HomePage .listitems" ).has( "li" ).length == 0){
		//alert("hi");
		
		$(document).ready(loading);
		//$('.listitems').empty();

		$.ajax({
	        url: "https://stkittsnevisegovernmentplatform-test.mendixcloud.com/rest/wsc_getevents/?contenttype=json",
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
		                
	            	$('.featlist').append('<li class="featlistitems"><a id="'+i+'" href="details.html?Title='+ title +'" data-transition="slide"><img src="'+imgthumb+'" width="100" height="100"><h3 style="margin-top:5px;">'+title+'</h3><p>'+ DateDisplay +'</p</a></li>');
		            
		            if(i == finishid){
		                $(".featlistitems").on("swipeleft",function(){
				            var FeatAmt = $( ".featlistitems" ).has( "li" ).length,
				                id = this.id,
				                nextid = id + 1;

				            if($(this).is(':last-child') == false){
				                $(this).hide("fast", function(){
				                    $(this).next().fadeIn();
				                });
				            }
				        });

				        $(".featlistitems").on("swiperight",function(){
				            var FeatAmt = $( ".featlistitems" ).has( "li" ).length,
				                id = this.id,
				                nextid = id + 1;

				            if($(this).is(':first-child') == false){
				                $(this).hide("fast", function(){
				                    $(this).prev().fadeIn();
				                });
				            }
				        });
		            }
		        };
		    });
	        var totalrec = 10; //data.eventsObjects.length;
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
	                
	            // if(i <= 4){
	            // 	$('.featlist').append('<li class="featlistitems"><a id="'+i+'" href="details.html?Title='+ title +'" data-transition="slide"><img src="'+imgthumb+'" width="100" height="100"><h3 style="margin-top:5px;">'+title+'</h3><p>'+ DateDisplay +'</p</a></li>');
	            // };
	            
	            $('.listitems').append('<li><a id="'+i+'" href="details.html?Title='+ title +'" data-transition="slide" class="EventListItem ui-btn ui-btn-icon-right ui-icon-carat-r"><h3>'+ title +'</h3><p>'+ DateDisplay +'</p></a></li>');
	            
	            if(i == finishid){
	                $('#overlay').remove();
	                //alert('done');
	          //       $(".featlistitems").on("swipeleft",function(){
			        //     var FeatAmt = $( ".featlistitems" ).has( "li" ).length,
			        //         id = this.id,
			        //         nextid = id + 1;

			        //     if($(this).is(':last-child') == false){
			        //         $(this).hide("fast", function(){
			        //             $(this).next().fadeIn();
			        //         });
			        //     }
			        // });

			        // $(".featlistitems").on("swiperight",function(){
			        //     var FeatAmt = $( ".featlistitems" ).has( "li" ).length,
			        //         id = this.id,
			        //         nextid = id + 1;

			        //     if($(this).is(':first-child') == false){
			        //         $(this).hide("fast", function(){
			        //             $(this).prev().fadeIn();
			        //         });
			        //     }
			        // });
	            }
	        };
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
            
            if(i == finishid){
                $('#overlay').remove();
                //alert('done');
            }
        };
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
        var totalrec = data.departments.length;
        /*if(totalrec > 10){
            var totalrec = 10;
        }*/
        var finishid = totalrec - 1;
        for (var i = 0; i < totalrec; i++) {
            var title = data.departments[i].name,
                Descr = data.departments[i].summary;
                
            
            $('.DepartmentListing').append('<li><a href="groupevents.html?CatType=Departments&Dep='+title+'" class="ui-btn ui-btn-icon-right ui-icon-carat-r">'+title+'</a></li>');

            if(i == finishid){
                $('#overlay').remove();
                //alert('done');
            }
        };
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
        var totalrec = data.ministries.length;
        /*if(totalrec > 10){
            var totalrec = 10;
        }*/
        var finishid = totalrec - 1;
        for (var i = 0; i < totalrec; i++) {
            var title = data.ministries[i].name,
                Descr = data.ministries[i].summary;
                
            
            $('.MinistryListingPH').append('<li><a href="groupevents.html?CatType=Ministries&Min='+title+'" class="ui-btn ui-btn-icon-right ui-icon-carat-r">'+title+'</a></li>');

            if(i == finishid){
                $('#overlay').remove();
                //alert('done');
            }
        };
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

				if(i == finishid){
					$('#overlay').remove();
				}
			};
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

	//alert('before');
	$.ajax({
		url: 'https://stkittsnevisegovernmentplatform-test.mendixcloud.com/rest/wsc_getevents/?contenttype=json',
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

		var CalDataString = null;
		
		for (var i = 0; i < totalrec; i++) {
			//if(i == 0){var CalDataString = '['}
			
			var title = data.eventsObjects[i].title,
			EventDate = formatDate(data.eventsObjects[i].startDate);

			if (data.eventsObjects[i].endDate != null) {
            	var EndDate = new Date(data.eventsObjects[i].endDate),
            		EndDate = EndDate.toDateString();
            }
            else{
            	DateDisplay = EventDate;
            }

			if(i == finishid){
				CalDataString = CalDataString + '{ title: "'+title+'", start: "'+EventDate+'" }';	
				//$('#testzzz').append(CalDataString);
			}	
			else{
				CalDataString = CalDataString + '{ title: "'+title+'", start: "'+EventDate+'"},';	
			}

		};

		$(document).ready(function() {
	    	//alert('ready');
	    	CalDataString = String(CalDataString);
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
                loading: function(bool) {
					$('#loadingcal').toggle(bool);
				},
	            editable: false,
	            eventLimit: true, // allow "more" link when too many events
	            events: [{ title: "Agriculture open day 2016", start: "2016-03-17"},{ title: "Annual planning and review meeting.... adam", start: "2016-03-24"},{ title: "Annual tree planting", start: "2016-09-17"},{ title: "Blood Drive", start: "2016-06-11"},{ title: "Breast Feeding Week", start: "2016-08-01"},{ title: "Christmas Day", start: "2015-12-25"},{ title: "Class Begins", start: "2016-10-07"},{ title: "Commencement of Heats", start: "2016-01-11"},{ title: "Commonwealth Day Programme", start: "2016-03-14"},{ title: "Community Outreach", start: "2016-01-29"},{ title: "Eat local day", start: "2016-07-01"},{ title: "End of Term Test - St. Pauls Primary School", start: "2016-03-21"},{ title: "FAO World food day", start: "2016-10-24"},{ title: "Fishers and Farmers annual prize giving ceremony", start: "2016-10-01"},{ title: "Free Eye Screening", start: "2016-10-14"},{ title: "Fun Biking", start: "2016-03-06"},{ title: "Grade 6 Quiz - Dr. william Connor Primary", start: "2016-06-02"},{ title: "GradeSic Parents' Meeting (Test of Standard)", start: "2016-04-21"},{ title: "Graduation", start: "2016-07-04"},{ title: "Graduation", start: "2016-07-05"},{ title: "Graduation -", start: "2016-07-05"},{ title: "Holiday - Whit Monday", start: "2016-05-30"},{ title: "Independence Blood Drive", start: "2016-09-10"},{ title: "Internantional Day of Parents", start: "2016-06-01"},{ title: "International Day for Eliminating Violence to Women", start: "2016-11-25"},{ title: "International Day for the Eradication of Poverty", start: "2016-10-17"},{ title: "International Day of Families", start: "2016-05-15"},{ title: "International Day of Older Persons", start: "2016-10-01"},{ title: "International Day of Persons with Disabilities", start: "2015-12-03"},{ title: "International Human Rights Day", start: "2015-12-10"},{ title: "International Men's Day", start: "2016-10-19"},{ title: "International Testing Day", start: "2016-06-24"},{ title: "International Women's Day", start: "2016-03-08"},{ title: "Laboratory Professionals Week", start: "2016-04-25"},{ title: "Last Lap", start: "2016-01-02"},{ title: "Legal Aid Clinic", start: "2016-02-15"},{ title: "Legal Aid Clinic", start: "2016-03-15"},{ title: "Legal Aid Clinic", start: "2016-04-14"},{ title: "Medal Presentation - Dr. William Connor Primary", start: "2016-03-30"},{ title: "Medals and Trophies Presentation", start: "2016-05-13"},{ title: "National Testing Day", start: "2016-12-16"},{ title: "New Years Day", start: "2016-01-01"},{ title: "NO VAT on commercial vehicles", start: "2016-11-11"},{ title: "Nurses Day", start: "2016-05-12"},{ title: "Nurses Week", start: "2016-05-08"},{ title: "OAS Regional National Drug Policy Workshop", start: "1969-12-31"},{ title: "Port State Annual Meeting", start: "1969-12-31"},{ title: "Port State Annual Training", start: "1969-12-31"},{ title: "Primary Schools Championship", start: "2016-03-12"},{ title: "Primary Schools Championship", start: "2016-03-13"},{ title: "Prize Giving", start: "2016-07-06"},{ title: "Road Safety Summit", start: "2015-11-27"},{ title: "School Closes", start: "2016-07-08"},{ title: "School Closes (All Schools)", start: "2016-04-01"},{ title: "School Reopens", start: "2016-01-04"},{ title: "School Re-opens", start: "2016-04-18"},{ title: "Sports Day- Dr. William Connor Primary", start: "2016-02-25"},{ title: "Sports Day St. Pauls Primary School", start: "2016-03-05"},{ title: "Staff Development (Language Resourced Teacher)", start: "2016-02-10"},{ title: "Staff Development (Mathematics Resourced Teacher)", start: "2016-01-28"},{ title: "Staff Development (Science Resourced Teacher)", start: "2016-02-04"},{ title: "Staff Development (Social Studies)", start: "2016-04-28"},{ title: "Staff Development (Social Studies Resourced Teacher)", start: "2016-02-18"},{ title: "Steeple Chase", start: "2016-02-19"},{ title: "Steeple Chase/Cross Country", start: "2016-02-19"},{ title: "Sugar Mass Blood Drive", start: "2016-12-10"},{ title: "Surgical Ward Symposium", start: "1969-12-31"},{ title: "test event", start: "2016-03-19"},{ title: "test Event", start: "2016-03-09"},{ title: "Testing event", start: "2016-02-13"},{ title: "Testing featured event", start: "2016-02-13"},{ title: "Test of Standards (Language Arts)", start: "2016-06-07"},{ title: "Test of Standards ( Mathematics)", start: "2016-06-09"},{ title: "Test of Standards (Science)", start: "2016-06-15"},{ title: "Test of Standards (Social Studies)", start: "2016-06-14"},{ title: "Training and Certification of Programme for Drug and Violence Prevention, Treatment and Rehabilitation", start: "2016-02-13"},{ title: "Universal Children's Day", start: "2016-11-20"},{ title: "Vacation Week of the Americas", start: "2016-04-23"},{ title: "Walk-A-Thon", start: "2016-02-12"},{ title: "Walk to Learn", start: "2016-05-06"},{ title: "Wellness Week", start: "2016-09-12"},{ title: "World Aids Day", start: "2016-12-01"},{ title: "World Aids Day March", start: "2016-12-02"},{ title: "World Cancer Day", start: "2016-02-04"},{ title: "World Diabetes Day", start: "2016-11-14"},{ title: "World Environmental Health Day", start: "2016-06-05"},{ title: "World Fight Day", start: "2016-10-12"},{ title: "World Glaucoma Day", start: "2016-03-12"},{ title: "World Glaucoma Week of Activities", start: "2016-03-06"},{ title: "World Health Day", start: "2016-04-07"},{ title: "World Hepatitis Day", start: "2016-07-28"},{ title: "World Hypertension Day", start: "2016-05-17"},{ title: "World Maritime Day", start: "1969-12-31"},{ title: "World Mental Health Day", start: "2016-10-10"},{ title: "World Polio Day", start: "2016-10-24"},{ title: "World Post Day", start: "2016-10-09"},{ title: "World TB Day", start: "2016-03-24"},{ title: "World Water Day", start: "2016-03-22" }],
	            eventBackgroundColor: 'black', 
                eventTextColor: 'white'
	        });
	    });

	});
    
});

//Group Event Listing Page
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

		var finishid = totalrec - 1;

		$('.ResultHeader').append('Showing results for "'+EventTitle+'"');
		
		if(totalrec == 0){
			$('.resultlistitems').append('<li><a href="" data-transition="slide" class="EventListItem ui-btn ui-btn-icon-right ui-icon-carat-r"><h3>No Events</h3></a></li>');
			$('#overlay').remove();
		}
		else{
			for (var i = 0; i < totalrec; i++) {
				var title = data.eventsObjects[i].title,
				EventDate = new Date(data.eventsObjects[i].startDate),
				EventDate = EventDate.toDateString();

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

				$('.resultlistitems').append('<li><a id="'+i+'" href="details.html?Title='+ title +'" data-transition="slide" class="EventListItem ui-btn ui-btn-icon-right ui-icon-carat-r"><h3>'+ title +'</h3><p>'+ DateDisplay +'</p></a></li>');

				if(i == finishid){
					$('#overlay').remove();
				}
			};
		}
	});
});

$(document).on("pageshow","#CategoriesListing",function(){
	alert('Listing');
});
