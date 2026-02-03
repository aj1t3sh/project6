import React, { Component } from 'react'
import './App.css'
import {APIURL, callApi} from './lib.js'

export default class App extends Component {
  constructor(){
    super();
    this.state = {data: []};
    this.getData = this.getData.bind(this);
    this.showUserInfo = this.showUserInfo.bind(this);
    this.closeUserInfo = this.closeUserInfo.bind(this);
  }
  componentDidMount(){
    callApi("GET", APIURL, "", this.getData);
  }
  getData(res){
    this.setState({data: res});
  }
  showUserInfo(user){
    this.setState({showpopup: true, userdata: user});
  }
  closeUserInfo(){
    this.setState({showpopup: null});
  }
  render() {
    const {data, showpopup, userdata} = this.state;
    const IMGURL = import.meta.env.BASE_URL;
    return (
      <div>
        <div className='app'>
        <div className='header'> Example for APIs, Fetch Function and Conditional Rendering</div>
        <div className='section'>
          <h1>User Information</h1>
          <table>
            <tbody>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
            </tr>
            {data.map((user)=>(
            <tr key={user.id} onClick={() => this.showUserInfo(user)}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
            </tr>
            ))}
            </tbody>
          </table>
        </div>
        <div className='footer'> Copyright @ 2026. -Ajitesh Karan</div>
        </div>
        {showpopup && (
  <div className="overlay">
    <div className="modal">
      <div className="modalHeader">
        <span>User Details</span>
        <button onClick={this.closeUserInfo}>✕</button>
      </div>

      <div className="modalBody">
        <div><label>ID</label><span>{userdata.id}</span></div>
        <div><label>Name</label><span>{userdata.name}</span></div>
        <div><label>Username</label><span>{userdata.username}</span></div>
        <div><label>Email</label><span>{userdata.email}</span></div>
        <div>
          <label>Address</label>
          <span>
            {userdata.address.street}, {userdata.address.city} - {userdata.address.zipcode}
          </span>
        </div>
        <div><label>Phone</label><span>{userdata.phone}</span></div>
        <div><label>Website</label><span>{userdata.website}</span></div>
        <div>
          <label>Company</label>
          <span>
            {userdata.company.name}<br />
            {userdata.company.bs}
          </span>
        </div>
      </div>

      <div className="modalFooter"></div>
    </div>
  </div>
)}
      </div>
    )
  }
}
