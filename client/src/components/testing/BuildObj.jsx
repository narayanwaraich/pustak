import {data} from './tree';

const BuildObj = () => {

	const flat = [
		{ 'id': 1, 'parentId': 3 },
		{ 'id': 3, 'parentId': 8 },
		{ 'id': 4, 'parentId': 6 },
		{ 'id': 6, 'parentId': 3 },
		{ 'id': 7, 'parentId': 6 },
		{ 'id': 8, 'parentId': null },
		{ 'id': 10, 'parentId': 8 },
		{ 'id': 13, 'parentId': 14 },
		{ 'id': 14, 'parentId': 10 }
	];
	
	function buildTree(array, elementKey, parentKey){
		let tree = [];
		for (let i = 0; i < array.length; i++) {
			// console.debug('tree: ',tree);
			// console.debug('array: ',array);
			if (array[i][parentKey]) {
				let parent = array.filter(elem => elem[elementKey] === array[i][parentKey]).pop();
				if (!parent['children']) {
					parent.children = [];
				}
				parent.children.push(array[i])
			} else {
				tree.push(array[i]);
			}
		}
		return tree;
	}

	console.debug = function() {
		function clear(o) {
	
			var obj = JSON.parse(JSON.stringify(o));
			// [!] clone
	
			if (obj && typeof obj === 'object') {
					obj.__proto__ = null;
					// clear
	
					for (var j in obj) {
						obj[j] = clear(obj[j]); // recursive
					}
			}
			return obj;
		}
		for (var i = 0, args = Array.prototype.slice.call(arguments, 0); i < args.length; i++) {
			args[i] = clear(args[i]);
		}
		console.log.apply(console, args);
	};

	const createDataTree = dataset => {

		const hashTable = Object.create(null)
		dataset.forEach(aData => hashTable[aData.id] = {...aData})

		const dataTree = []

		dataset.forEach(aData => {
			if(aData.parentId) {
				if(!Object.hasOwn(hashTable[aData.parentId], 'childNodes')) hashTable[aData.parentId].childNodes = []
				hashTable[aData.parentId].childNodes.push(hashTable[aData.id])
			} else dataTree.push(hashTable[aData.id])
		});
		return dataTree
	};

	console.debug(createDataTree(data));
	// console.debug(buildTree(flat,'id','parentId'));

	return (
		<>
		</>
	)
}

export default BuildObj