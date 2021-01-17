import React from 'react';

const Profiles = ({ profiles, loading, fetchError }) => {
	const columns = profiles[0] && Object.keys(profiles[0]);

	if (loading) {
		return (
			<div className='d-flex justify-content-center'>
				<div className='spinner-grow' role='status'>
					<span className='sr-only'>Loading...</span>
				</div>
			</div>
		);
	}
	if (fetchError && fetchError === 'Network Error') {
		return (
			<div className='d-flex justify-content-center'>
				<h4 className='text-danger'>Please check your connection...</h4>
			</div>
		);
	}

	return (
		<div className='table-responsive'>
			<table className='table table-bordered table-striped table-responsive'>
				<thead>
					<tr>
						{profiles[0] &&
							columns.map((heading, index) => (
								<th key={index} scope='col'>
									{heading}
								</th>
							))}
					</tr>
				</thead>
				<tbody>
					{profiles.map((row, index) => (
						<tr key={index}>
							{columns.map((column, index) => (
								<td key={index}>{row[column]}</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Profiles;
