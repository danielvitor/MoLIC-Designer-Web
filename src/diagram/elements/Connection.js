(function() {
 
    // constants
    var 
        CONNECTION = 'Connection',
        WIDTH = 10,
        HEIGHT = 10,
        FILL = "#800",
        HIGHLIGHT = "#222",
        SIZE = 10;
        
    /**
     * Port constructor
     * @constructor
     * @memberof MoLIC
     * @augments MoLIC.Connection
     * @param {Object} config
     * @param {Object} config.element
     * @param {Object} config.position
     * {{ShapeParams}}
     * {{NodeParams}}
     * @example
     * var shapePort = new MoLIC.Connection({<br>
     *   transition: scene,
         position: {x: 10, y: 5, name: TOP}
          <br>
     * });
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

        _bind: function(){
            this.on("mouseenter", function(e){
                console.log(this);
                this.rect.setFill(HIGHLIGHT);
                this.getLayer().draw();
            });

            this.on("mouseleave", function(e){
                this.rect.setFill(FILL);
                this.getLayer().draw();
            });

            this.on("dragend", function(e){
                console.log("lets find some ports");

                var newPort = MoLIC.getPortNear(this);
                if(  newPort ){
                    console.log("ACHEIIIIIIIIIIIIIIIIIIIII");

                    this.setPort(newPort);
                }
                else{
                    this.setPort(null);

                    // unbind connection to port
                    // remove conn from list of connections in port

                }
                /*
                var points = {
                    topLeft: { 
                        x: this.getAbsolutePosition().x,
                        y: this.getAbsolutePosition().y
                    },
                    topRight:  { 
                        x: this.getAbsolutePosition().x + SIZE,
                        y: this.getAbsolutePosition().y
                    },
                    bottomLeft: { 
                        x: this.getAbsolutePosition().x,
                        y: this.getAbsolutePosition().y + SIZE
                    },
                    bottomRight: { 
                        x: this.getAbsolutePosition().x + SIZE,
                        y: this.getAbsolutePosition().y + SIZE
                    }
                };

                */


                //console.log( MoLIC.getIntersection(points.topLeft).getParent() );

            });

            this.on("dblclick", function(e){
                MoLIC.autoDrag(this);
            });

        },

        isNear: function(shape){

            
            var shapeX = shape.getAbsolutePosition().x,
                shapeY = shape.getAbsolutePosition().y,
                connX = this.getAbsolutePosition().x,
                connY = this.getAbsolutePosition().y;
            
            console.log("shape ("+shapeX+","+shapeY+")");
            console.log("conn  ("+connX+","+connY+")");

            if(connX > shapeX - SIZE && connX < shapeX + SIZE && connY > shapeY - SIZE && connY < shapeY + SIZE) {
              return true;
            }
            else {
              return false;
            }

        },

        getAbsoluteCenter: function(){
            var absCenter = {
                x: this.getX() + (SIZE / 2),
                y: this.getY() + (SIZE / 2)
            };

            return absCenter;
        },

        updatePositionFromPort: function(port){

            console.log('nao devia chamar mais');

        },

        refresh: function(){

            MoLIC.drawStage();
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

            if( this.port != null && this.port != aPort ){
                this.port.removeConnection(this);
                return;
            }


            if( aPort != null ){
                // set connection position to port position
                this.setPosition(aPort.getAbsolutePosition().x, aPort.getAbsolutePosition().y);
                
                if(this.port != aPort)
                    aPort.addConnection(this);
            }

            // set this.port
            this.port = aPort;


            if(this.transition)
                this.transition.redraw();
            
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