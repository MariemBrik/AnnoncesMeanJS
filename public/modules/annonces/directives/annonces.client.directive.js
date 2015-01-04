'use strict';

angular.module('annonces').directive('map', ['$http','shapes','d3','$', function ($http,shapes,d3,$){
	
  	console.log('hi from directive');
	function drawShapes(scope,element) 
	{
		var response = $http.get('/modules/data/data.json');
		response.success(function(data) 
		{
			var buildings = [], roads = [], amenities = [], naturals = [];
				for(var i = data.length - 1; i > 0; i-- )
				{
					if(typeof data[i].building !== 'undefined' && data[i].building === true){
						buildings.push(shapes.createBuilding(data[i]));
					}
					if(typeof data[i].highway !== 'undefined'){
						roads.push(shapes.createRoad(data[i]) );
					}
					if(typeof data[i].natural !== 'undefined'){
						naturals.push(shapes.createNatural(data[i]) );
					}
					if(typeof data[i].amenity !== 'undefined'){
						amenities.push(shapes.createAmenity(data[i]));
					}
				}
		    $('#form :input').prop('disabled', true);

			 var svg = d3.select(element[0])
   						 .append('svg')
    					 .attr('width', 1000)
     					 .attr('height', 500);


    		 	svg.selectAll('.buildings')
				.data(buildings)
				.enter()
				.append('path')
					.classed('buildings',1)
					.attr('d', function(d){return d.toSvgPath();})
					.on('click', function(d, i){
		                scope.idmap = d.getId();
		                scope.$apply();
		                console.log(' Map id : '+d.getId());

		                $http.get('/annonces/building/'+d.getId()).
						  success(function(data) {
						    //alert('building s advert = '+data.name);
		                    $('#form :input').prop('disabled', true);
		                	var texte = 'Une annonce est déjà accordée à ce batiment, veuillez choisir un autre .. ';
        					$('#choixBuildg').html(texte);
        					$('#choixBuildg').css('color', '#B40404'); 
						  }).
						  error(function(err) {
						  	//alert('no advert here');
						    $('#form :input').prop('disabled', false);
       						var texte = 'Choix du batiment fait, veuillez remplir les informations requises ..';
        					$('#choixBuildg').html(texte);
        					$('#choixBuildg').css('color', 'green');
						  });
        			});

			 svg.selectAll('.roads')
    				.data(roads)
    				.enter()
    				.append('path')
        				.classed('roads',1)
        				.attr('d',function(d){
    					return d.toSvgPath();}
				);

		        svg.selectAll('.amenities')
    				.data(amenities)
    				.enter()
    				.append('path')
        				.classed('amenities',1)
        				.attr('d',function(d){
    					return d.toSvgPath();}
				);

		       svg.selectAll('.naturals')
    				.data(naturals)
    				.enter()
    				.append('path')
    				    .classed('naturals',1)
    				    .attr('d',function(d){
    					return d.toSvgPath();}
				);
    				    
		                
	    	//You have to add getId() in shapes object model( createShapes function)	
	    	//So you can use it to have the _id of the corresponding building
	        
	        //return d.count();
	           


		});
	}

	return {
		restrict : 'E',
		link: drawShapes
	};

}]);


