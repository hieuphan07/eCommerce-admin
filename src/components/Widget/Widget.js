import React from 'react';

import './Widget.css';

const Widget = ({ number, sup, infoOfNumber, icon }) => {
	return (
		<div className='widget-wrapper'>
			<div className='widget-info'>
				<span className='widget-info__number'>
					{number}
					<sup>{sup}</sup>
				</span>
				<span className='widget-info__info'>{infoOfNumber}</span>
			</div>
			<div className='widget-icon'>
				<i className={icon} />
			</div>
		</div>
	);
};

export default Widget;
