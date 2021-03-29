import { put, takeLatest, delay, call } from 'redux-saga/effects';
import * as constants from '../constants/constants';
import * as actions from '../action/index';
import * as data from '../dummyData/data';
import { connectionString } from '../params/connection';

function* getManufacturer() {
  try {
    //const json = yield fetch('https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=c3eee02bae9546a1bc355452b4cf1d59')
    //.then(response => {
    //return response.json();
    //});
    const payload = [
      { name: 'Google', img: 'data:image/png;base64,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' },
      { name: 'Samsung', img: 'https://cdn.samsung.com/etc/designs/smg/global/imgs/logo-square-letter.png' },
      { name: 'Xiaomi', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Xiaomi_logo.svg/1024px-Xiaomi_logo.svg.png' },
      { name: 'Apple', img: 'data:image/png;base64,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' }
    ];
    yield delay(2000);
    yield put(actions.manufacturerReceived(payload));
  } catch (err) {
    yield put(actions.getManufacturerError(err));
  }
}

function* getSlideshowData() {
  try {
    //const json = yield fetch('https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=c3eee02bae9546a1bc355452b4cf1d59')
    //.then(response => {
    //return response.json();
    //});
    const payload = [
      'https://theshopperz.com/wp-content/uploads/2017/11/img_con_en_mp_banner2.jpg',
      'https://au2-images.shop.samsung.com/medias/Herobanner-2000x600-EX.jpg?context=bWFzdGVyfGltYWdlc3wyMjE5NTl8aW1hZ2UvanBlZ3xpbWFnZXMvaDA2L2gyNC85MjA5MjY3MTkxODM4LmpwZ3xkMDRkOGNjNDBlODBkMWI5MzIxNWYyNTdlNmJiOWI3OWRmYjg0YzU3YTdjNmE4ZWY3YjUxZTkzYjAyYjA4MzZi',
      'https://villahome.com.vn/wp-content/uploads/2018/11/banner-iphone-hands_3_by-tranmautritam.jpg',
      'https://cdn.tgdd.vn/Files/2017/08/29/1017220/banner_1200x628-800-resize.jpg'
    ];
    yield delay(2000);
    yield put(actions.slideshowDataReceived(payload));
  } catch (err) {
    yield put(actions.getSlideshowDataError(err));
  }
}

function* login({ username, password }) {
  try {
    let userInfo = null;
    let requestBody = {
      username: username,
      password: password
    }
    const json = yield fetch(`${connectionString}/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })
      .then(response => {
        return response.json();
      })
      .then(json => {
        userInfo = json;
      })
    yield put(actions.loginInformationReceived(userInfo));
  } catch (err) {
    yield put(actions.loginError('Invalid username or password'));
  }
}

function* getPhoneDetails({ phoneID }) {
  try {
    let phone = null;
    const json = yield fetch(`${connectionString}/product/${phoneID}`)
      .then(response => {
        return response.json();
      })
      .then(json => {
        phone = json;
      })
    yield put(actions.phoneDetailsReceived(phone));
  } catch (err) {
    yield put(actions.getPhoneDetailsError(err));
  }
}

function* changeProfileInfo({ payload }) {
  let status = null;
  let requestBody = {
    username: payload.username,
    fullname: payload.fullname,
    phoneNumber: payload.phoneNumber,
    address: payload.address,
    birthday: payload.birthday,
    email: payload.email
  }
  const json = yield fetch(`${connectionString}/updateProfile/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  })
    .then(response => {
      status = response.status;
    })
  if (status === 200) {
    yield put(actions.changeProfileInfoSuccess({ status: status, data: requestBody }));
  } else {
    yield put(actions.changeProfileInfoError(status));
  }
}

function* changeUserStatus({ username }) {

}

function* changePassword({ payload }) {
  let status = null;
  let requestBody = {
    username: payload.username,
    oldPassword: payload.oldPassword,
    newPassword: payload.newPassword
  }
  const json = yield fetch(`${connectionString}/changePassword/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  })
    .then(response => {
      status = response.status;
    })
  if (status === 200) {
    yield put(actions.changePasswordSuccess({ status: status, newPassword: payload.newPassword }));
  } else {
    yield put(actions.changePasswordError(status));
  }
}

function* getUserOrders({ username }) {
  let status = null;
  let orders = [];
  const json = yield fetch(`${connectionString}/orderHistory/?username=${username}`)
    .then(response => {
      status = response.status;
      return response.json();
    })
    .then(json => {
      orders = json;
    })
  if (status === 200) {
    yield put(actions.userOrdersReceived(orders));
  } else {
    yield put(actions.userOrdersReceiveError(status));
  }
}
function* getOrderDetails({ orderId }) {
  let status = null;
  let orderDetails = [];
  yield fetch(`${connectionString}/order/${orderId}`)
    .then(response => {
      status = response.status;
      return response.json();
    })
    .then(json => {
      orderDetails = json;
    });
  if (status === 200) {
    yield put(actions.orderDetailsReceived(orderDetails));
  } else {
    yield put(actions.orderDetailsReceiveError(status));
  }
}

function* addNewOrder({ payload }) {
  let status = null;
  let items = payload.items;
  let requestBody = {
    username: payload.username,
    phoneNumber: payload.phoneNumber,
    address: payload.address,
    listItem: items
  };
  const json = yield fetch(`${connectionString}/createOrder/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  })
    .then(response => {
      status = response.status;
    })
  if (status === 200) {
    yield put(actions.addNewOrderSuccess(status));
  } else {
    yield put(actions.addNewOrderError(status));
  };
};

