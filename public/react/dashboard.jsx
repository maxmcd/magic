$(function() {
    if (document.getElementsByClassName('dashboard').length > 0) {
        window.user = users[0];
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
            scrollDownBody: function(e) {
                var body = this.refs.body.getDOMNode();
                body.scrollTop = body.scrollHeight;
            },
            componentDidMount: function(e) {
                this.scrollDownBody();
            },
            componentWillReceiveProps: function(nextProps) {
                if (this.props.user.id !== nextProps.user.id) {
                    var that = this;
                    window.setTimeout(function() {
                        that.scrollDownBody();
                    }, 0);
                }
            },
            render: function() {
                var createItem = function(messageObject) {
                    var className;
                    if (messageObject.fromUser === true) {
                        className = "you";
                    } else {
                        className = "me";
                    }
                    return (
                        <div className="message-wrapper">
                            <div className={className}>
                                {messageObject.body}
                            </div>
                        </div>
                    );
                };
                return (
                    <div className="body" ref="body">
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
                return {message: ''};
            },
            onChange: function(e) {
                this.setState({message: e.target.value});
            },
            handleSubmit: function(e) {
                e.preventDefault();
                this.props.messageSubmit(this.state.message);
                this.setState({message: ''});
            },
            componentWillReceiveProps: function(nextProps) {
                console.log(nextProps);
                if (nextProps.appendToMessage !== null) {
                    this.state.message += nextProps.appendToMessage;
                    this.setState(this.state);
                    this.props.clearAppendedMessage();
                }
                if (this.props.user.id !== nextProps.user.id) {
                    this.state.message = '';
                    this.setState(this.state);
                }
            },
            render: function() {
                var status = this.props.connectionStatus;

                if (this.props.sendingStatus !== null) {
                    status += " - " + this.props.sendingStatus;                    
                }

                return (
                    <div className="messages">
                        <Header data={this.props.user.phoneNumber}/>
                        <MessageBody 
                            items={this.props.user.messages} 
                            user={this.props.user}
                        />
                        <div className="input">
                            <form onSubmit={this.handleSubmit}>
                                <div className="status">
                                    {status}
                                </div>
                                <input 
                                    type="text" 
                                    ref="input" 
                                    autofocus="true" 
                                    onChange={this.onChange} 
                                    value={this.state.message} />
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
                this.props.updateFunction(this.state.user);
            },
            render: function() {
                var user = this.state.user;
                var classString = "status " + user.status;
                var isActive;
                if (window.user.id === user.id) {
                    isActive = "active" ;                   
                } else {
                    isActive = "";
                }
                var parentClassString = "item " + isActive;
                return (
                    <div className={parentClassString} data-id={user.id} onClick={this.handleClick}>
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
                this.props.userFormSubmit(this.state);
            },
            getInitialState: function() {
                return {
                    name: this.props.user.name,
                    address: this.props.user.address,
                    notes: this.props.user.notes,
                    status: this.props.user.status
                };
            },
            onChange: function(field, evt) {
                this.state[field] = evt.target.value;
                this.setState(this.state);
            },
            componentWillReceiveProps: function(nextProps) {
                this.setState({
                    name: nextProps.user.name || "",
                    address: nextProps.user.address || "",
                    notes: nextProps.user.notes || "",
                    status: nextProps.user.status || ""
                });
            },
            render: function() {
                return (
                    <form onSubmit={this.handleSubmit}>
                        <label>Name</label>
                        <input value={this.state.name} type="text" name="name"
                            onChange={this.onChange.bind(null, "name")}
                         className="u-full-width" />

                        <label>Address</label>
                        <textarea value={this.state.address} type="text" name="address"
                            onChange={this.onChange.bind(null, "address")}
                         className="u-full-width"></textarea>

                        <label>Notes</label>
                        <textarea value={this.state.notes} type="text" name="notes"
                            onChange={this.onChange.bind(null, "notes")}
                         className="u-full-width"></textarea>

                         <label>Status</label>
                         <select value={this.state.status} className="u-full-width" onChange={this.onChange.bind(null, "status")}>
                            <option value="new">New</option>
                            <option value="active">Active</option>
                            <option value="complete">Complete</option>
                         </select>

                        <input type="submit" value="update" />


                    </form>
                );
            }
        });


        var Info = React.createClass({
            ccLinkClick: function(e) {
                e.preventDefault();
                this.props.ccLinkFunction();
            },
            render: function() {
                return (
                    <div className="info">
                        <UserForm 
                            userFormSubmit={this.props.userFormSubmit}
                            user={this.props.user} 
                        />
                        <hr />
                        <form>
                            <label htmlFor="amount">Charge</label>
                            <input type="number" id="amount" className="u-full-width" />
                            <input type="submit" value="charge" />
                            <hr />
                            <button 
                                className="button" 
                                onClick={this.ccLinkClick}
                            >Credit Card Link</button>
                        </form>
                    </div>
                );
            }
        });

        var Dashboard = React.createClass({
            updateMessages: function(clickedUser) {
                window.user = clickedUser;
                this.state.user = clickedUser;
                this.setState(this.state);
            },
            componentDidMount: function() {
                var that = this;
                socket.on("message", function(message) {
                    for (var i=0 ; i < that.state.users.length; i++) {
                        if (message.userId === that.state.users[i].id) {
                            that.state.users[i].messages = that.state.users[i].messages.concat(
                                [message]
                            );
                            that.setState(that.state);                    
                        }
                        if (message.userId == window.user.id && message.fromUser !== true) {
                            that.state.sendingStatus = null;
                            that.setState(that.state);
                        }                        
                    }
                });

                socket.on("connect", function(e) {
                    that.state.connectionStatus = "Connected";
                    that.setState(that.state);
                });
            },
            userFormSubmit: function(formState) {
                this.state.user.name = formState.name;
                this.state.user.address = formState.address;
                this.state.user.notes = formState.notes;
                this.state.user.status = formState.status;

                this.setState(this.state);

                $.post("/users/" + user.id, formState);
                console.log("success");
            },
            getInitialState: function() {
                var title = $('.header .title').text();
                var email = $('.footer .email').text();
                return {
                    title: title, 
                    email: email,
                    users: window.users,
                    user: window.user,
                    connectionStatus: "Connecting...",
                    sendingStatus: null,
                    appendToMessage: null
                };
            },
            ccLinkClick: function() {
                this.state.appendToMessage = 
                    "https://" + window.host + 
                    "/users/" + window.user.phoneNumber + "/cc/";
                this.setState(this.state);
            },
            clearAppendedMessage: function() {
                this.state.appendToMessage = null;
                this.setState(this.state);
            },
            messageSubmit: function(message) {
                this.state.sendingStatus = "Sending message";
                this.setState(this.state);
                sendMessage(message);
            },
            render: function() {
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
                        <Messages 
                            user={this.state.user}
                            messageSubmit={this.messageSubmit}
                            appendToMessage={this.state.appendToMessage}
                            sendingStatus={this.state.sendingStatus}
                            connectionStatus={this.state.connectionStatus}
                            clearAppendedMessage={this.clearAppendedMessage}
                        />
                        <Info 
                            user={this.state.user}
                            userFormSubmit={this.userFormSubmit}
                            ccLinkFunction={this.ccLinkClick}
                        />
                    </div>
                );
            }
        });

        React.render(<Dashboard />, document.getElementsByClassName('dashboard')[0]);
    }
});
