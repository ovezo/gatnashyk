import React from "react";
import request from 'request';
import common from '../../common';
import Table from "../Table";

import Loading from "../Loading";

export default class DaysLate extends React.Component{

    state = {
        data: [],
        loading: false,
        month: (new Date().getMonth()+1),
        day: (new Date().getDate())

    }
    
    componentDidMount(){
        this.getData()
    }

    getData(){
        this.setState({loading: true})
		request.post(
            {
                url: common.urlApi+'get-todays-late', 
                form: {month: this.state.month, day: this.state.day}
            }, 
            (err, res, body)=>{
                this.setState({loading: false})
                if(!err){
                    if(body){   
                        this.setState({data: JSON.parse(body)})
                    }
                }
            }
        )
    }

    changeMonth(e){
        let m = (months.indexOf(e.target.value)+1)
        this.state.month = m
        this.getData()
    }

    changeDay(e){
        let m = e.target.value
        console.log(m)
        this.state.day = m
        this.getData()
    }

    render(){
        console.log(this.state)
        return(
            <div>
                {this.state.loading ? <Loading/> : null}

                <select 
                    defaultValue={months[Number(this.state.month)-1]} 
                    className="form-control" 
                    style={{display: "inline-block", width: "auto", marginLeft: 50}} 
                    onChange={(e)=>this.changeMonth(e)}
                >
                    {
                        months.map((e, i)=>(
                            <option key={i+1}>{e}</option>
                        ))
                    }
                </select>

                <select 
                    defaultValue={this.state.day} 
                    className="form-control" 
                    style={{display: "inline-block", width: "auto", marginLeft: 50}} 
                    onChange={(e)=>this.changeDay(e)}
                >
                    {
                        days.map((e, i)=>(
                            <option key={i+1} >{e}</option>
                        ))
                    }
                </select>

                <Table 
                    who="days_late"
                    unedit={true}
                    columns = {[
                        { title: "Id", key: 'id', hiddenOnInsert: true, unexport: true, width: 50 },
                        { 
                            title: "Wagty", key: 'date', uneditable: true, width: 80,
                            formatter: (cell)=>{
                                let date = new Date(Date.parse(cell))
                                return(date.getHours()+":"+date.getMinutes()) 
                            }
                        },
                        { title: "Ady Familiýasy", key: 'name', uneditable: true },
                        { title: "Bölümi", key: 'clas', uneditable: true, width: "80" },
                        // { title: "Bölüm yolbaşçy", key: 'teacher', uneditable: true },
                        { title: "Öý telefony", key: 'tel_home', width: "110" },
                        // { title: "Ejesiniň telefony", key: 'tel_mother', width: "150" },
                        { title: "El telefony", key: 'tel_father', width: "170" }
                    ]}
                    data = {this.state.data}
                />
            </div>
        )
    }
}

const months = ["Ýanwar", "Fewral", "Mart", "Aprel", "Maý", "Iýun", "Iýul", "Awgust", "Sentyabr", "Oktýabr", "Noýabr", "Dekabr"]

const days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];