import React from 'react'
import settings from "../../imgs/settings.png"
import logout from "../../imgs/logout.png"
// import {Link} from 'react-router-dom'

// import colors from "../../common/colors"

export default class Navbar extends React.Component{
	state= {hover: false}


	render(){
		return(
			<div style={style.container}>
				<span style={style.label}>{this.props.label}</span>
				
				<div style={style.settingsCont} onClick={()=>this.props.history.push("/")}>
					<img alt="logout" src={logout} width="30px"/>
				</div>
			</div>
		)
	}
}

const style = {
	container: {
	    background: '#f8f8f8',
	    borderBottom: '1px solid #e3e3e3',
	    borderTop: '1px solid #e3e3e3',
	    padding: '15px 50px',
	    margin: '0 0 30px',
	    textAlign: 'right' ,
	    minHeight: 75
	},
	label: {
		fontSize: 23, 
		fontWeight: 'bold', 
		float: 'left',
		verticalAlign: 'middle',
		margin: 5
	},
	settingsCont: {
		display: "inline-block",
		position: "relative",
		cursor: "pointer",
		margin: "0 10px"
	}
}