import React, { Component } from 'react'
import {
  Card,
  Select,
  Input,
  Button,
  Icon,
  Table,
  message
} from 'antd'
import throttle  from 'lodash.throttle'

import memoryUtil from '../../utils/memoryUtil'
import {PAGE_SIZE} from '../../utils/canstants'
import { reqProducts, reqSearchProducts,reqUpdateStatus } from '../../aip'
import LinkButton from '../../components/link-button'

const Option = Select.Option
/* 
商品管理的首页组件
*/
export default class ProductHome extends Component {
  
  state = {
    loading: false,//是否加载
    products: [], // 商品列表
    total: 0, // 商品的总数量
    searchType:'productName',//默认按名字搜索
    searchName:'',//搜索关键字
  }

  updateStatus=throttle(async(productId,status)=>{
    // 计算更新后的值
   status=status===1?2:1
    // 请求更新
   const result=await reqUpdateStatus(productId,status)
   if(result.status===0){
   message.success('商品状态更新成功')

     // 获取当前页显示
    this.getProducts(this.pageNum) 

   }
    
    
 },1000)

  initColumns = () => {
    this.columns = [
      {
        title: '商品名称',
        dataIndex: 'name'
      },
      {
        title: '商品描述',
        dataIndex: 'desc'
      },
      {
        title: '价格',
        dataIndex: 'price',
        render: (price) => '¥' + price
      },
      {
        title: '状态',
        width: 100,
        // dataIndex: 'status',
        render: ({_id,status}) => {
          let btnText = '下架'
          let text = '在售'
          if (status === 2) {
            btnText = '上架'
            text = '已下架'
          }
          return (
            <span>
              <button onClick={()=>{this.updateStatus(_id,status)}}>{btnText}</button><br />
              <span>{text}</span>
            </span>
          )
        }
      },
      {
        title: '操作',
        render: (product) => (
          <span>
            <LinkButton 
            onClick={()=>{
               // 在内存中保存product
               memoryUtil.product = product 
              this.props.history.push('/product/detail')
            }}
            >详情
            </LinkButton>
            <LinkButton
              onClick={() => {
                // 在内存中保存product
                memoryUtil.product = product
                this.props.history.push('/product/addupdate')
              }}
            >修改</LinkButton>
          </span>
        )
      },
    ]
  }

  /* 
 异步获取指定页码商品分页(可能带搜索)列表显示
  */
  getProducts = async (pageNum) => {
        // 保存当前请求的页码
    this.pageNum=pageNum
    let {searchName,searchType}=this.state
    let result
    if(!this.isSearch){
      // 发请求获取数据
       result = await reqProducts(pageNum,PAGE_SIZE)
    }else{
      // 发起搜索
        result= await reqSearchProducts( {pageNum, pageSize:PAGE_SIZE,searchName,searchType})
    }
    
    if (result.status === 0) {
      // 取出数据
      const { total, list } = result.data
      // 更新状态
      this.setState({
        products: list,
        total
      })
    }
  }

  componentWillMount() {
    this.initColumns()
  }

  componentDidMount() {

    // 获取第一页显示
    this.getProducts(1)
  }

  
  
  
  render() {

    const { loading, products, total,  searchType,searchName  } = this.state

    const title = (
      <span>
        <Select 
        style={{ width: 200 }} 
        value={ searchType }
        onChange={(value)=>this.setState({searchType:value})}
        >
          <Option value='productName'>按名称搜索</Option>
          <Option value='productDesc'>按描述搜索</Option>
        </Select>
        <Input 
        style={{ width: 200, margin: '0 10px' }} 
        placeholder="关键字" 
        value={searchName}
        onChange={(event)=>this.setState({searchName:event.target.value})}
        />
        <Button type="primary" onClick={()=>
          { this.isSearch=true
            this.getProducts(1)
          }
        }
          >搜索</Button>
      </span>
    )
    const extra = (
      <Button type="primary" onClick={()=>{
        memoryUtil.product={}
        this.props.history.push('/product/addupdate')
      }}>
        <Icon type="plus" />
        添加商品
      </Button>
    )
    return (
      <Card title={title} extra={extra}>
        <Table
          bordered={true}
          rowKey="_id"
          loading={loading}
          columns={this.columns}
          dataSource={products}
          pagination={{
            total,
            defaultPageSize: 2,
            showQuickJumper: true,
            onChange: this.getProducts
          }}
        />
      </Card>
    )
  }
}
