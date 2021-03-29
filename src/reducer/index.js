import * as constants from '../constants/constants';
const initialState = {
	getManufacturer: {
		loading: false,
		error: false,
		manufacturers: null
	},
	getSlideshowData: {
		loading: false,
		error: false,
		data: null
	},
	cartData: [],
	totalCartQuantity: 0,
	login: {
		loading: false,
		error: false,
	},
	changePassword: {
		isLoading: false,
		status: null,
		isSuccess: false,
		error: false,
	},
	userData: null,
	changeProfileInfo: {
		isLoading: false,
		status: null,
		isSuccess: false,
		error: false
	},
	userDetails: null,
	getUserDetails: {
		isLoading: false,
		error: false,
	},
	allUsers: null,
	getAllUsers: {
		isLoading: false,
		error: false,
	},
	getUserOrders: {
		isLoading: false,
		error: false,
	},
	userOrders: [],
	getOrderDetails: {
		isLoading: false,
		error: false,
	},
	orderDetails: null,
	placingOrderInformation: {
		address: null,
		city: null,
		country: null,
		paymentMethod: null,
		phone: null,
		placingOrderStatus: false,
	},
	getPhoneDetails: {
		loading: false,
		error: false,
	},
	phoneDetails: null,
	phoneListByM: [],
	getPhoneListByM: {
		isLoading: false,
		error: false,
	},
	phoneListByName: null,
	getPhoneListByName: {
		isLoading: false,
		error: false,
	},
	adminOpt: 1,
	allPhones: null,
	getAllPhones: {
		isLoading: false,
		error: false,
	},
	allOrders: [],
	getAllOrders: {
		isLoading: false,
		error: false,
	},
	getPendingOrdersCount: {
		isLoading: false,
		error: false,
	},
	pendingOrdersCount: 0,
	getPhoneRating: {
		isLoading: false,
		error: false,
	},
	totalRate: 0,
	rateTime: 0,
	getTopOrderPhones: {
		isLoading: false,
		error: false,
	},
	topOrderPhones: [],
	createNewPhone: {
		isLoading: false,
		status: null,
		isSuccess: false,
		error: false
	},
	updatePhone: {
		isLoading: false,
		status: null,
		isSuccess: false,
		error: false
	},
	banAccount: {
		isLoading: false,
		status: null,
	},
	unbanAccount: {
		isLoading: false,
		status: null,
	},
	changeUserRole: {
		isLoading: false,
		status: null,
	},
	addNewOrder: {
		isLoading: false,
		status: null,
	},
	inactivePhone: {
		isLoading: false,
		status: null,
	},
	activePhone: {
		isLoading: false,
		status: null,
	},
	allManufacturer: null,
	getAllManufacturer: {
		isLoading: false,
		error: false,
	},
	filterByManufacturerAllSearch: [],
	getTop1Price: {
		isLoading: false,
		error: false,
	},
	top1Price: 0,
	priceRange: [],
	getAllPhoneList: {
		isLoading: false,
		error: false,
	},
	getTop3SearchValue: {
		isLoading: false,
		error: false,
	},		
	top3SearchValues: null,
};

