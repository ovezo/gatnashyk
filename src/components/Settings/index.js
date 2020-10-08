import React from "react";
import request from 'request';
import common from '../../common';

export default class Settings extends React.Component {

    onClick(){
        if (this.refs.password.value!==this.refs.re_password.value)
            return;
            
        request.post({
            url: common.urlApi+'edit-school',
            form: {
                login: this.props.match.params.id, 
                login_new: this.refs.login.value, 
                school_new: this.refs.school.value, 
                password: this.refs.password.value, 
                password_new: this.refs.re_password.value
            }
        }, (err, res, body)=>{
            if(!err){
                if(body==="Success"){
                    // localStorage.setItem("login", this.refs.login.value);
                    // localStorage.setItem("password", this.refs.password.value);
                    localStorage.setItem("school_name", this.refs.school.value);
                    this.props.history.push("/school/"+this.refs.login.value);
                }
            }
        })
    }

    render(){
        return(
            <div>
                <div className="container">
                    
                    <div style={style.cont}>
                        <div style={style.label}>Sazlamalar</div>
                        <div style={style.keyVal}>
                            <div style={style.key}>Edaranyň ady</div>
                            <input ref="school" className="form-control" style={style.value} type="text" defaultValue={localStorage.getItem("school_name")} /> 
                        </div>
                        <div style={style.keyVal}>
                            <div style={style.key}>Login</div>
                            <input ref="login" className="form-control" style={style.value} type="text" defaultValue={this.props.match.params.id} /> 
                        </div>
                        <div style={style.keyVal}>
                            <div style={style.key}>Täze parol</div>
                            <input ref="password" className="form-control" style={style.value} type="password" /> 
                        </div>
                        <div style={style.keyVal}>
                            <div style={style.key}>Paroly tassykla</div>
                            <input ref="re_password" className="form-control" style={style.value} type="password" /> 
                        </div>
                        <div style={{textAlign: "right"}}>
                            <button className="btn btn-primary" onClick={()=>this.onClick()}>Tassykla</button>
                        </div>
                    </div>
                    
                </div>

            </div>
        )
    }
}

const style = {
    cont: {
        background: "#f8f8f8",
        padding: 50,
        margin: "50px 100px 50px"
    },
    key:{
        width: "30%",
        display: "inline-block",
        color: "#555",
        fontWeight: 400,
        fontSize: 16,
        textAlign: "right",
        marginRight: 20
    },
    value: {
        width: "70%",
        display: "inline-block",
        maxWidth: 500
    },
    keyVal: {
        margin: "30px 0"
    },
    label: {
        color: "#555",
        fontWeight: 400,
        fontSize: 20,
        textAlign: "center"
    }
}