/**
 * MoLIC Designer v0.1
 * Date: Set 15 2012
 *
 * Copyright (C) 2012 - 2012 by Daniel Ferreira
 *
 * This is just a poc in order to test the power of canvas and kinectjs 
 */

 window.onload = function() {
        var stage = new Kinetic.Stage({
          container: 'md-workbench',
          width: 600,
          height: 380
        });
        var layer = new Kinetic.Layer();

        // anonymous function to induce scope
		(function() {
		var i = n;
		var box = new Kinetic.Rect({
		  x: i * 30 + 150,
		  y: i * 18 + 40,
		  fill: 'white',
		  stroke: 'black',
		  strokeWidth: 2,
		  draggable: true,
		  width: 150,
		  height: 200
		});


		box.on('dragstart', function() {
		  box.moveToTop();
		  layer.draw();
		});

		box.on('dragmove', function() {
		  document.body.style.cursor = 'pointer';
		});
		/*
		 * dblclick to remove box for desktop app
		 * and dbltap to remove box for mobile app
		 */
		box.on('dblclick dbltap', function() {
		  layer.remove(box);
		  layer.draw();
		});

		box.on('mouseover', function() {
		  document.body.style.cursor = 'pointer';
		});
		box.on('mouseout', function() {
		  document.body.style.cursor = 'default';
		});

		layer.add(box);
		})();

        stage.add(layer);
      };
