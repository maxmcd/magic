$(function() {
    if (document.getElementsByClassName('dashboard').length > 0) {
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
    }


    var Users = React.createClass({
        handleClick: function(thing) {
            console.log(thing);
        },
        render: function() {
          var createItem = function(user) {
            var classString = "status " + user.status;

            return (
                <div className="item" data-id={user.id} onClick={this.handleClick}>
                    <h4> {user.phoneNumber}
                        <span className={classString}>
                        {user.status}
                        </span>
                    </h4>
                    <p>
                        These are some words
                    </p>
                </div>
            );
          };
          return <div>{users.map(createItem)}</div>;
        }
    });
    React.render(<Users />, document.getElementsByClassName('message-list')[0]);    
});
