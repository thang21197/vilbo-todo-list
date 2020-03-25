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
    render() {
        let {index,itemEditName,itemEditLevel,itemEditId}=this.props;
        return (
          <tr>
          <td className="text-center">{index}</td>
          <td><input onChange={(event)=>{this.props.handleEditInputChange(event.target.value)}} type="text" className="form-control" defaultValue={itemEditName} /></td>
          <td className="text-center">
            <select defaultValue={itemEditLevel} className="form-control">
                 {this.renderLevel()}
            </select>
          </td>
          <td>
            <button type="button" className="btn btn-default btn-sm" onClick={()=>{this.props.handleEditClickCancel()}}>Cancel</button>
            <button type="button" className="btn btn-success btn-sm">Save</button>
          </td>
        </tr>
        );
    }
}

export default ItemEdit;