import React, {Component} from 'react';
import {Link} from "react-router-dom";
import request from 'request';
import common from '../../common';

import Loading from "../Loading";

export default class Login extends Component{
	state = {
		loading: false
	}

	check(e){
		if (this.props.loading) return;
		e.preventDefault()
		let school = this.refs.school.value;
		let password = this.refs.password.value;
		this.login(school, password)
		this.login.value = "";
		this.refs.password.value = "";
	}

	login(user, password){

		this.username = user;
		this.password = password;
	
		if(!user||!password)
			return;

		this.setState({loading: true})

		request.post({
			url: common.urlApi+'login',
			form: {login: this.refs.school.value, password: this.refs.password.value}
		}, (err, res, body)=>{
			this.setState({loading: false})
			if(!err){
				if(body!=="error"&&body){
					console.log(body)
					localStorage.setItem("school_name", body)
					this.props.history.push("/school/"+this.refs.school.value)
				}
			}
		})
	}

	render(){
		return (
		<div style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
			{this.state.loading ? <Loading/> : null}
			
			<div className = "container">
		  		<div className="row" style={{marginTop: 100}}>
		  			
		  			<form className="col-sm-offset-3 col-sm-6 col-xs-12" onSubmit={(e)=>this.check(e)}>
				  		<div className="form-group">
				  			<div style={style.group}>
								<input style={style.inputText} 
								  type="text" className="form-control1 text-center" 
								  placeholder='Login...' ref='school'/>

								<input style={style.inputText} 
								  type="password" className="form-control1 text-center" 
								  placeholder='Parol'ref='password'/>

								<div style={{textAlign: "right", marginBottom: 20}}>
									<Link to="create-school">Taze edara doret</Link>
								</div>

								<div className='text-center'>
									<button type="submit" 
											className="btn btn-warning" 
											style={{width:'200px',fontSize:'18px', backgroundColor: '#e31e24'}}> 
										{this.props.loading?"Wait a minute":"Login"}
									</button>
								</div>
							</div>
						</div>
					</form>
			    </div>
			</div>
		</div>
		);
	}
}

const style = {
	inputText:{
		padding:'0px 20px 0px 21px',
	  	borderColor:'#e31e24',
	  	color:'rgba(34, 34, 34, 0.6)',
	  	borderRadius:'25px',
	  	height:'50px',
	  	fontFamily:"'Source Sans Pro', sans-serif",
	  	fontSize:'18px',
	  	marginBottom: '30px',
	  	display: 'block',
	  	width: '100%',
	  	outline: 'none',
	},
	group:{
		marginTop:'100px',
	}
}


