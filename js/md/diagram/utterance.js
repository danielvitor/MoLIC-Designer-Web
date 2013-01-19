MoLICDesigner.Arrow = function(config) {
    this._initArrow(config);
};

//////////////////////////////////////////////////////////////////////
//  Arrow
///////////////////////////////////////////////////////////////////////
/**
 * Group constructor.  Groups are used to contain shapes or other groups.
 * @constructor
 * @augments Kinetic.Container
 * @param {Object} config
 * @param {Number} [config.x]
 * @param {Number} [config.y]
 * @param {Boolean} [config.visible]
 * @param {Boolean} [config.listening] whether or not the node is listening for events
 * @param {String} [config.id] unique id
 * @param {String} [config.name] non-unique name
 * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
 * @param {Object} [config.scale]
 * @param {Number} [config.scale.x]
 * @param {Number} [config.scale.y]
 * @param {Number} [config.rotation] rotation in radians
 * @param {Number} [config.rotationDeg] rotation in degrees
 * @param {Object} [config.offset] offsets default position point and rotation point
 * @param {Number} [config.offset.x]
 * @param {Number} [config.offset.y]
 * @param {Boolean} [config.draggable]
 * @param {String} [config.dragConstraint] can be vertical, horizontal, or none.  The default
 *  is none
 * @param {Object} [config.dragBounds]
 * @param {Number} [config.dragBounds.top]
 * @param {Number} [config.dragBounds.right]
 * @param {Number} [config.dragBounds.bottom]
 * @param {Number} [config.dragBounds.left]
 */
MoLICDesigner.Utterance = function(config) {
    this._initUtterance(config);
    this._addShapes(config);
};

MoLICDesigner.Utterance.prototype = {
    _initUtterance: function(config) {
         this.setDefaultAttrs({
            source: null,
            target: null,
            utterance: '',
            precond: '',
            pressup: '',
            gco: '',
            sender: '?',
            gcc: '',
            gco: '',
            utterancePosition: {x:0, y:0},
            draggable: false
        });

        this.nodeType = 'Utterance';

        this.utterance = (config.utterance != ''  
                            ? ( config.sender+': '+config.utterance  ) 
                            : ''
        );

        this.precond = (config.precond != ''  
                            ? ( 'precond: '+ config.precond  +"\n" ) 
                            : ''
        );

        this.pressup = (config.pressup != ''  
                            ? ( 'pressup: '+ config.pressup  +"\n" ) 
                            : ''
        );

        this.gco = (config.gco != ''  
                            ? ( 'gco: '+ config.gco  +"\n" ) 
                            : ''
        );

        this.text = null;
        this.circle = null;
        this.line = null;
        this.layer = config.layer;

        // call super constructor
        Kinetic.Group.call(this, config);
    },
    highlight: function() {
        this.text.setFill('#DCEAF4');
        this.layer.draw();
    },
    clearHighlight: function(){
        this.text.setFill('#fff');
        this.layer.draw();
    },
    _addShapes: function(config){

        this.line = new Kinetic.Line({
            points: [config.source.getMultiPoints().bottom.x, config.source.getMultiPoints().bottom.y, 
                    config.target.getMultiPoints().top.x, config.target.getMultiPoints().top.y],
            
            stroke: '#555',
            strokeWidth: 2,
            lineCap: 'round',
            lineJoin: 'round'
        });

        this.add(this.line);

        this.text = new Kinetic.Text({
            x: config.utterancePosition.x,
            y: config.utterancePosition.y,
            fontFamily: 'Calibri',
            text: this.gco + this.pressup + this.precond + this.utterance,
            fontSize: 8,
            verticalAlign: 'center',
            align: 'left',
            fontStyle: 'bold',
            textFill: '#555',
            padding: 10,
            width: 'auto',
            height: 'auto',
            detectionType: 'path',
            draggable: false,
            fill:"#fff"
        });

        this.add(this.text);

        this.circle = new Kinetic.Circle({
            x:  config.target.getMultiPoints().top.x, 
            y:  config.target.getMultiPoints().top.y,
            radius: 3,
            fill: '#555',
            stroke: 'black',
            strokeWidth: 1,
            draggable: false
        });


        this.add(this.circle);
    }
};

Kinetic.Global.extend(MoLICDesigner.Utterance, Kinetic.Group);