(function() {
 
    // constants
    var 
        CLOSINGPOINT = 'ClosingPoint';

    /**
     * ClosingPoint constructor
     * @constructor
     * @memberof MoLIC
     * @augments MoLIC.Group
     * @param {Object} config
     * @param {String} config.name
     * {{ShapeParams}}
     * {{NodeParams}}
     * @example
     * var closingPoint = new MoLIC.ClosingPoint({
     * });
     */
    MoLIC.ClosingPoint = function(config) {
        this._initClosingPoint(config);
        this._draw();
    };

    MoLIC.ClosingPoint.prototype = {
        _initClosingPoint: function(config) {

            this.className = CLOSINGPOINT;

            config.draggable = true;

            // call super constructor
            Kinetic.Group.call(this, config);

            this.x = config.x;
            this.y = config.y;
            this.circle = null;
            this.innerCircle = null;
        },

        _draw: function() {

            this.circle = new Kinetic.Circle 
            ({
                x: 0,
                y: 0,
                radius: 15,
                fill: '#fff',
                stroke: '#222',
                strokeWidth: 1
            });

            this.innerCircle = new Kinetic.Circle 
            ({
                x: 0,
                y: 0,
                radius: 9,
                fill: '#222',
                stroke: '#222',
                strokeWidth: 2
            });

            this.add(this.circle);
            this.add(this.innerCircle);
            
        }
    };
    
    Kinetic.Util.extend(MoLIC.ClosingPoint, Kinetic.Group);

})();