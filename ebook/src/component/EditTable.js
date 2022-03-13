import React from 'react'
import EditableTable from '../component/EditableTable'
import { getBooks, addBook, deleteBook, updateBook } from '../services/bookService'
import {message} from 'antd'
class EditTable extends React.Component {
    state = {
        data: []
    }

    handleDelete = (key) => {
        const callback = (data) => {
            console.log(data);
            if (data) {
                this.setState({ data: this.state.data.filter(item => item.bookId != key) });
            } else {
                alert("Delete Book Failed!");
            }
        }
        deleteBook(key, callback);
    }

    handleAdd = (formData) => {
        const tmp =
        {
            //key: formData.ISBN,
            bookId: formData.ISBN,
            isbn: formData.ISBN,
            name: formData.name,
            type: formData.type,
            author: formData.author,
            price: formData.price,
            image: formData.image,
            inventory: formData.stock,
            description: formData.description,
        }
        const callback = (data) => {
            console.log(data);
            
            if (data) {
                tmp.key = formData.ISBN;
                this.setState({data: [...this.state.data, tmp]});
            } else {
                alert("Add Book Failed!");
            }
        }
        addBook(tmp, callback);
    }

    handleChangeData = (data, key) => {
        const callback = (msg) => {
            if (msg.status >= 0) {
                this.setState({data: data});
                message.success(msg.msg);
            } else {
                message.error(msg.msg);
            }
        }
        var tmp;
        data.forEach(element => {
            if (element.key == key)
                tmp = element;
        });
        updateBook(tmp, callback);
    }

    componentDidMount() {
        const callback = (data) => {
            console.log(data);
            this.setState({ data: data });
        }
        getBooks({ "search": null }, callback);
    }
    render() {
        let i = 1;
        this.state.data.forEach(item => {
            item.key = i;
            i = i + 1;
        })
        return (
            <EditableTable
                data={this.state.data}
                handleDelete={this.handleDelete}
                handleAdd={this.handleAdd}
                handleChangeData={this.handleChangeData}
            />
        )
    }
}

export default EditTable;