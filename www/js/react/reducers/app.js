const initialState = {
  count: 0,
  data1: 0,
  data2: 0,
  sum: 0,
  rate: 50
}

const app = (state = initialState, action) => {
  switch (action.type) {
    case 'COUNT_SHAKE':
      //console.log("test2")
      //alert(action.count + action.d1 + action.d2)
      return {
        //...state,
        count: action.count,
        data1: action.d1,
        data2: action.d2,
        sum: action.d1 + action.d2,
        rate: action.d2/(action.d1+action.d2)*100
      }
    default:
      return state
  }
}

export default app
