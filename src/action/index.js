import * as constants from '../constants/constants';

export const getManufacturer = () => {
	return {
		type: constants.GET_MANUFACTURER,
	}
}

export const manufacturerReceived = (payload) => {
	return {
		type: constants.MANUFACTURER_RECEIVED,
		payload
	}
}

export const getManufacturerError = (payload) => {
	return {
		type: constants.GET_MANUFACTURER_ERROR,
		payload
	}
}


export const getSlideshowData = () => {
	return {
		type: constants.GET_SLIDESHOW_DATA,
	}
}

export const getSlideshowDataError = (payload) => {
	return {
		type: constants.GET_SLIDESHOW_DATA_ERROR,
		payload
	}
}

export const slideshowDataReceived = (payload) => {
	return {
		type: constants.SLIDESHOW_DATA_RECEIVED,
		payload
	}
}

export const tickAllCartItems = (status) => {
	return {
		type: constants.TICK_ALL_CART_ITEMS,
		status,
	}
}

export const tickCartItem = (id) => {
	return {
		type: constants.TICK_CART_ITEM,
		id,
	}
}

export const deleteItemsFromCart = () => {
	return {
		type: constants.DELETE_ITEMS_FROM_CART,
	}
}

export const addItemAmountFromCart = (id) => {
	return {
		type: constants.ADD_ITEM_AMOUNT_FROM_CART,
		id,
	}
}

export const minusItemAmountFromCart = (id) => {
	return {
		type: constants.MINUS_ITEM_AMOUNT_FROM_CART,
		id,
	}
}

export const inputOrderPlacingInformation = (payload) => {
	return {
		type: constants.INPUT_ORDER_PLACING_INFORMATION,
		payload,
	}
}

export const login = (username, password) => {
	return {
		type: constants.LOGIN,
		username, password,
	}
}

export const loginInformationReceived = (user) => {

	return {
		type: constants.LOGIN_INFORMATION_RECEIVED,
		user,
	}
}

export const loginError = (error) => {
	return {
		type: constants.LOGIN_ERROR,
		error,
	}
}

export const resetLoginState = () => {
	return {
		type: constants.RESET_LOGIN_STATE,
	}
}

export const logout = () => {
	return {
		type: constants.LOGOUT,
	}
}

export const getPhoneDetails = (phoneID) => {
	return {
		type: constants.GET_PHONE_DETAILS,
		phoneID,
	}
}

export const phoneDetailsReceived = (payload) => {
	return {
		type: constants.PHONE_DETAILS_RECEIVED,
		payload,
	}
}

export const getPhoneDetailsError = (payload) => {
	return {
		type: constants.GET_PHONE_DETAILS_ERROR,
		payload,
	}
}

export const addToCart = (payload) => {
	return {
		type: constants.ADD_TO_CART,
		payload,
	}
}

export const changeProfileInfo = (payload) => {
	return {
		type: constants.CHANGE_PROFILE_INFO,
		payload,
	}
}

export const changeProfileInfoSuccess = (payload) => {
	return {
		type: constants.CHANGE_PROFILE_INFO_SUCCESS,
		payload,
	}
}

export const changeProfileInfoError = (error) => {
	return {
		type: constants.CHANGE_PROFILE_INFO_ERROR,
		error,
	}
}

export const changePassword = (payload) => {
	return {
		type: constants.CHANGE_PASSWORD,
		payload,
	}
}

export const changePasswordSuccess = (payload) => {
	return {
		type: constants.CHANGE_PASSWORD_SUCCESS,
		payload,
	}
}

export const changePasswordError = (error) => {
	return {
		type: constants.CHANGE_PASSWORD_ERROR,
		error,
	}
}

export const getUserOrders = (username) => {
	return {
		type: constants.GET_USER_ORDERS,
		username,
	}
}

export const userOrdersReceived = (payload) => {
	return {
		type: constants.USER_ORDERS_RECEIVED,
		payload,
	}
}

