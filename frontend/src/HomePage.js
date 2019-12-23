import React, { Component, Fragment } from 'react';
import './autosuggest.css'
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
  MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon, MDBCol, MDBContainer, MDBRow, MDBBtn, MDBBadge} from "mdbreact";
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios'
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import DateRangePickerWrapper from './dateTimePicker.js'
import Autosuggest from 'react-autosuggest';

const API_URL = 'http://localhost:3000/api/search'

function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

  function getSuggestions(value, uri) {
    const escapedValue = escapeRegexCharacters(value.trim());
    
    if (escapedValue === '') {
      return [];
    }
    return axios.get(`${API_URL}/${uri}?term=${escapedValue}&limit=7`)
      .then(({ data }) => {
        return data
    })
  }
  
  function getSuggestionValue(suggestion) {
    return suggestion.name;
  }
  
  function renderSuggestion(suggestion) {
    return (
      <span>{suggestion.name}</span>
    );
  }

class SerachCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
        value: '',
        suggestions_category: [], 
    }
  }
  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue
    });
  };

        
  onSuggestionsFetchRequested = async ({ value }) => {
    let uri = "categories"
    this.setState({
      suggestions_category: await getSuggestions(value, uri)
    });
  };

  suggestionSelected = (event, data) => {
    this.props.onSelectCategory(data.suggestionValue);            
  }

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions_category: []
    });
  };
  render() {

  const { value, suggestions_category } = this.state;
    const inputProps = {
      placeholder: "Search for category...",
      value,
      onChange: this.onChange
    };
    return (
      <Autosuggest
      suggestions={suggestions_category}
      onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
      onSuggestionsClearRequested={this.onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      onSuggestionSelected={this.suggestionSelected}
      inputProps={inputProps} />
    )
  }
}

class SerachServices extends Component {
  constructor(props) {
    super(props);
    this.state = {
        value: '',
        suggestions: [], 
    }
  }
  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue
    });
  };

        
  onSuggestionsFetchRequested = async ({ value }) => {
    let uri = "businesses"
    this.setState({
      suggestions: await getSuggestions(value, uri)
    });
  };

  suggestionSelected = (event, data) => {
    this.props.onSelectService(data.suggestionValue);            
  }
  

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };
  render() {

  const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Search for businesses...",
      value,
      onChange: this.onChange
    };
    return (
      <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
      onSuggestionsClearRequested={this.onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      onSuggestionSelected={this.suggestionSelected}
      inputProps={inputProps} />
    )
  }
}

export class SearchComponnent extends Component {
  constructor(props) {
      super(props);
      this.state = {
          startDate: null, 
          endDate: null, 
          focusedInput: null, 
          category: null, 
          service_search: null, 
          day_part: {Morning: false, Afternoon: false,  Evening: false}, 
      };
    }

  createButtonRow = () => {
      const items = []
      for (var key in this.state.day_part) {
          if (this.state.day_part[key] == true){
              items.push(<MDBBadge key={key} pill color="default">{key}</MDBBadge>)            
          }
      }
      return (<div>{items}</div>)
  }
    
  onDayButtonChage = (key,value) => {
    this.setState(() => {
        let newState = this.state;
        newState.day_part[key] = value;
        return newState
      })
  }

  handleCategory = (new_val) => {
    this.setState({
      category: new_val
    });
  }

  handleService = (new_val) => {
    this.setState({
      service_search: new_val
    });
  }

  submitSearch = () => {
    let uri =''
    axios.get(`${API_URL}/${uri}?term=${escapedValue}`)
      .then(({ data }) => {
        console.log(data)
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
              <SerachCategory onSelectCategory={this.handleCategory}/>
            <br />
            <label htmlFor="defaultFormRegisterEmailEx" className="grey-text">
              search service
            </label>
              <SerachServices onSelectService={this.handleService}/>
            <br />
            <label
              htmlFor="defaultFormRegisterConfirmEx"
              className="grey-text"
            >
            when ?
            </label>
            <DateRangePickerWrapper
                startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
                focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                renderCalendarInfo={() => {
                    return (<DayButton onChangeDayButton={this.onDayButtonChage} day_part={this.state.day_part}/>)
                  }}
                />            
                <br />
                {this.createButtonRow()}
                <br />
            <div className="text-center mt-4">
              <MDBBtn outline  color="unique" type="submit" onClick={this.submitSearch()}>
                Search
              </MDBBtn>
            </div>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );  
  }
}



export class DayButton extends Component {
    constructor(props) {
        super(props);
      }


    handleHourRangeChange = (val) =>{
        let new_val = !this.props.day_part[val]
        this.setState((props) => {
            let newState = this.props.day_part;
            newState[val] = new_val;
            return newState
          })
        this.props.onChangeDayButton(val, new_val);
      }


    render() {
        return(
            <div>
            <Fragment>
            <MDBBtn className={this.props.day_part.Morning ? 'btn-default btn Ripple-parent': 'btn btn-outline-default waves-effect'}
            onClick={() => this.handleHourRangeChange("Morning")}>Morning</MDBBtn>
            <MDBBtn className={this.props.day_part.Afternoon ? 'btn-default btn Ripple-parent': 'btn btn-outline-default waves-effect'}
             onClick={() => this.handleHourRangeChange("Afternoon")}>Afternoon</MDBBtn>
            <MDBBtn className={this.props.day_part.Evening ? 'btn-default btn Ripple-parent': 'btn btn-outline-default waves-effect'}
             onClick={() => this.handleHourRangeChange("Evening")}>Evening</MDBBtn> 
            </Fragment >
            </div>
        )
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