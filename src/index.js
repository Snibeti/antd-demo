import React, {useState} from "react";
import ReactDOM from "react-dom";
import { 
  Form,
  Input,
  Button,
  Radio,
  Select,
  DatePicker,
  InputNumber,
  Upload,
  Switch,
  PageHeader, 
  Steps,
  Typography,
  Carousel,
  message,
  Checkbox } from "antd";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import "antd/dist/antd.css";
import "./index.css";

const routes = [
  {
    path: 'index',
    breadcrumbName: 'Home',
  },
  {
    path: 'first',
    breadcrumbName: 'Census 2020',
  },
  {
    path: 'second',
    breadcrumbName: 'Record Your Existence',
  },
];

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

function onChange(e) {
  console.log(`checked = ${e.target.checked}`);
}

const { Step } = Steps;

const { Title } = Typography;


class App extends React.Component {

  state = {
    value: 1,
  };

  state = {
    loading: false,
  };

  onChange = e => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    });
  };

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
  };

  render (){

    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px'};

    const { value } = this.state;

    const uploadButton = (
      <div>
        {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { imageUrl } = this.state;

    return[

    <Carousel autoplay>
    <div>
      <img src="https://source.unsplash.com/random/2000x605"></img>
    </div>
    <div>
    <img src="https://source.unsplash.com/random/2000x600"></img>
    </div>
    <div>
    <img src="https://source.unsplash.com/random/2000x601"></img>
    </div>
    <div>
    <img src="https://source.unsplash.com/random/2000x603"></img>
    </div>
  </Carousel>,

  <PageHeader
    className="site-page-header"
    title="2020 U.S. Census"
    breadcrumb={{ routes }}
    subTitle="...if it were extra nosy"
    style = {{ marginBottom: 10}}
  />,

  <div>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 10 }}
        layout="horizontal"
      >
        <Form.Item label="">
        <Title style = {{ fontSize: 16, marginLeft: 110}} level={4}>Household Questions</Title>
        </Form.Item>

        <Form.Item label="First Name">
          <Input />
        </Form.Item>
        <Form.Item label="Last Name">
          <Input />
        </Form.Item>
        <Form.Item label="State">
          <Select>
            <Select.Option value="demo">Alabama</Select.Option>
            <Select.Option value="demo">Alaska</Select.Option>
            <Select.Option value="demo">Arizona</Select.Option>
            <Select.Option value="demo">Arkansas</Select.Option>
            <Select.Option value="demo">California</Select.Option>
            <Select.Option value="demo">Colorado</Select.Option>
            <Select.Option value="demo">Connecticut</Select.Option>
            <Select.Option value="demo">Delaware</Select.Option>
            <Select.Option value="demo">Florida</Select.Option>
            <Select.Option value="demo">Georgia</Select.Option>
            <Select.Option value="demo">I'm tired.. you get it.</Select.Option>
            
          </Select>
        </Form.Item>
        <Form.Item label="Other" >
          <Checkbox onChange={onChange}>This checklist format actually doesn't make sense...</Checkbox>
          <br></br>
          <Checkbox onChange={onChange}>I'm a Sovereign Citizen, baby</Checkbox>
          <br></br>
          <Checkbox onChange={onChange}>I actually don't live in the U.S. but there's no back button lol</Checkbox>
        </Form.Item>
        <Form.Item label="Date of Birth">
          <DatePicker />
        </Form.Item>
        <Form.Item label="Children in Household">
          <InputNumber />
        </Form.Item>
        <Form.Item label="Do you have pets?">
          <Switch />
        </Form.Item>
        <Form.Item label="Upload your Face">
        <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        beforeUpload={beforeUpload}
        onChange={this.handleChange}>
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
        </Upload>
        </Form.Item>
        <Form.Item label="Ethnic Origin">

        <Radio.Group 
  
    onChange={this.onChange} 
    radioCol={{ span: 4 }}
    value={value}>
  <Radio style={radioStyle} value={1}>
      American Indian or Alaska Native
  </Radio>
  <Radio style={radioStyle} value={2}>
      Asian of Pacific Islander
  </Radio>
  <Radio style={radioStyle} value={3}>
      Black or African American
  </Radio>
  <Radio style={radioStyle} value={4}>
      Native Hawaiian or Other Pacific Islander
  </Radio>
  <Radio style={radioStyle} value={5}>
      White
  </Radio>
  <Radio style={radioStyle} value={6}>
      Somethin' else maybe
  </Radio>
  <Radio style={radioStyle} value={7}>
    More...
    {value === 4 ? <Input style={{ width: 100, marginLeft: 10 }} /> : null}
  </Radio>
      
      </Radio.Group>

        </Form.Item>
      </Form>
    </div>,

  <Steps style= {{ margin: 30, marginBottom: 30, display: "flex", maxWidth: 1000, justifyContent: "center" }} direction="horizontal" current={1}>
    <Step style= {{display: "flex", justifyContent: "center"}} title="Finished" description="Address Verification" />
    <Step style= {{display: "flex", justifyContent: "center"}}  title="In Progress" description="Household Questions" />
    <Step style= {{display: "flex", justifyContent: "center"}}  title="Waiting" description="People Questions" />
    <Step style= {{display: "flex", justifyContent: "center"}} title="Waiting" description="Optional Questions" />
    <Step style= {{display: "flex", justifyContent: "center"}} title="Waiting" description="Final Questions" />
  </Steps>

    ];
  }

}

ReactDOM.render(<App />, document.getElementById('root'));