function rootReducer(state = initialState, action) {
	switch (action.type) {
		case constants.GET_MANUFACTURER:
			return {
				...state,
				getManufacturer	: {
					loading: true,
				},
			};
		case constants.MANUFACTURER_RECEIVED:
			return {
				...state,
				getManufacturer: {
					loading: false,
					error: false,
					manufacturers: action.payload,
				}
			};
		case constants.GET_MANUFACTURER_ERROR:
			return {
				...state,
				getManufacturer: {
					loading: false,
					error: action.payload,
					manufacturers: null,
				},
			};
		case constants.GET_SLIDESHOW_DATA:
			return {
				...state,
				getSlideshowData: {
					loading: true,
				},
			};
		case constants.SLIDESHOW_DATA_RECEIVED:
			return {
				...state,
				getSlideshowData: {
					loading: false,
					error: false,
					data: action.payload,
				}
			};
		case constants.GET_SLIDESHOW_DATA_ERROR:
			return {
				...state,
				getSlideshowData: {
					loading: false,
					error: action.payload,
					data: null,
				},
			};
		case constants.TICK_ALL_CART_ITEMS:
			let cartAfterTickAll = state.cartData.map(i => i);
			cartAfterTickAll.forEach(i => {
				i.isTicked = action.status;
			});
			return {
				...state,
				cartData: cartAfterTickAll,
			};
		case constants.TICK_CART_ITEM:
			let cartAfterTickOne = state.cartData.map(i => i);
			cartAfterTickOne.forEach(i => {
				if (i.id === action.id) {
					i.isTicked = !i.isTicked;
				}
			});
			return {
				...state,
				cartData: cartAfterTickOne,
			};
		case constants.DELETE_ITEMS_FROM_CART:
			let amount = 0;
			let cart = state.cartData;
			cart.forEach(c => {
				if (c.isTicked) {
					amount = amount + c.amount;
				}
			})
			return {
				...state,
				cartData: state.cartData.filter(i => i.isTicked !== true),
				totalCartQuantity: state.totalCartQuantity - amount,
			};
		case constants.ADD_ITEM_AMOUNT_FROM_CART:
			let cartAfterAddAmountItem = state.cartData.map(i => i);
			cartAfterAddAmountItem.forEach(i => {
				if (i.id === action.id) {
					i.amount = i.amount + 1;
				};
			});
			return {
				...state,
				cartData: cartAfterAddAmountItem,
				totalCartQuantity: state.totalCartQuantity + 1,
			};
		case constants.MINUS_ITEM_AMOUNT_FROM_CART:
			let cartAfterMinusAmountItem = state.cartData.map(i => i);
			cartAfterMinusAmountItem.forEach(i => {
				if (i.id === action.id) {
					i.amount = i.amount - 1;
				};
			});
			return {
				...state,
				cartData: cartAfterMinusAmountItem.filter(i => i.amount > 0),
				totalCartQuantity: state.totalCartQuantity - 1,
			};
		case constants.INPUT_ORDER_PLACING_INFORMATION:
			if (action.payload.fieldName === 'address') {
				return {
					...state,
					placingOrderInformation: {
						...state.placingOrderInformation,
						address: action.payload.value
					},
				}
			} else if (action.payload.fieldName === 'city') {
				return {
					...state,
					placingOrderInformation: {
						...state.placingOrderInformation,
						city: action.payload.value
					},
				}
			} else if (action.payload.fieldName === 'country') {
				return {
					...state,
					placingOrderInformation: {
						...state.placingOrderInformation,
						country: action.payload.value
					},
				}
			} else if (action.payload.fieldName === 'phone') {
				return {
					...state,
					placingOrderInformation: {
						...state.placingOrderInformation,
						phone: action.payload.value
					},
				}
			} else if (action.payload.fieldName === 'paymentMethod') {
				return {
					...state,
					placingOrderInformation: {
						...state.placingOrderInformation,
						paymentMethod: action.payload.value
					},
				}
			};
		case constants.LOGIN:
			return {
				...state,
				login: {
					loading: true,
					error: false,
				},
			};
		case constants.LOGIN_INFORMATION_RECEIVED:
			return {
				...state,
				login: {
					loading: false,
					error: false,
				},
				userData: action.user,
			};
		case constants.LOGIN_ERROR:
			return {
				...state,
				login: {
					loading: false,
					error: action.error,
				},
			};
		case constants.RESET_LOGIN_STATE:
			return {
				...state,
				login: {
					loading: false,
					error: false,
				}
			};
		case constants.LOGOUT:
			return {
				...state,
				userData: null,
			};
		case constants.GET_PHONE_DETAILS:
			return {
				...state,
				getPhoneDetails: {
					loading: true,
					error: false,
				},
			};
		case constants.PHONE_DETAILS_RECEIVED:
			return {
				...state,
				getPhoneDetails: {
					loading: false,
					error: false,
				},
				phoneDetails: action.payload,
			};
		case constants.GET_PHONE_DETAILS_ERROR:
			return {
				...state,
				phoneDetails: null,
				getPhoneDetails: {
					loading: false,
					error: action.payload,
				},
			};
		case constants.ADD_TO_CART:
			const id = action.payload.productID;
			const newPhoneToCart = {
				id: action.payload.productID, name: action.payload.phoneName, manufacturer: action.payload.manufactor,
				img: action.payload.imageURL, price: action.payload.price, year: action.payload.year, amount: 1, isTicked: false
			};
			let isDup = false;
			const updatedCart = state.cartData;
			updatedCart.map(phone => {
				if (id === phone.id) {
					phone.amount = phone.amount + 1;
					isDup = true;
				}
			});
			if (isDup) {
				return {
					...state,
					cartData: updatedCart,
					totalCartQuantity: state.totalCartQuantity + 1,
				}
			} else {
				return {
					...state,
					cartData: [...state.cartData, newPhoneToCart],
					totalCartQuantity: state.totalCartQuantity + 1
				}
			};
		case constants.CHANGE_PROFILE_INFO:
			return {
				...state,
				changeProfileInfo: {
					isLoading: false,
				}
			};
		case constants.CHANGE_PROFILE_INFO_SUCCESS:
			alert("Cập nhật thông tin thành công");
			return {
				...state,
				changeProfileInfo: {
					isLoading: false,
					status: action.payload.status,
					isSuccess: true,
					error: false,
				},
				userData: {
					...state.userData,
					fullname: action.payload.data.fullname,
					address: action.payload.data.address,
					email: action.payload.data.email,
					phoneNumber: action.phoneNumber,
				}
			};
		case constants.CHANGE_PROFILE_INFO_ERROR:
			alert("Cập nhật thông tin thất bại");
			return {
				...state,
				changeProfileInfo: {
					isLoading: false,
					status: action.error,
					isSuccess: false,
					error: action.error,
				},
			};
		case constants.CHANGE_PASSWORD:
			return {
				...state,
				changePassword: {
					isLoading: true,
					error: false,
					status: null,
					isSuccess: false,
				},
			};
		case constants.CHANGE_PASSWORD_SUCCESS:
			localStorage.setItem('password', action.payload.newPassword);
			return {
				...state,
				changePassword: {
					isLoading: false,
					status: action.payload.status,
					isSuccess: true,
					error: false,
				},
			};
		case constants.CHANGE_PASSWORD_ERROR:
			return {
				...state,
				changePassword: {
					isLoading: false,
					status: action.error,
					isSuccess: true,
					error: action.error,
				},
			};
		case constants.GET_USER_ORDERS:
			return {
				...state,
				getUserOrders: {
					isLoading: true,
					error: false
				},
			};
		case constants.USER_ORDERS_RECEIVED:
			return {
				...state,
				getUserOrders: {
					isLoading: false,
					error: false,
				},
				userOrders: action.payload.reverse(),
			};
		case constants.USER_ORDERS_RECEIVE_ERROR:
			return {
				...state,
				getUserOrders: {
					isLoading: false,
					error: action.payload.error,
				},
				userOrders: [],
			};
		case constants.GET_ORDER_DETAILS:
			return {
				...state,
				getOrderDetails: {
					isLoading: true,
					error: false,
				},
			};
		case constants.ORDER_DETAILS_RECEIVED:
			return {
				...state,
				getOrderDetails: {
					isLoading: false,
					error: false,
				},
				orderDetails: action.payload,
			};
		case constants.ORDER_DETAILS_RECEIVE_ERROR:
			return {
				...state,
				getOrderDetails: {
					isLoading: false,
					error: action.payload,
				},
				orderDetails: null,
			};
		case constants.GET_PHONE_LIST_BY_M:
			return {
				...state,
				getPhoneListByM: {
					isLoading: true,
					error: false,
				},
				phoneListByM: [],
			};
		case constants.PHONE_LIST_BY_M_RECEIVED:
			return {
				...state,
				getPhoneListByM: {
					isLoading: false,
					error: false,
				},
				phoneListByM: action.payload,
			};
		case constants.PHONE_LIST_BY_M_RECEIVE_ERROR:
			return {
				...state,
				getPhoneListByM: {
					isLoading: false,
					error: action.payload,
				},
				phoneListByM: [],
			};
		case constants.GET_PHONE_LIST_BY_NAME:
			return {
				...state,
				getPhoneListByName: {
					isLoading: true,
					error: false,
				},
				phoneListByName: null,
			};
		case constants.PHONE_LIST_BY_NAME_RECEIVED:
			return {
				...state,
				getPhoneListByName: {
					isLoading: false,
					error: false,
				},
				phoneListByName: action.payload,
			};
		case constants.PHONE_LIST_BY_NAME_RECEIVE_ERROR:
			return {
				...state,
				getPhoneListByName: {
					isLoading: false,
					error: action.payload,
				},
				phoneListByName: [],
			};
		case constants.GET_ALL_PHONE_LIST:
			return {
				...state,
				getAllPhoneList: {
					isLoading: true,
					error: false,
				},
				allPhones: null,
			};
		case constants.ALL_PHONE_LIST_RECEIVED:
			return {
				...state,
				getAllPhoneList: {
					isLoading: false,
					error: false,
				},
				allPhones: action.payload,
			};
		case constants.GET_ALL_PHONE_LIST_ERROR:
			return {
				...state,
				getAllPhoneList: {
					isLoading: false,
					error: action.payload,
				},
				allPhones: null,
			};
		case constants.GET_ALL_USERS:
			return {
				...state,
				getAllUsers: {
					isLoading: true,
					error: false,
				},
			};
		case constants.ALL_USERS_RECEIVED:
			return {
				...state,
				getAllUsers: {
					isLoading: false,
					error: false,
				},
				allUsers: action.payload,
			};
		case constants.GET_ALL_USERS_ERROR:
			return {
				...state,
				getAllUsers: {
					isLoading: false,
					error: action.payload,
				},
				allUsers: [],
			};
		case constants.CHANGE_ADMIN_OPT:
			return {
				...state,
				adminOpt: action.opt,
			};
		case constants.GET_ALL_PHONES:
			return {
				...state,
				getAllPhones: {
					isLoading: true,
					error: false,
				},
			};
		case constants.ALL_PHONES_RECEIVED:
			return {
				...state,
				getAllPhones: {
					isLoading: false,
					error: false,
				},
				allPhones: action.payload,
			};
		case constants.GET_ALL_PHONES_ERROR:
			return {
				...state,
				getAllPhones: {
					isLoading: false,
					error: action.payload,
				},
				allPhones: [],
			};
		case constants.GET_ALL_ORDERS:
			return {
				...state,
				getAllOrders: {
					isLoading: true,
					error: false,
				},
				allOrders: [],
			};
		case constants.ALL_ORDERS_RECEIVED:
			return {
				...state,
				getAllOrders: {
					isLoading: false,
					error: false,
				},
				allOrders: action.payload,
			};
		case constants.GET_ALL_ORDERS_ERROR:
			return {
				...state,
				getAllOrders: {
					isLoading: false,
					error: action.payload,
				},
				allOrders: [],
			};
		case constants.GET_PENDING_ORDERS_COUNT:
			return {
				...state,
				getPendingOrdersCount: {
					isLoading: true,
					error: false,
				},
				pendingOrdersCount: 0,
			};
		case constants.PENDING_ORDERS_COUNT_RECEIVED:
			return {
				...state,
				getPendingOrdersCount: {
					isLoading: false,
					error: false,
				},
				pendingOrdersCount: action.count,
			};
		case constants.GET_PENDING_ORDERS_COUNT_ERROR:
			return {
				...state,
				getPendingOrdersCount: {
					isLoading: false,
					error: false,
				},
				pendingOrdersCount: 0,
			};
		case constants.GET_PHONE_RATING:
			return {
				...state,
				getPhoneRating: {
					isLoading: true,
					error: false,
				},
				totalRate: 0,
				rateTime: 0,
			};
		case constants.PHONE_RATING_RECEIVED:
			return {
				...state,
				getPhoneRating: {
					isLoading: false,
					error: false,
				},
				totalRate: action.payload.totalRate,
				rateTime: action.payload.rateTime,
			};
		case constants.GET_PHONE_RATING_ERROR:
			return {
				...state,
				getPhoneRating: {
					isLoading: false,
					error: action.payload,
				},
				totalRate: 0,
				rateTime: 0,
			};
		case constants.GET_TOP_ORDER_PHONES:
			return {
				...state,
				getTopOrderPhones: {
					isLoading: true,
					error: false,
				},
				topOrderPhones: [],
			};
		case constants.TOP_ORDER_PHONES_RECEIVED:
			return {
				...state,
				getTopOrderPhones: {
					isLoading: false,
					error: false,
				},
				topOrderPhones: action.payload,
			};
		case constants.GET_TOP_ORDER_PHONES_ERROR:
			return {
				...state,
				getTopOrderPhones: {
					isLoading: false,
					error: action.payload,
				},
				topOrderPhones: [],
			};
		case constants.GET_USER_DETAILS:
			return {
				...state,
				getUserDetails: {
					isLoading: true,
					error: false,
				}
			};
		case constants.USER_DETAILS_RECEIVED:
			return {
				...state,
				getUserDetails: {
					isLoading: false,
					error: false,
				},
				userDetails: action.payload,
			};
		case constants.GET_USER_DETAILS_ERROR:
			return {
				...state,
				getUserDetails: {
					isLoading: false,
					error: action.payload,
				},
				userDetails: null,
			};
		case constants.CHANGE_STATUS_MODE:
			let updatedStatusUsers = state.allUsers;
			updatedStatusUsers.forEach(u => {
				if (u.username === action.username) {
					u.isChangeStatusMode = !u.isChangeStatusMode;
				}
			})
			return {
				...state,
				allUsers: updatedStatusUsers,
			};
		case constants.CREATE_NEW_PHONE:
			return {
				...state,
				createNewPhone: {
					isLoading: true,
				},
			};
		case constants.CREATE_NEW_PHONE_SUCCESS:
			alert("Thêm sản phẩm thành công");
			return {
				...state,
				createNewPhone: {
					isLoading: false,
					status: action.status,
					isSuccess: true,
					error: false,
				},
			};
		case constants.CREATE_NEW_PHONE_ERROR:
			alert("Thêm sản phẩm thất bại");
			return {
				...state,
				createNewPhone: {
					isLoading: false,
					status: action.error,
					isSuccess: false,
					error: action.error,
				}
			};
		case constants.UPDATE_PHONE:
			return {
				...state,
				updatePhone: {
					isLoading: true,
				},
			};
		case constants.UPDATE_PHONE_SUCCESS:
			alert("Cập nhật sản phẩm thành công");
			return {
				...state,
				updatePhone: {
					isLoading: false,
					status: action.status,
					isSuccess: true,
					error: false,
				},
			};
		case constants.UPDATE_PHONE_ERROR:
			alert("Cập nhật sản phẩm thất bại");
			return {
				...state,
				updatePhone: {
					isLoading: false,
					status: action.error,
					isSuccess: false,
					error: action.error,
				}
			};
		case constants.SORT_BY_PHONE_NAME_A_Z:
			let sortedPhonesAZ = [...state.allPhones];
			sortedPhonesAZ.sort((a, b) => {
				if (a.phoneName < b.phoneName) {
					return -1;
				} else if (a.phoneName > b.phoneName) {
					return 1;
				} else {
					return 0;
				}
			});
			return {
				...state,
				allPhones: sortedPhonesAZ,
			};
		case constants.SORT_BY_PHONE_NAME_Z_A:
			let sortedPhonesZA = [...state.allPhones];
			sortedPhonesZA.sort((a, b) => {
				if (a.phoneName > b.phoneName) {
					return -1;
				} else if (a.phoneName < b.phoneName) {
					return 1;
				} else {
					return 0;
				}
			});
			return {
				...state,
				allPhones: sortedPhonesZA,
			};
		case constants.SORT_BY_M_NAME_A_Z:
			let sortedPhonesMAZ = [...state.allPhones];
			sortedPhonesMAZ.sort((a, b) => {
				if (a.manufactor < b.manufactor) {
					return -1;
				} else if (a.manufactor > b.manufactor) {
					return 1;
				} else {
					return 0;
				}
			});
			return {
				...state,
				allPhones: sortedPhonesMAZ,
			};
		case constants.SORT_BY_M_NAME_Z_A:
			let sortedPhonesMZA = [...state.allPhones];
			sortedPhonesMZA.sort((a, b) => {
				if (a.manufactor > b.manufactor) {
					return -1;
				} else if (a.manufactor < b.manufactor) {
					return 1;
				} else {
					return 0;
				}
			});
			return {
				...state,
				allPhones: sortedPhonesMZA,
			};
		case constants.SORT_BY_PRICE_ASC:
			let sortedPhonesPriceAsc = [...state.allPhones];
			sortedPhonesPriceAsc.sort((a, b) => {
				return a.price - b.price;
			});
			return {
				...state,
				allPhones: sortedPhonesPriceAsc,
			};
		case constants.SORT_BY_PRICE_DES:
			let sortedPhonesPriceDes = [...state.allPhones];
			sortedPhonesPriceDes.sort((a, b) => {
				return b.price - a.price;
			});
			return {
				...state,
				allPhones: sortedPhonesPriceDes,
			};
		case constants.SORT_BY_QUANTITY_ASC:
			let sortedPhonesQuantityAsc = [...state.allPhones];
			sortedPhonesQuantityAsc.sort((a, b) => {
				return a.quantity - b.quantity;
			});
			return {
				...state,
				allPhones: sortedPhonesQuantityAsc,
			};
		case constants.SORT_BY_QUANTITY_DES:
			let sortedPhonesQuantityDes = [...state.allPhones];
			sortedPhonesQuantityDes.sort((a, b) => {
				return b.quantity - a.quantity;
			});
			return {
				...state,
				allPhones: sortedPhonesQuantityDes,
			};
		case constants.BAN_ACCOUNT:
			return {
				...state,
				banAccount: {
					isLoading: true,
					status: null,
				},
			};
		case constants.BAN_ACCOUNT_SUCCESS:
			let updatedUserListBan = [...state.allUsers];
			updatedUserListBan.forEach(user => {
				if (user.username === action.payload.username) {
					user.status = false;
				};
			});
			return {
				...state,
				banAccount: {
					isLoading: false,
					status: action.payload.status,
				},
				allUsers: updatedUserListBan,
			};
		case constants.BAN_ACCOUNT_ERROR:
			return {
				...state,
				banAccount: {
					isLoading: false,
					status: action.status,
				}
			};
		case constants.BAN_ACCOUNT:
			return {
				...state,
				banAccount: {
					isLoading: true,
					status: null,
				},
			};
		case constants.UNBAN_ACCOUNT_SUCCESS:
			let updatedUserListUnban = [...state.allUsers];
			updatedUserListUnban.forEach(user => {
				if (user.username === action.payload.username) {
					user.status = true;
				};
			});
			return {
				...state,
				unbanAccount: {
					isLoading: false,
					status: action.payload.status,
				},
				allUsers: updatedUserListUnban,
			};
		case constants.UNBAN_ACCOUNT_ERROR:
			return {
				...state,
				unbanAccount: {
					isLoading: false,
					status: action.status,
				}
			};
		case constants.CHANGE_USER_ROLE:
			return {
				...state,
				changeUserRole: {
					isLoading: true,
					status: null,
				},
			};
		case constants.CHANGE_USER_ROLE_SUCCESS:
			alert('Cập nhật thành công');
			let updatedRoleUserList = [...state.allUsers];
			updatedRoleUserList.forEach(user => {
				if (user.username === action.payload.username) {
					user.roleId = action.payload.roleId;
				}
			});
			return {
				...state,
				changeUserRole: {
					isLoading: true,
					status: 200,
				},
				allUsers: updatedRoleUserList,
			};
		case constants.CHANGE_USER_ROLE_ERROR:
			alert('Cập nhật thất bại');
			return {
				...state,
				changeUserRole: {
					isLoading: false,
					status: action.error,
				},
			};
		case constants.ADD_NEW_ORDER:
			return {
				...state,
				addNewOrder: {
					isLoading: true,
					status: null,
				},
			};
		case constants.ADD_NEW_ORDER_SUCCESS:
			return {
				...state,
				addNewOrder: {
					isLoading: false,
					status: action.status,
				},
			};
		case constants.ADD_NEW_ORDER_ERROR:
			return {
				...state,
				addNewOrder: {
					isLoading: false,
					status: action.error,
				},
			};
		case constants.INACTIVE_PHONE:
			return {
				...state,
				inactivePhone: {
					isLoading: true,
					status: null,
				},
			};
		case constants.INACTIVE_PHONE_SUCCESS:
			let updatedStatusPhoneInactive = [...state.allPhones];
			updatedStatusPhoneInactive.forEach(phone => {
				if (phone.productID === action.payload.productID) {
					phone.status = false;
				};
			});
			return {
				...state,
				inactivePhone: {
					isLoading: false,
					status: action.payload.status,
				},
				allPhones: updatedStatusPhoneInactive,
			};
		case constants.INACTIVE_PHONE_ERROR:
			return {
				...state,
				inactivePhone: {
					isLoading: false,
					status: action.error,
				},
			};
		case constants.ACTIVE_PHONE:
			return {
				...state,
				activePhone: {
					isLoading: true,
					status: null,
				},
			};
		case constants.ACTIVE_PHONE_SUCCESS:
			let updatedStatusPhoneActive = [...state.allPhones];
			updatedStatusPhoneActive.forEach(phone => {
				if (phone.productID === action.payload.productID) {
					phone.status = true;
				};
			});
			return {
				...state,
				activePhone: {
					isLoading: false,
					status: action.payload.status,
				},
				allPhones: updatedStatusPhoneActive,
			};
		case constants.ACTIVE_PHONE_ERROR:
			return {
				...state,
				activePhone: {
					isLoading: false,
					status: action.error,
				},
			};
		case constants.GET_ALL_MANUFACTURER:
			return {
				...state,
				getAllManufacturer: {
					isLoading: true,
					error: false,
				},
			};
		case constants.ALL_MANUFACTURER_RECEIVED:
			return {
				...state,
				getAllManufacturer: {
					isLoading: false,
					error: false,
				},
				allManufacturer: action.payload,
			};
		case constants.GET_ALL_MANUFACTURER_ERROR:
			return {
				...state,
				getAllManufacturer: {
					isLoading: false,
					error: action.error,
				},
			};
		case constants.FILTER_BY_MANUFACTURER_ALL_SEARCH:
			if (state.priceRange.length === 0) {
				let filterByManufacturerAllSearch = [];
				let allPhones = state.allPhones;
				let manuArr = action.payload;
				allPhones.forEach(phone => {
					manuArr.forEach(m => {
						if (phone.manufactor === m) {
							filterByManufacturerAllSearch = [...filterByManufacturerAllSearch, phone];
						};
					});
				});
				return {
					...state,
					filterByManufacturerAllSearch: filterByManufacturerAllSearch,
				};
			} else {
				let filterByManufacturerAllSearch = [];
				let allPhones = state.allPhones;
				let manuArr = action.payload;
				allPhones.forEach(phone => {
					manuArr.forEach(m => {
						if (phone.manufactor === m) {
							filterByManufacturerAllSearch = [...filterByManufacturerAllSearch, phone];
						};
					});
				});
				return {
					...state,
					filterByManufacturerAllSearch: filterByManufacturerAllSearch.filter((p) => {
						return p.price >= state.priceRange[0] && p.price <= state.priceRange[1];
					}),
				};
			};
		case constants.GET_TOP_1_PRICE:
			return {
				...state,
				getTop1Price: {
					isLoading: true,
					error: false,
				},
				top1Price: 0,
			};
		case constants.TOP_1_PRICE_RECEIVED:
			return {
				...state,
				getTop1Price: {
					isLoading: false,
					error: false,
				},
				top1Price: action.price,
			};
		case constants.GET_TOP_1_PRICE:
			return {
				...state,
				getTop1Price: {
					isLoading: false,
					error: action.error,
				},
				top1Price: 0,
			};
		case constants.FILTER_BY_PRICE:
			if (state.filterByManufacturerAllSearch.length > 0 && state.priceRange.length === 0) {
				return {
					...state,
					priceRange: [action.payload.priceRange[0], action.payload.priceRange[1]],
					filterByManufacturerAllSearch: state.filterByManufacturerAllSearch.filter(p => {
						return p.price >= action.payload.priceRange[0] && p.price <= action.payload.priceRange[1];
					}),
				};
			} else if (state.filterByManufacturerAllSearch.length === 0 && state.priceRange.length === 0) {
				let filterPriceList = [...state.allPhones];
				return {
					...state,
					priceRange: [action.payload.priceRange[0], action.payload.priceRange[1]],
					filterByManufacturerAllSearch: filterPriceList.filter(p => {
						return p.price >= action.payload.priceRange[0] && p.price <= action.payload.priceRange[1];
					}),
				};
			} else if (state.filterByManufacturerAllSearch.length > 0 && state.priceRange.length > 0) {
				let filterPriceList = [...state.allPhones];
				return {
					...state,
					priceRange: [action.payload.priceRange[0], action.payload.priceRange[1]],
					filterByManufacturerAllSearch: filterPriceList.filter(p => {
						return p.price >= action.payload.priceRange[0] && p.price <= action.payload.priceRange[1];
					}),
				};
			} else if (state.filterByManufacturerAllSearch.length === 0 && state.priceRange.length > 0) {
				let filterPriceList = [...state.allPhones];
				return {
					...state,
					priceRange: [action.payload.priceRange[0], action.payload.priceRange[1]],
					filterByManufacturerAllSearch: filterPriceList.filter(p => {
						return p.price >= action.payload.priceRange[0] && p.price <= action.payload.priceRange[1];
					}),
				};
			};
		case constants.GET_TOP_3_SEARCH_VALUE:
			return {
				...state,
				getTop3SearchValue: {
					isLoading: true,
					error: false,
				},
			};
		case constants.TOP_3_SEARCH_VALUE_RECEIVED:
			return {
				...state,
				getTop3SearchValue: {
					isLoading: false,
					error: false,
				},
				top3SearchValues: action.payload,
			};
		case constants.GET_TOP_3_SEARCH_VALUE_ERROR:
			return {
				...state,
				getTop3SearchValue: {
					isLoading: false,
					error: action.error,
				},
			};
		default:
			return state;
	}
}

export default rootReducer;