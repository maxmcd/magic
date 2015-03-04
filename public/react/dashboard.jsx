var user = null;

if (document.getElementsByClassName('dashboard').length > 0) {
    var Header = React.createClass({
        render: function() {
            return (
                <div className="header">
                    <h3 classNma="title">
                        {this.props.data}
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
            return (
                <div className="body">
                    {this.props.items.map(createItem)}
                </div>
            );
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
            sendMessage(this.state.message);
        },
        render: function() {
            return (
                <div className="messages">
                    <Header data={this.props.data.title}/>
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



    var SidebarMessage = React.createClass({
        getInitialState: function() {
            return {
                user: this.props.user
            };
        },
        handleClick: function(thing) {
            user = this.state.user;
            this.props.updateFunction({
                title: user.phoneNumber
            });
            console.log(this.props.user);
        },
        render: function() {
            var user = this.state.user;
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
        }
    });

    var SidebarMessageList = React.createClass({
        render: function() {
            var updateFunction = this.props.updateFunction;
            var createItem = function(user) {
                return (
                    <SidebarMessage user={user} key={user.id} updateFunction={updateFunction} />
                );
            };
            return (
                <div className="message-list" onClick={this.handleClick}>
                    {users.map(createItem)}
                </div>
            );
        }
    });

    var UserForm = React.createClass({
        handleSubmit: function(e) {
            e.preventDefault();
            $.post("/users/" + userId, {
                name: this.refs.name.getDOMNode().value,
                address: this.refs.address.getDOMNode().value,
                notes: this.refs.notes.getDOMNode().value
            });
            console.log("success");
        },
        render: function() {
            return (
                <form onSubmit={this.handleSubmit}>
                    <label for="name">Name</label>
                    <input type="text" ref="name" className="u-full-width" />
                    <label for="address">Address</label>
                    <textarea type="text" ref="address" className="u-full-width"></textarea>
                    <label for="notes">Notes</label>
                    <textarea type="text" ref="notes" className="u-full-width"></textarea>
                    <input type="submit" value="update" />
                </form>
            );
        }
    });


    var Info = React.createClass({
        render: function() {
            return (
                <div className="info">
                    <UserForm />
                    <hr />
                    <form>
                        <label for="amount">Charge</label>
                        <input type="number" id="amount" className="u-full-width" />
                        <input type="submit" value="charge" />
                    </form>
                </div>
            );
        }
    });

    var Dashboard = React.createClass({
        updateMessages: function(messageData) {
            var newState = this.state;
            newState.messageData = messageData;
            this.setState(newState);
        },
        getInitialState: function() {
            var title = $('.header .title').text();
            var email = $('.footer .email').text();
            return {
                title: title, 
                message: '',
                email: email,
                messageData: {
                    title: "hi"
                }
            };
        },
        render: function() {
            return (
                <div className="dashboard">
                    <div className="sidebar">
                        <div className="header">
                            <h2 className="title">
                                {this.state.title}
                            </h2>
                            <button className="add">
                            +
                            </button>
                        </div>
                        <SidebarMessageList updateFunction={this.updateMessages} />
                        <div className="footer">
                            <span className="email">
                                {this.state.email}
                            </span>
                            &nbsp;-&nbsp;
                            <a href="/login/quit">Sign out</a>
                        </div>
                    </div>
                    <Messages data={this.state.messageData}/>
                    <Info />
                </div>
            );
        }
    });

    React.render(<Dashboard />, document.getElementsByClassName('dashboard')[0]);
}