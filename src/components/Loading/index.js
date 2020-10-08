import React from "react";

import loading from "../../imgs/loading.gif"

export default ()=>(
	<div
		style={{
			position: "fixed",
			width: '100%',
			height: '100%',
			backgroundColor: 'rgba(0,0,0,0.6)',
			textAlign: 'center',
			zIndex: 100,
			marginTop: -20
		}}
	>
		<img alt="Loading" src={loading} width="50" style={{marginTop: 250}}/>
	</div>
)