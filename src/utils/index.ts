import React from "react";
import { IListRefs } from "./types";

export const handleScrollList = (
	listRefs: IListRefs,
	direction: string,
	list: string
) => {
	let maxScroll =
		listRefs[list].current!.scrollWidth - listRefs[list].current!.clientWidth;

	switch (direction) {
		case "left":
			listRefs[list].current!.scrollLeft -= maxScroll / 3;
			break;
		case "right":
			listRefs[list].current!.scrollLeft += maxScroll / 3;
			break;
	}
};

export const handlePageList = (
	listRefs: IListRefs,
	direction: string,
	list: string,
	state: number,
	setState: React.Dispatch<React.SetStateAction<number>>
) => {
	const maxScroll =
		listRefs[list].current!.scrollWidth - listRefs[list].current!.clientWidth;

	let scrollRemaining = maxScroll - listRefs[list].current!.scrollLeft;

	if (scrollRemaining < 50 && direction === "right") {
		switch (list) {
			case "upcoming":
				setState((prevState: number) => prevState + 1);
				break;
			case "series":
				setState((prevState: number) => prevState + 1);
				break;
		}
		listRefs[list].current!.scrollLeft = 0;
	} else if (scrollRemaining === maxScroll && direction === "left") {
		switch (list) {
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
