import React, {Component} from 'react';
import {Table, Row, Col, Button, Modal, Form, Input, InputNumber, message, Typography, Space} from 'antd';

class List extends Component {

    constructor(props) {
      super(props);
      this.formRef = React.createRef();
      this.state = {
        modalVisible: false,
        editingBook: null,
        books: props.books
      }
    }

    handleOk = () => {
      let $form = this.formRef.current;
      $form.validateFields().then(values => {
        var { editingBook } = this.state;

        if(editingBook){
          this.props.editBook({id: editingBook.id, ...values});
          message.success('Book updated.');
        } else {
          this.props.saveBook(values);
          message.success('New book added.');
        }

        this.formRef.current.resetFields();
        this.setState({modalVisible: false});
      })
      .catch(e => {
        message.error('Please enter valid data and try again.')
      })
    }

    handleCancel = () => {
      this.setState({modalVisible: false, editingBook: null})
    }

    editBook = (id) => {
      this.setState({modalVisible: true, editingBook: this.props.books.filter(book => book.id === id)[0]});
    }

    onSearch = (key) => {
      var books = this.props.books;
      var filteredBooks = books;

      if(key && key.length > 0) {
        key = key.toLowerCase();
        filteredBooks = books.filter(book => {
          return book.title.toLowerCase().includes(key) || book.author.toLowerCase().includes(key)
        })
      }

      this.setState({books: filteredBooks});
    }

    render = () => {

        const {modalVisible, editingBook, books} = this.state;

        const columns = [
            {
              title: 'Title',
              dataIndex: 'title',
              key: 'title',
            },
            {
              title: 'Description',
              dataIndex: 'description',
              key: 'description',
            },
            {
              title: 'Count',
              dataIndex: 'count',
              key: 'count',
            },
            {
              title: 'Author',
              dataIndex: 'author',
              key: 'author',
            },
            {
              title: 'Action',
              dataIndex: 'id',
              key: 'id',
              render: id => <Button onClick={() => this.editBook(id)} >Edit</Button>
            }
        ];

        var initialValues = {}
        if (editingBook) {
          initialValues = editingBook;
        }
        return (
              <>
                <Row gutter={[16,16]}>
                  <Col xs={24}>
                    <Typography.Title>Groupon Online Library</Typography.Title>
                  </Col>
                </Row>
                <Row gutter={[16,16]}>
                  <Col span={6} offset={18} style={btnStyles}>
                    <Space>
                      <Input.Search onSearch={this.onSearch} allowClear/>
                      <Button type="primary" onClick={() => this.setState({modalVisible: true})}>Add</Button>
                    </Space>
                  </Col>
                  <Col xs={24} style={tableWrapperStyle}>
                    <Table dataSource={books} columns={columns} rowKey={"id"}/>
                  </Col>
                </Row>

                <Modal title={editingBook ? `Edit ${editingBook.title}`  : "Add Book"} visible={modalVisible} 
                onOk={this.handleOk} 
                onCancel={() => {this.setState({modalVisible: false})}}
                afterClose={() => {
                  this.setState({editingBook: null})
                }}
                destroyOnClose
                okText={editingBook ? "Update"  : "Save"}
                >
                  <Form ref={this.formRef}
                    name="book-form"
                    initialValues={initialValues}
                    onFinish={this.onFinish}
                    layout="vertical"
                  >
                    <Form.Item
                      label="Title"
                      name="title"
                      rules={[{ required: true, message: 'Please enter book\'s title!' }]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      label="Description"
                      name="description"
                      rules={[{ required: true, message: 'Please enter book\'s description!' }]}
                    >
                      <Input.TextArea />
                    </Form.Item>

                    <Form.Item
                      label="Author"
                      name="author"
                      rules={[{ required: true, message: 'Please enter book\'s author!' }]}
                    >
                      <Input.TextArea />
                    </Form.Item>

                    <Form.Item
                      label="Count"
                      name="count"
                      rules={[{ required: true, message: 'Please enter book\'s count!' }]}
                    >
                      <InputNumber />
                    </Form.Item>

                  </Form>
                </Modal>
              </>
        )
    }
}

export default List;

const btnStyles = {
  display: "flex",
  justifyContent: "flex-end"
}

const tableWrapperStyle = {
  minHeight: "80vh"
}