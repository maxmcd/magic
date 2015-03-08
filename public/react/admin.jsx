if ($('.container.admin').length > 0) {
    var Table = React.createClass({
        getInitialState: function () {
            return {
            };
        },
        render: function() {
            var createHeader = function(name) {
                return (
                    <th>{name}</th>
                );
            };
            var createData = function(value) {
                return (
                    <td>{value}</td>
                );
            };
            var createRow = function(row) {
                var values = [];
                for (var item in row) {
                    if (typeof row[item] == "boolean") {
                        values.push(JSON.stringify(row[item]));
                    } else {
                        values.push(row[item]);
                    }
                }
                return (
                    <tr>
                        {values.map(createData)}
                    </tr>
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
        componentDidMount: function () {
            this.updateTable(this.state.tableData.currentTable);
        },
        handleTableChange: function(table) {

            this.setState(newState);
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
                }
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
                    <div className={tableClass}>
                        <b>Count:</b> {this.state.tableData.data.count}
                        <Table 
                            tableData={this.state.tableData} 
                        />
                    </div>
                </div>
            );
        }
    });
    React.render(<Explorer />, $('.explorer')[0]);
}