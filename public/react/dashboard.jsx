$(function() {
    var user = null;

    if (document.getElementsByClassName('dashboard').length > 0) {
        var Header = React.createClass({
            render: function() {
                return (
                    <div className="header">
                        <h3 className="title">
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
                var that = this;
                socket.on("message", function(message) {
                    if (message.userId === user.id) {
                        var className;
                        if (message.fromUser === true) {
                            className = "you";
                        } else {
                            className = "me";
                        }
                        var nextItems = that.state.items.concat(
                            [{
                                message: message.body,
                                className: className
                            }]
                        );
                        that.setState({items: nextItems, message: that.state.items.message});                    
                    }
                });
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
                sendMessage(this.state.message);
                this.setState({items: nextItems, message: ''});
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
                    title: user.phoneNumber,
                    user: user
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
                    joinUser(user);
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
                $.post("/users/" + user.id, {
                    name: this.refs.name.getDOMNode().value,
                    address: this.refs.address.getDOMNode().value,
                    notes: this.refs.notes.getDOMNode().value
                });
                console.log("success");
            },
            render: function() {
                var name, address, notes;
                if (this.props.user !== null) {
                    name = this.props.user.name;
                    address = this.props.user.address;
                    notes = this.props.user.notes;
                }
                return (
                    <form onSubmit={this.handleSubmit}>
                        <label htmlFor="name">Name</label>
                        <input value={name} type="text" name="name" ref="name" className="u-full-width" />
                        <label htmlFor="address">Address</label>
                        <textarea value={address} type="text" name="address" ref="address" className="u-full-width"></textarea>
                        <label htmlFor="notes">Notes</label>
                        <textarea value={notes} type="text" name="notes" ref="notes" className="u-full-width"></textarea>
                        <input type="submit" value="update" />
                    </form>
                );
            }
        });


        var Info = React.createClass({
            render: function() {
                return (
                    <div className="info">
                        <UserForm user={this.props.user} />
                        <hr />
                        <form>
                            <label htmlFor="amount">Charge</label>
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
                        title: "hi",
                        user: user
                    }
                };
            },
            render: function() {
                console.log(this.state);

                var footer;
                if (magician.isAdmin) {
                    footer = (
                        <span>
                            &nbsp;-&nbsp;
                            <a href="/admin">Admin</a>
                        </span>
                    );
                }
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
                                {footer}
                            </div>
                        </div>
                        <Messages data={this.state.messageData}/>
                        <Info user={this.state.messageData.user}/>
                    </div>
                );
            }
        });

        React.render(<Dashboard />, document.getElementsByClassName('dashboard')[0]);
    }
});
