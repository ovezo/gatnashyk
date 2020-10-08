import React, {Component} from 'react'

//import css

import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css'

import words from "../../common/language"
import Loading from '../Loading';

let order = 'desc';
export default class UniversalTable extends Component{

	selected = []

	state = {
		visibleColumns: localStorage.getItem("tmtr_vis_col"+this.props.who) ? JSON.parse(localStorage.getItem("tmtr_vis_col"+this.props.who)) : this.props.columns.map((elem)=>elem.key),
		loading: false
	}

	handleBtnClick = () => {
		if (order === 'desc') {
			this.refs.table.handleSort('asc', 'name');
			order = 'asc';
		} else {
			this.refs.table.handleSort('desc', 'name');
			order = 'desc';
		}
	}

	hideColumns = (ind) =>{
		if (this.state.visibleColumns.indexOf(this.props.columns[ind].key)+1){
            // eslint-disable-next-line
            this.state.visibleColumns = this.state.visibleColumns.filter((elem)=>this.props.columns[ind].key!==elem)
		}else{
			this.state.visibleColumns.push(this.props.columns[ind].key)
		}
		localStorage.setItem("tmtr_vis_col"+this.props.who, JSON.stringify(this.state.visibleColumns));
		this.setState(this.state)
	}

	handleSelect = (e, s) => {
		if (s)
			this.selected.push(e.id)
		else
			this.selected = this.selected.filter((elem)=>elem!==e.id)
	}

	handleSelectAll = (isSelected) => {
		if (isSelected)	{
			this.selected = this.props.data.map(e=>e.id)
		} else {
			this.selected = []
		}
		console.log(this.selected)
	}

	handleSearch = (e, v) => {
		e.preventDefault()
		this.props.onSearch(this.refs.search.value)
	}

	render() {
		return (
			<div>
				{this.state.loading ? <Loading/> : null}
				<div style={{margin: 50}}>
					
					<div style={{textAlign: 'right', position: 'relative', margin: 10 }}>
						
					
						<span style={{float: "left", padding: 7}}>Jemi: {this.props.data.length}</span>

						<div 
							style={this.state.checkColumns ? styles.dropdownActive : styles.dropdown } 
							onClick={()=>this.setState({checkColumns: !this.state.checkColumns})}
						>
							<span className='glyphicon glyphicon-equalizer' style={styles.iconLeft}/>
								Sütünler
							<span className='glyphicon glyphicon-triangle-bottom' style={styles.iconDropdown}/>
						</div>
						<div style={styles.dropdownLayer} hidden={!this.state.checkColumns}>
							<div>
								{this.state.visibleColumns.length} sanysyndan {this.props.columns.length}-si görünýär
							</div>
							<div style={styles.checkGroup}>
								{
									this.props.columns.map((elem, ind)=>
										<div 
											key={ind} 
											style={{display: 'inline-block', width: '33%', cursor: 'pointer'}}
											onClick={()=>this.hideColumns(ind)}
										>
											<input type="checkbox" onChange={()=>{}} checked={this.state.visibleColumns.indexOf(elem.key)+1} style={styles.iconLeft}/>{elem.title}
										</div>
									)
								}
							</div>
							
						</div>
					</div>
					
					<div style={{padding: 20, borderTop: '1px solid #ccc', paddingLeft: 0}}></div>
					
					<BootstrapTable 
						insertRow = {Boolean(this.props.addRow)}
						deleteRow = {Boolean(this.props.removeSelected)}
						data={ this.props.data }
						hover
						cellEdit={this.props.unedit? undefined : {mode: "click", blurToSave: true, beforeSaveCell: this.props.beforeSaveCell}}
						exportCSV={ true }
						selectRow={{
							mode: 'checkbox',  
							onSelect: (e, s)=>this.handleSelect(e, s),
							onSelectAll: (bool)=>this.handleSelectAll(bool)
						}}
						options = {{
							// onRowClick: this.props.rowClick,
							insertModalBody: (columns)=>{},
							onAddRow: (row)=>this.props.addRow(row),
							onDeleteRow: (row)=>this.props.removeSelected(this.selected),
							insertText: this.props.who+" goş",
							exportCSVText: "Çapa taýýarla",
							deleteText: "Bellenenleri poz",
							sizePerPageList: [30, 50, 100],
							sizePerPage: 30
						}}
						pagination
					>
						{
							this.props.columns.map((elem, ind)=>
								<TableHeaderColumn 
									isKey={ elem.key==="id" }
									key={ind} 
									hidden={!(this.state.visibleColumns.indexOf(elem.key)+1)} 
									dataField={elem.key} 
									dataSort={ elem.dataSort ? false : true }
									dataFormat={ elem.formatter ? elem.formatter : undefined }
									filter={elem.filter}
									width={elem.width}
									hiddenOnInsert={elem.hiddenOnInsert}
									editable={ elem.uneditable ? false : true }
									export={ elem.unexport ? false : true }
									editable={ elem.editable }
								>
									{elem.title}
								</TableHeaderColumn>
							)
						}

					</BootstrapTable>
				</div>
			</div>
		);
	}
}




