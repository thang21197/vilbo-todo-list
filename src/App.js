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
      itemIdEdit:'',
      arrayLevel:arrayLevel   
    }
  }
  handleEditItem=(item,index)=>{
    this.setState({
      itemEdit:item,
      itemIndex:index
    });  
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
    console.log(value);
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
          <Sort/>
        </div>
        <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
          <button type="button" className="btn btn-info btn-block marginB10">Add Item</button>
        </div>
      </div>
      <div className="row marginB10">
        <div className="col-md-offset-7 col-md-5">
          <Form/>
        </div>
      </div>
     <ListItem 
     items={this.state.items}
     itemEdit={this.state.itemEdit}
     itemIndex={this.state.itemIndex}
     handleShowAlert={(titleAlert,itemId) =>{this.handleShowAlert(titleAlert,itemId)}}
     arrayLevel={this.state.arrayLevel}
     handleEditInputChange={this.handleEditInputChange}
     handleEditItem={(itemEdit,index) =>{this.handleEditItem(itemEdit,index)}}
     />
    </div>
    );
  }
}

export default App;
