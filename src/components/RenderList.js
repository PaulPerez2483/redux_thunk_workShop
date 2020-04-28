import React from "react";

const RenderList = ({ rows, deleteUser, updateUser, createUser }) => {
	let renderList = rows.map((row) => (
		<tr key={row.id}>
			<td data-label={row.firstName}>{row.firstName}</td>
			<td data-label={row.lastName}>{row.lastName}</td>
			<td data-label={row.email}>{row.email}</td>
			<td data-label={row.title}>
				{row.title}
				<button className='ui icon button' onClick={() => deleteUser(row)}>
					<i className=' x icon'></i>
				</button>
				<button className='ui icon button' onClick={() => updateUser(row)}>
					<i className=' edit icon'></i>
				</button>
				<button className='ui icon button' onClick={() => createUser(row)}>
					<i className=' plus icon'></i>
				</button>
			</td>
		</tr>
	));
	return (
		<div>
			<table className='ui striped table'>
				<thead>
					<tr>
						<th>First Name</th>
						<th>Last Name</th>
						<th>Email</th>
						<th>Title</th>
					</tr>
				</thead>
				<tbody>{renderList}</tbody>
			</table>
		</div>
	);
};

export default RenderList;
