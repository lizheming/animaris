import {PureComponent} from 'react';
import {
  Tabs,
  Input
} from 'antd';

const {TabPane} = Tabs;
export default class extends PureComponent {
  constructor(props) {
    super(props);
    this.newTabIndex = 0;
    this.state = this.initialState();
  }

  initialState() {
    return {
      activeKey: this.panes[0].key
    };
  }

  get activeKey() {
    return this.state.activeKey;
  }

  set activeKey(key) {
    this.setState({activeKey: key});
  }

  get panes() {
    return Array.from(this.props.panes, v => {
      v.key = '' + v.key;
      return v;
    });
  }

  set panes(data) {
    this.props.onChange(data);
  }

  onEdit(targetKey, action) {
    this[action](targetKey);
  }

  add() {
    const activeKey = 1;
    const panes = this.panes.map(pane => {
      pane.key += 1;
      return pane;
    });
    panes.unshift({
      name: 'New Response',
      content: '',
      key: activeKey
    });

    this.activeKey = activeKey;
    this.panes = panes;
  }

  remove(targetKey) {
    const panes = this.panes;
    let activeKey = this.state.activeKey;
    let lastIndex;
    panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = panes.filter(pane => pane.key !== targetKey);
    if (lastIndex >= 0 && activeKey === targetKey) {
      activeKey = newPanes[lastIndex].key;
    }
    this.activeKey = activeKey;
    this.panes = newPanes;
  }

  updateData(key, col, val) {
    const panes = this.panes;
    const targetIndex = panes.findIndex(item => key === item.key);
    if(targetIndex === -1) { return; }

    const target = panes[targetIndex];
    target[col] = val;
    this.panes = panes;
  }
  
  renderContent(pane) {
    return (
      <>
        <p>
          <label>响应标签：</label>
          <Input value={pane.name} onChange={e => this.updateData(pane.key, 'name', e.target.value)} />
        </p>
        <p>
          <label>响应内容：</label>
          <Input.TextArea 
            value={pane.content} 
            style={{minHeight: '600px'}}
            onChange={e => this.updateData(pane.key, 'content', e.target.value)} 
          />
        </p>
      </>
    )
  }

  render() {
    const panes = this.panes.map(pane =>
      <TabPane
        tab={pane.name}
        key={pane.key}
        closeable={pane.closable}
      >{this.renderContent(pane)}</TabPane>
    );

    return (
      <div className="api-resp">
        <label>接口响应：</label>
        <Tabs
          onChange={key => { this.activeKey = key }}
          activeKey={this.activeKey}
          type="editable-card"
          onEdit={this.onEdit.bind(this)}
        >
          {panes}
        </Tabs>
      </div>
    );
  }
}
