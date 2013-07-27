(function() {
 
    // constants
    var 
        SCENE = 'Scene',
        WIDTH = 120,
        HEIGHT = 60,
        DEFAULT_TOPIC = "No topic";
        

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
     * var scene1 = new MoLIC.Scene({<br>
     *   x: 100,<br>
     *   y: 200,<br>
     *   name: 'Scene to be a example'<br>
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

                var thisScene = e.targetNode.parent;

                sceneTopic = prompt("Topic",thisScene.getName());

                if(sceneTopic === null)
                {
                    return;
                }
                
                if(sceneTopic != thisScene.getName()){
                    thisScene.text.setText(sceneTopic);
                    thisScene.name = sceneTopic;
                    MoLIC.drawStage();
                }
            });
            


        },
        
        _drawPorts: function(){
            this.points = MoLIC.Util.getInnerPoints(this);

            this.ports = {
                TOP:   this._createPort(this.points.TOP),
                BOTTOM:this._createPort(this.points.BOTTOM),
                LEFT:  this._createPort(this.points.LEFT),
                RIGHT: this._createPort(this.points.RIGHT)
            };

            // add them to group
            for(index in this.points) { 
                var port = this.ports[index];
                this.add(port);
                port.hide();
            }

        },

        getPort: function(which){
            return this.ports[which];

        },

        _createPort: function(position){
            return MoLIC.createPort({
                'shape': this,
                'position': position,
                visible: false
            });
        },

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
     * @name setName
     * @method
     * @memberof MoLIC.Scene.prototype
     * @param {String} name
     */

    /**
     * get scene name function 
     * @name getName
     * @method
     * @memberof MoLIC.Scene.prototype
     */

})();