function* addNewOrderItems({ payload }) {
  const items = payload;
  yield items.map(item => {
    data.orderItems.push(item);
  });

};

function* getPhoneListByMName({ name }) {
  try {
    let phones = [];
    const response = yield call(fetch, `${connectionString}/member/productByManufactor/?manufactor=${name}`);
    const data = yield call([response, response.json])
    phones = data;
    yield put(actions.phoneListByMReceived(phones));
  } catch (err) {
    yield put(actions.phoneListByMReceiveError(err));
  }
}

function* getPhoneListByName({ name }) {
  try {
    let status = null;
    let phones = [];
    const json = yield fetch(`${connectionString}/member/searchProduct/?searchValue=${name}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        status = response.status;
        return response.json();
      })
      .then(json => {
        phones = json;
      });

    if (status === 200) {
      yield put(actions.phoneListByNameReceived(phones))
    } else {
      yield put(actions.phoneListByNameReceiveError(status));
    };
  } catch (err) {
    yield put(actions.phoneListByNameReceiveError(err));
  }
}

function* getAllUsers() {
  try {
    let users = [];
    const json = yield fetch(`${connectionString}/user/`)
      .then(response => {

        return response.json();
      })
      .then(json => {
        users = json;
      })
    users.forEach(u => {
      u.isChangeStatusMode = false;
    });
    yield put(actions.allUsersReceived(users));
  } catch (err) {
    yield put(actions.getAllUsersError(err));
  }
}

function* getAllPhones() {
  try {
    let allPhones = null;
    const json = yield fetch(`${connectionString}/admin/product/`)
      .then(response => {
        return response.json();
      })
      .then(json => {
        allPhones = json;
      })
    yield put(actions.allPhonesReceived(allPhones));
  } catch (err) {
    yield put(actions.getAllPhonesError(err));
  }
}

function* getAllOrders() {
  try {
    let orders = [];
    let status = null;
    const json = yield fetch(`${connectionString}/allOrderHistory/`)
      .then(response => {
        status = response.status;
        return response.json();
      })
      .then(json => {
        orders = json;
      });
    if (status === 200) {
      yield put(actions.allOrdersReceived(orders));
    } else {
      yield put(actions.getAllOrdersError(status));
    }
  } catch (err) {
    yield put(actions.getAllOrdersError(err));
  }
}

function* getPendingOrdersCount() {
  try {
    let count = 0;
    let status = null;
    let totalOrders = [];
    const json = yield fetch(`${connectionString}/allOrderHistory/`)
      .then(response => {
        status = response.status;
        return response.json();
      })
      .then(json => {
        totalOrders = json;
      })
    if (status === 200) {
      totalOrders.forEach(o => {
        if (o.status === 1) {
          count = count + 1;
        }
      });
      yield put(actions.pendingOrdersCountReceived(count));
    } else {
      yield put(actions.getPendingOrdersCountError(status));
    }
  } catch (err) {
    yield put(actions.getPendingOrdersCountError(err));
  }
}


function* sendPhoneRate({ payload }) {
  let status = null;
  let requestBody = {
    username: payload.username,
    productId: payload.productId,
    ratingPoint: payload.ratingPoint
  }
  yield fetch(`${connectionString}/rating/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  })
    .then(response => {
      status = response.status;
    });
  if (status === 200) {
    alert('Gửi đánh giá thành công');
  } else {
    alert('Gửi đánh giá thất bại');
  };
}

