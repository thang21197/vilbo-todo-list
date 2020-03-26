import React, { Component } from 'react';

class Form extends Component {
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
        let {showFrom}=this.props;
        if(showFrom===true){
        return (
        <form className="form-inline">
          <div className="form-group">
            <input onChange={(event) =>{this.props.handleFormInputChange(event.target.value)}}value={this.props.valueItem} type="text" className="form-control" placeholder="Item Name" />
          </div>
          <div className="form-group">
            <select className="form-control" onChange={(event)=>{this.props.handleFormSelectChange(event.target.value)}} defaultValue={this.props.levelItem}>
              {this.renderLevel()}
            </select>
          </div>
          <button type="button" className="btn btn-primary" onClick={()=>this.props.handleFormClickSubmit()}>Submit</button>
          <button type="button" className="btn btn-default" onClick={()=>this.props.handleFormClickCancel()}>Cancel</button>
        </form>
        );
       } else return null
    }
}

export default Form;