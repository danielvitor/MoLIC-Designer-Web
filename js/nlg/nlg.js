
$(document).ready(function() {

	COMMA_TEMPLATE = "<span class='comma'>,<span>";
	AND_TEMPLATE   = "<span class='and'> and <span>";
	PERIOD_TEMPLATE   = "<span class='and'>.<span>";

	NLGModule = {};

	NLGModule.formatContent = function(content){
		if(content.find(".articulated-list").size() > 0)
		{
			NLGModule.formatArticulatedList(content);
		}
	}	


	NLGModule.clearSpeech = function(){
		$("#nlg-area").text("");
	}


	NLGModule.formatArticulatedList = function(content){
		//content.find(".articulated-list .list-item").not(":first").not(":last").before(COMMA_TEMPLATE);
		
		var itemList = content.find(".articulated-list .list-item");

		if( itemList.size() > 1 )
		{
			
			// commas after almost every item, not in the last one
			itemList.not(":last").after(COMMA_TEMPLATE);

			// before last, we change to AND 
			content.find(".articulated-list .comma:last").replaceWith(AND_TEMPLATE);
		}

		// end of the list
		content.find(".articulated-list .list-item :last").after(PERIOD_TEMPLATE);
	};


	NLGModule.bindHighlightEvent = function(content){

		content.find(".concept-pointer").mouseover(function() {
		 	MoLICDesigner.highlightShape($(this).attr("id").replace("point-to-",""));		
		}).mouseout(function(){
			MoLICDesigner.clearHighlightShape($(this).attr("id").replace("point-to-",""));
		});

	};

	

	function applySceneListTemplate(diagram){
		$('#nlg-templates .scene-list-template').bindTo(diagram,
			{
				onBound: function(content,data){				
					NLGModule.formatArticulatedList(content);
					NLGModule.bindHighlightEvent(content);
				},
				appendTo:"#nlg-area"
			}
		);
	}

	NLGModule.generateSceneDescrition = function(diagram){
		
		NLGModule.clearSpeech();
		
		NLGModule.diagram = diagram;

		var formatedData = formatSceneRepresentation(diagram);

		var disconectedScenes = NLGModule.selectDisconectedScenes(formatedData);

		applySceneListTemplate(disconectedScenes);

		NLGModule.bindHighlightEvent( $("#nlg-area") );

	}

	NLGModule.selectDisconectedScenes = function(scenes){
		var disconectedScenes = [];
		for (var i = scenes.length - 1; i >= 0; i--) {
			if(scenes[i].utterancesTo.length == 0 && scenes[i].utterancesFrom.length == 0)
			 disconectedScenes.push(scenes[i]);
		}

		return disconectedScenes;
	}

	NLGModule.generateTacticalDescription = function(diagram){
		NLGModule.clearSpeech();
		NLGModule.diagram = diagram;
		
		var formatedData = formatUtteranceRepresentation(diagram);
		
		var combinedData = groupByGoal(formatedData);

		selectTacticalTemplate(combinedData);
		
		NLGModule.bindHighlightEvent( $("#nlg-area") );
	}

	function printJSON(obj){
		alert( JSON.stringify(obj) );
	}

	function copyObj(obj){
		return jQuery.extend(true, {}, obj);
	}


	/*
	   ut = {
		   		role: "CLIENT",
		   		
		   		id: "UTTERANCE_ID",
		   		pressup: "PRESSUPOSITION",
		   		precond: "PRECONDITION",
				utterance: " TRANSITION UTTERANCE",
				gco: "GOAL_NAME",

		   		targetScene: {
		   			id: "TARGET_SCENE_ID",
		   			topic : "TOPIC_OF_TARGET_NAME"
		   		},

		   		accessPoint:{
		   			id: "UA_or_SP_ID",
		   			type:"ubiquitousAcess_or_startpoint"
		   		}

		   };

	*/

	function formatUtteranceRepresentation(diagram){
		var
			ut,
			ub, 
			uts = [],
			index, 
			secIndex;


		for ( secIndex = 0 ; secIndex < diagram.interactionModel.transitionUtterances.length ; secIndex++)
		{
			var thisUt = diagram.interactionModel.transitionUtterances[secIndex],
				ut = {}; 
			

			// finds UA as source
			ut.accessPoint = copyObj( findUbiquitousAccess(thisUt.source) );
			if(ut.accessPoint != null )  ut.accessPoint.type = "ubiquitousAccess";

			// find scenes as target
			ut.targetScene = findScene(thisUt.target);

			// default attributes
			ut.role = diagram.role,
			ut.id = thisUt.id;
			ut.precond = thisUt.precond;
			ut.utterance = thisUt.utterance;
			ut.pressup = thisUt.pressup;
			ut.gco = thisUt.gco;
			uts.push(ut);
		}

		return uts;

	}


function formatSceneRepresentation(diagram){
		var
			ut,
			scenes = [],
			index;

		for ( index = 0 ; index < diagram.interactionModel.scenes.length ; index++)
		{
			var thisScene = copyObj (diagram.interactionModel.scenes[index]);
			
			thisScene.utterancesTo = getUtterancesTo(thisScene);
			thisScene.utterancesFrom = getUtterancesFrom(thisScene);

			scenes.push(thisScene);
		}

		return scenes;
	}

	function getUtterancesTo(scene){

		var uts = [];
		for(var index = 0; index < NLGModule.diagram.interactionModel.transitionUtterances.length ; index++ )
		{
			var ut = NLGModule.diagram.interactionModel.transitionUtterances[index];
			if(ut.target == scene.id) {
				uts.push(copyObj(ut));
			}
		}
		return uts;	
	}

	function getUtterancesFrom(scene){

		var uts = [];
		for(var index = 0; index < NLGModule.diagram.interactionModel.transitionUtterances.length ; index++ )
		{
			var ut = NLGModule.diagram.interactionModel.transitionUtterances[index];
			if(ut.from == scene.id){
				uts.push(copyObj(ut));
			}
		}
		return uts;	
	}

	function groupByGoal(uts){
		var groupMap = [];

		for(var index = 0; index < uts.length ; index++ )
		{
			var ut = uts[index],

			key = (ut.gco==null || ut.gco=="" ? "no_gco" : ut.gco);

			// init hash using gco as key
			if(jQuery.type(groupMap[key]) === "undefined"){
				groupMap[key] = [];	
			}

			groupMap[key].push(ut);
		}



		return groupMap;
	}

	function findScene(id){

		for(var index = 0; index < NLGModule.diagram.interactionModel.scenes.length ; index++ )
		{
			var scene = NLGModule.diagram.interactionModel.scenes[index];
			if ( scene.id == id ){
					return scene;
			}
		}
		return null;
	}

	function findUbiquitousAccess(id){

		for(var index = 0; index < NLGModule.diagram.interactionModel.ubiquitousAccesses.length ; index++ )
		{
			var ub = NLGModule.diagram.interactionModel.ubiquitousAccesses[index];
			if ( ub.id == id ){
					return copyObj(ub);
			}
		}
		return null;
	}




	function selectTacticalTemplate(utsList){
	   var globalOutput = "";

	   for(var index in utsList) {
	   		if( utsList[index].length > 1 ){
	   			applyCombinedTacticalTemplate(index,utsList[index]);
	   		}
	   		else
	   		{
	   			applySingleTacticalTemplate(index, utsList[index][0]);
	   		}
		}
	}

	function articulateList(index,size){
		switch(index)
		{
			case 0: return "";
			case size-1: return " and ";
			default: return ", ";
		}
	}

	/*
	In order to Logon, user that is At any time client that is afraid of application
	 posting in your fb profile may Logon using system account, user 
	that dont have any credentials may Create an account and user that 
	don’t wanna sign in may Logon using facebook account.
	*/

	function applyCombinedTacticalTemplate(goal, uts){
		 var output = "", ut;

		 output += format( 
		   		{ 	 
					prefix: 'In order to ', 
		   			expression: goal,
		   			sufix: ', '
		   		});


		   for( var index = 0; index < uts.length; index++ )
		   {
		   	   ut = uts[index];

			   output += articulateList(index, uts.length);

			   output += globalExpression(ut.role);

			   output += format( 
			   		{ 	prefix: 'that ', 
			   			expression: ut.pressup, 
			   			id: ut.id 
			   		});

			   output += globalExpression("may");

			   
			   output += format( 
			   		{ 
			   			expression: ut.targetScene.topic ,
			   			id: ut.targetScene.id
			   		});

			   output += format( 
			   		{ 
			   			prefix: ' only if ',
			   			expression: ut.precond,
			   			id: ut.id    
			   		}); 	

		   }

		   output += globalExpression(".");
		   	$("#nlg-area").append("<p>"+output+"</p>");


	}


	function applySingleTacticalTemplate(goal, ut){
	   var globalOutput = "";
	   var output = "";

	   /*
	   ut = {
	   		role: "CLIENT",
	   		
	   		id: "UTTERANCE_ID",
	   		pressup: "PRESSUPOSITION",
	   		precond: "PRECONDITION",
			utterance: " TRANSITION UTTERANCE",

	   		targetScene: {
	   			id: "TARGET_SCENE_ID",
	   			topic : "TOPIC_OF_TARGET_NAME"
	   		},

	   		gco: "GOAL_NAME",
	   		accessPoint:{
	   			id: "UA_or_SP_ID",
	   			type:"ubiquitousAcess_or_startpoint"
	   		}

	   };
		*/


	   output += format( 
   		{ 	 
   			expression: "At any time ", 
   			id: ut.id 
   		});

	   output += globalExpression(ut.role);

	   output += format( 
	   		{ 	prefix: 'that ', 
	   			expression: ut.pressup, 
	   			id: ut.id 
	   		});

	   output += globalExpression("may");

	   output += format( 
	   		{ 
	   			expression: ut.targetScene.topic,
	   			id: ut.targetScene.id
	   		});

	   output += format( 
	   		{ 
	   			prefix: ' only if ',
	   			expression: ut.precond,
	   			id: ut.id    
	   		}); 
	   
	   output += format( 
	   		{ 
	   			prefix: ' saying '  ,
	   		  	expression: ut.utterance,
	   		  	sufix: '',
	   		  	id: ut.id   
	   		});
	   
	   output += format( 
	   		{ 
	   			prefix: ', in order to ', 
	   			expression: ut.gco,
	   			id: ut.id    
	   		});

	   output += globalExpression(".");

	   	$("#nlg-area").append("<p>"+output+"</p>");
	}


	// conditional-format({'startPoint': 'In the beggining', 'ubiquitousAcess' : 'At any time'},),
	// globalExpression(diagram.role) 
	// format( {  prefix: 'that ', expression: data.uts[index].pressup       })
	// format( { expression: data.uts[index].targetScene.topic }) 
	// format( { prefix: ' only if ',  expression: data.uts[index].precond   }) 
	// format( { prefix: ' saying'  , expression: data.uts[index].utterance  })
	// format( { prefix: ', in order to ', expression: data.uts[index].gco   }).

	/*
	function applyTacticalTemplate(data){
	   var globalOutput = "";

	   for( var index = 0; index < data.uts.length; index++ )
	   {
		   var output = "";

		   output += format( 
		   		{ 	 
		   			expression: "At any time ", 
		   			id: data.accessPoint.id 
		   		});


		   output += globalExpression(diagram.role);

		   output += format( 
		   		{ 	prefix: 'that ', 
		   			expression: data.uts[index].pressup, 
		   			id: data.uts[index].id 
		   		});

		   output += globalExpression("may");

		   
		   output += format( 
		   		{ 
		   			expression: data.uts[index].targetScene.topic ,
		   			id: data.uts[index].targetScene.id
		   		});

		   output += format( 
		   		{ 
		   			prefix: ' only if ',
		   			expression: data.uts[index].precond,
		   			id: data.uts[index].id    
		   		}); 
		   
		   output += format( 
		   		{ 
		   			prefix: ' saying '  ,
		   		  	expression: data.uts[index].utterance,
		   		  	sufix: '',
		   		  	id: data.uts[index].id   
		   		});
		   
		   output += format( 
		   		{ 
		   			prefix: ', in order to ', 
		   			expression: data.uts[index].gco,
		   			id: data.uts[index].id    
		   		});

		   	$("#nlg-area").append("<p>"+output+"</p>");

		 }
	}
	*/

	function uid() {
		var result='';
		for(var i=0; i<32; i++)
			result += Math.floor(Math.random()*16).toString(16).toUpperCase();
		return result
	}


	function format(config){
		var defaults = {
			id: "",
			expression: "",
			prefix: "",
			sufix: ""
		};

		var settings = $.extend({}, defaults, config);

		if(settings.expression=="")
		{
			return "";
		}
		else
		{
			var classAttr = "", idAttr= uid();

			if( settings.id != "")
			{
			  classAttr = "concept-pointer";
				idAttr = "point-to-"+settings.id;
			}

			return settings.prefix
				 + "<a href='javascript:void(0);' id='"+idAttr+"' class='"+classAttr+"' >"+settings.expression+"</a>"
				 +	settings.sufix;
		}
	}

	function globalExpression (value) {
		return " "+ value +" ";
	}

});