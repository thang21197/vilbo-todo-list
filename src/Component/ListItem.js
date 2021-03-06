import React, { Component } from 'react';
import Item from './Item';
import ItemEdit from './ItemEdit';

class ListItem extends Component {
    constructor(props) {
      super(props);
      this.state={
        items:this.props.items,
        arrayLevel:this.props.arrayLevel,
        itemEditId:''
      }
    }
    handleEditItem=(itemEdit,index)=>{
      this.setState({
        itemEditIndex:index,
        itemEditId:itemEdit.id,
        itemEditName:itemEdit.name,
        itemEditLevel:itemEdit.level
      });
      this.props.itemEditId(itemEdit.id);
    }
    handleEditClickCancel=()=>{
      this.setState({
        itemEditId:''
      })
    }
    handleEditClickSubmit=()=>{
      this.props.handleEditClickSubmit();
      this.setState({
        itemEditId:''
      })
    }
    renderItem = () =>{     
      let {itemEditId,itemEditIndex,itemEditLevel,itemEditName,arrayLevel}=this.state;
      let {items}=this.props
      if(items.length === 0) {
        return <Item item={0} />
      }
      return items.map((item,index)=>{
        if(item.id===itemEditId){
          return (<ItemEdit
          key={index}
          index={itemEditIndex}
          itemEditName={itemEditName}
          itemEditLevel={itemEditLevel}
          arrayLevel={arrayLevel}
          handleEditClickCancel={this.handleEditClickCancel}
          handleEditInputChange={this.props.handleEditInputChange}
          handleEditClickSubmit={this.handleEditClickSubmit}
          handleEditSelectChange={this.props.handleEditSelectChange}
          />)
        }
        return  (<Item 
          key={index}
          item={item} 
          index={index}
          handleShowAlert={this.props.handleShowAlert}
          handleEditItem={this.handleEditItem}
          />);
       })
    }
    render() {
        return (
            <div className="panel panel-success">
      <div className="panel-heading">List Item</div>
      <table className="table table-hover ">
        <thead>
          <tr>
            <th style={{width: '10%'}} className="text-center">#</th>
            <th>Name</th>
            <th style={{width: '15%'}} className="text-center">Level</th>
            <th style={{width: '15%'}}>Action</th>
          </tr>
        </thead>
        <tbody>
          {this.renderItem()}
          {/* <ItemEdit/> */}
        </tbody>
      </table>
    </div>
        );
    }
}

export default ListItem;