import React, { Component, Fragment } from 'react';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
  MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon, MDBCol, MDBContainer, MDBRow, MDBBtn} from "mdbreact";
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios'
import 'react-dates/initialize';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';




const { API_KEY } = process.env
const API_URL = 'http://api.musicgraph.com/api/v2/artist/suggest'

const Suggestions = (props) => {
    const options = props.results.map(r => (
      <li key={r.id}>
        {r.name}
      </li>
    ))
    return <ul>{options}</ul>
  }


export class SearchComponnent extends Component {
    getPickerValue = (value) => {
        console.log(value);
    }

    state = {
        query: '',
        results: [], 
        startDate: null, 
        endDate: null, 
        focusedInput: null, 
        hourRange: {Morning: false, Afternoon: false, Evening: false},
      }

      getInfo = () => {
        axios.get(`${API_URL}?api_key=${API_KEY}&prefix=${this.state.query}&limit=7`)
          .then(({ data }) => {
            this.setState({
              results: data.data // MusicGraph returns an object named data, 
                                 // as does axios. So... data.data                             
            })
          })
      }
    

      handleHourRangeChange = (val) =>{
        this.setState((state) => {
            state.hourRange[val] = !state.hourRange[val];
          });
          {console.log("MORNING " + this.state.hourRange.Morning)};
      }
    
      handleInputChange = () => {
        this.setState({
          query: this.search.value
        }, () => {
          if (this.state.query && this.state.query.length > 1) {
            if (this.state.query.length % 2 === 0) {
              this.getInfo()
            }
          } else if (!this.state.query) {
          }
        })
      }

  render() {
    return (
    <MDBContainer>
      <MDBRow>
        <MDBCol md="6">
          <form>
            <p className="h4 text-center mb-4">serach service</p>
            <label htmlFor="defaultFormRegisterConfirmEx" className="grey-text">
              category
            </label>
            <input
              placeholder="Search for category..."
              type="text"
              id="defaultFormRegisterConfirmEx"
              className="form-control"
              ref={input => this.search = input}
              onChange={this.handleInputChange}
            />
            <Suggestions results={this.state.results} />
            <br />
            <label htmlFor="defaultFormRegisterEmailEx" className="grey-text">
              search
            </label>
            <input
              type="text"
              id="defaultFormRegisterEmailEx"
              className="form-control"
            />
            <br />
            <label
              htmlFor="defaultFormRegisterConfirmEx"
              className="grey-text"
            >
              when ?
            </label>
            <DateRangePicker
                startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
                focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                renderCalendarInfo={() => (
                    <Fragment>
                    {console.log("RENDER")}
                    <MDBBtn class={this.state.hourRange.Morning ? null: 'btn btn-outline-default waves-effect'}
                    onClick={() => {this.handleHourRangeChange("Morning")}}>Morning</MDBBtn>
                    <MDBBtn class={this.state.hourRange.Afternoon ? null: 'btn btn-outline-default waves-effect'}
                     onClick={() => {this.handleHourRangeChange("Afternoon")}}>Afternoon</MDBBtn>
                    <MDBBtn class={this.state.hourRange.Evening ? null: 'btn btn-outline-default waves-effect'}
                     onClick={() => {this.handleHourRangeChange("Evening")}}>Evening</MDBBtn> 
                    </Fragment >          
                  )}
                />            
                <br />
            <div className="text-center mt-4">
              <MDBBtn outline  color="unique" type="submit">
                Register
              </MDBBtn>
            </div>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );  
  }
}


export class Navbar extends Component {
  
  state = {
    isOpen: false
  };

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    return (
      <Router>
      <MDBNavbar color="default-color" dark expand="md">
        <MDBNavbarBrand>
          <strong className="white-text">Hobit</strong>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={this.toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          <MDBNavbarNav left>
            <MDBNavItem active>
              <MDBNavLink to="#!">Home</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="#!">Features</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="#!">Pricing</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  <div className="d-none d-md-inline">Dropdown</div>
                </MDBDropdownToggle>
                <MDBDropdownMenu className="dropdown-default">
                  <MDBDropdownItem href="#!">Action</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Another Action</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
          </MDBNavbarNav>
          <MDBNavbarNav right>
            <MDBNavItem>
              <MDBNavLink className="waves-effect waves-light" to="#!">
                <MDBIcon fab icon="twitter" />
              </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink className="waves-effect waves-light" to="#!">
                <MDBIcon fab icon="google-plus-g" />
              </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
                <MDBNavLink className="waves-effect waves-light" to="#!">
                  <MDBIcon icon="user" />
                </MDBNavLink>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    </Router>
  );  
  }
}