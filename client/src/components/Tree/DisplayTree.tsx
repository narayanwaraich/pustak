import { FolderTree, FolderAndLinks } from "../../types/services"
import './tree.css'

const DisplayTree = ({tree} : {tree: FolderTree[]}) => {

	const builtTree: JSX.Element[] = []
	let count = 0;
	const limit = 184;

	const printElement = (element: FolderAndLinks, depth : number) => {
		count++
		if(count > limit) return false;
		const content = element.title
		let spacing = content.length + (depth*2)
		if(Object.hasOwn(element, 'url')) {
			builtTree.push(<li key={element.id}>{content.padStart(spacing+4)}</li>)
		} else {
			builtTree.push(<li key={element.id}><strong>{content.padStart(spacing)}</strong></li>)
		}
	}

	const buildTree = (tree: FolderTree[], depth : number) => {
		for(const element of tree) {
			if(count > limit) break;
			printElement(element,depth)
			if(element.links.length > 0){
				element.links.forEach(link => printElement(link,depth))
			}
			if('childNodes' in element) {
				const nestedDepth = depth+2
				buildTree(element.childNodes as FolderTree[],nestedDepth)
			}
		}
	}

	buildTree(tree,0);

	return (
		<>
			{
				<ul className="tree">
					{builtTree}
				</ul>
			}
		</>
	)
}

export default DisplayTree