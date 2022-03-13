import React from 'react'
import {Select} from 'antd';

const {Option} = Select;

function handleChange(value) {
    console.log(`selected ${value}`);
}

class TimeSelect extends React.Component {
    render() {
        return (
            <Select defaultValue="All" style={{width: 120}} onChange={handleChange}>
                <Option value="All">All</Option>
                <Option value="Last Week">Last Week</Option>
                <Option value="Last Month">Last Month</Option>
                <Option value="Last Three Months">Last Three Months</Option>
                <Option value="Last Half Year">Last Half Year</Option>
                <Option value="Last Year">Last Year</Option>
            </Select>
        )
    }
}

export default TimeSelect;