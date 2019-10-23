import request from 'superagent';

export const CountShake = count => {
  return function (dispatch){
    // request
    // .get(`https://kawa18-1.paiza-user.cloud:3000/fight?id=1`)
    // .set({'Content-Type': 'application/json'})
    // .end(function(err, res){
    //   if(err){
    //     console.log(err);
    //     return {
    //       type: 'COUNT_SHAKE',
    //       count
    //     }
    //   }
    //   else {
    //     console.log(res.body);
    //     dispatch(GetData(count, res.body))
    //   }
    // });
    dispatch(GetData(count, res.body))
  }
}

export const CountShake2 = count => {
  return function (dispatch){
    // request
    // .get(`https://kawa18-1.paiza-user.cloud:3000/fight?id=2`)
    // .set({'Content-Type': 'application/json'})
    // .end(function(err, res){
    //   if(err){
    //     console.log(err);
    //     return {
    //       type: 'COUNT_SHAKE',
    //       count
    //     }
    //   }
    //   else {
    //     console.log(res.body);
    //     dispatch(GetData(count, res.body))
    //   }
    // });
    dispatch(GetData(count, 1))
  }
}

const GetData = (count, res) => {
  return {
    type: 'COUNT_SHAKE',
    count,
    d1: 10,
    d2: 10
  }
}
