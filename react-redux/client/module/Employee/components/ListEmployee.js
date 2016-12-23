import React from 'react';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table';
import Toggle from 'material-ui/Toggle';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import {red500, yellow500, blue500,green500,orange900,red900} from 'material-ui/styles/colors';
import CircularProgress from 'material-ui/CircularProgress'; 
import Snackbar from 'material-ui/Snackbar';
import ConfirmationDeleteDialog from '../../../common/components/ConfirmationDialog';
import ReactPaginate from 'react-paginate';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
var choosen=[];

const ListEmployee = React.createClass({       
    getInitialState () {		     
         
        this.props.onFirstLoad(); // Socket Initialization , See the Action Creator of Employee for the implementation
		return {                                  
            openConfirmationDelete:false,              
        };
	},     
    componentWillMount(){		
        // Load list of employee
		this.props.LoadEmployee(this.props.table);							
	},

    // This method will be called whenever prop/state changes
    // this is usefull for paging table , whenever the number of page changes , this method will be called
    componentWillUpdate(nextProps, nextState){            
        var oldValues = JSON.stringify(this.props.table)
        var newValues = JSON.stringify(nextProps.table)
        if(oldValues !== newValues){
            this.props.LoadEmployee(nextProps.table);	            
        }
    },   

    // Reset the state to the initial state when the route changes
	// Otherwise , if the state is not reseted , the state remains the same	when the user
	// leave the form
	componentWillUnmount(){
		this.props.handleResetProperty();
	},

    // handle for checkbox for item selection at the table
    handleRowSelection(selected){            
        choosen.push(selected);
    },
    
    handleDelete(){
        this.handleCloseModal();
        // these bunch of codes are used in deleting items from checkbox selection
        var newChoices=[];
        var choices = choosen[choosen.length-1];
        if(choices != "none" && choices!= undefined){
            if(choices == "all"){
                for(var i=0;i<this.props.listEmployee.list.length;i++){            
                    newChoices.push(this.props.listEmployee.list[i].id);
                }
            }
            else{
                for(var i=0;i<choices.length;i++){            
                    newChoices.push(this.props.listEmployee.list[choices[i]].id);
                }
            }
        }        
        this.props.DeleteEmployeeBatch(newChoices);
    },
    // Confirmation Delete Modal
    handleCloseModal(){
        this.setState({
            openConfirmationDelete:false
        });
    },
    handleOpenModal(){
        this.setState({
            openConfirmationDelete:true
        });
    },

    //Edit Button
    handleEdit(id){
        this.context.router.push('/employee/'+id);
    },
    //Add Button
    handleAdd(){
        this.context.router.push('/employee');
    },

    // Table
    handlePageClick(data){
        this.props.handleResetProperty();
        this.props.handleChangeProperty("pageIndex",data.selected);        
    },

    // Searching
    handleSearch(event){        
        this.props.handleResetProperty();
        this.props.handleChangeProperty(event.target.name,event.target.value);      
    },
    render() {  
        const a = this.props.listEmployee;           
        return (
             <div style={{padding:"30px",marginTop:"20px"}}>
                <div>
                    <TextField
                        hintText="Search here..." onChange={this.handleSearch} name="condition" value ={this.props.table.condition}
                    />
                    <IconButton tooltip="Search" touch={true} tooltipPosition="top-center"  onClick={this.handleAdd}   >
                        <FontIcon className="material-icons"  color={blue500}  >search</FontIcon>
                    </IconButton>
                    <IconButton tooltip="Add Area" touch={true} tooltipPosition="top-center"  onClick={this.handleAdd}   >
                        <FontIcon className="material-icons"  color={green500}  >control_point</FontIcon>
                    </IconButton>	
                    <IconButton tooltip="Delete" touch={true} tooltipPosition="top-center"  onTouchTap={this.handleOpenModal} >
                        <FontIcon className="material-icons"  color={red900}>delete</FontIcon>
                    </IconButton>                    
                    {
                        this.props.loadingBar ?
                        <CircularProgress size={35} />  : '' 
                    }			     
                </div>
                
                <Table height={"250px"} fixedHeader={true} fixedFooter={true} selectable={true} multiSelectable={true} onRowSelection={this.handleRowSelection}>
                <TableHeader displaySelectAll={true} adjustForCheckbox={true} enableSelectAll={true}>                  
                    <TableRow>
                        <TableHeaderColumn tooltip="The ID">#</TableHeaderColumn>
                        <TableHeaderColumn tooltip="The First Name">First Name</TableHeaderColumn>
                        <TableHeaderColumn tooltip="The Last Name">Last Name</TableHeaderColumn>
                        <TableHeaderColumn tooltip="The Address">Address</TableHeaderColumn>
                        <TableHeaderColumn tooltip="The Action">Action</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={true} deselectOnClickaway={false} showRowHover={true} stripedRows={false}>
                    {this.props.listEmployee.list !=null && this.props.listEmployee.list != undefined? 
                        this.props.listEmployee.list.map((row, index) => (
                    <TableRow key={index} >
                        <TableRowColumn>{(this.props.table.pageIndex*this.props.table.pageSize)+index+1}</TableRowColumn>
                        <TableRowColumn>{row.firstName}</TableRowColumn>
                        <TableRowColumn>{row.lastName}</TableRowColumn>
                        <TableRowColumn>{row.address}</TableRowColumn>
                        <TableRowColumn>
                            <IconButton touch={true} onClick={this.handleEdit.bind(this,row.id)} >
                                <FontIcon className="material-icons"  color={blue500}>border_color</FontIcon>
                            </IconButton>
                        </TableRowColumn>
                    </TableRow>
                    )) :''}
                </TableBody>

                <TableFooter
                    adjustForCheckbox={true}>                    
                    <TableRow>
                        <TableRowColumn colSpan="3" style={{textAlign: 'center'}}>
                            Copyright © Mitrais
                        </TableRowColumn>
                    </TableRow>
                </TableFooter>
                </Table>
                <ReactPaginate 
                       previousLabel={"previous"}
                       nextLabel={"next"}
                       breakLabel={<a href="">...</a>}
                       breakClassName={"break-me"}
                       pageCount={this.props.table.countPageItem}
                       marginPagesDisplayed={5}
                       pageRangeDisplayed={5}
                       onPageChange={this.handlePageClick}
                       containerClassName={"pagination"}
                       subContainerClassName={"pages pagination"}                       
                       activeClassName={"active"} />
                <ConfirmationDeleteDialog 
                handleCloseModal={this.handleCloseModal} 
                handleDelete={this.handleDelete} 
                openConfirmationDelete={this.state.openConfirmationDelete} />                 
                <Snackbar
                    open={this.props.snackBar.openSnackBar}
                    message={this.props.snackBar.messageSnackBar}
                    autoHideDuration={this.props.snackBar.duration}
                    onRequestClose={this.props.handleCloseSnackBar}						
                />
            </div>
        );
    }
});

ListEmployee.contextTypes = {
    router: React.PropTypes.object	
};


export default ListEmployee;