function* getTopOrderPhones() {
  try {
    const orderItems = data.orderItems;
    let itemQuantityCountArr = [];
    yield orderItems.forEach(item => {
      let isDup = false;
      itemQuantityCountArr.forEach(count => {
        if (count.phoneName === item.phoneName) {
          count.quantity += item.quantity;
          isDup = true;
        }
      })
      if (!isDup) {
        itemQuantityCountArr.push({ phoneName: item.phoneName, quantity: item.quantity, unitPrice: item.unitPrice });
      };
    });
    yield itemQuantityCountArr.sort((a, b) => { return b.quantity - a.quantity });
    yield put(actions.topOrderPhonesReceived(itemQuantityCountArr));

  } catch (err) {
    yield put(actions.getTopOrderPhonesError(err));
  }
}

function* signUp({ payload }) {
  try {
    let user = {
      username: payload.username,
      password: payload.password,
      fullname: payload.fullname
    };
    yield fetch(`${connectionString}/register/`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(response => {
        console.log(response.status);
      });
  } catch (err) {
    console.log(err);
  };
}

function* getUserDetails({ username }) {
  try {
    let userDetails = null;
    const json = yield fetch(`${connectionString}/user/${username}`)
      .then(response => {
        return response.json();
      })
      .then(json => {
        userDetails = json;
      })
    yield put(actions.userDetailsReceived(userDetails));
  } catch (err) {
    yield put(actions.getUserDetailsError(err));
  }
}

function* getAllPhoneList() {
  try {
    let allPhoneList = [];
    const json1 = yield fetch(`${connectionString}/member/product/`)
      .then(response1 => {
        return response1.json();
      })
      .then(json1 => {
        allPhoneList = json1;
      });
    yield put(actions.allPhoneListReceived(allPhoneList));
  } catch (err) {
    yield put(actions.getAllPhoneListError(err));
  }
}

function* createNewPhone({ payload }) {
  let status = null;
  let requestBody = {
    productName: payload.productName,
    imgURL: payload.imgURL,
    imgName: payload.imgName,
    manufactor: payload.manufactor,
    description: payload.description,
    year: payload.year,
    price: payload.price,
  }
  const json = yield fetch(`${connectionString}/createProduct/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  })
    .then(response => {
      status = response.status;
    });
  if (status === 200) {
    yield put(actions.createNewPhoneSuccess(status));
  } else {
    yield put(actions.createNewPhoneError(status));
  }
}

function* updatePhone({ payload }) {
  let status = null;
  let requestBody = {
    productId: payload.productId,
    productName: payload.productName,
    imgURL: payload.imgURL,
    imgName: payload.imgName,
    manufactor: payload.manufactor,
    description: payload.description,
    quantity: payload.quantity,
    year: payload.year,
    price: payload.price,
  }
  const json = yield fetch(`${connectionString}/updateProduct/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  })
    .then(response => {
      status = response.status;
    });
  if (status === 200) {
    yield put(actions.updatePhoneSuccess(status));
  } else {
    yield put(actions.updatePhoneError(status));
  }
}

