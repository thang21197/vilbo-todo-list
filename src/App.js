import React, { Component } from 'react';
import './App.css';
import Title from './Component/Title';
import Search from './Component/Search';
import Sort from './Component/Sort';
import Form from './Component/Form';
import ListItem from './Component/ListItem';
import Items from './mockdata/Item';
import SweetAlert from 'sweetalert-react';
import './../node_modules/sweetalert/dist/sweetalert.css';
import { v4 as uuidv4 } from 'uuid';
import { orderBy as orderByld } from 'lodash';

class App extends Component {
  constructor(props){
    super(props);
    let arrayLevel=[];
    if(Items.length>0){
      for(let i=0;i<Items.length;i++){
        if(arrayLevel.indexOf(Items[i].level)===-1){
          arrayLevel.push(Items[i].level);
        }
      }
    }
    arrayLevel.sort((a,b) =>a-b);
    this.state={
      items:Items,
      showAlert: false,
      titleAlert:'',
      alertId:'',
      arrayLevel:arrayLevel ,
      nameEdit:'',
      nameLevel:'',
      showForm:false,
      valueItem:'',
      levelItem:0,
      sortType:'',
      sortOrder:''  
    }
  }
  handleShowAlert=(titleAlert,itemId)=>{
    this.setState({
      titleAlert:titleAlert,
      showAlert:true,
      alertId:itemId
    });
  }
  hanldeDeleteItem=()=>{
    let {alertId, items} = this.state;
    if(items.length>0){   
      for (let i = 0; i < items.length; i++) {
        if(items[i].id===alertId){
              items.splice(i,1);
              break;
        }
      }
    }
    this.setState({
      showAlert:false
    });
  }
  handleEditInputChange= (value) =>{
    this.setState({
      nameEdit:value
    });
  }
  handleEditSelectChange= (value) =>{
    this.setState({
      levelEdit:value
    });
  }
  getEditId = (value) =>{
    this.setState({
      idEdit:value
    });
  }
  handleEditClickSubmit = () =>{
     let {nameEdit,levelEdit,items,idEdit}=this.state;
     if(items.length>0){
       for (let i = 0; i < items.length; i++) {
          if(items[i].id===idEdit){
            items[i].name= nameEdit!==''? nameEdit:items[i].name;
            items[i].level= levelEdit!==''? levelEdit:items[i].level;
            break;
          }
       }
       this.setState({
        nameEdit:'',
        nameLevel:'' 
       });
     }
  }
  hanldeShowForm= () =>{
    this.setState({
      showForm:!this.state.showForm
    });
  }
  handleFormInputChange = (value) =>{
    this.setState({
      valueItem:value
    });  
  }
  handleFormSelectChange = (value) =>{
    this.setState({
      levelItem:value
    });
  }
  handleFormClickCancel = () =>{
    this.setState({
      valueItem:'',
      levelItem:0  
    });
  }
  handleFormClickSubmit = () =>{
    let {valueItem,levelItem}=this.state;
    if(valueItem.trim() === '') return false;
    let newItem={
      id:uuidv4(),
      name:valueItem,
      level:+levelItem
    };
    Items.push(newItem);
    this.setState({
      items: Items,
      valueItem: '',
      levelItem: 0,
      showForm: false
   });
  }
  handleSort = (sortType,sortOrder) =>{
    this.setState({
      sortType:sortType,
      sortOrder:sortOrder
    });
    let {items} =this.state
    this.setState({
      items:orderByld(items,[sortType],[sortOrder])
    });
  }
  render() {
    return (
      <div className="container">
        {/* <button onClick={()=>this.setState({ showAlert: true })}>Alert</button> */}
      <SweetAlert
          show={this.state.showAlert}
          title='Delete Item'
          text={this.state.titleAlert}
          showCancelButton
          onOutsideClick={()  => this.setState({ showAlert: false })}
          onEscapeKey={()     => this.setState({ showAlert: false })}
          onCancel={()        => this.setState({ showAlert: false })}
          onConfirm={()       => this.hanldeDeleteItem()}
      />
      <Title/>
      <div className="row">
        <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
          <Search/>
        </div>
        <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
          <Sort
          sortType={this.state.sortType}
          sortOrder={this.state.sortOrder}
          handleSort={this.handleSort}
          />
        </div>
        <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
          <button type="button" className="btn btn-info btn-block marginB10" onClick={this.hanldeShowForm}>{ this.state.showForm ? 'Close Item':'Add Item'}</button>
        </div>
      </div>
      <div className="row marginB10">
        <div className="col-md-offset-7 col-md-5">
          <Form 
          showFrom={this.state.showForm}
          arrayLevel={this.state.arrayLevel}
          valueItem={this.state.valueItem}
          handleFormInputChange={this.handleFormInputChange}
          levelItem={this.state.levelItem}
          handleFormSelectChange={this.handleFormSelectChange}
          handleFormClickCancel={this.handleFormClickCancel}
          handleFormClickSubmit ={this.handleFormClickSubmit}
          />
        </div>
      </div>
     <ListItem 
     items={this.state.items}
     itemEdit={this.state.itemEdit}
     itemIndex={this.state.itemIndex}
     handleShowAlert={(titleAlert,itemId) =>{this.handleShowAlert(titleAlert,itemId)}}
     arrayLevel={this.state.arrayLevel}
     handleEditInputChange={this.handleEditInputChange}
     handleEditClickSubmit={this.handleEditClickSubmit}
     handleEditSelectChange={this.handleEditSelectChange}
     itemEditId={this.getEditId}
     />
    </div>
    );
  }
}

export default App;
