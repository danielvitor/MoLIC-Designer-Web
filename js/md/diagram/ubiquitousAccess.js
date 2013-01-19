/**
* Scene constructor
* @constructor
* @augments MoLICDesigner.Scene
* @param {Object} config
*/
MoLICDesigner.UbiquitousAccess = function(config) {
    this._initUbiquitousAccess(config);
}
MoLICDesigner.UbiquitousAccess.prototype = {
    _initUbiquitousAccess: function(config) {
       this.setDefaultAttrs({
            x: 0,
            y:0,
            fontFamily: 'Calibri',
            text: 'no name',
            fontSize: 12,
            verticalAlign: 'center',
            fontStyle: 'bold',
            textFill: '#555',
            align: 'center',
            padding: 10,
            width: 70,
            height: 40,
            fill: '#eee',
            stroke: '#555',
            strokeWidth: 1,
            detectionType: 'path',
            cornerRadius: 20,
            lineHeight: 1.2,
            draggable: false
        });

        this.shapeType = "UbiquitousAccess";
        this.data = config.data;
        this.layer = config.layer;
        config.drawFunc = Kinetic.Text.drawFunc;

        Kinetic.Text.call(this, config);
    },
    highlight: function() {
        this.setFill('#DCEAF4');
        this.layer.draw();
    },
    clearHighlight: function(){
        this.setFill('#eee');
        this.layer.draw();
    },
    getMultiPoints: function(especificPoint){
        var ret =   {
            x: this.attrs.x,
            y: this.attrs.y,
            left: { 
                x: this.attrs.x,
                y: ( this.attrs.y + this.attrs.height/2 )
            },
            top: { 
                x: ( this.attrs.x + this.attrs.width/2 ),
                y: this.attrs.y
            },
            right: { 
                x: ( this.attrs.x + this.attrs.width    ),
                y: ( this.attrs.y + this.attrs.height/2 )
            },
            bottom: { 
                x: ( this.attrs.x + this.attrs.width/2),
                y: ( this.attrs.y + this.attrs.height  )
            }
        };       

        return ret; 
    }
};

Kinetic.Global.extend(MoLICDesigner.UbiquitousAccess, Kinetic.Text);