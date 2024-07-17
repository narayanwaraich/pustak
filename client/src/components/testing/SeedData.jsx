import {	createLink	} from "../../services/api/links"
import {	createFolder	} from "../../services/api/folders"
import {	bmarks	} from '../../../data/bmarks'

// import { Link } from "../types/services";

const SeedData = () => {

/* 
	const minimalData = [
		{
			"type": "link",
			"addDate": 1565762687,
			"title": "Ray William Johnson",
			"url": "http://www.raywj.com/"
		},
		{
			"type": "link",
			"addDate": 1430997543,
			"title": "L&#39;Egypte, une nouvelle fois victime d&#39;exhibitionnisme - Hot Vidéo",
			"url": "http://hotvideo.fr/news/2015-05-05/legypte-une-nouvelle-fois-victime-dexhibitionnisme/"
		},
		{
			"type": "link",
			"addDate": 1588825648,
			"title": "Harappa | The Ancient Indus Civilization",
			"url": "https://www.harappa.com/"
		},
		{
			"type": "link",
			"addDate": 1588828705,
			"title": "Feature Articles | YaleGlobal Online",
			"url": "https://yaleglobal.yale.edu/"
		},
		{
			"type": "folder",
			"addDate": 1455550571,
			"lastModified": 1717779649,
			"title": "Bookmarks bar",
			"children": [
				{
					"type": "link",
					"addDate": 1440854884,
					"title": "Hacker News",
					"url": "https://news.ycombinator.com/"
				},
				{
					"type": "link",
					"addDate": 1585371819,
					"title": "Product Hunt",
					"url": "https://www.producthunt.com/"
				},
			],
		},
	]
 */

	const editObjForDb = obj => {
		if(Object.hasOwn(obj, 'children')) delete obj.children
		if(Object.hasOwn(obj, 'addDate')) obj.addDate = new Date(obj.addDate*1000).toISOString()
		if(Object.hasOwn(obj, 'lastModified')) obj.lastModified = new Date(obj.lastModified*1000).toISOString()
		return obj;
	}


	const addLink = async (element, parentId) => {
		const link = editObjForDb({	...element	,	parentId	})
		const savedLink = await createLink(link)
		return savedLink
	}

	const addFolder = async (element, parentId) => {
		const folder = editObjForDb({	...element	,	parentId	})
		const savedFolder = await createFolder(folder)
		return savedFolder
	}

	let parentIdAtDepth = new Map()
	parentIdAtDepth.set(0, null)

	const addData = (arr, depth = 0) => {
		arr.forEach(async element => {
			if(element.type === 'link') await addLink(element, parentIdAtDepth.get(depth));
			if(element.type === 'folder') {
				const folder = await addFolder(element, parentIdAtDepth.get(depth));
				const incrementDepth = depth + 1;
				parentIdAtDepth.set(incrementDepth, folder.id)
				if(Object.hasOwn(element, 'children')) addData(element.children, incrementDepth)
			}
		});
	}

	addData(	bmarks	)

	return (
		<>
		</>
	)
}

export default SeedData