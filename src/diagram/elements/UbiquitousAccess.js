(function() {
 
    // constants
    var 
        UBIQUITOUSACCESS = 'UbiquitousAccess';

    /**
     * Ubiquitous Access constructor
     * @constructor
     * @memberof MoLIC
     * @augments MoLIC.Element
     * @param {Object} config
     * {{ShapeParams}}
     * {{NodeParams}}
     * @example
     * var ubiquitousAccess = new MoLIC.UbiquitousAccess({
            x: 10,
            y: 20
     * });
     */

    MoLIC.UbiquitousAccess = function(config) {
        this._initUbiquitousAccess(config);
        this._draw();
    };

    MoLIC.UbiquitousAccess.prototype = {
        _initUbiquitousAccess: function(config) {

            this.className = UBIQUITOUSACCESS;

            config.draggable = true;

            // call super constructor
            Kinetic.Group.call(this, config);

            this.x = config.x;
            this.y = config.y;
            this.roundedRect = null;
        },

        _draw: function() {




            this.roundedRect = new Kinetic.Rect({
                x: 0,
                y: 0,
                width: 60,
                height: 30,
                fill: '#888',
                stroke: '#222',
                detectionType: 'path',
                strokeWidth: 2,
                cornerRadius: 15
            });

            this.add(this.roundedRect);
        }
    };
    
    Kinetic.Util.extend(MoLIC.UbiquitousAccess, Kinetic.Group);

})();