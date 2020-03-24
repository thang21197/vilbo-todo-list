import React, { Component } from 'react';
import Item from './Item';
import ItemEdit from './ItemEdit';

class ListItem extends Component {
    componentWillMount(){
      this.setState({
        items:this.props.items
      });
    } 
    renderItem = () =>{
      let {items}=this.state;
      return items.map((item,index)=>{
        return  (<Item 
          item={item} 
          index={index}/>);
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
          <ItemEdit/>
        </tbody>
      </table>
    </div>
        );
    }
}

export default ListItem;