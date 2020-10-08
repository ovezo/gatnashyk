import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import logo from '../../imgs/logo.png'

class Item extends Component{
	state = {
		hover: false,
	}
	render(){
		let hover = this.state.hover || this.props.active
		let count = 0
		if (this.props.note){
			count = 4
			// 	this.props.messages.forEach((e)=>{
		// 		if (!e.isRead)
		// 			count++
		// 	})
		}
		return(
			<div 
				style={{
					...styles.itemCont,
					color: hover ? '#fff' : '#aaa6a0',
					backgroundColor: hover ? '#524d49' : 'transparent'
				}}
				onMouseEnter = {()=>this.setState({hover: true})}
				onMouseLeave = {()=>this.setState({hover: false})}
			>
				<div style={{...styles.count, display: count ? undefined : 'none' }}>{count}</div>
				<div>
					<span style={{fontSize: 18}} className={"glyphicon glyphicon-"+this.props.icon}/>
				</div>
				<div style={styles.text}>
					{this.props.title}
				</div>

			</div>
		)
	}
}

class Bar extends Component{
	state = {
		active: 0
	}
	render(){
		return(
			<div style={styles.container}>
				<Link to='/'>
					<img src={logo} alt="logo" style={styles.logo}/>
				</Link>
				<hr style={{width: 90, borderColor: '#aaa6a0'}}/>
				{
					items.map((elem, ind)=>
						<Link 
							key={ind} 
							to={this.props.url+elem.link} 
							style={{textDecoration: 'none'}}
							onClick={()=>this.setState({active: ind})}
						>
							<Item key={ind} {...elem} messages={this.props.messages} active={ elem.link==="/" ? this.props.pathname===this.props.url : this.props.pathname===(this.props.url+elem.link) }/>
						</Link>
					)
				}
			</div>
		)
	}
}

export default Bar

const styles = {
	container: {
		backgroundColor: '#373330',
		width: 100,
		display: 'inline-block',
		padding: '15px 0',
		position: 'fixed',
		top: 0,
		left: 0,
		bottom: 0
	},
	itemCont: {
		padding: '8px 5px',
		textAlign: 'center',
		transition: 'all 0.3s',
		cursor: 'pointer',
		position: 'relative' 
	},
	text: {
		lineHeight: '17px'
	},
	logo: {
		padding: '15px 15px 0 10px',
		width: '100%',
		marginBottom: 10
	},
	count: {
		fontSize: 12,
		fontWeight: 'bold',
		margin: 10,
		borderRadius: '50%',
		color: '#fff',
		backgroundColor: '#bb3030',
		width: 16,
		height: 16,
		textAlign: 'center',
		position: 'absolute',
		top: -4,
		right: 0
	},
}

const items = [
	{ title: 'Bölümler', icon: 'briefcase', link: '' },
	{ title: 'Hasabat', icon: 'tasks', link: '/today' },
	{ title: 'Giç gelenler', icon: 'tasks', link: '/todays-late' },
	{ title: 'QR-okayjy', icon: 'qrcode', link: '/qrreader' },
	// { title: 'Home', icon: 'home', link: '/home' },
	// { title: 'Products', icon: 'inbox', link: '/products' },
	{ title: 'Sazlamalar', icon: 'cog', link: '/profile' },
	{ title: 'Awtory barada', icon: 'user', link: '/about' },
	// { title: 'Tarketkalar', icon: 'credit-card', link: '/cards' },
	// { title: 'Navbar', icon: 'modal-window', link: '/navbar' },
	// { title: 'Help', icon: 'header', link: '/help/0' },
]