UniversalTable.defaultProps = {
	columns: [
		{ 
			title: 'Image', 
			key: 'img', 
			formatter: (cell, row)=>(
				<img alt="img" src={cell} style={{height: '60px', position: 'relative', left: 0, right: 0}}/>
			)
		},
		{ title: 'Name', key: 'name' },
		{ title: 'Date of birthday', key: 'birthday' },
		{ title: 'Phone number', key: 'phone' },
		{ title: 'Adress', key: 'adress' },
        { title: 'Email', key: 'email' },
        { 
            title: 'Status', 
            key: 'status',
            filter: { 
                type: 'SelectFilter', 
                options: {
                    'Sent': 'Sent',
                    'Sending': 'Sending',
                    'Failed': 'Failed'
                }, 
                condition: 'eq' 
            } 
        
        },
	],
	data: [
		{ id: 1, img: '/shoppingBag.png', name: 'Ovez1', birthday: '2017/12/25', phone: '+99362026297', email: 'orazberdiyew1997@gmail.com', adress: '2-nji mkr 13/6', status: "Sent" },
		{ id: 3, img: '/shoppingBag.png', name: 'Ovez3', birthday: '2017/12/25', phone: '+99362026297', email: 'orazberdiyew1997@gmail.com', adress: '2-nji mkr 13/6', status: "Failed" },
		{ id: 4, img: '/shoppingBag.png', name: 'Ovez4', birthday: '2017/12/25', phone: '+99362026297', email: 'orazberdiyew1997@gmail.com', adress: '2-nji mkr 13/6', status: "Sent" },
		{ id: 5, img: '/shoppingBag.png', name: 'Ovez5', birthday: '2017/12/25', phone: '+99362026297', email: 'orazberdiyew1997@gmail.com', adress: '2-nji mkr 13/6', status: "Sending" },
	]
}

const styles = {
	dropdown: {
		display: 'inline-block',
		backgroundColor: '#fff',
		border: '1px solid #fff',
		borderRadius: 0,
		boxShadow: 'none',
		color: '#41362f',
		fontSize: 13,
		fontWeight: 400,
		letterSpacing: '-.025em',
		padding: '7px 15px',
		position: 'relative',
		verticalAlign: 'baseline',
		zIndex: 3,
		cursor: 'pointer'
	},
	dropdownActive: {
		display: 'inline-block',
		backgroundColor: '#fff',
		border: '1px solid #adadad',
		color: '#41362f',
		fontSize: 13,
		fontWeight: 400,
		letterSpacing: '-.025em',
		padding: '7px 15px',
		position: 'relative',
		verticalAlign: 'baseline',
		zIndex: 3,
		cursor: 'pointer',
    	boxShadow: '#fff 0px 3px 4px 0px, rgba(0, 0, 0, 0.5) 0px -1px 5px',
		borderBottom: 'none',
	},
	dropdownLayer: {
		left: 'auto',
	    right: 0,
	    color: '#303030',
	    fontsize: 13,
	    overflow: 'hidden',
	    padding: '22px 35px 10px',
	    zIndex: 2,
	    backgroundColor: '#fff',
	    border: '1px solid #adadad',
	    boxShadow: '1px 1px 5px rgba(0,0,0,0.5)',
	    lineHeight: 1.36,
	    marginTop: -2,
	    width: 570,
	    position: 'absolute',
	    top: '100%',
	    transition: 'all .15s ease',
	    textAlign: 'left'
	},
	iconLeft: {
		fontSize: 16,
		fontWeight: 'bold',
		marginRight: 10,
		verticalAlign: 'text-bottom'
	},
	iconDropdown: {
		marginLeft: 10,
		verticalAlign: 'text-top'
	},
	checkGroup: { 
		marginTop: 15,
		maxHeight: 228, 
		overflowY: 'auto', 
		padding: '15px 0', 
		borderTop: '1px solid #e3e3e3',
		borderBottom: '1px solid #e3e3e3'
	}
}