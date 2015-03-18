$(function() {
    if ($('.container.admin').length > 0) {

        var TableRow = React.createClass({
            handleRowClick: function() {
                this.props.openItemEditorFunc(this.props.row);
            },
            render: function() {
                var createData = function(value, index) {
                    return (
                        <td key={index}>{value}</ td>
                    );
                };
                var row = this.props.row;
                var values = [];
                for (var item in row) {
                    if (typeof row[item] == "boolean") {
                        values.push(JSON.stringify(row[item]));
                    } else {
                        values.push(row[item]);
                    }
                }
                return (
                    <tr onClick={this.handleRowClick}>
                        {values.map(createData)}
                    </tr>
                );
            }
        });
        var Table = React.createClass({
            getInitialState: function () {
                return {
                };
            },
            render: function() {
                var createHeader = function(name) {
                    return (
                        <th key={name}>{name}</th>
                    );
                };
                var openItemEditorFunc = this.props.openItemEditorFunc;
                var createRow = function(row) {
                    return (
                        <TableRow 
                            row={row} 
                            openItemEditorFunc={openItemEditorFunc}
                            key={row.id}
                        />
                    );
                };
                var firstRow = this.props.tableData.data.rows[0];
                var headers = [];
                for (var header in firstRow) {
                    headers.push(header);
                }
                return (
                    <table>
                        <tr>
                            {headers.map(createHeader)}
                        </tr>
                        <tbody>
                            {this.props.tableData.data.rows.map(createRow)}
                        </tbody>
                    </table>
                );
            }
        });


        var ItemEditorInput = React.createClass({
            getInitialState: function() {
                return {
                    key: this.props.value,
                    data: this.props.data
                };
            },
            handleChange: function(e) {
                this.state.data[this.state.key] = e.target.value;
                this.setState(this.state);
            },
            render: function() {
                var key = this.state.key;
                var data = this.state.data;
                if (typeof data[key] == "boolean") {
                    return (
                        <label>
                            <input type="checkbox" onChange={this.handleChange} checked={data[key]}/>
                            <span class="label-body"> {key}</span>
                        </label>
                    );
                } else {
                    return (
                        <div>
                            <label htmlFor={key}>{key}</label>
                            <input name={key} className="u-full-width" type="text" onChange={this.handleChange} value={data[key]} />
                        </div>
                    );
                }
            }
        });
        var ItemEditor = React.createClass({
            handleSubmit: function(e) {
                var updateFunction = this.props.updateFunction;
                e.preventDefault();
                var form = $(e.target);
                $.ajax({
                    type: "POST",
                    url: form.attr('action'),
                    data: form.serialize(),
                    success: function(data){
                        updateFunction(data);
                    }
                });
            },
            render: function() {
                var data = this.props.data;
                var generateFormItem = function(key, index) {
                    if (key == "createdAt" || key == "updatedAt") {                    
                        return;
                    }
                    return (
                        <div className="row" key={key}>
                            <ItemEditorInput data={data} value={key}/>
                        </div>
                    );
                };
                var thisClass = "editor";
                if (this.props.open !== true) {
                    thisClass += " hidden";
                }
                return (
                    <div className={thisClass}>
                        <h5>Edit this {this.props.current}</h5>
                        <form 
                            method="POST" 
                            action={"/admin/" + this.props.current + "/" + this.props.data.id} 
                            onSubmit={this.handleSubmit}>
                            <div className="row">
                                {Object.keys(this.props.data).map(generateFormItem)}
                            </div>
                            <input type="submit" className="button-primary" />
                        </form>
                    </div>
                );
            }
        });

        var MenuItem = React.createClass({
            handleClick: function(e) {
                e.preventDefault();
                this.props.updateFunction(this.props.name);
            },
            render: function() {
                var className;
                if (this.props.current == this.props.name) {
                    className = "button button-primary";
                } else {
                    className = "button";
                }
                return (
                    <li>
                        <a className={className} href="#" onClick={this.handleClick}>
                            {this.props.name}
                        </a>
                    </li>
                );
            }
        });
        var Menu = React.createClass({
            render: function() {
                var updateFunction = this.props.updateFunction;
                var currentTable = this.props.current;
                var createMenuItem = function(tableName) {
                    return(
                        <MenuItem 
                            updateFunction={updateFunction} 
                            name={tableName} 
                            current={currentTable}
                            key={tableName}
                        />
                    );
                };
                return (
                    <ul>
                        {this.props.tables.map(createMenuItem)}
                    </ul>
                );
            }
        });
        var Explorer = React.createClass({
            updateTable: function(tableName) {
                this.state.editorOpen = false;
                this.state.loading = true;
                this.state.tableData.data.rows = [];
                this.state.tableData.data.count = null;
                this.state.tableData.currentTable = tableName;
                this.setState(this.state);
                var that = this;
                $.get("admin/"+ tableName+"/all", function(response) {
                    if (tableName == that.state.tableData.currentTable) {
                        that.state.tableData.data = response;
                        that.state.loading = false;
                        that.setState(that.state);                    
                    }
                });
            },
            openItemEditor: function(rowData) {
                this.state.editorOpen = true;
                this.state.rowData = rowData;
                this.setState(this.state);
            },
            editorUpdate: function(data) {
                this.state.editorOpen = false;
                var newRows = this.state.tableData.data.rows;
                for (var i = 0; i < newRows.length; i++) {
                    if (newRows[i].id == data.id){
                        newRows[i] = data;
                    }
                }
                this.state.tableData.data.rows = newRows;
                this.setState(this.state);
            },
            componentDidMount: function () {
                this.updateTable(this.state.tableData.currentTable);
            },
            getInitialState: function () {
                return {
                    // global variable instantiated in
                    // layout
                    tables: tables,
                    loading: true,
                    tableData: {
                        currentTable: tables[0],
                        data: {
                            count: 0,
                            rows: []
                        }                    
                    },
                    rowData: {},
                    editorOpen: false
                };
            },
            render: function() {
                var tableClass = "explorer-table";
                if (this.state.loading === true) {
                    tableClass += " loading";
                } 
                return (
                    <div className="explorer">
                        <Menu 
                            updateFunction={this.updateTable} 
                            tables={this.state.tables} 
                            current={this.state.tableData.currentTable}
                            />
                        <ItemEditor 
                            data={this.state.rowData}
                            open={this.state.editorOpen}
                            current={this.state.tableData.currentTable}
                            updateFunction={this.editorUpdate}
                        />
                        <div className={tableClass}>
                            <b>Count:</b> {this.state.tableData.data.count}
                            <Table 
                                tableData={this.state.tableData} 
                                openItemEditorFunc={this.openItemEditor}
                            />
                        </div>
                    </div>
                );
            }
        });
        React.render(<Explorer />, $('.explorer')[0]);
    }    
});
