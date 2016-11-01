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
		MenuItems = MenuItems + '<li><a href="allevents.html" data-transition="flip" class="Evz ui-btn ui-btn-icon-right ui-icon-carat-r">All Events</a></li>';
		MenuItems = MenuItems + '<li><a href="featuredevents.html" data-transition="flip" class="ui-btn ui-btn-icon-right ui-icon-carat-r">Featured Events</a></li>';
		MenuItems = MenuItems + '<li><a href="ministries.html" data-transition="flip" class="ui-btn ui-btn-icon-right ui-icon-carat-r">Ministries</a></li>';
		MenuItems = MenuItems + '<li><a href="departments.html" data-transition="flip" class="ui-btn ui-btn-icon-right ui-icon-carat-r">Departments</a></li>';
		MenuItems = MenuItems + '<li><a href="calendarview.html" data-transition="flip" class="ui-btn ui-btn-icon-right ui-icon-carat-r">Calendar View</a></li>';
    
		$( "#"+ActivePageN+" .PanelItems" ).append(MenuItems);
	}
	else{
		//alert($( ".PanelItems" ).html());
	}

	$( "#"+ActivePageN+" .MyFooter h1" ).html("Copyright gov.kn 2016 &copy;");

});

//Details Page
$(document).on("pageshow","#detailspage",function(){
	
	//alert("pageshow event fired - detailspage is now shown");
	
	$(document).ready(loading);

	var EventTitle = getQueryVariable('Title'),
		EventTitle = decodeURI(EventTitle);

	function addZero(i) {
	    if (i < 10) {
	        i = "0" + i;
	    }
	    return i;
	}

	//alert('3');
	$.ajax({
		url: "https://www.gov.kn/rest/wsc_getevents/?contenttype=json",
		data: {
			searchtitle : EventTitle,
			forcalendar : true
		},
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
			//h = addZero(EventDate.getHours()),
	    	//m = addZero(EventDate.getMinutes()),
			//EventTimeStart = h + ':' + m,
			EventTimeStart = EventDate.toLocaleTimeString(),
			EventDate = EventDate.toDateString(),
			StartTimeDisplay = EventDate.concat(' ',EventTimeStart),
			Details = data.eventsObjects[i].pageContent,
			Category = data.eventsObjects[i].eventCategories.categoryName,
			EventImg = data.eventsObjects[i].flyerFull,
			Base64Img = data.eventsObjects[i].base64,
			EventMins = data.eventsObjects[i].eventMinistries.name,
			EventDeps = data.eventsObjects[i].eventDepartments.name,
			EventLocation = data.eventsObjects[i].location;
			

			if(Base64Img != ''){
				//EventHasImg = 'data:image/jpeg;base64,'+Base64Img;
				EventHasImg = 'data:image;base64,'+Base64Img;
			}
			else{
				EventHasImg = EventImg;
			}

			if (data.eventsObjects[i].endDate != null) {
            	var EndDate = new Date(data.eventsObjects[i].endDate),
	            	//h = addZero(EndDate.getHours()),
		    		//m = addZero(EndDate.getMinutes()),
            		//EventTimeEnd = h + ':' + m,
            		EventTimeEnd = EndDate.toLocaleTimeString(),
            		EndDate = EndDate.toDateString(),
            		Blank = ' - ',
            		EndTimeDisplay = EventTimeStart.concat(Blank,EventTimeEnd),
            		EndDateDisplay = EndDate.concat(' ',EventTimeEnd);

            		$('.EventDateTo').append(EndDateDisplay);
            }
            else{
            	DateDisplay = EventDate;
            	TimeDisplay = EventTimeStart;
            	$('.EventDateTo').hide();
            }

			$('.EventTitle').append(title);
			$('.EventDateFrom').append(StartTimeDisplay);

			//$('.EventTime').append(TimeDisplay);
			
			if(EventLocation != ''){
				$('.EventLocation').append(EventLocation);
			}
			else{
				$('.EventLocation').hide();
			}
			
			$('.EventCategory').append(Category);
			$('.EventDetails').append(Details);
			$('.Ministries').append(EventMins);
			$('.Departments').append(EventDeps);
			$('.EventFlyer').attr('src', EventHasImg);

		};

		$('#overlay').remove();
	});

});
//FeaturedEvents
$(document).on("pageshow","#FeaturedEvents",function(){
	
	$(document).ready(loading);

	var EventTitle = getQueryVariable('Title'),
		EventTitle = decodeURI(EventTitle);

	//alert('3');

	$.ajax({
		url: "https://www.gov.kn/rest/wsc_geteventsfeatured?contenttype=json",
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
	var ActivePageN = $.mobile.activePage.attr('id'),
		ActivePageC = $.mobile.activePage.attr('class');
	//alert("pageshow event fired - events is now shown");
	$( "#autocompleteall" ).on( "filterablebeforefilter", function ( e, data ) {
        var $ol = $( this ),
            $input = $( data.input ),
            value = $input.val(),
            html = "",
            origlist = $('.Eventlistitems');
        $ol.html( "" );
        if ( value && value.length > 2 ) {
            $(document).ready(loading);
            $ol.listview( "refresh" );
            $.ajax({
                url: "https://www.gov.kn/rest/wsc_getevents/?contenttype=json",
                dataType: "json",
                crossDomain: true,
                data: {
                    searchtitle: $input.val()
                }
            })
            .then( function ( data ) {
            	PerPage= data.eventsObjects.length;
                // $.each( response, function ( i, val ) {
                //     html += "<li>" + val + "</li>";
                // });
                for (var i = 0; i < PerPage; i++) {
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

			        html += '<li><a href="details.html?Title='+ title +'" data-transition="slide" class="EventListItem ui-btn ui-btn-icon-right ui-icon-carat-r"><h3>'+ title +'</h3><p>'+ DateDisplay +'</p></a></li>';
				};
				origlist.hide();
				$('#overlay').remove();
                $ol.html( html );
                $ol.listview( "refresh" );
                $ol.trigger( "updatelayout");
            });
        }
        else{
        	origlist.show();
        }
    });

	$(document).ready(loading);

	$.ajax({
		url: "https://www.gov.kn/rest/wsc_getevents/?contenttype=json",
		//data: {searchtitle : EventTitle},
		cache: true,
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
			
			var runev = 'true';
			var EndTo = amount + PerPage;

			if(EndTo > totalrec){
				var sub = EndTo - totalrec;
					PerPage = PerPage  - sub;
			}

			if(amount > totalrec){runev = 'false';}
			
			if(runev == 'true'){
				//alert('display');
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

		
		//alert(ActivePageN);
		if(ActivePageN == 'AllEvents' && $('#'+ActivePageN).hasClass('ui-page-active')){
			//alert('true');
			$(document).bind("scrollstop", function() {
				if($(window).scrollTop() + $(window).height() == $(document).height()) {
					//alert("end of page");
					//alert(ActivePageN +' events');

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
	$( "#autocomplete" ).on( "filterablebeforefilter", function ( e, data ) {
        var $ol = $( this ),
            $input = $( data.input ),
            value = $input.val(),
            html = "";
        $ol.html( "" );
        if ( value && value.length > 2 ) {
            $(document).ready(loading);
            $ol.listview( "refresh" );
            $.ajax({
                url: "https://www.gov.kn/rest/wsc_getevents/?contenttype=json",
                dataType: "json",
                crossDomain: true,
                cache: true,
                data: {
                    searchtitle: $input.val()
                }
            })
            .then( function ( data ) {
            	PerPage= data.eventsObjects.length;
                // $.each( response, function ( i, val ) {
                //     html += "<li>" + val + "</li>";
                // });
                for (var i = 0; i < PerPage; i++) {
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

			        html += '<li><a href="details.html?Title='+ title +'" data-transition="slide" class="EventListItem ui-btn ui-btn-icon-right ui-icon-carat-r"><h3>'+ title +'</h3><p>'+ DateDisplay +'</p></a></li>';
				};
				$('#overlay').remove();
                $ol.html( html );
                $ol.listview( "refresh" );
                $ol.trigger( "updatelayout");
            });
        }
        else{
        	$(document).ready(loading);
            $ol.listview( "refresh" );
            $.ajax({
                url: "https://www.gov.kn/rest/wsc_getevents/?contenttype=json",
                dataType: "json",
                crossDomain: true
            })
            .then( function ( data ) {
            	PerPage= data.eventsObjects.length;
                // $.each( response, function ( i, val ) {
                //     html += "<li>" + val + "</li>";
                // });
                for (var i = 0; i < 10; i++) {
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

			        html += '<li><a href="details.html?Title='+ title +'" data-transition="slide" class="EventListItem ui-btn ui-btn-icon-right ui-icon-carat-r"><h3>'+ title +'</h3><p>'+ DateDisplay +'</p></a></li>';
				};
				$('#overlay').remove();
                $ol.html( html );
                $ol.listview( "refresh" );
                $ol.trigger( "updatelayout");
            });
        }
    });

	if($( "#HomePage #autocomplete" ).has( "li" ).length == 0){
		//alert("hi");
		
		$(document).ready(loading);
		//$('.listitems').empty();

		//Featured Events
		$.ajax({
	        url: "https://www.gov.kn/rest/wsc_geteventsfeatured?contenttype=json",
	        //https://www.gov.kn/rest/wsc_getevents/?contenttype=json
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
	                imgthumb = data.eventsObjects[i].flyerThumbnail,
	                Base64Img = data.eventsObjects[i].base64;

	                if(Base64Img != ''){
						//EventHasImg = 'data:image/jpeg;base64,'+Base64Img;
						//alert('base is here');
						EventHasImg = 'data:image;base64,'+Base64Img;
					}
					else{
						EventHasImg = imgthumb;
					}

	                if (data.eventsObjects[i].endDate != null) {
	                	var EndDate = new Date(data.eventsObjects[i].endDate),
	                		EndDate = EndDate.toDateString(),
	                		Blank = ' - ',
	                		DateDisplay = EventDate.concat(Blank,EndDate);
	                }
	                else{
	                	DateDisplay = EventDate;
	                }
	                
            	$('.featlist').append('<li id="'+i+'" class="featlistitems"><a href="details.html?Title='+ title +'" data-transition="slide"><img src="'+EventHasImg+'" width="100%" height="200"><h3 style="margin-top:5px;">'+title+'</h3><p>'+ DateDisplay +'</p</a></li>');
            	$('.featlistpagination').append('<li id="pz'+i+'" class=""></li>');
	            
	            if(i == finishid){
	            	$('.featlistpagination #pz0').addClass('active');
	            	$('.featlist li:nth-child(1)').addClass('active');

	                $(".featlistitems").on("swipeleft",function(){
			            var FeatAmt = $( ".featlistitems" ).has( "li" ).length,
			                id = this.id,
			                nextid = parseInt(id) + 1;
			            
			            if($(this).is(':last-child') == false){

			            	$('.featlistpagination li').removeClass('active');
			            	$(this).removeClass('active');
			                $(this).fadeOut("fast", function(){
			                    $(this).next().fadeIn();
			                    $(this).next().addClass('active');
			                    $('.featlistpagination #pz'+nextid).addClass('active');
			                });
			            }
			        });


			        $(".featlistitems").on("swiperight",function(){
			            var FeatAmt = $( ".featlistitems" ).has( "li" ).length,
			                id = this.id,
			                nextid = parseInt(id) - 1;
			            
			            if($(this).is(':first-child') == false){

			            	$('.featlistpagination li').removeClass('active');
			            	$(this).removeClass('active');
			                $(this).fadeOut("fast", function(){
			                    $(this).prev().fadeIn();
			                    $(this).prev().addClass('active');
			                    $('.featlistpagination #pz'+nextid).addClass('active');
			                });
			            }
			        });

			        $(".featlistpagination li").on("tap",function(){
			        	if($(this).hasClass('active')){

			        	}
			        	else{
			        		var id = this.id,
			        			id = id[id.length -1],
			        			idshow = parseInt(id) + 1;

			        		$('.featlistpagination li').removeClass('active');
			        		$(this).addClass('active');
			        		$('.featlist li.active').fadeOut('fast' ,function(){
			        			$('.featlist li').removeClass('active');
			                    $('.featlist li:nth-child('+idshow+')').fadeIn('fast' , function(){
			                    	$(this).addClass('active');
			                    });
			                });
			        	}
		        	});
	            }
	        };
	    });

		//Upcoming Events
		$.ajax({
	        url: "https://www.gov.kn/rest/wsc_getevents/?contenttype=json",
	        //https://www.gov.kn/rest/wsc_getevents/?contenttype=json
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

						$('#autocomplete').append('<li><a href="details.html?Title='+ title +'" data-transition="slide" class="EventListItem ui-btn ui-btn-icon-right ui-icon-carat-r"><h3>'+ title +'</h3><p>'+ DateDisplay +'</p></a></li>');

						

						var amount = amount + 1;
					};

					$('#overlay').remove();
				}

				
			}

			// var ActivePageN = $.mobile.activePage.attr('id');
			
			// if(ActivePageN == 'HomePage' && $('#'+ActivePageN).hasClass('ui-page-active')){
			// 	//alert('true');
			// 	$(document).bind("scrollstop", function() {
			// 		if($(window).scrollTop() + $(window).height() == $(document).height()) {
			// 			//alert("end of page");
			// 			//alert(ActivePageN +' home');
			// 			var Start = $( ".listitems li" ).length,
			// 				Start = Start + 1;

			// 			$(document).ready(ShowmoreUpcom(Start));
			// 		}
			// 	});
			// }

	    });
	}
});

//Categories Page
$(document).on("pageshow","#Categories",function(){

	$(document).ready(loading);
	//$('.listitems').empty();

	$.ajax({
        url: "https://www.gov.kn/rest/wsc_geteventcategories/?contenttype=json",
        //https://www.gov.kn/rest/wsc_getevents/?contenttype=json
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

	$( "#autocompletedep" ).on( "filterablebeforefilter", function ( e, data ) {
        var $ol = $( this ),
            $input = $( data.input ),
            value = $input.val(),
            html = "",
            origlist = $('.DepartmentListing');
        $ol.html( "" );
        if ( value && value.length > 2 ) {
            $(document).ready(loading);
            $ol.listview( "refresh" );
            $.ajax({
                url: "https://www.gov.kn/rest/wsc_getdepartments/?contenttype=json",
                dataType: "json",
                crossDomain: true,
                cache: true,
                data: {
                    searchtitle: $input.val()
                }
            })
            .then( function ( data ) {
            	PerPage= data.departments.length;
                // $.each( response, function ( i, val ) {
                //     html += "<li>" + val + "</li>";
                // });
                for (var i = 0; i < PerPage; i++) {
		            var title = data.departments[i].name,
		                Descr = data.departments[i].summary;
		                
		            
		            html += '<li><a href="groupevents.html?CatType=Departments&Dep='+title+'" class="ui-btn ui-btn-icon-right ui-icon-carat-r">'+title+'</a></li>';

		        };
				origlist.hide();
				$('#overlay').remove();
                $ol.html( html );
                $ol.listview( "refresh" );
                $ol.trigger( "updatelayout");
            });
        }
        else{
        	origlist.show();
        }
    });

	$.ajax({
        url: "https://www.gov.kn/rest/wsc_getdepartments/?contenttype=json",
        //https://www.gov.kn/rest/wsc_getevents/?contenttype=json
        //data: {q : 'Van Gogh'},
        cache: true,
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
        url: "https://www.gov.kn/rest/wsc_getministries/?contenttype=json",
        //https://www.gov.kn/rest/wsc_getevents/?contenttype=json
        //data: {q : 'Van Gogh'},
        cache: true,
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

			ServiceUrl = 'https://www.gov.kn/rest/wsc_geteventsforministry/?contenttype=json&ministry='+SearchParam+'';
	}
	else if(CatType == 'Departments'){
		var SearchParam = getQueryVariable('Dep'),
			SearchParamz = decodeURI(SearchParam),
			ServiceUrl = 'https://www.gov.kn/rest/wsc_geteventsfordepartment/?contenttype=json&department='+SearchParam+'';
	}
	else if(CatType == 'Categories'){
		var SearchParam = getQueryVariable('Cats'),
			SearchParamz = decodeURI(SearchParam),
			ServiceUrl = 'https://www.gov.kn/rest/wsc_geteventsforcategory/?contenttype=json&category='+SearchParam+'';
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

	//alert('page show');

	function formatDate(date) {
	    var d = new Date(date),
	        month = '' + (d.getMonth() + 1),
	        day = '' + d.getDate(),
	        year = d.getFullYear();

	    if (month.length < 2) month = '0' + month;
	    if (day.length < 2) day = '0' + day;

	    return [year, month, day].join('-');
	}

	$(document).ready(LoadCalData('https://www.gov.kn/rest/wsc_getevents/?contenttype=json'));

	$("input[name='ViewBy']").bind( "change", function(event, ui) {
		
		var Category = $(this).val();
		//alert(Category);
		if (Category == 'Departments') {
			var DropDownUrl = 'https://www.gov.kn/rest/wsc_getdepartments/?contenttype=json';
				LoadDropDown(DropDownUrl,Category);
		}
		else if (Category == 'Ministries') {
			var DropDownUrl = 'https://www.gov.kn/rest/wsc_getministries/?contenttype=json';
				LoadDropDown(DropDownUrl,Category);
		}
		else{
			var UrlData = 'https://www.gov.kn/rest/wsc_getevents/?contenttype=json';
				LoadCalData(UrlData);
		}

		if (Category == 'All') {
			$('.OptionzPh').hide();
		}

	});


	function LoadDropDown(DropDownUrl,Category){
		var html = '<option value="" selected>Select '+Category+'</option>';

		$(".ViewOptions").empty();
		
		if(Category == 'Ministries' && $("#ViewOptions").hasClass('Departments')){
			$('select.ViewOptions').removeClass('Departments');
		}
		else if(Category == 'Departments' && $("#ViewOptions").hasClass('Ministries')){
			$('select.ViewOptions').removeClass('Ministries');
		}

		$('select.ViewOptions').addClass(Category);

		$.ajax({
			url: DropDownUrl,
			data: {forcalendar : true},
			cache: true,
			xhrFields: {
				// The 'xhrFields' property sets additional fields on the XMLHttpRequest.
				// This can be used to set the 'withCredentials' property.
				// Set the value to 'true' if you'd like to pass cookies to the server.
				// If this is enabled, your server must respond with the header
				// 'Access-Control-Allow-Credentials: true'.
				withCredentials: true
			},
		}).then(function(data) {
			if (Category == 'Ministries') {
				var totalrec = data.ministries.length;
			}
			else{
				var totalrec = data.departments.length;
			}

            for (var i = 0; i < totalrec; i++) {
            	if (Category == 'Departments') {
					var title = data.departments[i].name;
				}
				else{
					var title = data.ministries[i].name;
				}

	            html += '<option value="'+title+'">'+title+'</option>';

	        };

	        $('span.ViewOptions').text('Select '+Category);
	        $('select.ViewOptions').html( html );
		});

		$('.OptionzPh').fadeIn();

	}

	$("select.ViewOptions").bind( "change", function(event, ui) {
		//alert('option chose');
		var Category = $(this).val(),
			UrlData = '';

		if(Category != ''){
			if ($(this).hasClass('Ministries')) {
				UrlData = 'https://www.gov.kn/rest/wsc_geteventsforministry/?contenttype=json&ministry='+Category;
			}
			else {
				UrlData = 'https://www.gov.kn/rest/wsc_geteventsfordepartment/?contenttype=json&department='+Category;
			}
		}
		
		LoadCalData(UrlData);
		
	});

	$(".testcal").on("tap",function(){
		LoadCalData('https://www.gov.kn/rest/wsc_geteventsforministry/?contenttype=json&ministry=Ministry of Community Development, Gender Affairs and Social Services');
	});

	function isEmpty( el ){
		return !$.trim(el.html())
	}
	

	function LoadCalData(UrlData){
		console.log('loading calendar data');
		$(document).ready(loading);
		//$('#calendarz').empty();
		
		$.ajax({
			url: UrlData,
			data: {forcalendar : true},
			cache: true,
			xhrFields: {
			// The 'xhrFields' property sets additional fields on the XMLHttpRequest.
			// This can be used to set the 'withCredentials' property.
			// Set the value to 'true' if you'd like to pass cookies to the server.
			// If this is enabled, your server must respond with the header
			// 'Access-Control-Allow-Credentials: true'.
			withCredentials: true
		},
		}).then(function(data) {
			// if (localStorage.EventsCal) {
			// 	EventsCalV = JSON.parse(localStorage.EventsCal);
			// }
			// else{
			// 	var totalrec = data.eventsObjects.length;
			// 	var finishid = totalrec - 1;

			// 	var CalDataString = null;
			// 	var EventsCalV = [];
			// 	for (var i = 0; i < totalrec; i++) {
					
			// 		var title = data.eventsObjects[i].title,
			// 		EventDate = formatDate(data.eventsObjects[i].startDate);

			// 		if (data.eventsObjects[i].endDate != null) {
		 //            	var EndDate = formatDate(data.eventsObjects[i].endDate);
		 //            }
		 //            else{
		 //            	var EndDate = '';
		 //            }

			// 		EventsCalV.push({
		 //                title: title,
		 //                start: EventDate,
		 //                end: EndDate
		 //            });

			// 	};

			// 	localStorage.EventsCal = JSON.stringify(EventsCalV);
			// }

			var totalrec = data.eventsObjects.length;
			var finishid = totalrec - 1;

			var CalDataString = null;
			var EventsCalV = [];
			for (var i = 0; i < totalrec; i++) {
				
				var title = data.eventsObjects[i].title,
				EventDate = formatDate(data.eventsObjects[i].startDate);

				if (data.eventsObjects[i].endDate != null) {
	            	var EndDate = formatDate(data.eventsObjects[i].endDate);
	            }
	            else{
	            	var EndDate = '';
	            }

				EventsCalV.push({
	                title: title,
	                start: EventDate,
	                end: EndDate
	            });

			};

			//localStorage.EventsCal = JSON.stringify(EventsCalV);
			

			$(document).ready(function() {
				//When Calendar is visible remove load
		        $('#calendarz').bind("DOMSubtreeModified",function(){
					
				});

		        if (isEmpty($('#calendarz'))) {
		        	console.log('Rendering events');
					$('#calendarz').fullCalendar({
			            defaultDate: new Date(),
			            header: {
							left: 'prev,next today',
							right: 'title'
							//right: 'month,agendaWeek,agendaDay'
						},
						eventClick: function(calEvent, jsEvent, view) {
		                    $.mobile.navigate( 'details.html?Title='+calEvent.title );
		                },
			            editable: false,
			            eventLimit: true, // allow "more" link when too many events
			            events: EventsCalV,
			            eventBackgroundColor: 'black', 
		                eventTextColor: 'white',
		                cache: true,
		                eventAfterAllRender: function(view) {
							console.log('All events should show now');
							$('#overlay').remove();
						}
			        });
				}
				else{
					console.log('Rendering new events');
					$('#calendarz').fullCalendar( 'removeEvents' );
			        $('#calendarz').fullCalendar( 'addEventSource', EventsCalV );
				}
		        //$('#calendarz').fadeIn();
		        
		    });
			

		});
	}
    
});

//Search Listing Page
$(document).on("pageshow","#SearchEvents",function(){
	
	//alert("pageshow event fired - detailspage is now shown");
	
	$(document).ready(loading);

	var EventTitle = getQueryVariable('Title'),
		EventTitle = decodeURI(EventTitle),
		ServiceUrl = 'https://www.gov.kn/rest/wsc_getevents/?contenttype=json';
	

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
