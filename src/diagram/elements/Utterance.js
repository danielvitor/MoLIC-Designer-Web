(function() {
 
    // constants
    var 
        UTTERANCE = 'Utterance',

        /**
        Port width and height are set to 10

        @attribute WIDTH
        @type Number
        @default 10
        @readOnly
        **/
        WIDTH = 2,
        /**
        Utterance color
        @attribute FILL
        @type String ("#RGB")
        @default "#333"
        @readOnly
        **/
        FILL = "#000",
        
        /**
        Utterance selected color
        @attribute SELECTED
        @type String ("#RGB")
        @default "#600"
        @readOnly
        **/
        SELECTED = "#600",

                /**
        Utterance highlight color
        @attribute HIGHLIGHT
        @type String ("#RGB")
        @default "#999"
        @readOnly
        **/
        HIGHLIGHT = "#060",

        /**
        Utterance hover color
        @attribute HOVER
        @type String ("#RGB")
        @default HIGHLIGHT
        @readOnly
        **/
        HOVER = HIGHLIGHT;

    /**
     * @class Utterance
     * @memberof MoLIC
     * @uses MoLIC.Group
     */
    MoLIC.Utterance = function(config) {
        this._initUtterance(config);
        this._draw();
        this._bind();

    };

    MoLIC.Utterance.prototype = {
        _initUtterance: function(config) {

            this.className = UTTERANCE;

            config.draggable = false;

            // call super constructor
            Kinetic.Group.call(this, config);

            // source and target connetions
            this.source = config.source;
            this.target = config.target;

            // update conn's references
            this.source.setTransition(this);
            this.target.setTransition(this);

            this.text = null;

            this.line = null;

            this.highlight = false;

            this.textOffset = {x: 0, y: 0};

            this.lineMiddle = null;
        },

        _draw: function() {
            var targetAbsCenter = this.target.getAbsoluteCenter(),
                sourceAbsCenter = this.source.getAbsoluteCenter();

            //console.log("("+sourceAbsCenter.x +", "+ sourceAbsCenter.y+")");
            //console.log("("+targetAbsCenter.x +", "+ targetAbsCenter.y+")");


            //console.log(this.textOffset );

            this.line = this._drawArrow( sourceAbsCenter.x, sourceAbsCenter.y, 
                         targetAbsCenter.x, targetAbsCenter.y);

            this.add(this.line);



            this.lineMiddle = {
                x: ( ( targetAbsCenter.x - sourceAbsCenter.x ) / 2 ) + sourceAbsCenter.x ,
                y:  ( ( targetAbsCenter.y - sourceAbsCenter.y ) / 2 ) + sourceAbsCenter.y 
            };

            this.center = new Kinetic.Circle({
                x: this.lineMiddle.x,
                y: this.lineMiddle.y,
                radius: 4,
                fill: 'black',
                stroke: 'black',
                strokeWidth: 1,
                visible: false
            });

            this.add(this.center);


            this.text = new Kinetic.Text({
                text:     "this is a simple text \n to text it.",
                x:   this.center.getX() + this.textOffset.x,
                y:   this.center.getY() + this.textOffset.y,
                fontSize: 14,
                fontFamily: 'Calibri',
                stroke:   '#222',
                strokeWidth: 1,
                draggable: true
            });

            this.add(this.text);
        },


        _bind: function() {
            this.getTarget().on("dragmove", function(e){
                this.getTransition().redraw();
            });

            this.getSource().on("dragmove", function(e){
                this.getTransition().redraw();
            });

            /*
            this.on("mouseenter", function(e){
                var transitionLine = e.targetNode;


                transitionLine.setStroke(HIGHLIGHT);
                transitionLine.getLayer().draw();

            });
            */

            /*
            this.on("mouseleave", function(e){
                var transitionLine = e.targetNode;

                console.log("mouseleave utt");

                transitionLine.setStroke(FILL);
                transitionLine.getLayer().draw();
            });
            */

            this._bindTextEvent();
            
            /*this.line.on("dblclick", this._changeText(e){
                var instance = e.targetNode.parent;
                instance._changeText(e);
            });
            */

        },

        _changeText: function(e){
            console.log("changing text");

        },

        _bindTextEvent: function(){
            this.text.on("dragend", function(e){

                console.log("drag end");

                var textShape = e.targetNode,
                    thisUtterance = e.targetNode.parent;

                var previous = thisUtterance.textOffset; 

                thisUtterance.textOffset = {
                    x : textShape.getAbsolutePosition().x - thisUtterance.center.getAbsolutePosition().x,
                    y : textShape.getAbsolutePosition().y - thisUtterance.center.getAbsolutePosition().y
                };

            });

            /*
            this.text.on("dblclick", this._changeText(e){
                var instance = e.targetNode.parent;
                instance._changeText(e);
            });
            */

        },

        setHightlight: function(flag){

            // choose color according to flag on
            var color = (flag ? HIGHLIGHT : FILL);

            this.line.setStroke(color);
            

            this.target.setHightlight(flag);
            this.source.setHightlight(flag);

            this.getLayer().draw();

        },

        setHover : function(flag){

            // choose color according to flag on
            var color = ( flag ? HOVER : FILL);

            // but it wont change highlight state
            color =  (this.highlight ? HIGHLIGHT : color );

            this.line.setStroke(color);

            this.getLayer().draw();
        },

        redraw: function()
        {
            this.line.remove();
            this.center.remove();
            this.text.remove();

            this._draw();

            this._bindTextEvent();
              /*
            this.getLayer().draw();
            
            this.center.getLayer().draw();
            this.text.getLayer().draw();
            */
            
            MoLIC.drawStage();
        },

        _drawArrow : function(fromX, fromY, toX, toY){

            // how long you want the head of the arrow to be, you could calculate this as a fraction of the distance between the points as well.
            var headlen = 15;   
            var angle = Math.atan2(toY-fromY, toX-fromX);

            line = new Kinetic.Line({
                points: [
                    fromX, fromY, 
                    toX, toY, 
                    toX-headlen*Math.cos(angle-Math.PI/6), toY-headlen*Math.sin(angle-Math.PI/6),
                    toX, toY, 
                    toX-headlen*Math.cos(angle+Math.PI/6), toY-headlen*Math.sin(angle+Math.PI/6)
                ],
                stroke: FILL,
                strokeWidth: WIDTH,
                lineCap: 'round'
            });

            return line;
        }


    };
    
    Kinetic.Util.extend(MoLIC.Utterance, Kinetic.Group);

    Kinetic.Node.addGetterSetter(MoLIC.Utterance, 'source');

    Kinetic.Node.addGetterSetter(MoLIC.Utterance, 'target');

    /**
     * set source connection function 
     * @name setSource
     * @method
     * @memberof MoLIC.Utterance.prototype
     * @param {String} name
     */

    /**
     * get source connection function 
     * @name getSource
     * @method
     * @memberof MoLIC.Utterance.prototype
     */

})();