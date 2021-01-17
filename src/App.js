import React, { useState, useEffect } from 'react';
import Profiles from './components/Profiles';
import Pagination from './components/Pagination';
import axios from 'axios';
import './App.css';

const App = () => {
	const [profiles, setProfiles] = useState([]);
	const [loading, setLoading] = useState(false);
	const [fetchError, setFetchError] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const [profilesPerPage] = useState(20);
	const [search, setSearch] = useState('');
	const [searchColumns, setSearchColumns] = useState([]);

	useEffect(() => {
		const fetchProfile = async () => {
			setLoading(true);
			try {
				const res = await axios.get(
					'https://api.enye.tech/v1/challenge/records'
				);
				setProfiles(res.data.records.profiles);
				setLoading(false);
			} catch (error) {
				setLoading(false);
				setFetchError(error.message);
			}
		};

		fetchProfile();
	}, []);

	const indexOfLastProfile = currentPage * profilesPerPage;
	const indexOfFirstProfile = indexOfLastProfile - profilesPerPage;
	const currentProfiles = profiles.slice(
		indexOfFirstProfile,
		indexOfLastProfile
	);

	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	function handleSearch(rows) {
		return rows.filter((row) =>
			searchColumns.some(
				(column) =>
					row[column].toString().toLowerCase().indexOf(search.toLowerCase()) >
					-1
			)
		);
	}

	const columns = profiles[0] && Object.keys(profiles[0]);

	return (
		<div className='container my-5'>
			<h1 className='text-primary mb-4'>Users Payment Dashboard</h1>
			<div className='row'>
				{fetchError ? null : (
					<>
						<div className='col-3'>
							<div className='form-group'>
								<input
									className='form-control '
									type='text'
									onChange={(e) => setSearch(e.target.value)}
									value={search}
									placeholder='Search'
								/>
							</div>
						</div>
						<div className='col-9'>
							{columns &&
								columns.map((column, index) => (
									<>
										<label key={index} className='px-3'>
											<input
												className='form-check-input pl-5'
												type='checkbox'
												checked={searchColumns.includes(column)}
												onChange={(e) => {
													const checked = searchColumns.includes(column);
													setSearchColumns((prev) =>
														checked
															? prev.filter((sc) => sc !== column)
															: [...prev, column]
													);
												}}
											/>
											{column}
										</label>
									</>
								))}
						</div>
					</>
				)}
			</div>
			{handleSearch(profiles).length === 0 ? (
				<>
					<Profiles
						profiles={currentProfiles}
						loading={loading}
						fetchError={fetchError}
					/>
					<Pagination
						profilesPerPage={profilesPerPage}
						totalProfiles={profiles.length}
						paginate={paginate}
					/>
				</>
			) : (
				<Profiles
					profiles={handleSearch(profiles)}
					loading={loading}
					fetchError={fetchError}
				/>
			)}
		</div>
	);
};

export default App;
