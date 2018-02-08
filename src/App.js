import React, {Component} from 'react';
import './App.css';
import axios from 'axios'

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            queryNumber: -1,
            isShowResult: false,
            text: ''
        };

        this.handleNumberChange = this.handleNumberChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleQuery = this.handleQuery.bind(this);
        this.handleNew = this.handleNew.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    handleNumberChange(event) {
        this.setState({queryNumber: event.target.value});
    }

    handleTextChange(event) {
        this.setState({text: event.target.value});
    }

    handleQuery(event) {
        if(this.state.queryNumber<=0){
            alert('查询码不正确！');
            return
        }
        let data = {
            params: {
                id: this.state.queryNumber
            }
        };
        axios.get('https://wycode.cn/web/api/public/clipboard/query',data)
            .then((response) =>{
                if(response.status!==200||response.data.data==null){
                    throw '查询码不正确！'
                }
                this.setState({
                    isShowResult: true,
                    queryNumber: response.data.data.id,
                    text: response.data.data.content
                })
            })
            .catch((error) => alert(error));
    }

    handleNew(event) {
        axios.post('https:/wycode.cn/web/api/public/clipboard/create')
            .then((response) => this.setState({
                isShowResult: true,
                queryNumber: response.data.data.id,
                text: response.data.data.content
            }))
            .catch((error) => alert(error));
    }

    handleSave(event) {
        let data = new FormData();
        data.append('id',this.state.queryNumber);
        data.append('content',this.state.text);
        axios.post('https://wycode.cn/web/api/public/clipboard/save',data)
            .then((response) => this.setState({
                isShowResult: false,
                queryNumber: response.data.data.id,
                text: response.data.data.content
            }))
            .catch((error) => alert(error));
    }

    render() {
        return (
            <div>
                <Header/>
                <div className="Clipboard container">
                    <input placeholder="查询码"
                           type="number"
                           className="input-query-number form-control form-group"
                           value={this.state.queryNumber > 0 ? this.state.queryNumber : ''}
                           disabled={this.state.isShowResult}
                           onChange={this.handleNumberChange}/>
                    {this.state.isShowResult ? null : <button onClick={this.handleQuery}
                                                              className="btn-query btn btn-primary form-control form-group">查询</button>}

                    {this.state.isShowResult ? null :
                        <button onClick={this.handleNew}
                                className="btn-new btn btn-primary form-control form-group">新建</button>}

                    {this.state.isShowResult ? <textarea onChange={this.handleTextChange} value={this.state.text}
                                                         className="textarea-text form-control form-group"/> : null}

                    {this.state.isShowResult ? <button onClick={this.handleSave}
                                                       className="btn-save btn btn-success form-control  form-group">保存</button> : null}
                </div>
            </div>
        );
    }

}

function Header() {
    return (<nav className="navbar navbar-dark navbar-expand-lg" style={{background: "#c5b100"}}>
            <div className="container" style={{color: "white"}}>
                <div className="brand">
                    <img src="https://wycode.cn/img/logo_48.png" width="32" height="32" alt="wycode.cn"/> 剪切板
                </div>
                <a className="margin-auto" href="https://wycode.cn">wycode.cn</a>
            </div>
        </nav>
    );
}

export default App;
