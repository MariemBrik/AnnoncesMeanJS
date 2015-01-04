'use strict';
(function(global){

var createshape=function(attributes){
		attributes        = attributes       || {};
		attributes._id    = attributes._id   || 0;
		attributes.name   = attributes.name  || 'Mariem';
		attributes.nodes  = attributes.nodes || [];
		var s = 'M ';
		var shape={};

		shape.toString=function (){
		return '(' + attributes._id + ', ' + attributes.name + ',' + attributes.nodes + ')';
		};


		shape.toSvgPath = function(){
			return 'M '+attributes.nodes.map(function(node){return node.x + ',' + node.y;}).join(' L ');

		};

		shape.getName = function(){
			return attributes.name;
		};

		shape.getId = function(){
			return attributes._id;
		};
		return shape;

 };

/////////

var createRoad=function(attributes){

		attributes = attributes       || {};
		attributes.classe   = attributes.classe || 'classe';
		attributes.highway = attributes.highway || 'nope'; 
		attributes.name = attributes.name || 'nope'; 
		var road= createshape(attributes);
		var superToString=road.toString();
		road.toString = function() {
       		 return superToString.apply(road) + ' ,'+attributes.classe;
   		 };


		 road.getClasse = function() {
       		 return attributes.classe;
    		};

		road.getType = function (){
		return attributes.highway;	
	};
		road.getName = function (){
		return attributes.name;	
	};
	return road;

};
/////////

var createBuilding=function(attributes){

		attributes = attributes       || {};
		attributes.area  = attributes.area || 0;
		
		var building= createshape(attributes);
		var superToString=building.toString();
		building.toString = function() {
       		 return superToString.apply(building) + ' ,'+attributes.area;
   		 };


		 building.getArea = function() {

		 	 var tab = [];
		 	 tab[12] = 'Décembre'; 
		 	 var tabJ= new Array('Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi');
		 	 var date = new Date();
		 	 var mois = date.getMonth()+1;
		 	 attributes.area = 'hi from getArea()';
       		 return attributes.area+' fait le '+tabJ[date.getDay()]+'/'+mois+'/'+date.getFullYear();
    		};

	return building;

};
////////_________


var createAmenity=function(attributes){

		attributes = attributes       || {};
		attributes.type   = attributes.type || 'type';
		
		var amenity= createshape(attributes);
		var superToString=amenity.toString();
		amenity.toString = function() {
       		 return superToString.apply(amenity) + ' ,'+attributes.classe;
   		 };


		 amenity.getClasse = function() {
       		 return attributes.type;
    		};
	return amenity;

};

////////


var createNatural=function(attributes){

		attributes = attributes       || {};
		attributes.type   = attributes.type || 'type';
		
		var natural= createshape(attributes);
		var superToString=natural.toString();
		natural.toString = function() {
       		 return superToString.apply(natural) + ' ,'+attributes.classe;
   		 };


		 natural.getClasse = function() {
       		 return attributes.type;
    		};
	return natural;

};

//////
if(window !=='undefined' && global === window)
{
	global.shapes = {};
    global.shapes.createRoad = createRoad;
	global.shapes.createBuilding = createBuilding;
	global.shapes.createNatural = createNatural;
	global.shapes.createAmenity = createAmenity;
}
else
{

	global.createRoad = createRoad;
	global.createBuilding = createBuilding;
	global.createNatural = createNatural;
	global.createAmenity = createAmenity;
	global.VERSION = '0.0.1';
}

})(this);