export const userOrdersReceiveError = (payload) => {
	return {
		type: constants.USER_ORDERS_RECEIVE_ERROR,
		payload,
	}
}

export const getOrderDetails = (orderId) => {
	return {
		type: constants.GET_ORDER_DETAILS,
		orderId,
	}
}

export const orderDetailsReceived = (payload) => {
	return {
		type: constants.ORDER_DETAILS_RECEIVED,
		payload,
	}
}

export const orderDetailsReceiveError = (payload) => {
	return {
		type: constants.ORDER_DETAILS_RECEIVE_ERROR,
		payload,
	}
}

export const addNewOrder = (payload) => {
	return {
		type: constants.ADD_NEW_ORDER,
		payload,
	}
}

export const addNewOrderSuccess = (status) => {
	return {
		type: constants.ADD_NEW_ORDER_SUCCESS,
		status,
	}
}

export const addNewOrderError = (error) => {
	return {
		type: constants.ADD_NEW_ORDER_ERROR,
		error,
	}
}

export const getPhoneListByMName = (name) => {
	return {
		type: constants.GET_PHONE_LIST_BY_M,
		name,
	}
}

export const phoneListByMReceived = (payload) => {
	return {
		type: constants.PHONE_LIST_BY_M_RECEIVED,
		payload,
	}
}

export const phoneListByMReceiveError = (payload) => {
	return {
		type: constants.PHONE_LIST_BY_M_RECEIVE_ERROR,
		payload,
	}
}

export const getPhoneListByName = (name) => {
	return {
		type: constants.GET_PHONE_LIST_BY_NAME,
		name,
	}
}

export const phoneListByNameReceived = (payload) => {
	return {
		type: constants.PHONE_LIST_BY_NAME_RECEIVED,
		payload,
	}
}

export const phoneListByNameReceiveError = (payload) => {
	return {
		type: constants.PHONE_LIST_BY_NAME_RECEIVE_ERROR,
		payload,
	}
}

export const getAllUsers = () => {
	return {
		type: constants.GET_ALL_USERS,
	}
}

export const allUsersReceived = (payload) => {
	return {
		type: constants.ALL_USERS_RECEIVED,
		payload,
	}
}

export const getAllUsersError = (payload) => {
	return {
		type: constants.GET_ALL_USERS_ERROR,
		payload,
	}
}

export const changeAdminSubOpt = (opt) => {
	return {
		type: constants.CHANGE_ADMIN_OPT,
		opt,
	}
}

export const getAllPhones = () => {
	return {
		type: constants.GET_ALL_PHONES,
	}
}

export const allPhonesReceived = (payload) => {
	return {
		type: constants.ALL_PHONES_RECEIVED,
		payload,
	}
}

export const getAllPhonesError = (payload) => {
	return {
		type: constants.GET_ALL_PHONES_ERROR,
		payload,
	}
}

export const getAllOrders = () => {
	return {
		type: constants.GET_ALL_ORDERS,
	}
}

export const allOrdersReceived = (payload) => {
	return {
		type: constants.ALL_ORDERS_RECEIVED,
		payload,
	}
}

export const getAllOrdersError = (payload) => {
	return {
		type: constants.GET_ALL_ORDERS_ERROR,
		payload,
	}
}

export const getPendingOrdersCount = () => {
	return {
		type: constants.GET_PENDING_ORDERS_COUNT,
	}
}

export const pendingOrdersCountReceived = (count) => {
	return {
		type: constants.PENDING_ORDERS_COUNT_RECEIVED,
		count,
	}
}

export const getPendingOrdersCountError = (payload) => {
	return {
		type: constants.GET_PENDING_ORDERS_COUNT_ERROR,
		payload,
	}
}

export const getPhoneRating = (phoneID) => {
	return {
		type: constants.GET_PHONE_RATING,
		phoneID,
	}
}

export const phoneRatingReceived = (payload) => {
	return {
		type: constants.PHONE_RATING_RECEIVED,
		payload,
	}
}

