import './SearchBar.scss'
import { useState, useEffect } from "react";
import { useAppContext } from "../../context/appContext";
import { useAsync } from "../../hooks/useAsync";
export const SearchBar = () => {
	const [searchValue, setSearchValue] = useState()
	const [clickedSearch, setClickedSearch] = useState(false)
	const {searchImageList, loadImageList} = useAppContext()

	const {execute: reloadAll } = useAsync({asyncFunction: loadImageList, immediate:false})

	useEffect(() => {
		if(searchValue ==='' || searchValue == null || searchValue === undefined ) {
			if(clickedSearch) {
				setClickedSearch(false)
				reloadAll()
			}
		}
	},[searchValue])

	const handleSetSearchValue = (event) => {
		setSearchValue(event.target.value)
	}
	const handleSearchGiphy = async () => {
		await searchImageList({q: searchValue})
	}
	const {execute: refreshList} = useAsync({asyncFunction: handleSearchGiphy, immediate:false})

 return <div className='search-bar'>
	 <label for='search'>Search Gifs!</label>
	 <input onChange={handleSetSearchValue} id='search' type={'search'} />
	 <button onClick={() => {refreshList()
							setClickedSearch(true)}}>Search</button>
 </div>
}