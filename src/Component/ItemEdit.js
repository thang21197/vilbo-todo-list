import React, { Component } from 'react';

class ItemEdit extends Component {
    renderLevel= () =>{
      const {arrayLevel}=this.props
      return arrayLevel.map((level,index) =>{
        switch (level) {
          case 0:
            return <option key={index} value={level}>Low</option>
            break;
          case 1:
            return <option key={index} value={level}>Medium</option>
            break;
          default:
            return <option key={index} value={level}>High</option>
            break;
        }
      })
    }
    handleEditInputChange(event){
      this.props.handleEditInputChange(event.target.value);
    }
    render() {
        let {index,itemEditName,itemEditLevel}=this.props;
        return (
          <tr>
          <td className="text-center">{index}</td>
          <td><input onChange={(event)=>{this.handleEditInputChange(event)}} type="text" className="form-control" defaultValue={itemEditName} /></td>
          <td className="text-center">
            <select onChange={(event)=>{this.props.handleEditSelectChange(event.target.value)}} defaultValue={itemEditLevel} className="form-control">
                 {this.renderLevel()}
            </select>
          </td>
          <td>
            <button type="button" className="btn btn-default btn-sm" onClick={()=>{this.props.handleEditClickCancel()}}>Cancel</button>
            <button type="button" className="btn btn-success btn-sm" onClick={()=>{this.props.handleEditClickSubmit()}}>Save</button>
          </td>
        </tr>
        );
    }
}

export default ItemEdit;