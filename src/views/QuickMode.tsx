import * as React from 'react';
import { Button, Cascader, Input, List, message, Select, Switch, Tag, Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons/lib';
import { getCurrentTabHTML } from '../utils';
import { extract } from '../extractor';
import { IExtractResult } from '../extractor/extractor';
import { platform } from '../platform';

interface IFormItem {
  key: string;
  label: string;
  type: 'cascader' | 'input' | 'select' | 'switch' | 'tags';
  eventHandle?: (value: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => any;
  options?: any[]
}

interface IState {
  platform: string;
  title: string;
  author: string;
  datetime: string;
  content: string;
  category: string;
  tags: string[];
  style: boolean;
  extractResult?: IExtractResult;
}

export class QuickMode extends React.Component<{}, IState> {
  state: IState = {
    platform: '',
    title: '',
    author: '',
    datetime: '',
    content: '',
    category: '',
    tags: [],
    style: true,
  };

  componentDidMount() {
    getCurrentTabHTML().then(result => {
      extract(result.url, result.html).then(extractResult => {
        this.setState({
          title: extractResult.title,
          author: extractResult.author,
          datetime: extractResult.datetime,
          content: extractResult.content,
          extractResult,
        });
      });

      // const targetPlatform = platform['evernote'];
      // const adapter = new targetPlatform.adapter({});
      // adapter.publish(extractResult);
    });
  }

  getItemsByPlatform(): IFormItem[] {
    return [
      {
        key: 'platform',
        label: '转发平台',
        type: 'select',
      },
      {
        key: 'title',
        label: '标题',
        type: 'input',
      },
      {
        key: 'category',
        label: '目录',
        type: 'cascader'
      },
      {
        key: 'tag',
        label: '标签',
        type: 'tags'
      },
      {
        key: 'style',
        label: '保留样式',
        type: 'switch',
      }
    ];
  }

  generateInput(item: IFormItem) {
    switch (item.type) {
      case 'switch':
        return (
          <Switch checked={this.state[item.key]}/>

        );
      case 'select':
        const { Option } = Select;
        return (
          <Select
            onSelect={value => item.eventHandle(value)}
            value={this.state[item.key]}
            bordered={false}
          >
            {item.options?.map(option => (
              <Option key={option.key} value={option.key}>{option.label}</Option>
            ))}
          </Select>
        );
      case 'tags':
        return this.state.tags.map(tag => (
          <Tag key={tag}>{tag}</Tag>
        ));
      case 'cascader':
        return (
          <Cascader options={item.options} bordered={false}/>
        );
      case 'input':
        return (
          <Input
            value={this.state[item.key]}
            style={{ border: 'none', textAlign: 'right' }}
            onChange={value => item.eventHandle(value)}
            suffix={
              <Tooltip title={this.state[item.key]}>
                <InfoCircleOutlined style={{ color: 'rgba(0, 0, 0, .45' }}/>
              </Tooltip>
            }
          />
        );
      default:
        return (
          <div>Empty</div>
        );
    }
  }

  render() {
    return (
      <div className="quick-mode-form">
        <div className="logo">
          Logo Here
        </div>
        <List
          className="quick-mode-form-items"
          dataSource={this.getItemsByPlatform()}
          renderItem={item => (
            <List.Item key={item.key} style={{ justifyContent: 'space-between' }}>
              <List.Item.Meta
                title={item.label}
                style={{ width: '80px', maxWidth: '80px' }}
              />
              <div style={{ minWidth: '250px', display: 'flex', justifyContent: 'flex-end' }}>
                {this.generateInput(item)}
              </div>
            </List.Item>
          )}
        />
        <div>
          <Button size="large" type="primary" block onClick={() => void 0}>
            一键转载
          </Button>
          <Button size="large" block>
            高级模式
          </Button>
        </div>
      </div>
    );
  }
}