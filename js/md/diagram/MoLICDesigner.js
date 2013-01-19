///////////////////////////////////////////////////////////////////////
// MoLICDesigner
///////////////////////////////////////////////////////////////////////

	var MoLICDesigner = {};

	MoLICDesigner.stage = null; 


	MoLICDesigner.createStage = function(_width,_height){
	    MoLICDesigner.stage = new Kinetic.Stage({
	          container: 'graph-area',
	          width: _width,
	          height: _height
	        });
	 };

	 MoLICDesigner.highlightShape = function(id){

	    var shape = MoLICDesigner.stage.get("#"+id)[0];
	    shape.highlight();   
	 };

	 MoLICDesigner.clearHighlightShape = function(id){
	    var shape = MoLICDesigner.stage.get("#"+id)[0];
	    shape.clearHighlight();
	 };


	 MoLICDesigner.clearStage = function(){
	 	MoLICDesigner.stage.clear();
	 };


 	MoLICDesigner.renderDiagram = function(diagram){

 		MoLICDesigner.diagram = diagram;
 		MoLICDesigner.stage.clear();
 		
 		$("#diagram_name").text(diagram.name);
	 	// init page setting 



	 	 if(diagram.interactionModel.startPoint)
	    	MoLICDesigner.addStartPoint(diagram.interactionModel.startPoint);

		//alert(JSON.stringify(diagram.interactionModel.systemProcesses));	

		for ( var i = 0 ;  i < diagram.interactionModel.scenes.length; i++  ) {
		    MoLICDesigner.addScene(diagram.interactionModel.scenes[i]);
		}

		for ( var i = 0 ;  i < diagram.interactionModel.systemProcesses.length; i++  ) {
		    MoLICDesigner.addSystemProcess(diagram.interactionModel.systemProcesses[i]);
		}

		for ( var i = 0 ;  i < diagram.interactionModel.ubiquitousAccesses.length; i++  ) {
			MoLICDesigner.addUbiquitousAccess(diagram.interactionModel.ubiquitousAccesses[i]);
		}

		for ( var i = 0 ;  i < diagram.interactionModel.transitionUtterances.length; i++  ) {
			MoLICDesigner.addUtterance(diagram.interactionModel.transitionUtterances[i]);
		}
 	}

	
 	MoLICDesigner.addScene = function(scene){
		 
		var _layer = new Kinetic.Layer();
		
		// anonymous function to induce scope
		(function() {
			var shScene = new MoLICDesigner.Scene({
				id: scene.id,
		        text: scene.topic,
		        
			  	x: scene.style.x,
		        y: scene.style.y,

		        data: scene,
		        layer: _layer
			});
			
			_layer.add(shScene);

			
		})();
		
		MoLICDesigner.stage.add(_layer);
	}

	MoLICDesigner.addUbiquitousAccess = function(ubiquitousAccess){
		var _layer = new Kinetic.Layer();
		
		// anonymous function to induce scope
		(function() {
			var shUA = new MoLICDesigner.UbiquitousAccess({
				id: ubiquitousAccess.id,
		        text: ubiquitousAccess.name,
		        
			  	x: ubiquitousAccess.style.x,
		        y: ubiquitousAccess.style.y,

		        data: ubiquitousAccess,
		        layer: _layer
			});
			
			_layer.add(shUA);

		})();
		
		MoLICDesigner.stage.add(_layer);
	}

	MoLICDesigner.addSystemProcess = function(systemProcess){
		 
		var _layer = new Kinetic.Layer();
		
		// anonymous function to induce scope
		(function() {
			var shSystemProcess = new MoLICDesigner.SystemProcess({
				id: systemProcess.id,
		        
			  	x: systemProcess.style.x,
		        y: systemProcess.style.y,

		        data: systemProcess,
		        layer: _layer
			});
			
			_layer.add(shSystemProcess);

		})();
		
		MoLICDesigner.stage.add(_layer);
	}


	MoLICDesigner.addUtterance = function(utterance){
		 
		var _layer = new Kinetic.Layer();

		// anonymous function to induce scope
 		(function() {

			var _source =  MoLICDesigner.stage.get("#"+utterance.source)[0],
		        _target =  MoLICDesigner.stage.get("#"+utterance.target)[0],
			    shUtterance = new MoLICDesigner.Utterance({
					
			    	id: utterance.id,

					source: _source,
					target : _target,
					
					sender: utterance.sender,
					utterance: utterance.utterance,
					precond: utterance.precond,
					pressup: utterance.pressup,
					gco: utterance.gco,
					utterancePosition: utterance.utterancePosition,
					
					layer: _layer

				});

			_layer.add(shUtterance);	
		})();
		MoLICDesigner.stage.add(_layer);
		
	}

	
	MoLICDesigner.addStartPoint = function(startPoint){
		var _layer = new Kinetic.Layer();
		
		// anonymous function to induce scope
		(function() {
			var shStart = new MoLICDesigner.StartPoint({
				id: startPoint.id,

				x: startPoint.style.x,
				y: startPoint.style.y,

				data: startPoint,
		        layer: _layer
			});

			_layer.add(shStart);
		})();
		MoLICDesigner.stage.add(_layer);
	}