import React from "react";

export const handleScrollList = (
	listRef: React.RefObject<HTMLUListElement>,
	direction: string
) => {
	let maxScroll = listRef.current!.scrollWidth - listRef.current!.clientWidth;

	switch (direction) {
		case "left":
			listRef.current!.scrollLeft -= maxScroll / 3;
			break;
		case "right":
			listRef.current!.scrollLeft += maxScroll / 3;
			break;
	}
};

export const handlePageList = (
	listRef: React.RefObject<HTMLUListElement>,
	direction: string,
	listName: string,
	state: number,
	setState: React.Dispatch<React.SetStateAction<number>>
) => {
	const maxScroll = listRef.current!.scrollWidth - listRef.current!.clientWidth;

	let scrollRemaining = maxScroll - listRef.current!.scrollLeft;

	if (scrollRemaining < 50 && direction === "right") {
		switch (listName) {
			case "upcoming":
				setState((prevState: number) => prevState + 1);
				break;
			case "series":
				setState((prevState: number) => prevState + 1);
				break;
		}
		listRef.current!.scrollLeft = 0;
	} else if (scrollRemaining === maxScroll && direction === "left") {
		switch (listName) {
			case "upcoming":
				if (state > 1) {
					setState((prevState: number) => prevState - 1);
				}
				break;
			case "series":
				if (state > 1) {
					setState((prevState: number) => prevState - 1);
				}
				break;
		}
	}
};
