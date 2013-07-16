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