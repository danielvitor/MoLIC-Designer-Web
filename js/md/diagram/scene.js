///////////////////////////////////////////////////////////////////////
// Scene
///////////////////////////////////////////////////////////////////////

/**
* Scene constructor
* @constructor
* @augments MoLICDesigner.Scene
* @param {Object} config
*/
MoLICDesigner.Scene = function(config) {
    this._initScene(config);
}
MoLICDesigner.Scene.prototype = {
    _initScene: function(config) {
       this.setDefaultAttrs({
            x: 0,
            y:0,
            fontFamily: 'Calibri',
            text: 'cena sem nome',
            fontSize: 12,
            verticalAlign: 'top',
            fontStyle: 'bold',
            textFill: '#555',
            align: 'center',
            padding: 20,
            width: 160,
            height: 70,
            fill: '#fff',
            stroke: '#555',
            strokeWidth: 1,
            detectionType: 'path',
            cornerRadius: 10,
            lineHeight: 1.2,
            draggable: false
        });

        this.shapeType = "Scene";
        this.sceneData = config.data;
        this.layer = config.layer;
        config.drawFunc = Kinetic.Text.drawFunc;

        Kinetic.Text.call(this, config);
    },
    highlight: function() {
        this.setFill('#DCEAF4');
        this.layer.draw();
    },
    clearHighlight: function(){
        this.setFill('#fff');
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

Kinetic.Global.extend(MoLICDesigner.Scene, Kinetic.Text);