import * as React from 'react';

import { RouteComponentProps } from 'react-router';
// import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import './styles.scss';
// import  } from '../containers';
import { authThunk } from 'app/middleware/auth.thunk';
import { HomeContainerProps } from '../containers';

import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import moment from 'moment';
import { todo } from '../../../../../../../api/src/entities/todo';



function desc(a: any, b: any, orderBy: any) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array: any, cmp: any) {
  const stabilizedThis = array.map((el: any, index: any) => [el, index]);
  stabilizedThis.sort((a: any, b: any) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el: any) => el[0]);
}

function getSorting(order: any, orderBy: any) {
  return order === 'desc'
    ? (a: any, b: any) => desc(a, b, orderBy)
    : (a: any, b: any) => -desc(a, b, orderBy);
}

const headCells = [
  { id: 'date', numeric: false, disablePadding: true, label: 'Date' },
  { id: 'match', numeric: false, disablePadding: true, label: 'Match' },
  // { id: 'redCards', numeric: true, disablePadding: false, label: 'RC' },
  // { id: 'yellowCards', numeric: true, disablePadding: false, label: 'YC' },
  // { id: 'kickCorners', numeric: true, disablePadding: false, label: 'CK' },
  // { id: 'dangerousAttacks', numeric: true, disablePadding: false, label: 'DA' },
  // { id: 'kicks', numeric: true, disablePadding: false, label: 'Kicks' },
  { id: 'odds', numeric: true, disablePadding: false, label: 'Odds' },
  { id: 'value', numeric: true, disablePadding: false, label: 'Value' },
  { id: 'win', numeric: true, disablePadding: false, label: 'Result' }
];

export interface IEnhancedTableHead {
  numSelected: number;
  onRequestSort?: (event: any, prop: any) => void;
  onSelectAllClick?: (event: any) => void;
  order: 'asc' | 'desc';
  orderBy: string;
  rowCount: number;
}

const EnhancedTableHead = (
  // props: IEnhancedTableHead & RouteComponentProps & HomeContainerProps
  props: IEnhancedTableHead
) => {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property: any) => (event: any) => {
    onRequestSort && onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={order}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? <span>{order === 'desc' ? '' : ''}</span> : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

const EnhancedTableToolbar = (props: { numSelected: number; title: string }) => {
  // const classes = useToolbarStyles();

  const { numSelected, title } = props;
  return (
    <Toolbar>
      {numSelected > 0 ? (
        <Typography color="inherit" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography variant="h6" id="tableTitle">
          {title}
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete" />
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list" />
        </Tooltip>
      )}
    </Toolbar>
  );
};

export default function EnhancedTable(props: {
  rows: todo[];
  title: string;
  onSelectTodo: (bet: todo) => void;
}) {
  const [order, setOrder] = React.useState<'asc' | 'desc'>('asc');
  const rows = props.rows;
  const [orderBy, setOrderBy] = React.useState('');
  const [selected, setSelected] = React.useState<any[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);

  const handleRequestSort = (event: any, property: any) => {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: any) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.createdAt);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (row: todo) => {
    console.log(row);
    props.onSelectTodo(row);
    // const selectedIndex = selected.indexOf(name);
    // let newSelected: any[] = [];

    // if (selectedIndex === -1) {
    //   newSelected = newSelected.concat(selected, name);
    // } else if (selectedIndex === 0) {
    //   newSelected = newSelected.concat(selected.slice(1));
    // } else if (selectedIndex === selected.length - 1) {
    //   newSelected = newSelected.concat(selected.slice(0, -1));
    // } else if (selectedIndex > 0) {
    //   newSelected = newSelected.concat(
    //     selected.slice(0, selectedIndex),
    //     selected.slice(selectedIndex + 1)
    //   );
    // }

    // setSelected(newSelected);
  };

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: any) => {
    setDense(event.target.checked);
  };

  const isSelected = (name: any) => selected.indexOf(name) !== -1;

  const emptyRows = 0;

  return (
    <div style={{ position: 'relative', maxWidth: 800, overflow: 'scroll' }}>
      <Paper>
        <EnhancedTableToolbar title={props.title} numSelected={selected.length} />
        <div>
          {/* <Table
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: todo, index: any) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  const style = {};
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(row)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell style={{ paddingLeft: 0, width: 100 }} align="left">
                        {row.createdAt && moment(row.createdAt).format('DD/MM/YY HH:MM')}
                      </TableCell>
                      <TableCell component="th" id={labelId} padding="none">
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span>
                            {`${row.match && row.match.scoreA} ${row.match && row.match.teamA}`}
                          </span>

                          <span>
                            {` ${row.match && row.match.scoreB} ${row.match && row.match.teamB}`}
                          </span>
                        </div>
                      </TableCell>
                      {}

                      <TableCell style={{ width: 60 }} align="right">
                        {row.odds && row.odds}
                      </TableCell>
                      <TableCell style={{ width: 60 }} align="right">
                        {row.value && row.value}
                      </TableCell>
                      <TableCell
                        style={{
                          width: 60,
                          fontSize: 12,
                          color: row.win === 1 ? 'green' : row.win === 0 ? 'red' : 'black'
                        }}
                        align="right"
                      >
                        {row.win === 1 ? 'WIN' : row.win === 0 ? 'LOSS' : ''}
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table> */}
        </div>
        {/* <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        /> */}
      </Paper>
      {}
    </div>
  );
}
