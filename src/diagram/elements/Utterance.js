(function() {
 
    // constants
    var 
        UTTERANCE = 'Utterance';

    /**
     * Scene constructor
     * @constructor
     * @memberof MoLIC
     * @augments MoLIC.Element
     * @param {Object} config
     * @param {String} config.name
     * {{ShapeParams}}
     * {{NodeParams}}
     * @example
     * var startPoint = new MoLIC.StartPoint({
     * });
     */
    MoLIC.Utterance = function(config) {
        this._initUtterance(config);
        this._draw();
        this._bind();

    };

    MoLIC.Utterance.prototype = {
        _initUtterance: function(config) {

            this.className = UTTERANCE;

            config.draggable = false;

            // call super constructor
            Kinetic.Group.call(this, config);

            this.source = config.source;
            this.target = config.target;

            console.log("source ====")
            console.log(this.source);

            console.log("target ====")
            console.log(this.target);


            this.source.setTransition(this);
            this.target.setTransition(this);

            this.line = null;
        },

        _draw: function() {
            var targetAbsCenter = this.target.getAbsoluteCenter(),
                sourceAbsCenter = this.source.getAbsoluteCenter();

            //console.log("("+sourceAbsCenter.x +", "+ sourceAbsCenter.y+")");
            //console.log("("+targetAbsCenter.x +", "+ targetAbsCenter.y+")");

            this.line = new Kinetic.Line({
                points: [sourceAbsCenter.x, sourceAbsCenter.y, 
                         targetAbsCenter.x, targetAbsCenter.y],
                
                stroke: '#600',
                strokeWidth: 4,
                lineCap: 'round',
                lineJoin: 'round'
            });

            this.add(this.line);
        },

        redraw: function(){
            this.line.remove();
            this._draw();
            this.getLayer().draw();

        },

        _bind: function() {
            this.getTarget().on("dragmove", function(e){
                this.getTransition().redraw();
            });

            this.getSource().on("dragmove", function(e){
                this.getTransition().redraw();
            });
        }


    };
    
    Kinetic.Util.extend(MoLIC.Utterance, Kinetic.Group);

    Kinetic.Node.addGetterSetter(MoLIC.Utterance, 'source');

    Kinetic.Node.addGetterSetter(MoLIC.Utterance, 'target');

    /**
     * set source connection function 
     * @name setSource
     * @method
     * @memberof MoLIC.Utterance.prototype
     * @param {String} name
     */

    /**
     * get source connection function 
     * @name getSource
     * @method
     * @memberof MoLIC.Utterance.prototype
     */

})();