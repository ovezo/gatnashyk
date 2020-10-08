import React from "react";
import {Route, Switch, Link} from "react-router-dom"
import request from 'request';
import common from '../../common';
import Table from "../Table";
import Navbar from "../Navbar";
import Class from '../Class';
import ClassAbs from '../ClassAbs';
import TarketkaSchool from '../TarketkaSchool';

import Bar from "../Bar";
import Settings from "../Settings";
import DayTable from "../DayTable";
import DaysLate from "../DaysLate";
import Loading from "../Loading";
import QRReader from '../QRReader';
import AboutUs from '../AboutUs';

export default class Client extends React.Component{

    state = {
        data: [],
        loading: false
    }

    beforeSaveCell(row, cellName, cellValue) {
        let data = {id: row.id, name: cellName, val: cellValue};
        this.setState({loading: true})
        request.post({
			url: common.urlApi+'update-class',
			form: data
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
        let data = { name: row.name, teacher: row.teacher }
		this.setState({loading: true})
		request.post({
			url: common.urlApi+'new-class',
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
			url: common.urlApi+'remove-class',
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
		request.get(common.urlApi+'get-classes', (err, res, body)=>{
			this.setState({loading: false})
			if(!err){
				if(body){   
					this.setState({data: JSON.parse(body)})
				}
			}
		})
    }

    render(){
        let url = "/school/"+this.props.match.params.id
        return(
            <div>
                {this.state.loading ? <Loading/> : null}
				<Bar url={url} pathname={this.props.location.pathname} messages={this.props.messages}/>
				<div style={{margin: '0 12px 0 120px'}}>                
                    <Navbar {...this.props} label={localStorage.getItem("school_name")} />
                    <Switch>
                        <Route path="/school/:id/profile" render={(props)=><Settings {...this.props}/>}/>
                        <Route path='/school/:id/qrreader' render={ (props)=><QRReader {...props} />}/>  
                        <Route path='/school/:id/today' render={ (props)=><DayTable {...props} />}/>  
                        <Route path='/school/:id/todays-late' render={ (props)=><DaysLate {...props} />}/>  
                        <Route path='/school/:id/about' render={ (props)=><AboutUs {...props} />}/>
                        <Route path='/school/:id/class/:id' render={ (props)=><Class {...props} />}/>  
                        <Route path='/school/:id/report/:id' render={ (props)=><ClassAbs {...props} />}/>  
                        <Route path='/school/:id/tarketka/:id/' render={ (props)=><TarketkaSchool {...props} />}/>  

                        <Route path="/school/:id/" render={(props)=>(
                            <Table 
                                who="Bölüm"
                                beforeSaveCell={this.beforeSaveCell.bind(this)}
                                rowClick={(row)=>this.props.history.push("/class/"+row.id)}
                                removeSelected={(arr)=>this.removeSelected(arr)}
                                addRow={(row)=>this.addRow(row)}
                                columns = {[
                                    { title: "Id", key: 'id', hiddenOnInsert: true, unexport: true, isKey: true },
                                    { title: "Bölüm", key: 'name' },
                                    { title: "Bölüm yolbaşçy", key: 'teacher' },
                                    { title: "Işgär sany", key: 'cnt', hiddenOnInsert: true, uneditable: true },
                                    { 
                                        title: "", key: 'link', hiddenOnInsert: true, uneditable: true, dataSort: true, unexport: true,
                                        formatter: (cell, row)=>(
                                            <Link to={url+"/class/"+row.id}><button className="btn btn-xs btn-primary">Işgär sanawy</button></Link>
                                        )
                                    },
                                    { 
                                        title: "", key: 'link', hiddenOnInsert: true, uneditable: true, dataSort: true, unexport: true,
                                        formatter: (cell, row)=>(
                                            <Link to={url+"/report/"+row.id}><button className="btn btn-xs btn-primary">Aýlyk gatnaşygy</button></Link>
                                        )
                                    },
                                    { 
                                        title: "", key: 'tarketka', hiddenOnInsert: true, uneditable: true, dataSort: true, unexport: true,
                                        formatter: (cell, row)=>(
                                            <Link to={url+"/tarketka/"+row.id}><button className="btn btn-xs btn-primary">Tarketka</button></Link>
                                        )
                                    },
                                ]}
                                data = {this.state.data}
                            />
                        )}/>
                    </Switch>
                </div>
            </div>
        )
    }
}