(function(){

	let selectedAlgorithm = 'linear';
	let button = document.querySelector("input[type=button]");
	let search;
	let tree = Array.from({length: 10}, () => Math.floor(Math.random() * 100));
	var result;
	var parentList = document.querySelector('ul');
	let arraySizeEl = document.querySelector('input[name=arraysize]');

	generateTree();

	arraySizeEl.addEventListener("blur", (event) => {
		let size = event.target.value || 10;
		let array = Array.from({length: size}, () => Math.floor(Math.random() * 100));
		
		tree = array;
		generateTree();
	})

	button.addEventListener("click", () => {
		document.querySelector('.not-found').innerHTML = '';

		selectedAlgorithm = document.querySelector('input[name=algorithm]:checked').value;
		search = parseInt(document.querySelector('input[name=search]').value);

		if(selectedAlgorithm === 'linear' && !isNaN(search)) {
			linearSearch(search);

		} else if(selectedAlgorithm === 'binary') {
			tree.sort(function(a, b){return a - b});
			generateTree();
			binarySearch(search);

		} else if(selectedAlgorithm === 'selection') { 
			selectionSort();

		} else if(selectedAlgorithm === 'bubble') { 
			bubbleSort();
		}
	});

	function generateTree() {
		var list_item;
		var container = document.createElement('div');
		container.classList.add('area');

		document.getElementsByClassName("list")[0].innerHTML = '';

		for (var i=0; i<tree.length; i++){
		    list_item = document.createElement('li');
		    container.style.height = tree[i] + 'px';
		    list_item.appendChild(container);

		    parentList.appendChild(list_item);
		    list_item.innerHTML=list_item.innerHTML + tree[i];
		}
	}

	function selectionSort() {
		let len = tree.length;
		let parentNode = document.querySelectorAll('ul.list')[0];

	    for (let i = 0; i < len; i++) {
	        let min = i;
	        for (let j = i + 1; j < len; j++) {
	            if (tree[min] > tree[j]) {
	                min = j;
	            }
	        }
	        if (min !== i) {
	        	let tmp = tree[i];
	            tree[i] = tree[min];
	            tree[min] = tmp;
	            setTimeout(function(){
	            	swapElements(document.querySelectorAll('li')[i], document.querySelectorAll('li')[min]);
	            }, i* 1000)
	       
	        }
	    }
	    return tree;
	}

	function bubbleSort() {
		let len = tree.length;
		//let parentNode = document.querySelectorAll('ul.list')[0];

	    for (let i = 0; i < len; i++) {
	        for (let j = 0; j < len; j++) {
	            if (tree[j] > tree[j + 1]) {
	            	let tmp = tree[j];
		                tree[j] = tree[j + 1];
		                tree[j + 1] = tmp;
	                setTimeout(function(){
		            	swapElements(document.querySelectorAll('li')[j], document.querySelectorAll('li')[j+1]);
		            }, i* 1000)
	            }
	        }
	    }
	}

	function swapElements(obj1, obj2) {
	    var temp = document.createElement("div");
	    obj1.parentNode.insertBefore(temp, obj1);
	    obj2.parentNode.insertBefore(obj1, obj2);

	    temp.parentNode.insertBefore(obj2, temp);
	    temp.parentNode.removeChild(temp);
	}

	function binarySearch(searchParam) {
		if(document.querySelectorAll('.green').length > 0) {
			document.querySelectorAll('.green')[0].classList.remove("green");
		}
		var highIndex = tree.length - 1;
		binarySearchByParam(0, highIndex, searchParam);
	}

	function binarySearchByParam(lowIndex, highIndex, searchParam) {
		let start = Date.now();
		
		if(lowIndex <= highIndex) {
			
			var midIndex = Math.floor((lowIndex + highIndex) / 2);
			document.querySelectorAll('li')[midIndex].classList.add("blue");

			let timer = setInterval(function(){
				let timePassed = Date.now() - start;

				if(timePassed >= 500) {
					clearInterval(timer);

					if (tree[midIndex] == searchParam) {
						document.querySelectorAll('li')[midIndex].classList.add("green");
				    } else if (tree[midIndex] < searchParam) {
				    	lowIndex = midIndex + 1;
				    	document.querySelectorAll('li')[midIndex].classList.remove('blue');
				    	binarySearchByParam(lowIndex, highIndex, searchParam);
				    } else {
				    	highIndex = midIndex - 1;
				    	document.querySelectorAll('li')[midIndex].classList.remove('blue');
				    	binarySearchByParam(lowIndex, highIndex, searchParam);
				    }
				}
			}, 500)
		} else {
			showResult(-1);
		}
	}

	function linearSearch(searchParam) {
		if(document.querySelectorAll('.green').length > 0) {
			document.querySelectorAll('.green')[0].classList.remove("green");
		}
		linearSearchByParam(0, searchParam);
	}

	function linearSearchByParam(index, searchParam) {
		let start = Date.now();

		if(index < tree.length) {
			document.querySelectorAll('li')[index].classList.add("blue");

			let timer = setInterval(function(){
				let timePassed = Date.now() - start;

				if(timePassed >= 500) {
					clearInterval(timer);
					if(tree[index] == searchParam) {
						document.querySelectorAll('li')[index].classList.add("green");
						showResult(searchParam, 'Found: ' + searchParam);
						return;
					} else {
						document.querySelectorAll('li')[index].classList.remove('blue');
					}
					if(index < tree.length) {
						index++;
						linearSearchByParam(index, searchParam);
					}
				}
			}, 500)
		} else {
			showResult(-1);
		}
	}

	function showResult(result, message) {
		if(result === -1) {
			document.querySelector('.not-found').innerHTML = 'Not Found';
			console.log('Not Found');
		} else {
			console.log(message);
		}
	}

})();