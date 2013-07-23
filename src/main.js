 $(document).ready(function() {


	$('body').layout({ applyDemoStyles: false,
		spacing_open : 0 ,
		east : {size : 300},
		onload: function(){
			$(".ui-layout-north").css("z-index",'1');
            // init page setting 
            MoLICDesigner.createStage(getCanvasDimensions().width, getCanvasDimensions().height);

            alert(MoLICDesigner);
		}
	});

    function getCanvasDimensions(){
        return { 
            height : 500, //$(document).height() - 300,
            width  : 1000
        };
	}

 });