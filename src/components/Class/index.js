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
        loading: false
    }

    beforeSaveCell(row, cellName, cellValue) {
        row[cellName] = cellValue
        this.setState({loading: true})
        request.post({
            url: common.urlApi+'update-stud',
            form: row
        }, (err, res, body)=>{
            this.setState({loading: false})
            if(!err){
                if(body==="Success"){
                    this.getData()
                }
            }
        })
        return false;
    }

    addRow(row){
        let data = { ...row, class_id: this.props.match.params.id }
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
				}
			}
		})
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

                <Table 
                    who="Işgär"
                    beforeSaveCell={this.beforeSaveCell.bind(this)}
                    rowClick={(row)=>this.props.history.push("/class"/row.id)}
                    removeSelected={(arr)=>this.removeSelected(arr)}
                    addRow={(row)=>this.addRow(row)}
                    columns = {[
                        { title: "Id", key: 'id', hiddenOnInsert: true, width: "40" },
                        { title: "Ady Familiýasy", key: 'name' },
                        { title: "Öý telefony", key: 'tel_home', width: "110" },
                        // { title: "Ejesiniň telefony", key: 'tel_mother', width: "160" },
                        { title: "El telefony", key: 'tel_father', width: "170" },
                    ]}
                    data = {this.state.data}
                />

            </div>
        )
    }
}