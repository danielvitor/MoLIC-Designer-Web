Test.Modules.SCENE = {
    'add scene': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 600,
            height: 200
        });
        
        var sceneLayer = new Kinetic.Layer();

        var layer = new Kinetic.Layer();



        var scene = new MoLIC.Scene({
            x: 70,
            y: 50,
            name: "Scene name. What happen when name is too long?",
            layer: sceneLayer
        });



        showLine(layer,70,50);
        showLine(layer,100,80);
        showLine(layer,130,110);
        showLine(layer,160,140);
        showLine(layer,190,170);
        showLine(layer,220,200);

        layer.add(scene);
       
        stage.add(layer);
        stage.add(sceneLayer);
        stage.draw();

        test(scene.getClassName() === 'Scene', 'className should be Scene');        
        test(scene.getName() === 'Scene name. What happen when name is too long?', 'Scene should be "Scene name. What happen when name is too long?"');
        test(scene.getY() === 50, 'Y should be 50');
        test(scene.getX() === 70, 'X should be 70');


        var json = scene.toJSON();

        console.log(json);
    },
    '!create scene from json': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });

        var json = '{"attrs":{"x":50,"y":50,"name":"Scene name. What happen when name is too long?","draggable":true},"className":"Scene","children":[{"attrs":{"fill":"#fff","width":200,"height":100,"padding":20,"strokeWidth":1,"cornerRadius":10},"className":"Rect"},{"attrs":{"width":180,"height":100,"text":"Scene name. What happen when name is too long?","x":10,"y":10,"align":"center","fontSize":14,"stroke":"#555"},"className":"Text"},{"attrs":{"x":0,"y":50,"fill":"#333","radius":4},"className":"Circle"},{"attrs":{"x":100,"y":0,"fill":"#333","radius":4},"className":"Circle"},{"attrs":{"x":200,"y":50,"fill":"#333","radius":4},"className":"Circle"},{"attrs":{"x":100,"y":100,"fill":"#333","radius":4},"className":"Circle"}]}';
        var layer = new Kinetic.Layer();

        var scene = Kinetic.Node.create(json);

        layer.add(scene);
        stage.add(layer);
    },
    'scene ports': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 600,
            height: 200
        });

        var sceneLayer = new Kinetic.Layer();
        var layer = new Kinetic.Layer();



        var scene = new MoLIC.Scene({
            x: 70,
            y: 50,
            name: "Scene name.",
            layer: sceneLayer
        });

        showLine(layer,70,50);

        layer.add(scene);
       

        stage.add(layer);
        stage.add(sceneLayer);
        stage.draw();

        //test(scene.isPortVisible === false, 'isPortVisible should be false (default value)');
        scene.displayPorts(true);
        //test(scene.isPortVisible === true, 'isPortVisible should represent port visibility.');

        test(scene.getPort(LEFT).getClassName() === 'Port', 'getPort(LEFT) should return a Port');
        test(scene.getPort(RIGHT).getClassName() === 'Port', 'getPort(RIGHT) should return a Port');
        test(scene.getPort(TOP).getClassName() === 'Port', 'getPort(TOP) should return a Port');
        test(scene.getPort(BOTTOM).getClassName() === 'Port', 'getPort(BOTTOM) should return a Port');

        sceneLayer.draw();

    }
};
Test.Modules.OPENINGPOINT = {
    'add openingPoint': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 600,
            height: 200
        });
        var layer = new Kinetic.Layer();

        var openingPoint = new MoLIC.OpeningPoint({
            x: 70,
            y: 50
        });

        showLine(layer,70,50);

        
        layer.add(openingPoint);

        stage.add(layer);
        stage.draw();

        test(openingPoint.getClassName() === 'OpeningPoint', 'className should be OpeningPoint');
        test(openingPoint.getY() === 50, 'Y should be 50');
        test(openingPoint.getX() === 70, 'X should be 70');
    }
};
Test.Modules.CLOSINGPOINT = {
    'add closingPoint': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 600,
            height: 200
        });
        var layer = new Kinetic.Layer();

        var closingPoint = new MoLIC.ClosingPoint({
            x: 70,
            y: 50
        });

        showLine(layer,70,50);

        
        layer.add(closingPoint);

        stage.add(layer);
        stage.draw();

        test(closingPoint.getClassName() === 'ClosingPoint', 'className should be ClosingPoint');
        test(closingPoint.getY() === 50, 'Y should be 50');
        test(closingPoint.getX() === 70, 'X should be 70');
    }
};
Test.Modules.UBIQUITOUSACCESS = { 
    'add ubiquitousAccess': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 600,
            height: 200
        });

        var layer = new Kinetic.Layer();

        var ubiquitousAccess = new MoLIC.UbiquitousAccess({
            x: 70,
            y: 50
        });

        showLine(layer,70,50);

        layer.add(ubiquitousAccess);

        stage.add(layer);
        stage.draw();

        test(ubiquitousAccess.getClassName() === 'UbiquitousAccess', 'className should be UbiquitousAccess');
        test(ubiquitousAccess.getY() === 50, 'Y should be 50');
        test(ubiquitousAccess.getX() === 70, 'X should be 70');
    }
};
Test.Modules.SYSTEMPROCESSING = {
    'add system processing': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 600,
            height: 200
        });
        var layer = new Kinetic.Layer();

        var systemProcessing = new MoLIC.SystemProcessing({
            x: 70,
            y: 50
        });

        showLine(layer,70,50);

        
        layer.add(systemProcessing);

        stage.add(layer);
        stage.draw();

        test(systemProcessing.getClassName() === 'SystemProcessing', 'className should be SystemProcessing');
        test(systemProcessing.getY() === 50, 'Y should be 50');
        test(systemProcessing.getX() === 70, 'X should be 70');
    }
};
Test.Modules.Utterance = {
    'add utterance from scene to scene': function(containerId) {
        MoLIC.initStage({
            container: containerId,
            width: 600,
            height: 200
        });

        showLineInMoLICStage(70,50);

        var sourceScene = MoLIC.addScene({
            x: 70,
            y: 50,
            name: "This is my source scene"
        });

        var targetScene = MoLIC.addScene({
            x: 350,
            y: 100,
            name: "This is my target scene"
        });

        var utterance = MoLIC.addUtterance({
            sourcePort: sourceScene.getPort(RIGHT),
            targetPort: targetScene.getPort(TOP)
        });

        MoLIC.drawStage();

        test(utterance.getClassName() === 'Utterance', 'className should be Utterance'); 
        
        test(utterance.getSource().getClassName() === 'Connection', 'source classname should be Connection');
        test(utterance.getTarget().getClassName() === 'Connection', 'target classname should be Connection');

        test(utterance.getSource().getTransition() === utterance, 'source connection should be linked to utternace');
        test(utterance.getTarget().getTransition() === utterance, 'target connection should be linked to utternace');


    },

    'add utterance without source and target element': function(containerId) {
        MoLIC.initStage({
            container: containerId,
            width: 600,
            height: 200
        });


        showLineInMoLICStage(70,50);

        
        var from = MoLIC.addConnection( { position: {x:70, y:50} });
        var to = MoLIC.addConnection( { position: {x: 370, y: 150} });
        
        var utterance = MoLIC.addUtterance({sourceConnection: from,  targetConnection: to});

        MoLIC.drawStage();



        test(utterance.getClassName() === 'Utterance', 'className should be Utterance'); 
        
        test(utterance.getSource().getClassName() === 'Connection', 'source classname should be Connection');
        test(utterance.getTarget().getClassName() === 'Connection', 'target classname should be Connection');

        test(utterance.getSource() === from, 'source should be "from" object');
        test(utterance.getTarget() === to, 'target should be "to" object');

        test(utterance.getSource().getTransition() === utterance, 'source connection should be linked to utternace');
        test(utterance.getTarget().getTransition() === utterance, 'target connection should be linked to utternace');

    },

    'add free utterance to target element': function(containerId) {
        MoLIC.initStage({
            container: containerId,
            width: 600,
            height: 200
        });

        var targetScene = MoLIC.addScene({
            x: 200,
            y: 100,
            name: "This is my target scene"
        });


        showLineInMoLICStage(70,50);

        var from = MoLIC.addConnection( { position: {x:70, y:50} });
        var to = MoLIC.addConnection( { position: {x: 370, y: 150} });


        var utterance = MoLIC.addUtterance({
                sourceConnection: from, 
                targetConnection: to 
        });


        MoLIC.drawStage();
    }


};
