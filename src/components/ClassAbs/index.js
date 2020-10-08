import React from "react";
import {Route, Switch} from "react-router-dom"
import request from 'request';
import common from '../../common';
import Table from "../Table";
import Navbar from "../Navbar";

import Loading from "../Loading";

export default class Class extends React.Component{

    days = {}

    state = {
        data: [],
        loading: false,
        month: (new Date().getMonth()+1)
    }

    beforeSaveCell(row, cellName, cellValue) {
        if (cellName==="name"){
            let data = {id: row.id, name: cellName, val: cellValue};
            this.setState({loading: true})
            request.post({
                url: common.urlApi+'update-stud',
                form: data
            }, (err, res, body)=>{
                this.setState({loading: false})
                if(!err){
                    if(body==="Success"){
                        this.getData()
                    }
                }
            })
        }else{
            console.log(row, cellName, cellValue)
            let url = ""
            let data = {id: row.id, day: cellName}
            if (cellValue===" ")
                url = "new-days"
            else
                url = "remove-days"

            this.setState({loading: true})
            request.post({
                url: common.urlApi+url,
                form: data
            }, (err, res, body)=>{
                this.setState({loading: false})
                if(!err){
                    if(body==="Success"){
                        this.getData()
                    }
                }
            })
            
        }
        return false;
    }

    addRow(row){
        let data = { name: row.name, class_id: this.props.match.params.id }
		this.setState({loading: true})
		request.post({
			url: common.urlApi+'new-stud',
			form: data
		}, (err, res, body)=>{
			this.setState({loading: false})
			if(!err){
				if(body==="Success"){
					this.getData()
				}
			}
		})
    }

    removeSelected(arr){
        if (!arr.length)
            return;
        let ids = "("+arr.join(",")+")"

        this.setState({loading: true});
        request.post({
			url: common.urlApi+'remove-stud',
			form: {ids: ids}
		}, (err, res, body)=>{
			this.setState({loading: false})
			if(!err){
				if(body==="Success"){
					this.getData()
				}
			}
		})
    }
    
    componentDidMount(){
        this.getData()
    }

    getData(){
        this.setState({loading: true})
        request.post({
			url: common.urlApi+'get-class-stud',
			form: {class_id: this.props.match.params.id}
		}, (err, res, body)=>{
			this.setState({loading: false})
			if(!err){
				if(body){   
                    this.setState({data: JSON.parse(body)})
                    this.setState({loading: true})
                    request.post({
                        url: common.urlApi+'get-month-days',
                        form: {class_id: this.props.match.params.id, month: this.state.month||(new Date.getMonth()+1)}
                    }, (err, res, body)=>{
                        if(!err){
                            if(body){   
                                this.days = {}
                                let data = JSON.parse(body)
                                for (let i = 0; i < data.length; i++) {
                                    if (this.days[data[i].id])
                                        this.days[data[i].id].push(data[i].day)
                                    else
                                        this.days[data[i].id] = [data[i].day]
                                }
                                this.forceUpdate()
                            }
                        }
                        this.setState({loading: false})
                    })
				}
			}
		})
    }

    changeMonth(e){
        let m = (months.indexOf(e.target.value)+1)
        this.state.month = m
        this.getData()
    }

    render(){
        let days = []
        for (let i = 1; i < 32; i++) {
            days.push({
                title: i+"", key: i+"", 
                hiddenOnInsert: true, 
                dataSort: true, width: "30", 
                editable:  { type: 'checkbox', options: { values: 'x: ' } },
                formatter: (cell, row)=>{
                    if (this.days[row.id]){
                        if (this.days[row.id].indexOf(i)>-1){
                            row[i] = " "
                            return " "
                        }
                    }
                    row[i] = "x"
                    return "x"
                }
            })
        }
        return(
            <div>
                {this.state.loading ? <Loading/> : null}

                <select 
                    defaultValue={months[Number(this.state.month)-1]} 
                    className="form-control" 
                    style={{width: "auto", marginLeft: 50}} 
                    onChange={(e)=>this.changeMonth(e)}
                >
                    {
                        months.map((e, i)=>(
                            <option key={i+1}>{e}</option>
                        ))
                    }
                </select>

                <Table 
                    who="Okuwçy_hasabat"
                    beforeSaveCell={this.beforeSaveCell.bind(this)}
                    rowClick={(row)=>this.props.history.push("/class"/row.id)}
                    columns = {[
                        { title: "Id", key: 'id', hiddenOnInsert: true, width: "40" },
                        { title: "Ady Familiýasy", key: 'name', editable: false },
                        ...days
                    ]}
                    data = {this.state.data}
                />

            </div>
        )
    }
}

const months = ["Ýanwar", "Fewral", "Mart", "Aprel", "Maý", "Iýun", "Iýul", "Awgust", "Sentyabr", "Oktýabr", "Noýabr", "Dekabr"]