 $(document).ready(function() {


	$('body').layout({ applyDemoStyles: false,
		spacing_open : 0 ,
		east : {size : 300},
		onload: function(){
			$(".ui-layout-north").css("z-index",'1');
            // init page setting 
            MoLICDesigner.createStage(getCanvasDimensions().width, getCanvasDimensions().height);
		}
	});

    function getCanvasDimensions(){
        return { 
            height : 500, //$(document).height() - 300,
            width  : 1000
        };
	}

	$("#nlg-generate").click(function(){

		var selectedTemplate = $('input[name=speech-options]:checked', '#nlg-form').val();

		if( selectedTemplate === "scene-list"){
			NLGModule.generateSceneDescrition(MoLICDesigner.diagram);
		}
		else if( selectedTemplate === "tactical-template"){
			NLGModule.generateTacticalDescription(MoLICDesigner.diagram);
		}

	});


	$(".diagram_selector").click(function(){
		diagram_id = $(this).attr("id");

		$(".active").removeClass("active");

		$(this).parent().addClass("active");

		if(diagram_id === "diagram_v0")
		{
			MoLICDesigner.renderDiagram(molic_v0);
		}
		else
		{
			MoLICDesigner.renderDiagram(molic_v1);
		}

		NLGModule.clearSpeech();
	});

    MoLICDesigner.renderDiagram(molic_v0);

 });