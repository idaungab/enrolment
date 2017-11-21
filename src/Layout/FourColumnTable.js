import React from 'react';
import {Table, Column, Cell} from 'fixed-data-table-2';

import 'fixed-data-table-2/dist/fixed-data-table.css';
import '.././style/App.css';
import '.././style/bootstrap.css';


class TabularData extends React.Component{
  render(){
    return(
      <Table
          rowsCount={this.props.rowsCount}
          rowHeight={50}
          width={this.props.twidth}
          height={300}
          headerHeight={50}
          data={this.props.data}>
          <Column
            header={<Cell>{this.props.header1}</Cell>}
            cell={ <Cell>1</Cell>}
            width={100}
          />
          <Column
            header={<Cell>{this.props.header2}</Cell>}
            cell={ <Cell>2</Cell>}
            width={500}
          />
          <Column
            header={<Cell>{this.props.header3}</Cell>}
            cell={ <Cell>3</Cell>}
            width={250}
          />
          <Column
            header={<Cell>{this.props.header4}</Cell>}
            cell={ <Cell>
                4
              </Cell>
            }
            width={250}
          />
        </Table>
    );
  }
}

export default TabularData;
