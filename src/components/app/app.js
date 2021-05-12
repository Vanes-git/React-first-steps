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
            ]
        }
        this.deleteItem = this.deleteItem.bind(this);
        this.addItem = this.addItem.bind(this);       
        this.onToggleImportant = this.onToggleImportant.bind(this);
        this.onToggleLiked = this.onToggleLiked.bind(this); 
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

    render() {
        const {data} = this.state;
        const liked = data.filter(item => item.like).length;
        const allPosts = data.length;

        return(
            <div className="app">
                <AppHeader
                    liked={liked}
                    allPosts={allPosts}/>
                <div className="search-panel d-flex">
                    <SearchPanel/>
                    <PostStatusFilter/>
                </div>
                <PostList 
                    posts={this.state.data}
                    onDelete={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleLiked={this.onToggleLiked}/>
                <PostAddForm
                    onAdd={this.addItem}/>
            </div>
        )
    }
}
