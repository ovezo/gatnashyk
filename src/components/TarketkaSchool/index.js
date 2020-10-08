import React from "react";
import request from 'request';
import common from '../../common';
import Tarketka from "../Tarketka";

export default class TarketkaSchool extends React.Component {

    state = {
        head: "Edaranyň ady",
        edit: false,
        data: []
    }

    onClick(){
        this.setState({edit: true});
    }

    onChange(val){
        this.setState({head: val.target.value})
    }

    componentDidMount(){
        request.post({
			url: common.urlApi+'get-students-by-class',
			form: {id: this.props.match.params.id}
		}, (err, res, body)=>{
			this.setState({loading: false})
			if(!err){
				if(body){
                    this.setState({data: JSON.parse(body)})
				}
			}
		})
    }

    render(){
        return(
            <div>
                <div>
                   <textarea style={style.textarea} value={this.state.head} onChange={(val)=>this.onChange(val)}/>
                </div>

                {
                    this.state.data.map((e, i)=>(
                        <Tarketka key={i} data={e} head={this.state.head} />
                    ))
                }

            </div>
        )
    }
}

const style = {
    cont: {
        width: "10cm",
        height: "6cm",
        border: "2px solid #777",
        padding: "0.1cm",
        display: "inline-block",
        margin: 20
    },
    head: {
        padding: "0 1.5cm",
        textAlign: "center",
        height: "1.6cm",   
        background: "#25a025",
        color: "white"     
    },
    photo: {
        display: "inline-block",
        width: "3cm",
        height: "4cm",
        border: " 2px solid #999",
        textAlign: "center",
        paddingTop: 60,
        marginTop: ".1cm",
        verticalAlign: "top"
    },
    keyValCont: {
        display: "inline-block",
        width: "6.65cm",
        padding: "0 0.1cm 0 0",
        marginTop: "0.1cm",
    },
    keyVal: {
        border: " 2px solid #999",
        borderRadius: 5,
        marginBottom: 5
    },
    key: {
        width: 80,
        background: "#999",
        borderRight: "2px solid #999",
        color: "white",
        display: "inline-block",
        padding: 2,
        textAlign: "right",
        paddingRight: 10,
        marginRight: 10
    },
    textarea: {
        width: 800,
        margin: 20
    }
}
