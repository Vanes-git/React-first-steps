import React, {Component} from 'react';

import './search-panel.css';

export default class SearchPanel extends Component {
    constructor(props){
        super(props);
        this.state = {
            term: ''
        }
        this.onUpdeateSearch = this.onUpdeateSearch.bind(this);
    }

    onUpdeateSearch(event){
        const term = event.target.value;
        this.setState({term});
        this.props.onUpdeateSearch(term);
    }

    render(){
        return (
            <input
                className="form-control search-input"
                type="text"
                placeholder="Поиск по записям"
                onChange={this.onUpdeateSearch}
            />
        )
    }
}
