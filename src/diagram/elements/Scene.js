(function() {
 
    // constants
    var 
        SCENE = 'Scene';
        

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
    };

    MoLIC.Scene.prototype = {
        _initScene: function(config) {

            this.className = SCENE;

            config.draggable = true;

            // call super constructor
            Kinetic.Group.call(this, config);

            this.name = config.name;
            this.text = null;
            this.border = null;
            this.width = 200;
            this.height = 100;
            this.isPortVisible = false;
            
        },

        _draw: function() {

            // scene topic
            this.text = new Kinetic.Text({
                text:     this.getName(),
                x:        10,
                y:        10,
                width:    this.width - 20,
                height:   this.height,
                align:    'center',
                fontSize: 14,
                stroke:   '#555'
            });

            this.border = new Kinetic.Rect({

                fill:          '#fff',
                width:         this.width,
                height:        this.height,
                padding:       20,
                strokeWidth:   1,
                cornerRadius:  10
            });

            this.add(this.border);
            this.add(this.text);
            
            this._drawPoints();

            this.displayPorts( this.isPortVisible );
        },

        _drawPoints: function(){
            this.points = MoLIC.Util.getInnerPoints(this);

            this.ports = {
                top:   this._drawSinglePoint(this.points.top),
                bottom:this._drawSinglePoint(this.points.bottom),
                left:  this._drawSinglePoint(this.points.left),
                right: this._drawSinglePoint(this.points.right)
            };

            // add them to group
            for(index in this.points) { 
                var pos = this.ports[index];
                this.add(pos);
            }

        },

        _drawSinglePoint: function(position){
            return new Kinetic.Circle({
                x: position.x,
                y: position.y,
                fill: '#333',
                radius: 4
            });
        },

        displayPorts: function(flag){
        
            // flag default = true

            this.isPortVisible = flag; 

            for(index in this.points) { 
                var pos = this.ports[index];
                
                if(flag === false)
                {
                    pos.hide();
                }
                else
                {
                    pos.show();
                }
            }

        }
    };
    
    Kinetic.Util.extend(MoLIC.Scene, Kinetic.Group);

        // add getters setters
    Kinetic.Node.addGetterSetter(MoLIC.Scene, 'name', 'No name');

    Kinetic.Node.addGetterSetter(MoLIC.Scene, 'height', 100);
    
    Kinetic.Node.addGetterSetter(MoLIC.Scene, 'width', 200);

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