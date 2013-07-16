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