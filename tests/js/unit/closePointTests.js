Test.Modules.STARTPOINT = {
    'add startPoint': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 600,
            height: 200
        });
        var layer = new Kinetic.Layer();

        var startPoint = new MoLIC.StartPoint({
            x: 70,
            y: 50
        });

        showLine(layer,70,50);

        
        layer.add(startPoint);

        stage.add(layer);
        stage.draw();

        test(startPoint.getClassName() === 'StartPoint', 'className should be StartPoint');
        test(startPoint.getY() === 50, 'Y should be 50');
        test(startPoint.getX() === 70, 'X should be 70');
    }
};