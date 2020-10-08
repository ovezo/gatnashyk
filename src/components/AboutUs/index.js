import React from "react";

export default class Settings extends React.Component {

    render(){
        return(
            <div>
                <div className="container">
                    <div style={style.cont}>
                        <div style={style.label}>Awtory barada</div>
                        <div style={style.keyVal}>
                            <div style={style.key}>Taýýarlan:</div>
                            <div style={style.value} ><b>Züleýha Orazberdiýewa</b><br/>Balkanabat şäherindäki iňlis dili, fizika we matematika dersleri çuňlaşdyrylyp öwredilýän ýöriteleşdirilen 22-nji orta mekdebiň okuwçysy</div> 
                        </div>
                        <div style={style.keyVal}>
                            <div style={style.key}>Ylmy ýolbaşçy:</div>
                            <div style={style.value} ><b>Baýram Ödeberdiýew</b><br/>Balkanabat şäherindäki iňlis dili, fizika we matematika dersleri çuňlaşdyrylyp öwredilýän ýöriteleşdirilen 22-nji orta mekdebiň mugallymy </div> 
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
        fontSize: 20,
        textAlign: "right",
        marginRight: 20,
        verticalAlign: "top"
    },
    value: {
        width: "55%",
        display: "inline-block",
        maxWidth: 500,
        fontSize: 18
    },
    keyVal: {
        margin: "30px 0"
    },
    label: {
        color: "#555",
        fontWeight: 400,
        fontSize: 22,
        textAlign: "center"
    }
}