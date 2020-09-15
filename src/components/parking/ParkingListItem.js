import React from 'react';
import classnames from 'classnames'

const ParkingListItem = ({parking, before}) => {
	const getParkingTrend = (available, prevAvailable) => {
		console.log(available, prevAvailable);
		if (prevAvailable != null) {
			if (available > prevAvailable) {
				console.log('change');
				return '⇑';
			} else if (available < prevAvailable){
				console.log('change');
				return '⇓';
			} else return '⇔';
		} else return '?';
	}

	const getClassnameFor = (available, total) => {
		const percentage = Math.round(available / total *100);
		if (percentage >= 60) {
			return 'capacity--succes';
		} else if (percentage >20 && percentage < 60){
			return 'capacity--warning';
		} else {
			return 'capacity--danger';
		}
	}
	return(
		<li className="ParkingListItem">
			<div className='ParkingItemData'>
				{parking.fields.name}
			</div>
			{console.log(parking)}
			<div className='ParkingItemData'>
				{parking.fields.open ? ('open') : ('gesloten')}
			</div>
			<div className='ParkingItemData'>
				{!!before ? getParkingTrend(parking.fields.availablecapacity, before.fields.availablecapacity) : '⇔'}
			</div>
			<div className= {classnames('capacity', getClassnameFor(parking.fields.availablecapacity, parking.fields.totalcapacity))}>
				{parking.fields.availablecapacity}
			</div>
		</li>
	);
}

export default ParkingListItem;