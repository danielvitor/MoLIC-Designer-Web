
/**
MoLIC module that declares MoLIC language elements like scenes, utterances and so on.
Actually, this is built as submodule of KinecticJS framework, creating groups of shapes with meanings and behaviors.

@module MoLIC
@main MoLIC
**/
var MoLIC = {};



(function() {
    MoLIC.version = '@@version';

    MoLIC.stage = null;
    MoLIC.autoDragging = null;

    MoLIC.ports = [];

    MoLIC.initStage = function(config){
	 	MoLIC.stage = new Kinetic.Stage(config);
 	}

	MoLIC.drawStage = function(){
		MoLIC.stage.draw();

	}

    MoLIC.addToStage = function(layer){
	 	MoLIC.stage.add(layer);
 	}

 	MoLIC.autoDrag = function(conn){

 		// removing autoDragging
 		if(conn === null){
 			
 			// if there was a object
 			if( MoLIC.autoDragging != null )
 			{
 				MoLIC.stage.off("mousemove");
 			}
 			
 			MoLIC.autoDragging = null;
		}
		// dragging a new object
 		else 
 		{
 			//if it was the same object as before, I wont do anything
 			if( MoLIC.autoDragging != conn ){

 				// stop dragging previous object
 				if( MoLIC.autoDragging != null )
 				{
 					MoLIC.stage.off("mousemove");
 				}

 				// update references
		 		MoLIC.autoDragging = conn;
				
				// start dragging the new object
				MoLIC.stage.on("mousemove", function(e){

	 				MoLIC.autoDragging.setPosition(MoLIC.stage.getMousePosition());
	 				//console.log('now conn is at '+MoLIC.autoDragging.getX()+", "+MoLIC.autoDragging.getY());
	 				conn.refresh();
				});
			}
 		}
 	}

 	MoLIC.getIntersection = function(pos){
 		return MoLIC.stage.getIntersection(pos);
 	}

 	MoLIC.getPortNear = function(conn){
		var port, i;

		console.log("getPortNear");

        for( i = MoLIC.ports.length-1 ; i >= 0 ; i-- ){
            port = MoLIC.ports[i];

            console.log(port);

            if( conn.isNear( port ) ){
            	return port;
            }
            else
            {
            	console.log("longe");
            }
        }

        return null;
 	}


 	MoLIC.getValidLayer = function(layer){
 		if(layer === undefined || layer === null){
			layer = new Kinetic.Layer();
		}

		return layer;
 	}

	MoLIC.addScene = function(config, layer){

		layer = MoLIC.getValidLayer(layer);

		var newScene = new MoLIC.Scene(config);

        layer.add(newScene);
        MoLIC.stage.add(layer);

        return newScene;
	}


	MoLIC.addUtterance = function(config, layer){

		layer = MoLIC.getValidLayer(layer);

		var from, to;

		if(config.sourcePort){
			from = MoLIC.addConnection({
				port: config.sourcePort
			});
		}

		if(config.targetPort){
			to = MoLIC.addConnection({
				port: config.targetPort
			});
		}


		if(config.sourceConnection){
			from = config.sourceConnection;
		}

		if(config.targetConnection){
			to = config.targetConnection;
		}
		
		var aUtterance = new MoLIC.Utterance({
			source: from,
			target: to
		});

		
		from.setTransition(aUtterance);
		to.setTransition(aUtterance);

		layer.add(aUtterance);

		MoLIC.addToStage(layer);

		return aUtterance;
	}


	MoLIC.addUtteranceFromPositions = function(from,to, layer){

		layer = MoLIC.getValidLayer(layer);

		layer.add(from);
		layer.add(to);


		var aUtterance = new MoLIC.Utterance({
			sourcePos: from,
			targetPos: to
		});

		layer.add(aUtterance);
		MoLIC.addToStage(layer);

		return aUtterance;
	}




	MoLIC.createPort = function(config){

		// port are added by shapes

		var aPort = new MoLIC.Port(config);

		MoLIC.ports.push(aPort);

		return aPort;
	}


	MoLIC.addConnection = function(config, layer){

		layer = MoLIC.getValidLayer(layer);

		var aConnection = new MoLIC.Connection(config);
		
		layer.add(aConnection);
		MoLIC.addToStage(layer);

		return aConnection;
	}



})();
