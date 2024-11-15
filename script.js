	$('#play').hide();


	var bstWidget = new BST();
    var gw = bstWidget.getGraphWidget();
	

	$('#title-BST').click(function() {
		if(isPlaying) {	stop(); }
		closeSearch();
		closeInsert();
		closeRemove();
		showActionsPanel();
		hideStatusPanel();
		hideCodetracePanel();
		bstWidget.isAVL(false);
	});
	$('#title-AVL').click(function() {
		if(isPlaying) {	stop(); }
		closeSearch();
		closeInsert();
		closeRemove();
		showActionsPanel();
		hideStatusPanel();
		hideCodetracePanel();
		bstWidget.isAVL(true);
	});

	function findMin() {
		if(isPlaying) {	stop(); }
		setTimeout( function() {
			if((mode=="exploration")&&bstWidget.findMin()) {
				$('#current-action').show();
				$('#current-action p').html("Find minimum");
				$('#progress-bar').slider( "option", "max", gw.getTotalIteration()-1);
				closeSearch();
				triggerRightPanels();
				isPlaying = true;
			}
		}, 500)
	}
	
	function findMax() {
		if(isPlaying) {	stop(); }
		setTimeout( function() {
			if((mode=="exploration")&&bstWidget.findMax()) {
				$('#current-action').show();
				$('#current-action p').html("Find maximum");
				$('#progress-bar').slider( "option", "max", gw.getTotalIteration()-1);
				closeSearch();
				triggerRightPanels();
				isPlaying = true;
			}
		}, 500)
	}

    function searchVertex(){
		if(isPlaying) {	stop(); }
		setTimeout( function() {
			var input = $('#v-search').val();
			input = parseInt(input);
			if((mode=="exploration")&&bstWidget.search(input)) {
				$('#current-action').show();
				$('#current-action p').html("Search for "+ input);
				$('#progress-bar').slider( "option", "max", gw.getTotalIteration()-1);
				closeSearch();
				triggerRightPanels();
				isPlaying = true;
			}
		}, 500)
    }

    function insertVertex(){
		if(isPlaying) {	stop(); }
		setTimeout( function() {
			var input = $('#v-insert').val();
			input = input.split(",");
			if((mode=="exploration")&&bstWidget.insertArr(input)) {
				$('#current-action').show();
				$('#current-action p').html("Insert "+ input);
				$('#progress-bar').slider( "option", "max", gw.getTotalIteration()-1);
				closeInsert();
				triggerRightPanels();
				isPlaying = true;
			}
		}, 500)
    }

   function removeVertex(){
		if(isPlaying) {	stop(); }
		setTimeout( function() {
			var input = $('#v-remove').val();
			input = input.split(",");
			if((mode=="exploration")&&bstWidget.removeArr(input)) {
				$('#current-action').show();
				$('#current-action p').html("Remove "+ input);
				$('#progress-bar').slider( "option", "max", gw.getTotalIteration()-1);
				closeRemove();
				triggerRightPanels();
				isPlaying = true;
			}
		}, 500);
    }
	
	function inorderTraversal(){
		if(isPlaying) {	stop(); }
		setTimeout( function() {
			if((mode=="exploration")&&bstWidget.inorderTraversal()) {
				$('#current-action').show();
				$('#current-action p').html("In-order Traversal");
				$('#progress-bar').slider( "option", "max", gw.getTotalIteration()-1);
				$('#inorder-err').html("");
				closeSearch();
				closeInsert();
				triggerRightPanels();
				isPlaying = true;
			}
		}, 500);
    }
	
	var isPaused = false;
	function isAtEnd() {
		return (gw.getCurrentIteration()==(gw.getTotalIteration()-1));
	}
	
	function pause() {
		if(isPlaying) {
			isPaused = true;
			gw.pause();
			$('#play').show();
			$('#pause').hide();
		}
	}
	function play() {
		if(isPlaying) {
			isPaused = false;
			$('#pause').show();
			$('#play').hide();
			if(isAtEnd()) {
				gw.replay();
			} else {
				gw.play();
			}
		}
	}
	function stepForward() {
		if(isPlaying) {
			pause();
			gw.forceNext(250);
		}
	}
	function stepBackward() {
		if(isPlaying) {
			pause();
			gw.forcePrevious(250);	
		}
	}
	function goToBeginning() {
		if(isPlaying) {
			gw.jumpToIteration(0,0);
			pause();
		}
	}
	function goToEnd() {
		if(isPlaying) {
			gw.jumpToIteration(gw.getTotalIteration()-1,0);
			pause();
		}
	}
	function stop() {
		gw.stop();
		isPaused = false;
		isPlaying = false;
		$('#pause').show();
		$('#play').hide();
		$('#current-action').hide();
	}

	