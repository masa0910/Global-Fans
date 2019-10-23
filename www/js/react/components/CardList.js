import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Typography from 'material-ui/Typography';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import NavigateBefore from 'material-ui-icons/NavigateBefore';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import GridList, { GridListTile } from 'material-ui/GridList';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';

const styles = theme => ({
  root: {
    width: '100%',
    height: "100%",
  },
  card: {
    width: "100%",
    height: 320,
    //marginBottom: 50
  },
  avatar: {
    margin: "auto",
    width: 110,
    height: 110,
    boxShadow: "0px 1px 6px rgba(0,0,0,0.6)"
  },
  avatarList: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: "100%",
    height: "100%",
  },
});

class CardList extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static" style={{backgroundColor: "#EFEFF3"}}>
          <Toolbar>
            <IconButton onClick={e => {this.props.history.push("/")}}>
              <NavigateBefore style={{width: 40, height: 40}}/>
            </IconButton>
            <Typography style={{fontSize: 20}}>
              野球
            </Typography>
          </Toolbar>
        </AppBar>
        <Card className={classes.card}>
          <div className={classes.avatarList}>
            <Typography style={{color: "#1E90FF", margin: 10}}>
              応援したいチームをタップして下さい
            </Typography>
            <GridList className={classes.gridList} cols={2}>
              <GridListTile cols={1} onClick={e => {this.props.history.push("/app2")}}>
                <Avatar className={classes.avatar} style={{marginTop: 10}} src="./img/sj_iconai-13.png" />
                <p style={{textAlign: "center", margin: 5, marginBottom: 0}}>中日</p>
              </GridListTile>
              <GridListTile cols={1} onClick={e => {this.props.history.push("/app")}}>
                <Avatar className={classes.avatar} style={{marginTop: 10}} src="./img/s.png" />
                <p style={{textAlign: "center", margin: 5, marginBottom: 0}}>ソフトバンク</p>
              </GridListTile>
            </GridList>
          </div>
          <Divider />
          <div>
            <GridList className={classes.gridList} cols={2}>
              <GridListTile cols={1}>
                <p style={{textAlign: "center", margin: 0, marginTop: 10}}>2018/05/27</p>
                <p style={{textAlign: "center", margin: 0}}>18:00~22:00</p>
                <p style={{textAlign: "center", margin: 0}}>◯◯ドーム</p>
              </GridListTile>
              <GridListTile cols={1}>
                <p style={{textAlign: "center", marginTop: 15, marginBottom: 0, marginRight: 0, marginLeft: 80, fontSize: 40}}>{this.props.sum}pt</p>
              </GridListTile>
            </GridList>
          </div>
        </Card>
        <div  style={{backgroundColor: "#EFEFF3", width: "100%", height: 50}}></div>
        <Card className={classes.card}>
          <div className={classes.avatarList}>
            <Typography style={{color: "#1E90FF", margin: 10}}>
              応援したいチームをタップして下さい
            </Typography>
            <GridList className={classes.gridList} cols={2}>
              <GridListTile cols={1} /*onClick={ e => {this.props.history.push("/app_userpage")}}*/>
                <Avatar className={classes.avatar} style={{marginTop: 10}} src="./img/c.png" />
                <p style={{textAlign: "center", margin: 5, marginBottom: 0}}>巨人</p>
              </GridListTile>
              <GridListTile cols={1} onClick={e => {this.props.history.push("/app")}}>
                <Avatar className={classes.avatar} style={{marginTop: 10}} src="./img/h.png" />
                <p style={{textAlign: "center", margin: 5, marginBottom: 0}}>阪神</p>
              </GridListTile>
            </GridList>
          </div>
          <Divider />
          <div>
            <GridList className={classes.gridList} cols={2}>
              <GridListTile cols={1}>
              <p style={{textAlign: "center", margin: 0, marginTop: 10}}>2018/05/27</p>
              <p style={{textAlign: "center", margin: 0}}>18:00~22:00</p>
              <p style={{textAlign: "center", margin: 0}}>◯◯ドーム</p>
              </GridListTile>
              <GridListTile cols={1}>
                <p style={{textAlign: "center", marginTop: 15, marginBottom: 0, marginRight: 0, marginLeft: 80, fontSize: 40}}>{this.props.sum}pt</p>
              </GridListTile>
            </GridList>
          </div>
        </Card>
        <div  style={{backgroundColor: "#EFEFF3", width: "100%", height: 50}}></div>
        <Card className={classes.card}>
          <div className={classes.avatarList}>
            <Typography style={{color: "#1E90FF", margin: 10}}>
              応援したいチームをタップして下さい
            </Typography>
            <GridList className={classes.gridList} cols={2}>
              <GridListTile cols={1} /*onClick={ e => {this.props.history.push("/app_userpage")}}*/>
                <Avatar className={classes.avatar} style={{marginTop: 10}} src="./img/r.png" />
                <p style={{textAlign: "center", margin: 5, marginBottom: 0}}>楽天</p>
              </GridListTile>
              <GridListTile cols={1} onClick={e => {this.props.history.push("/app")}}>
                <Avatar className={classes.avatar} style={{marginTop: 10}} src="./img/n.png" />
                <p style={{textAlign: "center", margin: 5, marginBottom: 0}}>日本ハム</p>
              </GridListTile>
            </GridList>
          </div>
          <Divider />
          <div>
            <GridList className={classes.gridList} cols={2}>
              <GridListTile cols={1}>
              <p style={{textAlign: "center", margin: 0, marginTop: 10}}>2018/05/27</p>
              <p style={{textAlign: "center", margin: 0}}>18:00~22:00</p>
              <p style={{textAlign: "center", margin: 0}}>◯◯ドーム</p>
              </GridListTile>
              <GridListTile cols={1}>
                <p style={{textAlign: "center", marginTop: 15, marginBottom: 0, marginRight: 0, marginLeft: 80, fontSize: 40}}>{this.props.sum}pt</p>
              </GridListTile>
            </GridList>
          </div>
        </Card>
        <div  style={{backgroundColor: "#EFEFF3", width: "100%", height: 80}}></div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    count: state.app.count,
    data1: state.app.data1,
    data2: state.app.data2,
    sum: state.app.sum,
    rate: state.app.rate
  }
}

CardList = connect(mapStateToProps)(CardList);

CardList.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.shape().isRequired,
};

export default withStyles(styles)(CardList);
