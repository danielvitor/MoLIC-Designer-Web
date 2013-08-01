(function() {
 
    // constants
    var 
        SYSTEMPROCESSING = 'SystemProcessing',
        RECTSIZE = 30;

   
    MoLIC.SystemProcessing = function(config) {
        this._initSystemProcessing(config);
        this._draw();
    };

    MoLIC.SystemProcessing.prototype = {
        _initSystemProcessing: function(config) {

            this.className = SYSTEMPROCESSING;

            config.draggable = true;

            // call super constructor
            Kinetic.Group.call(this, config);

            this.x = config.x;
            this.y = config.y;
            this.blackBox = null;
        },

        _draw: function() {
            this.blackBox =  new Kinetic.Rect({

                fill:          '#111',
                width:         RECTSIZE,
                height:        RECTSIZE,
                strokeWidth:   1
            });

            this.add(this.blackBox);
        }
    };
    
    Kinetic.Util.extend(MoLIC.SystemProcessing, Kinetic.Group);

})();