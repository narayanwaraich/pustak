import {	useQuery,	useMutation, useQueryClient	} from "@tanstack/react-query"
import {	getFolders,	createFolder	} from "../../services/api/folders"
import { createDataTree } from "../../utils/tree"
import DisplayTree from "./DisplayTree"

const Tree = () => {

	const queryClient = useQueryClient()

	const result = useQuery({	queryKey:	['folderTree'],	queryFn: getFolders	})

	const newFolderMutation = useMutation({	
		mutationFn	:	createFolder,
		onSuccess	:	()	=>	{	queryClient.invalidateQueries(	{queryKey	:	['folderTree']}	)},
	})

	const addFolder = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const title = event.currentTarget.value
		event.currentTarget.value = ''
		newFolderMutation.mutate({	title	})
	}

	if (result.isLoading) {
		return <div>loading data ... </div>
	}

	const tree = (result.data) ? createDataTree(result.data) : [] ;

	// console.log(tree);

	return (
		<>
			<form onSubmit={addFolder}>
        <input name="title" />
        <button type="submit">add</button>
      </form>
			<DisplayTree tree={tree} />
		</>
	)
}

export default Tree