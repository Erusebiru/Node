function initBoards(){
	var boxes = document.querySelectorAll(".dropZone");
	for(const box of boxes){
		box.addEventListener("dragover", function( event ) {
			event.preventDefault();
		}, false);

		box.addEventListener("dragenter", function( event ) {
			if ( event.target.className == "dropZone" ) {
				event.target.style.background = "red";
			}

		}, false);

	    box.addEventListener("dragleave", function( event ) {
			if ( event.target.className == "dropZone" ) {
				event.target.style.background = "";
			}
		}, false);

		box.addEventListener("drop", function( event ) {
			event.preventDefault();
			if ( event.target.className.includes("dropZone")) {
				event.target.style.background = "";
				
				/*if($(dragged.parentNode.parentNode).children().eq(1).children().length < 3){
					$(dragged.parentNode.parentNode).children().eq(0).remove();
				}*/
				dragged.parentNode.removeChild( dragged );
				
				$(dragged).appendTo(event.target.parentNode.parentNode);
				
				//dragged = null;
				var state = $(dragged.parentNode.parentNode).attr('class');
				var id = $(dragged).data('id');
				updateState(state,id);

				//initBoards()
				//initChilds();
			}
		}, false);
	}
}

function initChilds(){
	//Inicialización de los elementos que SÍ SE PUEDEN mover
	var fills = document.querySelectorAll(".tarea");
	for(const fill of fills){
	    fill.addEventListener("drag", function( event ) {
		}, false);
	    fill.addEventListener("dragstart", function( event ) {
			dragged = event.target;
			event.dataTransfer.setData('Text', this.id); //Evento para poder mover elementos en Firefox
			event.target.style.opacity = 0.5;
		}, false);
		fill.addEventListener("dragend", function( event ) {
			event.target.style.opacity = "";
		}, false);
	}
}

function updateState(state,id){
	$.ajax({
		url: '/task/' + id + '/update',
		method: 'post',
		data: {
			estado: state
		}
	})
}

function createTask(task){
	$.ajax({
		url: '/task/create',
		method: 'post',
		data: {
			tarea: task,
			estado: 'backlog'
		},
		success: function(result){
			console.log(result)
			var tr = $('<tr>').attr({'draggable':true,'class':'tarea','data-id':result.id}).appendTo('.backlog tbody');
			$('<td>').attr('class','tdInfo').text(result.tarea).appendTo(tr);
			$('<td>').attr({'class':'details','onclick':'javascript:window.location.href = "' + result.id + '"'}).text('Ver').appendTo(tr);
		},
		error: function(result){
			console.log("ERROR")
			console.log("result")
		}
	})
}