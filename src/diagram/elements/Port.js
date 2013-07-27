(function() {
 
    // constants
    var 


        PORT = 'Port',

        /**
        Port width and height are set to 10

        @attribute SIZE
        @type Number
        @default 10
        @readOnly
        **/
        SIZE = 10

        /**
        Port color
        @attribute FILL
        @type String ("#RGB")
        @default "#333"
        @readOnly
        **/
        FILL = "#333",
        
        /**
        Port highlight color
        @attribute HIGHLIGHT
        @type String ("#RGB")
        @default "#999"
        @readOnly
        **/
        HIGHLIGHT = "#999";
        
    /**
     * Port constructor
        a port instance knows it's connections (for details, see {{#crossLink "Connection"}}{{/crossLink}}) and parent shape. 
     * @class Port
     * @constructor
     * @namespace MoLIC
     * @uses Kinetic.Group
     */
    MoLIC.Port = function(config) {
        this._initPort(config);
        this._draw();
        this._bind();

    };



    MoLIC.Port.prototype = {

        /**
            Port's parent shape. Every shape that can be connected to other may have one or many ports. 
            @property shape 
            @type Object (any MoLIC Shape)
        */

        /**
            List of connections connected to this port. Can be changed by {{#crossLink "Port:addConnection:method"}}{{/crossLink}} and {{#crossLink "Port:removeConnection:method"}}{{/crossLink}}
            @property connections
            @default []
            @type Array 
        */

        /**
        Init Port with configuration object
        * 
        * @method _initPort
        * @param {Object} config
        * @param {Object} config.element
        * @param {Object} config.position
        * @protected
        * @example
                var aPortFromScene = new MoLIC.Port({<br>
                    shape: scene,
                    position: {x: 10, y: 5, name: TOP}
                <br>
                });
        **/
        _initPort: function(config) {

            this.className = PORT;


            this.connections = [];

            config.draggable = false;
            config.width = SIZE;
            config.height = SIZE;


            this.position = config.position;
            this.shape = config.shape;


            config.x = this.position.x - (SIZE/2);
            config.y = this.position.y - (SIZE/2);

            this.x = config.x;
            this.y = config.x;

            // call super constructor
            Kinetic.Group.call(this, config);

            this.hide();
            this.rect = null;

        },

        /**
        * private method that draws a Port instance
        * @method _draw
        * @memberof MoLIC.Port.prototype
        */

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


        /**
        * private method that binds events to this Port instance 
        * @method _bind
        * @memberof MoLIC.Port.prototype
        */
        _bind: function() {
        },


        /**
        * A Port intance keeps any connection's intance connected to it. This method adds a connection from Port instance.
        * @method removeConnection
        * @param {Object} connToRemove
        */
        addConnection: function(connToAdd){
            this.connections.push(connToAdd);
        },

        /**
        * A Port intance keeps any connection's intance connected to it. This method removes a connection from Port instance.
        * @method removeConnection
        * @param {Object} connToRemove
        */
        removeConnection: function(connToRemove){

            var conn, i;
            for( i = this.connections.length-1; i >= 0 ; i--){
                conn = this.connections[i];

                if(connToRemove === conn){
                    this.connections.splice(i, 1);
                }
            }

        },

        /**
        * notify events
        * @method notify
        * @param {String} event
        * @beta
        */
        notify: function(event){


            if(event == "dragmove"){
                var conn, i;
                for( i = this.connections.length-1; i >= 0 ; i--){
                    conn = this.connections[i];
                    conn.setPort(this);
                }
            }
        },

        /**
        * get absolute center of a Port's instance. It considers parent shape absolute position to calculate port position.
        * @method getAbsoluteCenter
        * @return {Object} position (x,y)
        */
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
     * set parent shape function 
     * @method setShape
     * @param {Object} shape
     */

    /**
     * get parent shape function
     * @method getShape
     * @return {Object} shape
     */

})();