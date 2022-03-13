import React from 'react'
import {Modal, Button} from 'antd';
import {Form, Input, Select, Space} from 'antd';

const {Option} = Select;
const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
};
const tailLayout = {
    wrapperCol: {offset: 8, span: 16},
};

class AddBook extends React.Component {
    state = {
        visible: false,
        confirmLoading: false,
        modalText: 'content of modal text'
    }
    formRef = React.createRef();
    userFormRef = React.createRef()
    onFinish = (values) => {
        console.log(values);
        this.setState(
            {visible: false}
        );
        this.props.changeData(values);
    };

    onReset = () => {
        this.formRef.current.resetFields();
    };

    showModal = () => {
        console.log('show modal triggered');

        this.setState(
            {visible: true}
        );
    }

    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState(
            {visible: false}
        );
    }

    render() {
        return (
            <div>
                <Button type="primary" onClick={() => this.showModal()}>
                    Add New Book
                </Button>
                <Modal
                    title="Add New Book"
                    visible={this.state.visible}
                    onOk={() => this.onFinish()}
                    confirmLoading={this.state.confirmLoading}
                    onCancel={() => this.handleCancel()}
                    footer={
                        null
                    }
                >
                    <Form {...layout} ref={this.formRef} name="control-ref" onFinish={this.onFinish}>
                        <Form.Item name="ISBN" label="ISBN" rules={[{required: true}]}>
                            <Input/>
                        </Form.Item>
                        <Form.Item name="name" label="Name" rules={[{required: true}]}>
                            <Input/>
                        </Form.Item>
                        <Form.Item name="image" label="Image" type="url" rules={[{required: true, type: 'url'}]}>
                            <Input/>
                        </Form.Item>
                        <Form.Item name="author" label="Author" rules={[{required: true}]}>
                            <Input/>
                        </Form.Item>
                        <Form.Item name="price" label="Price" rules={[{required: true,}]}>
                            <Input/>
                        </Form.Item>
                        <Form.Item name="stock" label="Stock" rules={[{required: true,}]}>
                            <Input type="number"/>
                        </Form.Item>
                        <Form.Item name="type" label="Type" rules={[{required: true}]}>
                            <Select
                                placeholder="Select a option"
                                onChange={this.onCategoryChange}
                                allowClear
                            >
                                <Option value="Code">Code</Option>
                                <Option value="Education">Education</Option>
                                <Option value="Literature">Literature</Option>
                                <Option value="Science">Science</Option>
                                <Option value="Other">Other</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item name="description" label="Description" rules={[{required: true}]}>
                            <Input.TextArea/>
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <Space>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                                <Button htmlType="button" onClick={this.onReset}>
                                    Reset
                                </Button>
                                <Button type="primary" htmlType="button" onClick={this.handleCancel}>
                                    Cancel
                                </Button>
                            </Space>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}

export default AddBook;