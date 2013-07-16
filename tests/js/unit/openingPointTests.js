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