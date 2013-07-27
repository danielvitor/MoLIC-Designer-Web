(function() {
 
    // constants
    var 
        CONNECTION = 'Connection',
        WIDTH = 10,
        HEIGHT = 10,
        FILL = "#000",
        HIGHLIGHT = "#600",
        HOVER = HIGHLIGHT,
        SIZE = 10;
        
    /**
     * Connection constructor
     * @constructor
     * @memberof MoLIC
     * @augments Kinetic.Group
     * @param {Object} config
     * @param {Object} config.element
     * @param {Object} config.position
     * {{ShapeParams}}
     * {{NodeParams}}
     * @example
     * var aConnectionFromPosition = new MoLIC.Connection({<br>
         position: {x: 10, y: 5}<br>
     * }); <br>
     * or <br>
     * var aConnectionFromPort = new MoLIC.Connection({<br>
         port: aPortInstance<br>
     * }); <br>
     * 
     *
     */
    MoLIC.Connection = function(config) {
        this._initConnection(config);
        this._draw();
        this._bind();
    };

    MoLIC.Connection.prototype = {
        _initConnection: function(config) {

            this.className = CONNECTION;

            config.width = WIDTH;
            config.height = HEIGHT;

            this.transition = null;

            // connected to port
            if( config.port ){
                this.port = config.port;
                config.port.addConnection(this);
                this.x = this.port.getAbsolutePosition.x;
                this.y = this.port.getAbsolutePosition.y;
                  
            }
            else
            {
                // not connected. So... put it in a position
                this.port = null;
                this.x = config.position.x - ( SIZE / 2 );
                this.y = config.position.y - ( SIZE / 2 );
            }

            config.x = this.x;
            config.y = this.y;


            // call super constructor
            Kinetic.Group.call(this, config);

            this.setDraggable(true);
            this.rect = null;
        },

        /**
        * private method that draws a Connection instance 
        * @name _draw
        * @method
        * @memberof MoLIC.Connection.prototype
        */
        _draw: function() {

            this.rect =  new Kinetic.Rect({
                x: 0,
                y: 0,
                fill: FILL,
                width: SIZE,
                height: SIZE
            });
            /*
            else if(this.type === "target"){
                this.rect = new Kinetic.Shape({
                    drawFunc: function(canvas) {
                      var context = canvas.getContext();
                      context.beginPath();
                      context.moveTo(toX, toY);
                      context.lineTo(toX-headlen*Math.cos(angle-Math.PI/6), toY-headlen*Math.sin(angle-Math.PI/6));
                      context.lineTo(toX-headlen*Math.cos(angle+Math.PI/6), toY-headlen*Math.sin(angle+Math.PI/6));
                      context.lineTo(toX, toY);
                      context.closePath();
                      canvas.fillStroke(this);
                    },
                    fill: '#00D2FF',
                    stroke: 'black',
                    strokeWidth: 4
                });
            }*/

    
            this.add(this.rect);
        },

        /**
        * private method that binds events to a Connection instance 
        * @name _draw
        * @method
        * @memberof MoLIC.Connection.prototype
        */
        _bind: function(){

            this.on("mouseenter", function(e){
                this.setHightlight(true);
            });

            this.on("mouseleave", function(e){
                this.setHightlight(true);
            });

            this.on("dragstart", function(e){

                MoLIC.showAllPorts();
            });            

            this.on("dragend", function(e){

                var newPort = MoLIC.getPortNear(this);

                // newPort can be null
                this.setPort(newPort);

                MoLIC.hideAllPorts();
            });

        },


        /**
        * Connection are dragged around stage in order to find Port to connect. this method  This method adds a connection from Port instance.
        * @name removeConnection
        * @method
        * @memberof MoLIC.Port.prototype
        * @param {Object} shape
        * @return {Boolean} isNear 
        */
        isNear: function(shape){

            
            var shapeX = shape.getAbsolutePosition().x,
                shapeY = shape.getAbsolutePosition().y,
                connX  =  this.getAbsolutePosition().x,
                connY  =  this.getAbsolutePosition().y;

            if(connX > shapeX - SIZE && connX < shapeX + SIZE && connY > shapeY - SIZE && connY < shapeY + SIZE) {
              return true;
            }
            else {
              return false;
            }

        },

        /**
        * get absolute center of a Connection's instance.   
        * @name getAbsoluteCenter
        * @method
        * @memberof MoLIC.Connection.prototype
        * @return {Object} position (x,y)
        */
        getAbsoluteCenter: function(){
            var absCenter = {
                x: this.getX() + (SIZE / 2),
                y: this.getY() + (SIZE / 2)
            };

            return absCenter;
        },

        /**
        * set connection position according to passed center position
        * @name setCenterPosition
        * @method
        * @memberof MoLIC.Connection.prototype
        * @param {Object} position
        */
        setCenterPosition: function(position){
            this.setPosition( position.x - ( SIZE / 2 ), position.y - ( SIZE - 2 ) )
        },


        /**
        * update position according to property port. SetPort should be used instead. 
        * @method updatePositionFromPort
        * @param port
        * @deprecated 
        */
        updatePositionFromPort: function(){
            if(this.port){
                this.setPosition(this.port.getAbsolutePosition().x, this.port.getAbsolutePosition().y);
            }
        },



        /**
        * highlights or clear highlight according to flag 
        * @method setHightlight
        * @param flag 
        */
        setHightlight: function(flag){

            // choose color according to flag on
            var color = (flag ? HIGHLIGHT : FILL);

            this.highlight = flag;

            this.rect.setFill(color);

            this.getLayer().draw();
        },


        /**
        * set hover state on or off 
        * @method setHover
        * @param flag 
        */
        setHover: function(flag){

            // choose color according to flag on
            var color = ( flag ? HOVER : FILL);

            // but it wont change highlight state
            color =  (this.highlight ? HIGHLIGHT : color );

            this.rect.setFill(color);

            this.getLayer().draw();
        },


        /**
        * redraw connection and all related objects (i.e. transitions)
        * @method refresh
        */
        refresh: function(){

            if(this.transition)
                this.transition.redraw();

            if(this.layer != null ){
                this.getLayer().draw();    
            }
            
        },

        /**
         * set transition function 
         * @name setTransition
         * @method
         * @memberof MoLIC.Connection.prototype
         * @param {Object} transition
         */
        setTransition: function(newTransition){
            this.transition = newTransition;
        },


        /**
         * get transition function 
         * @name getTransition
         * @method
         * @memberof MoLIC.Connection.prototype
         */
        getTransition: function(){
            return this.transition;
        },
        
        /**
         * set port function 
         * @name setPort
         * @method
         * @memberof MoLIC.Connection.prototype
         * @param {Object} port
         */
        setPort: function(aPort){

            // changing from a port to other
            if( this.port != null && this.port != aPort ){
                
                // remove previous connection from port
                this.port.removeConnection(this);
            }

            // if there is a new port to be set
            if( aPort != null ){

                // set connection position to port position
                this.setPosition(aPort.getAbsolutePosition().x, aPort.getAbsolutePosition().y);
                
                // if this port wasnt already connected 
                if(this.port != aPort)
                    aPort.addConnection(this);

            }

            // set this.port (Can be null)
            this.port = aPort;
            
            // redraw things again
            this.refresh();

        },


        /**
         * get port function 
         * @name getPort
         * @method
         * @memberof MoLIC.Connection.prototype
         */
        getPort: function(){
            return this.port;
        }


    };
    
    Kinetic.Util.extend(MoLIC.Connection, Kinetic.Group);


})();