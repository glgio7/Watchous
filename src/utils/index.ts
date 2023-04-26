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
