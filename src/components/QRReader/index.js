import React, { Component } from "react";
import QrReader from "react-qr-reader";
import Tarketka from "../Tarketka";
import request from 'request';
import common from '../../common';

export default class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      delay: 1000,
      result: null
    };
    this.handleScan = this.handleScan.bind(this);
  }
  
  noteStud(id, callback){
    console.log(id, new Date().getDate())
    let url = "new-days"
    let data = {id, day: new Date().getDate()}   

    this.setState({loading: true})
    request.post({
        url: common.urlApi+url,
        form: data
    }, (err, res, body)=>{
        this.setState({loading: false})
        if(!err){
            if(body==="Success"){
              callback()
            }
        }
    })  
  }

  handleScan(data) {
    console.log("in")
    if (data) {
      clearTimeout(this.time)
      this.noteStud(data.split("_")[0], ()=>{
        this.setState({
          result: data
        });
      })
      this.time = setTimeout(()=>{
        console.log("res")
        this.setState({result: null})
      }, 3000)
    }
  }

  componentWillUnmount(){
    clearTimeout(this.time)
  }
  
  handleError(err) {
    console.error(err);
  }
  
  render() {
    let data = null
    if (this.state.result){
      try {
        data = {}
        let arr = this.state.result.split("_")
        data.name = arr[2]+" "+arr[1]
        data.clas = arr[3]
        data.id = arr[0]
      } catch (error) {
      }
    }
    return (
      <div>
        <div style={{width: "30%", display: "inline-block"}}>  
          <QrReader
            delay={this.state.delay}
            onError={this.handleError}
            onScan={this.handleScan}
          />
        </div>
        <div style={{...style.modal, display: this.state.result&&data ? "inline-block" : "none"}}>
          <Tarketka data={data||{name: " ", clas: " ", id: -1}}/>
        </div>
      </div>
    );
  }
}

const style = {
  modal: {
    width: "60%",
    zIndex: 200000000000,
    verticalAlign: "top",
    textAlign: "center"
  }
}