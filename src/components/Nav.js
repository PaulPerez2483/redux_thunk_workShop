import React from "react";
import { Link, HashRouter } from "react-router-dom";

const Nav = ({
	currentPage,
	count,
	limit,
	goNext,
	goBack,
	clickOnCurrentPage
}) => {
	// console.log(goNext);
	// console.log("Nav", currentPage);
	// console.log("count", count);
	// console.log("limit", limit);
	const NumberOfLinks = Math.floor(count / limit);
	// console.log(NumberOfLinks);
	const numlinks = [];
	for (let i = 0; i < NumberOfLinks; i++) {
		numlinks.push(
			<Link
				to={`${i}`}
				className={
					currentPage === i ? "selected ui google plus button" : "ui button"
				}
				key={i}
				id={i}
				onClick={clickOnCurrentPage}>
				{i + 1}
			</Link>
		);
	}
	return (
		<div className='ui icon space_'>
			<HashRouter>
				<Link className='ui button' to={`${currentPage}`} onClick={goBack}>
					<i className='left chevron icon'></i>
				</Link>
				{numlinks.map((link) => link)}
				<Link className='ui button' to={`${currentPage}`} onClick={goNext}>
					<i className='right chevron icon'></i>
				</Link>
			</HashRouter>
		</div>
	);
};

export default Nav;