function* banAccount({ username }) {
  let status = null;
  const json = yield fetch(`${connectionString}/ban/${username}`, {
    method: 'PUT'
  })
    .then(response => {
      status = response.status;
    });
  if (status === 200) {
    yield put(actions.banAccountSuccess({ username: username, status: status }));
  } else {
    yield put(actions.banAccountError(status));
  }
}

function* unbanAccount({ username }) {
  let status = null;
  const json = yield fetch(`${connectionString}/unban/${username}`, {
    method: 'PUT'
  })
    .then(response => {
      status = response.status;
    });
  if (status === 200) {
    yield put(actions.unbanAccountSuccess({ username: username, status: status }));
  } else {
    yield put(actions.unbanAccountError(status));
  }
}

function* changeUserRole({ payload }) {
  let status = null;
  let requestBody = {
    username: payload.username,
    roleId: payload.roleId
  };
  const json = yield fetch(`${connectionString}/updateRoleId/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  })
    .then(response => {
      status = response.status;
      return response;
    })
  if (status === 200) {
    yield put(actions.changeUserRoleSuccess({ username: payload.username, roleId: payload.roleId }));
  } else {
    yield put(actions.changeUserRoleError(status));
  };
}

function* inactivePhone({ productID }) {
  let status = null;
  const json = yield fetch(`${connectionString}/inactive/${productID}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      status = response.status;
    })
  if (status === 200) {
    yield put(actions.inactivePhoneSuccess({ productID: productID, status: status }));
  } else {
    yield put(actions.inactivePhoneError(status));
  }
}

function* activePhone({ productID }) {
  let status = null;
  const json = yield fetch(`${connectionString}/active/${productID}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      status = response.status;
    })
  if (status === 200) {
    yield put(actions.activePhoneSuccess({ productID: productID, status: status }));
  } else {
    yield put(actions.activePhoneError(status));
  }
}

function* getAllManufacturer() {
  let allPhoneList = [];
  let status = null;
  let manuArr = [];
  const json = yield fetch(`${connectionString}/member/product/`)
    .then(response => {
      status = response.status;
      return response.json();
    })
    .then(json => {
      allPhoneList = json;
    });

  allPhoneList.forEach((phone) => {
    let bool = false;
    manuArr.forEach((m, i) => {
      if (manuArr[i].name === phone.manufactor) {
        manuArr[i].count += 1;
        bool = true;
      }
    })
    if (!bool) {
      manuArr.push({ name: phone.manufactor, count: 1 });
    }
  });
  manuArr.sort((a, b) => {
    if (a.name > b.name) {
      return 1;
    }
    if (a.name === b.name) {
      return 0;
    }
    if (a.name < b.name) {
      return -1;
    };
  });
  if (status === 200) {
    yield put(actions.allManufacturerReceived(manuArr));
  } else {
    yield put(actions.getAllManufacturerError(status));
  }
}

function* setOrderStatusTo2({ orderId }) {
  let status = null;
  const json = yield fetch(`${connectionString}/setStatusOnProcess/${orderId}`, {
    method: 'PUT'
  })
    .then(response => {
      status = response.status;
    })
  if (status === 200) { 
    alert('Cập nhập trạng thái đơn hàng thành công');
  } else {
    alert('Cập nhập trạng thái đơn hàng thất bại');
    console.log("err" +status);
  };
}

function* setOrderStatusTo3({ orderId }) {
  let status = null;
  const json = yield fetch(`${connectionString}/setStatusDone/${orderId}`, {
    method: 'PUT'
  })
    .then(response => {
      status = response.status;
    })
  if (status === 200) {
    alert('Cập nhập trạng thái đơn hàng thành công');
  } else {
    alert('Cập nhập trạng thái đơn hàng thất bại');
    console.log(status);
  };
}

function* setOrderStatusTo4({ payload }) {
  let status = null;
  let requestBody = {
    orderId: parseInt(payload.orderId),
    description: payload.description
  }
  const json = yield fetch(`${connectionString}/setStatusCancel/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  })
    .then(response => {
      status = response.status;
    })
  if (status === 200) {
    alert('Cập nhập trạng thái đơn hàng thành công');
  } else {
    alert('Cập nhập trạng thái đơn hàng thất bại');
    console.log(status);
  };
}

