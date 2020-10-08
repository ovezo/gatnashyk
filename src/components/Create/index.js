import React from "react";
import request from 'request';
import common from '../../common';

export default class Settings extends React.Component {

    onClick(){
        request.post({
            url: common.urlApi+'save-school',
            form: {school: this.refs.school.value, login: this.refs.login.value, password: this.refs.password.value}
        }, (err, res, body)=>{
            if(!err){
                if(body==="Success"){
                    localStorage.setItem("password", this.refs.password.value);
                    localStorage.setItem("school", this.refs.school.value);            
                    this.props.history.push("/")
                }
            }
        })
    }

    render(){
        return(
            <div>
                <div className="container">
                    <div style={style.cont}>
                        <div style={style.label}>Edara Goş</div>
                        <div style={style.keyVal}>
                            <div style={style.key}>Edaranyň ady</div>
                            <input ref="school" className="form-control" style={style.value} type="text" /> 
                        </div>
                        <div style={style.keyVal}>
                            <div style={style.key}>Login</div>
                            <input ref="login" className="form-control" style={style.value} type="text" /> 
                        </div>
                        <div style={style.keyVal}>
                            <div style={style.key}>Parol</div>
                            <input ref="password" className="form-control" style={style.value} type="password"/> 
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