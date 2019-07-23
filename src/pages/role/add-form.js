import React,{PureComponent} from 'react'
import {Form,Input} from 'antd'
import PropTypes from 'prop-types'



 class AddForm extends PureComponent{
     static propTypes={
        setForm:PropTypes.func.isRequired
     }

     componentWillMount() {
        this.props.setForm(this.props.form)
      }




    render(){
        const {getFieldDecorator}=this.props.form
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 16 }
          }
        return(
            <Form>
                    <Form.Item label="角色名称" {...formItemLayout}>
                        {
                            getFieldDecorator('roleName', {
                                initialValue: '',
                                rules: [
                                    {required: true, message: '必须输入角色名称'}
                                ]
                            })(
                            <Input type="text" placeholder="请输入角色名称" />
                            )
                        }
                    </Form.Item>
        </Form>
        )
    }
}


export default AddForm=Form.create()(AddForm)