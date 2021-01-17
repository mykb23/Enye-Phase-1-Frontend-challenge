import React from 'react';

const Pagination = ({ profilesPerPage, totalProfiles, paginate }) => {
	const pageNumbers = [];

	for (let i = 1; i <= Math.ceil(totalProfiles / profilesPerPage); i++) {
		pageNumbers.push(
			<li key={i} className='page-item'>
				<a
					onClick={() => {
						paginate(i);
					}}
					href='!#'
					className='page-link'
				>
					{i}
				</a>
			</li>
		);
	}
	return (
		<nav>
			<ul className='pagination'>{pageNumbers}</ul>
		</nav>
	);
};

export default Pagination;
