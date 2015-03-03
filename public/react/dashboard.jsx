var Header = React.createClass({
    render: function() {
        return (
            <div className="header">
                <h3 classNma="title">
                    203-323-3609
                    {}
                </h3>
            </div>
        );
    }
});
var MessageBody = React.createClass({
    render: function() {
      var createItem = function(messageObject) {
        return (
            <div className="message-wrapper">
                <div className={messageObject.className}>
                {messageObject.message}
                </div>
            </div>
        );
      };
      return <div className="body">{this.props.items.map(createItem)}</div>;
    }
});

var Messages = React.createClass({
    componentDidMount: function(e) {
        this.refs.input.getDOMNode().focus();
    },
    getInitialState: function() {
        return {items: [], message: ''};
    },
    onChange: function(e) {
        this.setState({message: e.target.value});
    },
    handleSubmit: function(e) {
        e.preventDefault();
        var nextItems = this.state.items.concat(
            [{
                message: this.state.message,
                className: "me"
            }]
        );
        this.setState({items: nextItems, message: ''});
    },
    render: function() {
        return (
            <div>
                <Header />
                <MessageBody items={this.state.items} />
                <div className="input">
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" ref="input" autofocus="true" onChange={this.onChange} value={this.state.message} />
                    </form>
                </div>
          </div>
        );
    }
});

React.render(<Messages />, document.getElementsByClassName('messages')[0]);
