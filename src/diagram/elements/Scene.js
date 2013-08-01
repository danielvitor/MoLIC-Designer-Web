(function() {
 
    var 
        SCENE = 'Scene',

        WIDTH = 120,
        HEIGHT = 60,
        DEFAULT_TOPIC = "No topic",

        /**
        Scene min width are set to 120
        @attribute MIN_WIDTH
        @type Number
        @default 120
        @readOnly
        **/
        MIN_WIDTH = 120,

        /**
        Scene min height are set to 60
        @attribute MIN_HEIGHT
        @type Number
        @default 60
        @readOnly
        **/
        MIN_HEIGHT = 60;
        

    /**
     * Scene class extends Kinetic.Group and present text inside a rounded rectangle.

     * @class Scene
     * @namespace MoLIC
     * @uses Kinetic.Group
       @example
     * var scene1 = new MoLIC.Scene({<br>
     *   x: 100,<br>
     *   y: 200,<br>
     *   name: 'a topic description'<br>
     * });
     */
    MoLIC.Scene = function(config) {
        this._initScene(config);
        this._draw();
        this._bind();
    };

    MoLIC.Scene.prototype = {
        _initScene: function(config) {

            this.className = SCENE;

            config.draggable = true;


            this.x = config.x;
            this.y = config.y;
            this.name = config.name;
            this.text = null;
            this.border = null;
            this.width = WIDTH;
            this.height = HEIGHT;

            this.highlight = true;

            // call super constructor
            Kinetic.Group.call(this, config);
        },

        /**
        * private method that draws a Scene instance
        * @method _draw
        * @memberof MoLIC.Port.prototype
        */
        _draw: function() {

            // scene topic
            this.text = new Kinetic.Text({
                text:     this.getName(),
                x:        10,
                y:        10,
                width:    this.width - 20,
                height:   this.height,
                fontSize: 14,
                fontFamily: 'Calibri',
                stroke:   '#222',
                strokeWidth: 1
            });

            this.border = new Kinetic.Rect({

                x:             0,
                y:             0,
                fill:          '#fff',
                width:         this.width,
                height:        this.height,
                padding:       20,
                strokeWidth:   1,
                cornerRadius:  10
            });

            this.add(this.border);
            this.add(this.text);
            
            this._drawPorts();
        },


        /**
        * private method that binds events to this Scene instance 
        * @method _bind
        * @memberof MoLIC.Port.prototype
        */
        _bind: function(){


            this.on("dragmove", function(e){

                // notify ports
                this.getPort(LEFT).notify("dragmove");
                this.getPort(TOP).notify("dragmove");
                this.getPort(RIGHT).notify("dragmove");
                this.getPort(BOTTOM).notify("dragmove");

                MoLIC.drawStage();

            });

            this.on("dragend", function(e){
                MoLIC.drawStage();
            });


            this.on("dblclick", function(e){

                var thisScene = e.targetNode.parent,
                    newText = MoLIC.promptForText(thisScene, thisScene.name, "Topic");

                if( newText != null )
                {
                    thisScene.text.setText(newText);
                    thisScene.name = newText;
                    MoLIC.drawStage();
                }

            });


        },
        
        /**
        * Every connectable shape has ports. _drawPorts draw four ports and hide them.
        * @method _drawPorts
        */
        _drawPorts: function(){
            this.points = MoLIC.Util.getInnerPoints(this);

            this.ports = {
                TOP:   this._createPort(this.points.TOP),
                BOTTOM:this._createPort(this.points.BOTTOM),
                LEFT:  this._createPort(this.points.LEFT),
                RIGHT: this._createPort(this.points.RIGHT)
            };

            // add them to group
            for( index in this.points ) { 
                var port = this.ports[index];
                this.add(port);
                port.hide();
            }

        },

        /**
        * returns a port instance 
        * @method getPort
        * @param {String} which ( LEFT | RIGHT | TOP | BOTTOM )
        * @return {Object} port
        */
        getPort: function(which){
            return this.ports[which];
        },


        /**
        * private method that creates port instance  
        * @method _createPort
        * @param {Object} position (x,y)
        */
        _createPort: function(position){
            return MoLIC.createPort({
                'shape': this,
                'position': position,
                visible: false
            });
        },


        /**
        * function that shows or hides all ports according passed param.  
        * @method displayPorts
        * @param {boolean} show
        */
        displayPorts: function(show){

            for(index in this.points) { 
                var port = this.ports[index];
                
                if(!show){
                    port.hide();
                }
                else
                {
                    port.show();
                }
                
            }
            this.refresh();

        },


        /**
        * function that redraws this scene.  
        * @method refresh
        */
        refresh: function(){
            this.getStage().draw();
        }
    };
    

    Kinetic.Util.extend(MoLIC.Scene, Kinetic.Group);

    // add getters setters
    Kinetic.Node.addGetterSetter(MoLIC.Scene, 'name', 'No name');

    Kinetic.Node.addGetterSetter(MoLIC.Scene, 'height', HEIGHT);
    
    Kinetic.Node.addGetterSetter(MoLIC.Scene, 'width', WIDTH);

    /**
     * set scene name function 
     * @method setName
     * @param {String} name
     */

    /**
     * get scene name function 
     * @method getName
     */

})();