function* getTop1Price() {
  let top1Price = 0;
  let allPhonesList = [];
  let status = null;
  const json = yield fetch(`${connectionString}/member/product/`)
    .then(response => {
      status = response.status;
      return response.json();
    })
    .then(json => {
      allPhonesList = json;
    });
  if (status === 200) {
    allPhonesList.sort((a, b) => {
      return b.price - a.price;
    });
    top1Price = allPhonesList[0].price;
    yield put(actions.top1PriceReceived(top1Price));
  } else {
    yield put(actions.getTop1PriceError(status));
  }
}

function* getTop3SearchValue() {
  let status = null;
  let topSearchValues = [];
  const json = yield fetch(`${connectionString}/searchKeyWeight/`)
    .then(response => {
      status = response.status;
      return response.json();
    })
    .then(json => {
      topSearchValues = json;
    });
  if (status === 200) {
    yield put(actions.top3SearchValueReceived(topSearchValues));
  } else {
    yield put(actions.getTop3SearchValueError(status));
  }
}

export default function* rootSaga() {
  yield takeLatest(constants.GET_MANUFACTURER, getManufacturer);
  yield takeLatest(constants.GET_SLIDESHOW_DATA, getSlideshowData);
  yield takeLatest(constants.LOGIN, login);
  yield takeLatest(constants.GET_PHONE_DETAILS, getPhoneDetails);
  yield takeLatest(constants.CHANGE_PROFILE_INFO, changeProfileInfo);
  yield takeLatest(constants.CHANGE_PASSWORD, changePassword);
  yield takeLatest(constants.GET_USER_ORDERS, getUserOrders);
  yield takeLatest(constants.GET_ORDER_DETAILS, getOrderDetails);
  yield takeLatest(constants.ADD_NEW_ORDER, addNewOrder);
  yield takeLatest(constants.GET_PHONE_LIST_BY_M, getPhoneListByMName);
  yield takeLatest(constants.GET_PHONE_LIST_BY_NAME, getPhoneListByName);
  yield takeLatest(constants.GET_ALL_USERS, getAllUsers);
  yield takeLatest(constants.GET_ALL_PHONES, getAllPhones);
  yield takeLatest(constants.GET_ALL_ORDERS, getAllOrders);
  yield takeLatest(constants.GET_PENDING_ORDERS_COUNT, getPendingOrdersCount);
  yield takeLatest(constants.SEND_PHONE_RATE, sendPhoneRate);
  yield takeLatest(constants.GET_TOP_ORDER_PHONES, getTopOrderPhones);
  yield takeLatest(constants.SIGN_UP, signUp);
  yield takeLatest(constants.GET_USER_DETAILS, getUserDetails);
  yield takeLatest(constants.GET_ALL_PHONE_LIST, getAllPhoneList);
  yield takeLatest(constants.CREATE_NEW_PHONE, createNewPhone);
  yield takeLatest(constants.UPDATE_PHONE, updatePhone);
  yield takeLatest(constants.BAN_ACCOUNT, banAccount);
  yield takeLatest(constants.UNBAN_ACCOUNT, unbanAccount);
  yield takeLatest(constants.CHANGE_USER_ROLE, changeUserRole);
  yield takeLatest(constants.INACTIVE_PHONE, inactivePhone);
  yield takeLatest(constants.ACTIVE_PHONE, activePhone);
  yield takeLatest(constants.GET_ALL_MANUFACTURER, getAllManufacturer);
  yield takeLatest(constants.SET_ORDER_STATUS_TO_2, setOrderStatusTo2);
  yield takeLatest(constants.SET_ORDER_STATUS_TO_3, setOrderStatusTo3);
  yield takeLatest(constants.SET_ORDER_STATUS_TO_4, setOrderStatusTo4);
  yield takeLatest(constants.GET_TOP_1_PRICE, getTop1Price);
  yield takeLatest(constants.GET_TOP_3_SEARCH_VALUE, getTop3SearchValue);
}