export const getPhoneRatingError = (payload) => {
	return {
		type: constants.GET_PHONE_RATING_ERROR,
		payload,
	}
}

export const sendPhoneRate = (payload) => {
	return {
		type: constants.SEND_PHONE_RATE,
		payload,
	}
}

export const getTopOrderPhones = () => {
	return {
		type: constants.GET_TOP_ORDER_PHONES,
	}
}

export const topOrderPhonesReceived = (payload) => {
	return {
		type: constants.TOP_ORDER_PHONES_RECEIVED,
		payload,
	}
}

export const getTopOrderPhonesError = (payload) => {
	return {
		type: constants.GET_TOP_ORDER_PHONES_ERROR,
		payload,
	}
}

export const signUp = (payload) => {
	return {
		type: constants.SIGN_UP,
		payload,
	}
}

export const getUserDetails = (username) => {
	return {
		type: constants.GET_USER_DETAILS,
		username,
	}
}

export const userDetailsReceived = (payload) => {
	return {
		type: constants.USER_DETAILS_RECEIVED,
		payload,
	}
}

export const getUserDetailsError = (payload) => {
	return {
		type: constants.GET_USER_DETAILS_ERROR,
		payload,
	}
}

export const changeUserStatus = (username) => {
	return {
		type: constants.CHANGE_USER_STATUS,
		username,
	}
}

export const getAllPhoneList = () => {
	return {
		type: constants.GET_ALL_PHONE_LIST,
	}
}

export const allPhoneListReceived = (payload) => {
	return {
		type: constants.ALL_PHONE_LIST_RECEIVED,
		payload,
	}
}

export const getAllPhoneListError = (payload) => {
	return {
		type: constants.GET_ALL_PHONE_LIST_ERROR,
		payload,
	}
}

export const changeStatusMode = (username) => {
	return {
		type: constants.CHANGE_STATUS_MODE,
		username,
	}
}

export const createNewPhone = (payload) => {
	return {
		type: constants.CREATE_NEW_PHONE,
		payload,
	}
}

export const createNewPhoneSuccess = (status) => {
	return {
		type: constants.CREATE_NEW_PHONE_SUCCESS,
		status,
	}
}

export const createNewPhoneError = (error) => {
	return {
		type: constants.CREATE_NEW_PHONE_ERROR,
		error,
	}
}

export const updatePhone = (payload) => {
	return {
		type: constants.UPDATE_PHONE,
		payload,
	}
}

export const updatePhoneSuccess = (status) => {
	return {
		type: constants.UPDATE_PHONE_SUCCESS,
		status,
	}
}

export const updatePhoneError = (error) => {
	return {
		type: constants.UPDATE_PHONE_ERROR,
		error,
	}
}

export const sortByPhoneNameAZ = () => {
	return {
		type: constants.SORT_BY_PHONE_NAME_A_Z,
	}
}

export const sortByPhoneNameZA = () => {
	return {
		type: constants.SORT_BY_PHONE_NAME_Z_A,
	}
}

export const sortByMNameAZ = () => {
	return {
		type: constants.SORT_BY_M_NAME_A_Z,
	}
}

export const sortByMNameZA = () => {
	return {
		type: constants.SORT_BY_M_NAME_Z_A,
	}
}

export const sortByPriceAsc = () => {
	return {
		type: constants.SORT_BY_PRICE_ASC,
	}
}

export const sortByPriceDes = () => {
	return {
		type: constants.SORT_BY_PRICE_DES,
	}
}

export const sortByQuantityAsc = () => {
	return {
		type: constants.SORT_BY_QUANTITY_ASC,
	}
}

export const sortByQuantityDes = () => {
	return {
		type: constants.SORT_BY_QUANTITY_DES,
	}
}

export const banAccount = (username) => {
	return {
		type: constants.BAN_ACCOUNT,
		username,
	}
}

