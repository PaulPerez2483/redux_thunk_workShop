import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { onNext, onPrev, onClick } from "../action";

import RenderList from "./RenderList";
import Nav from "./Nav";

const URL = "/api/employees";

class UserList extends Component {
	constructor() {
		super();
		this.state = {
			rows: [],
			count: null,
			limit: 50,
			init: true
		};

		this.goNext = this.goNext.bind(this);
		this.goBack = this.goBack.bind(this);
		this.clickOnCurrentPage = this.clickOnCurrentPage.bind(this);
		this.deleteUser = this.deleteUser.bind(this);
	}
	async componentDidMount() {
		const { currentPage } = this.props;
		const response = (await axios.get(`${URL}/${currentPage}`)).data;
		this.setState({
			rows: response.rows,
			count: response.count,
			init: false
		});
	}

	async goNext() {
		const { count, limit } = this.state;
		let { currentPage, onNext } = this.props;
		let numOfLinks = Math.floor(count / limit);
		console.log("line 39", currentPage);
		console.log("line 40", numOfLinks);

		if (currentPage + 1 < numOfLinks) {
			onNext();
			const response = (await axios.get(`${URL}/${currentPage}`)).data;
			// console.log("line 41", response);
			this.setState({
				rows: response.rows
			});
		}
	}

	async goBack() {
		let { currentPage, onPrev } = this.props;
		if (currentPage !== 0) {
			onPrev();
			const response = (await axios.get(`${URL}/${currentPage}`)).data;
			this.setState({
				rows: response.rows
			});
		}
	}

	async clickOnCurrentPage(ev) {
		// console.log("onCurrentPage ID", ev.target.id * 1)
		const { onClick } = this.props;
		let id = ev.target.id * 1;
		onClick(id);

		let currentPage = id;

		const response = (await axios.get(`${URL}/${currentPage}`)).data;
		console.log(response);
		this.setState({
			rows: response.rows
		});
	}

	async deleteUser(user) {
		this.setState({
			rows: this.state.rows.filter((_user) => _user.id !== user.id)
		});
		await axios.delete(`${URL}/${user.id}`);
	}

	async updateUser(user) {}

	render() {
		// console.log(this.state);
		const { rows, count, limit, init } = this.state;
		let { currentPage } = this.props;
		if (init) return null;

		console.log("line 10", this.props);
		console.log("line 11", this.state);

		return (
			<div>
				<nav className='nav'>
					<h1>ACME Pager</h1>
					<Nav
						currentPage={currentPage}
						count={count}
						limit={limit}
						goNext={this.goNext}
						goBack={this.goBack}
						clickOnCurrentPage={this.clickOnCurrentPage}
					/>
				</nav>

				<RenderList rows={rows} deleteUser={this.deleteUser} />
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		currentPage: state.count
	};
};

export default connect(mapStateToProps, {
	onNext,
	onPrev,
	onClick
})(UserList);
