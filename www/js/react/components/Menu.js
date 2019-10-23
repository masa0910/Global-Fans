import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import NavigateNext from 'material-ui-icons/NavigateNext';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import AppBar from 'material-ui/AppBar';
import Typography from 'material-ui/Typography';
import Toolbar from 'material-ui/Toolbar';
import { CountShake } from '../actions';

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

class Menu extends React.Component {
  state = { open: true };

  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static" style={{backgroundColor: "#EFEFF3", boxShadow: "none"}}>
          <Toolbar>
            <Typography style={{fontSize: 20}}>
              Menu
            </Typography>
          </Toolbar>
        </AppBar>
        <List style={{paddingTop: 0}}>
          <Divider />
          <ListItem button onClick={e => {this.props.history.push("/list"), this.props.dispatch(CountShake(0))}}>
            <ListItemText inset primary="野球" style={{padding: 5}}/>
              <NavigateNext />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText inset primary="サッカー" style={{padding: 5}}/>
              <NavigateNext />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText inset primary="バスケットボール" style={{padding: 5}}/>
              <NavigateNext />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText inset primary="バレーボール" style={{padding: 5}}/>
              <NavigateNext />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText inset primary="ハンドボール" style={{padding: 5}}/>
              <NavigateNext />
          </ListItem>
          <Divider />
        </List>
      </div>
    );
  }
}


Menu = connect()(Menu);

Menu.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.shape().isRequired,
};

export default withStyles(styles)(Menu);
