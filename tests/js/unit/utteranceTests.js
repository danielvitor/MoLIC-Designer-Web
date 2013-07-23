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

        targetScene.displayPorts(true);

        MoLIC.drawStage();
    }


};