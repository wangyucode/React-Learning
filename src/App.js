import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

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
        this.setState({isShowResult: true});
    }

    handleNew(event) {
        this.setState({isShowResult: true});
    }

    handleSave(event) {
        this.setState({isShowResult: false});
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <div className="Clipboard">
                    <input placeholder="查询码" type="number"
                           value={this.state.queryNumber > 0 ? this.state.queryNumber : ''}
                           disabled={this.state.isShowResult}
                           onChange={this.handleNumberChange}/>
                    <br/>
                    {this.state.isShowResult ? null :
                        <div>
                            <button onClick={this.handleQuery}>查询</button>
                            <br/>
                        </div>
                    }

                    {this.state.isShowResult ? null :
                        <div>
                            <button onClick={this.handleNew}>新建</button>
                            <br/>
                        </div>
                    }
                    {this.state.isShowResult ?
                        <div>
                            <textarea onChange={this.handleTextChange} value={this.state.text}/>
                            <br/>
                        </div>
                        : null
                    }
                    {this.state.isShowResult ? <button onClick={this.handleSave}>保存</button> : null}
                </div>
            </div>
        );
    }
}

export default App;
