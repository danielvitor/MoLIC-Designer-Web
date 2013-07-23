(function() {
 
    // constants
    var 
        PORT = 'Port',
        WIDTH = 10,
        HEIGHT = 10,
        FILL = "#333",
        HIGHLIGHT = "#999",
        SIZE = 10;
        
    /**
     * Port constructor
     * @constructor
     * @memberof MoLIC
     * @augments MoLIC.Port
     * @param {Object} config
     * @param {Object} config.element
     * @param {Object} config.position
     * {{ShapeParams}}
     * {{NodeParams}}
     * @example
     * var shapePort = new MoLIC.Port({<br>
     *   shape: scene,
         position: {x: 10, y: 5, name: TOP}
          <br>
     * });
     */
    MoLIC.Port = function(config) {
        this._initPort(config);
        this._draw();
        this._bind();

    };

    MoLIC.Port.prototype = {
        _initPort: function(config) {

            this.className = PORT;


            this.connections = [];

            config.draggable = false;
            config.width = WIDTH;
            config.height = HEIGHT;


            this.position = config.position;
            this.shape = config.shape;


            config.x = this.position.x - (SIZE/2);
            config.y = this.position.y - (SIZE/2);

            this.x = config.x;
            this.y = config.x;

            // call super constructor
            Kinetic.Group.call(this, config);

            this.rect = null;

        },

        _draw: function() {

            this.rect =  new Kinetic.Rect({
                x: 0,
                y: 0,
                fill: FILL,
                width: SIZE,
                height: SIZE
            });

            this.add(this.rect);
        },

        _bind: function() {
            this.on("mouseover", function(){
                console.log(this+" 'there is something over me' ");
            });
        },

        addConnection: function(conn){
            this.connections.push(conn);
        },

        removeConnection: function(connToRemove){

            var conn, i;
            for( i = this.connections.length-1; i >= 0 ; i--){
                conn = this.connections[i];

                if(connToRemove === conn){
                    this.connections.splice(i, 1);
                }
            }


        },

        notify: function(){

            var conn, i;
            for( i = this.connections.length-1; i >= 0 ; i--){
                conn = this.connections[i];
                conn.setPort(this);
            }

        },


        getAbsoluteCenter: function(){
            
            var absCenter = {};

            if(this.shape){
                absCenter = {
                    x: this.shape.getX() + this.getX() + (SIZE / 2),
                    y: this.shape.getY() + this.getY() + (SIZE / 2)
                };
            } else {
                absCenter = {
                    x: this.getX() + (SIZE / 2),
                    y: this.getY() + (SIZE / 2)
                };
            }
            
            return absCenter;
        }
    };
    
    Kinetic.Util.extend(MoLIC.Port, Kinetic.Group);


    Kinetic.Node.addGetterSetter(Kinetic.Group, 'shape');

    /**
     * set shape function 
     * @name setShape
     * @method
     * @memberof MoLIC.Port.prototype
     * @param {Object} shape
     */

    /**
     * get shape function 
     * @name getShape
     * @method
     * @memberof MoLIC.Port.prototype
     */

})();