export const onNext = () => {
	return {
		type: "NEXT"
	};
};

export const onPrev = () => {
	return {
		type: "PREV"
	};
};

export const onClick = (id) => {
	return {
		type: "CLICK",
		payload: id
	};
};
