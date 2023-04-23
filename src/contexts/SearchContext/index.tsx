import React, { createContext, useState } from "react";

interface ISearchContext {
	searchValue: string;
	setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

type SearchProviderProps = {
	children: React.ReactNode;
};

export const SearchContext = createContext<ISearchContext>(
	{} as ISearchContext
);

const SearchProvider = ({ children }: SearchProviderProps) => {
	const [searchValue, setSearchValue] = useState<string>("");

	const contextValues: ISearchContext = {
		searchValue,
		setSearchValue,
	};

	return (
		<SearchContext.Provider value={contextValues}>
			{children}
		</SearchContext.Provider>
	);
};

export default SearchProvider;
