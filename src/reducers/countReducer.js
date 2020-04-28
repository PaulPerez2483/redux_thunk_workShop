export default (state = 0, action) => {
	switch (action.type) {
		case "NEXT":
			return state + 1;
			break;
		case "PREV":
			return state - 1;
			break;
		case "CLICK":
			return (state = action.payload);
			break;
		default:
			return (state =
				window.location.hash.slice(window.location.hash.indexOf("/") + 1) * 1);
	}
};
