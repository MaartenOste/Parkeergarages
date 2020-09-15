import React, { useState, useEffect } from 'react';
import ParkingListItem from './ParkingListItem';
import './parking.css';

const ParkingList = () => {
	const [parkings, setParkings] = useState(null);
	const [before, setBefore] = useState(null);

	useEffect(() => {
		async function fetchData(){
			if(parkings != null){
				let parkingsBefore= [];
				parkings.forEach(parking => {
					parkingsBefore.push(parking);
				});
				setBefore(parkingsBefore);
		}
			const data = await getParkingsFromApi();
			setParkings(data.records);
		}

		if (parkings === null) {
			fetchData();
		}

		const timerId = setInterval(() => fetchData(), 30000);
		return () => clearInterval(timerId);
	}, [parkings]);

	const getParkingsFromApi = async () => {
		const url = 'https://data.stad.gent/api/records/1.0/search/?dataset=bezetting-parkeergarages-real-time&q=&facet=description'
		const respons = await fetch(url);
		const jsonData = respons.json();		
		return jsonData;
	} 

	return(
		<ul className="ParkingList">
			<li className="ParkingListItem">
				<div className='ParkingItemData'>
					NAAM
				</div>
				<div className='ParkingItemData'>
					STATUS
				</div>
				<div className='ParkingItemData'>
					TREND
				</div>
				<div className='ParkingItemData'>
					BESCHIKBARE PLAATSEN
				</div>
			</li>
			{
				!!parkings ? (
					parkings.map(parking =>
							<ParkingListItem  key = {parking.id} parking={parking} before={!!before ?
								before.find(
								(before) => before.id == parking.id
							) : null} />
						)
				) :(
					<div>loading</div>
				)
			}
		</ul>
	)
	
}

export default ParkingList;