export const banAccountSuccess = (payload) => {
	return {
		type: constants.BAN_ACCOUNT_SUCCESS,
		payload,
	}
}

export const banAccountError = (status) => {
	return {
		type: constants.BAN_ACCOUNT_ERROR,
		status,
	}
}

export const unbanAccount = (username) => {
	return {
		type: constants.UNBAN_ACCOUNT,
		username,
	}
}

export const unbanAccountSuccess = (payload) => {
	return {
		type: constants.UNBAN_ACCOUNT_SUCCESS,
		payload,
	}
}

export const unbanAccountError = (status) => {
	return {
		type: constants.UNBAN_ACCOUNT_ERROR,
		status,
	}
}

export const changeUserRole = (payload) => {
	return {
		type: constants.CHANGE_USER_ROLE,
		payload,
	}
}

export const changeUserRoleSuccess = (payload) => {
	return {
		type: constants.CHANGE_USER_ROLE_SUCCESS,
		payload,
	}
}

export const changeUserRoleError = (error) => {
	return {
		type: constants.CHANGE_USER_ROLE_ERROR,
		error,
	}
}

export const inactivePhone = (productID) => {
	return {
		type: constants.INACTIVE_PHONE,
		productID,
	}
}

export const inactivePhoneSuccess = (payload) => {
	return {
		type: constants.INACTIVE_PHONE_SUCCESS,
		payload,
	}
}

export const inactivePhoneError = (error) => {
	return {
		type: constants.INACTIVE_PHONE_ERROR,
		error,
	}
}

export const activePhone = (productID) => {
	return {
		type: constants.ACTIVE_PHONE,
		productID,
	}
}

export const activePhoneSuccess = (payload) => {
	return {
		type: constants.ACTIVE_PHONE_SUCCESS,
		payload,
	}
}

export const activePhoneError = (error) => {
	return {
		type: constants.ACTIVE_PHONE_ERROR,
		error,
	}
}

export const getAllManufacturer = () => {
	return {
		type: constants.GET_ALL_MANUFACTURER,
	}
}

export const allManufacturerReceived = (payload) => {
	return {
		type: constants.ALL_MANUFACTURER_RECEIVED,
		payload,
	}
}

export const getAllManufacturerError = (error) => {
	return {
		type: constants.GET_ALL_MANUFACTURER_ERROR,
		error,
	}
}

export const filterByManufacturerAllSearch = (payload) => {
	return {
		type: constants.FILTER_BY_MANUFACTURER_ALL_SEARCH,
		payload,
	}
}

export const setOrderStatusTo2 = (orderId) => {
	return {
		type: constants.SET_ORDER_STATUS_TO_2,
		orderId,
	}
}

export const setOrderStatusTo3 = (orderId) => {
	return {
		type: constants.SET_ORDER_STATUS_TO_3,
		orderId,
	}
}

export const setOrderStatusTo4 = (payload) => {
	return {
		type: constants.SET_ORDER_STATUS_TO_4,
		payload,
	}
}

export const getTop1Price = () => {
	return {
		type: constants.GET_TOP_1_PRICE,
	}
}

export const top1PriceReceived = (price) => {
	return {
		type: constants.TOP_1_PRICE_RECEIVED,
		price,
	}
}

export const getTop1PriceError = (error) => {
	return {
		type: constants.GET_TOP_1_PRICE_ERROR,
		error,
	}
}

export const filterByPrice = (payload) => {

	return {
		type: constants.FILTER_BY_PRICE,
		payload,
	}
}

export const getTop3SearchValue = () => {
	return {
		type: constants.GET_TOP_3_SEARCH_VALUE,
	}
}

export const top3SearchValueReceived = (payload) => {
	return {
		type: constants.TOP_3_SEARCH_VALUE_RECEIVED,
		payload,
	}
}

export const getTop3SearchValueError = (error) => {
	return {
		type: constants.GET_TOP_3_SEARCH_VALUE_ERROR,
		error,
	}
}