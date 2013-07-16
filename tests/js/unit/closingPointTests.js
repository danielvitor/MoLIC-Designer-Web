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