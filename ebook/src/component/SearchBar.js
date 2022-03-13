import {Input, Space} from 'antd';
import React from 'react';
import '../css/SearchBar.css'


const {Search} = Input;

class SearchBar extends React.Component {
    onSearch = value => {
        this.props.onFilterTextChanged(value);
    };

    render() {
        const filterText = this.props.filterText;
        return (
            <div className="searchbar">
                <Search
                    style={{width: '100%'}}
                    placeholder="input search text"
                    onSearch={this.onSearch}
                    enterButton
                />
            </div>
        )
    }
}

export default SearchBar;