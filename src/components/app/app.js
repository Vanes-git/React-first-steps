import React, {Component} from 'react';
import nextId from "react-id-generator";

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import PostStatusFilter from '../post-status-filter';
import PostList from '../post-list';
import PostAddForm from '../post-add-form';

import './app.css'

export default class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            data : [
                {label: 'Going to learn react', important: true, like: false, id: nextId()},
                {label: 'Great', important: false, like: false, id: nextId()},
                {label: 'I need a break...', important: false, like: false, id: nextId()}
            ],
            term: ''
        }
        this.deleteItem = this.deleteItem.bind(this);
        this.addItem = this.addItem.bind(this);       
        this.onToggleImportant = this.onToggleImportant.bind(this);
        this.onToggleLiked = this.onToggleLiked.bind(this); 
        this.onUpdeateSearch = this.onUpdeateSearch.bind(this); 
    }    

    deleteItem(id){
        this.setState(({data})=>{
            const index = data.findIndex(elem => elem.id === id);
            const newArr = [...data.slice(0, index), ...data.slice(index+1)];

            return{
                data: newArr
            }
        });
    }

    addItem(body){
        const newItem ={
            label: body,
            important: false,
            id: nextId()
        }

        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return{
                data: newArr
            }
        });
    }

    onToggleImportant(id){
        this.setState(({data})=>{
            const index = data.findIndex(elem => elem.id === id);

            const old = data[index];
            const newitem = {...old, important: !old.important};
            const newArr = [...data.slice(0, index), newitem, ...data.slice(index+1)];
            return{
                data: newArr
            }
        });
    }

    onToggleLiked(id){
        this.setState(({data})=>{
            const index = data.findIndex(elem => elem.id === id);

            const old = data[index];
            const newitem = {...old, like: !old.like};
            const newArr = [...data.slice(0, index), newitem, ...data.slice(index+1)];
            return{
                data: newArr
            }
        });
    }

    searchPost(items, term) {
        if(term.length === 0){
            return items
        }

        return items.filter((item) => {
            return item.label.indexOf(term) > -1
        });
    }

    onUpdeateSearch(term) {
        this.setState({term});
    }

    render() {
        const {data, term} = this.state;
        const liked = data.filter(item => item.like).length;
        const allPosts = data.length;
        const visiblePosts = this.searchPost(data, term);

        return(
            <div className="app">
                <AppHeader
                    liked={liked}
                    allPosts={allPosts}/>
                <div className="search-panel d-flex">
                    <SearchPanel
                        onUpdeateSearch={this.onUpdeateSearch}/>
                    <PostStatusFilter/>
                </div>
                <PostList 
                    posts={visiblePosts}
                    onDelete={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleLiked={this.onToggleLiked}/>
                <PostAddForm
                    onAdd={this.addItem}/>
            </div>
        )
    }
}
