import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { CountShake2 } from '../actions';
import AppBar from 'material-ui/AppBar';
import Typography from 'material-ui/Typography';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import NavigateBefore from 'material-ui-icons/NavigateBefore';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import GridList, { GridListTile } from 'material-ui/GridList';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';

// スマホ端末の加速度取得開始
//window.addEventListener('devicemotion', device_motion);

var acc_ratio; // 加速度値のレート(デバイスにより異なる)
var ua = navigator.userAgent;
var iOS = false;
if(ua.search(/iPhone/)!== -1){
    // iPhone
  iOS = true;
  if(window.screen.height==568){
     // iPhone5
    acc_ratio = 1/75;
  }else{
  	// その他のiPhone
    acc_ratio = 1/20;
  }
  }else{
	   acc_ratio = 1/20;
}


var acc_ignore_tm = 60;	// 加速度値が閾値を超えて検出された場合でも、前回の取得から一定時間経過していないとノイズと判定する

// デバイス加速度取得時のコールバック関数
var min_acc = 17;
var prev_tm = 0;

var min_up_acc = 0.3;	// 振り上げたと判定する最小の加速度値
var min_down_acc = 0.5;	// 振り下ろしたと判定する最小の加速度値
var wait_timer = null;
var countdown_timer = null;
var strong_axis;	// 最も加速度値の強い軸
var prev_direction; 	// 前回の加速度値の方向（0:負の方向 1:正の方向)
var direction = 0;		// 今回の加速度値の方向
var pair_wait = false;	// 振り上げ動作後の振り下ろし動作の待機
var prev_acc = -1;
var curr_acc = -1;

var count = 0;
var toggle = false;


//window.addEventListener('devicemotion', device_motion);
//alert(count);


const styles = theme => ({
  root: {
    height: '100%',
    width: '100%',
    position: "fixed",
    zIndex: 1,
    backgroundSize: "cover",
    backgroundImage: "url('img/chinko.png')",
  },
  card: {
    width: "100%",
    height: "100%",
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
  wrapper1: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  wrapper2: {
    position: "absolute",
    width: "100%",
    height: "100%",
    display: "table",
    zIndex: 1
  },
  wrapper3: {
    position: "absolute",
    width: "100%",
    height: "100%",
    display: "table"
  },
  text: {
    display: "table-cell",
    textAlign: "center",
    verticalAlign: "middle",
    fontFamily: "sans-serif",
    width: "100%"
  }
});

class App2 extends React.Component {
  constructor () {
    super();
    this.state = {
    };
    this.device_motion = this.device_motion.bind(this);
  }

  device_motion(e){
      if(iOS){
          if(toggle){
             toggle = false;
             return;
          }else{
          	toggle = true;
          }
      }

      var acc = e.accelerationIncludingGravity;
      var acc_x = acc.x * acc_ratio;
      var acc_y = acc.y * acc_ratio;
      var acc_z = acc.z * acc_ratio;


      // 最も加速度を強く検出した軸を取得
      if(Math.abs(acc_x) > Math.abs(acc_y)){
      	strong_axis = 'x';
          if(Math.abs(acc_z) > Math.abs(acc_x)){
          	strong_axis = 'z';
          }
      }else{
      	strong_axis = 'y';
          if(Math.abs(acc_z) > Math.abs(acc_y)){
          	strong_axis = 'z';
          }
      }
      // 最も加速度を強く検出した軸を基準にした振られた方向を判定
      switch(strong_axis){
          case 'x':
             direction = (acc_x>0)?1:0;
          	break;
          case 'y':
          	direction = (acc_y>0)?1:0;
          	break;
          case 'z':
          	direction = (acc_z>0)?1:0;
          	break;

      }

      // 3軸を合わせた加速度値を計算する
      curr_acc = Math.sqrt(Math.pow(acc_x, 2)+Math.pow(acc_y, 2)+Math.pow(acc_z, 2));
      if(pair_wait){
          // 振り下ろし動作の待機状態

          // 前回振り下ろした時間からの経過時間を計算する
           var date = new Date();
           var tm = date.getTime();
           var diff = tm - prev_tm;

          if(diff > acc_ignore_tm &&
             direction != prev_direction &&
             ((prev_acc > min_up_acc && curr_acc > min_down_acc) ||
              (prev_acc > min_down_acc && curr_acc > min_up_acc))){
              // 振り上げ・振り下ろし動作の完了
              count++;

              this.props.dispatch(CountShake2(count));
              //CountShake2(count);
              pair_wait = false;
              if(wait_timer){
                   clearTimeout(wait_timer);
                  wait_timer = null;
              }

              prev_tm = tm;
          }

      }else{
          var date = new Date();
          var tm = date.getTime();
          var diff = tm - prev_tm;

          if(diff > acc_ignore_tm && (curr_acc > min_up_acc || curr_acc > min_down_acc)){
              // 一定以上の加速度値が検出された
              pair_wait = true; // 振り下ろし待機状態に
              prev_acc = curr_acc;	// 検出された加速度値を保存
              // タイマー設定
              // 一定時間経過しても一定以上の加速度値が検出されなければ
              // 振り下ろし待機状態をキャンセル
              wait_timer = setTimeout(function(){
                  pair_wait = false;
              }, 600);
              prev_direction = direction;
          }
      }
  }

  componentDidMount(){
    window.addEventListener('devicemotion', this.device_motion);
  };

  render(props) {
    const { classes, theme } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static" style={{backgroundColor: "initial"}}>
          <Toolbar>
            <IconButton onClick={e => {this.props.history.push("/list")}}>
              <NavigateBefore style={{width: 40, height: 40}}/>
            </IconButton>
            <Typography style={{textAlign: "right", width: "80%", fontSize: 20}}>
              {this.props.sum}pt
            </Typography>
          </Toolbar>
        </AppBar>
          <img src="./img/tni02.png" style={{width: "100%"}}/>
          <div style={{width: "90%", textAlign: "center", marginBottom: "40%", marginTop: "5%"}}>
            <div className={classes.wrapper1} style={{backgroundColor: "#F5C345", height: 30, marginLeft: "10%", width: "80%", borderRadius: 20}}>
              <div className={classes.wrapper2} style={{backgroundColor: "#4CB3E3", height: 30, width: String(this.props.rate) + "%", borderRadius: "20px 0px 0px 20px"}}></div>
            </div>
          </div>
          <div style={{marginTop: "-25%"}}>
            <div style={{display: "inline", marginLeft: "10%"}}>{this.props.data2}</div>
            <div style={{display: "inline", marginLeft: "70%"}}>{this.props.data1}</div>
          </div>
          <div style={{marginTop: "15%"}}>
            <div style={{textAlign: "center", fontSize: 70}}>{this.props.count}pt</div>
            <div style={{textAlign: "center"}}><img src="./img/musopport-01.png" style={{width: 150}}/></div>
          </div>
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

App2 = connect(mapStateToProps)(App2);

App2.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  history: PropTypes.shape().isRequired,
};

export default withStyles(styles, { withTheme: true })(App2);
