import React from "react";
import QRCode from 'qrcode.react';

export default class Tarketka extends React.Component{
    render(){
        return(
            <span>
                <div style={style.cont}>
                    <div style={style.head}>{this.props.head}</div>
                    <div style={style.keyValCont}>
                        <div style={style.keyVal}><div style={style.key}>Ady: </div>{this.props.data.name.split(" ")[1]}</div>
                        <div style={style.keyVal}><div style={style.key}>Familiýa: </div>{this.props.data.name.split(" ")[0]}</div>
                        <div style={style.keyVal}><div style={style.key}>Synpy: </div>{this.props.data.clas}</div>
                        <div style={style.qr}>
                            <QRCode value={this.props.data.id+"_"+this.props.data.name.split(" ")[1]+"_"+this.props.data.name.split(" ")[0]+"_"+this.props.data.clas} style={{width: 53, height: 53, float: "right"}}/>
                        </div>
                    </div>
                    <div style={style.photo}>Surat</div>
                </div>

                <div style={style.cont}>
                    <div style={style.qr_only}>
                        <QRCode value={this.props.data.id+"_"+this.props.data.name.split(" ")[1]+"_"+this.props.data.name.split(" ")[0]+"_"+this.props.data.clas} style={{width: "auto", height: "100%"}}/>
                    </div>
                </div>
                <br/>
            </span>
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
        margin: 20,
        background: "white",
        textAlign: "left",
        verticalAlign: "top"
    },
    head: {
        padding: "0 1cm",
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
    },
    qr_only: {
        textAlign: "center",
        padding: 10,
        height: "100%"
    }
}
