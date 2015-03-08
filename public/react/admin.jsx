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
                    values.push(row[item]);
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
            this.state.tableData.currentTable = tableName;
            var that = this;
            $.get("admin/"+ tableName+"/all", function(response) {
                that.state.tableData.data = response;
                that.setState(that.state);
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
            return (
                <div className="explorer">
                    <Menu 
                        updateFunction={this.updateTable} 
                        tables={this.state.tables} 
                        current={this.state.tableData.currentTable}
                        />
                    <div className="explorer-table">
                        <Table tableData={this.state.tableData} />
                    </div>
                </div>
            );
        }
    });
    React.render(<Explorer />, $('.explorer')[0]);
}