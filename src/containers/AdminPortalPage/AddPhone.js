import React from 'react';
import { storage } from '../../firebase/firebase';
import { connect } from 'react-redux';
import { TextField, TextareaAutosize } from '@material-ui/core';
import Loader from 'react-loader-spinner';
import * as actions from '../../action/index';

let date = new Date();
class AddPhone extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null,
            url: "",
            preview: "",
            phoneName: "",
            manufacturer: "",
            description: "",
            price: 0,
            year: 2020,
            isUploading: false
        };
    }
    handleChangeImageInput = (e) => {
        if (e.target.files[0]) {
            const image = e.target.files[0];
            if (image.name.split('.')[1].toLowerCase() === "png" || image.name.split('.')[1].toLowerCase() === "jpg" || image.name.split('.')[1].toLowerCase() === "jpeg") {
                this.setState({ image: image });
                const reader = new FileReader();
                reader.readAsDataURL(e.target.files[0])
                reader.onload = () => {
                    this.setState({ preview: reader.result });
                };
            } else {
                alert('File không hợp lệ');
            }
        }
    }
    addPhone = () => {
        if (this.state.phoneName.length >= 3 && this.state.manufacturer.length >= 1 && this.state.description.length >= 1) {
            if (this.state.image !== null) {
                const image = this.state.image;
                const date = new Date();
                const day = date.getDate();
                const month = date.getMonth() + 1;
                const year = date.getFullYear();
                const hour = date.getHours();
                const minutes = date.getMinutes();
                const seconds = date.getSeconds();
                const fullTime = day + '' + month + '' + year + '' + hour + '' + minutes + '' + seconds + '';
                const randomNum = Math.floor(Math.random() * 1000) + 1;
                const imageName = 'phone-' + this.state.phoneName.substring(0, 3) + '' + fullTime + '-' + randomNum + '.' + this.state.image.name.split('.')[1];
                const uploadTask = storage.ref(`images/phones/${imageName}`).put(image);
                uploadTask.on('state_changed'
                    , (snapshot) => {
                        this.setState({ isUploading: true });
                    }
                    , (error) => {
                        console.log(error);
                    }
                    , () => {
                        storage.ref('images/phones').child(imageName).getDownloadURL().then(url => {
                            this.setState({ isUploading: false });
                            const productName = this.state.phoneName;
                            const imgURL = url;
                            const imgName = imageName;
                            const manufactor = this.state.manufacturer;
                            const description = this.state.description;
                            const year = this.state.year;
                            const price = this.state.price;
                            this.props.createNewPhone({ productName: productName, imgURL: imgURL, imgName: imgName, manufactor: manufactor, description: description, year: year, price: price });

                        })
                    });
            } else {
                alert('Vui lòng chọn ảnh của sản phẩm');
            }
        } else {
            alert('Vui lòng nhập vào các trường bị sai hoặc thiếu (báo đỏ)');
        }
    }
    handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'price') {
            if (value < 0 || value === '') {
                alert('Giá của sản phẩm không được bé hơn 0 hoặc rỗng');
            } else {
                this.setState({ [name]: value });
            }
        } else if (name === 'phoneName') {
            if (value.length <= 50) {
                this.setState({ [name]: value });
            }
        } else if (name === 'manufacturer') {
            if (value.length <= 30) {
                this.setState({ [name]: value });
            }
        } else if (name === 'year') {
            if (value < 2010 || value > date.getFullYear()) {
                alert(`Năm sản xuất không được bé hơn 2010 và lớn hơn ${date.getFullYear()} `);
            } else {
                this.setState({ [name]: value });
            }
        }
        else {
            this.setState({ [name]: value });
        }
    }
    render() {
        return (
            !this.state.isUploading && !this.props.createNewPhoneProcess.isLoading ?
                <>
                    <div id="add-phone-container" className='add-phone-container'>
                        <div>
                            <div>Tên sản phẩm <span style={{ 'fontSize': '12px', 'color': this.state.phoneName.length >= 3 ? 'rgba(0,0,0,0.45)' : 'rgba(255,0,0,0.4)' }}>({this.state.phoneName.length}/50)</span></div>
                            <div><TextField
                                error={this.state.phoneName.length < 3 ? true : false}
                                className='input'
                                name="phoneName"
                                placeholder="Nhập tên sản phẩm"
                                value={this.state.phoneName}
                                onChange={this.handleChange}
                                type='text' /></div>
                        </div>
                        <div>
                            <div>Nhà sản xuất <span style={{ 'fontSize': '12px', 'color': this.state.manufacturer.length >= 1 ? 'rgba(0,0,0,0.45)' : 'rgba(255,0,0,0.4)' }}>({this.state.manufacturer.length}/30)</span></div>
                            <div><TextField
                                error={this.state.manufacturer.length < 1 ? true : false}
                                name="manufacturer"
                                placeholder="Nhập tên nhà sản xuất"
                                value={this.state.manufacturer}
                                onChange={this.handleChange}
                                className='input'
                                type='text' /></div>
                        </div>
                        <div>
                            Mô tả sản phẩm <span style={{ 'fontSize': '12px', 'color': this.state.description.length >= 1 ? 'rgba(0,0,0,0.45)' : 'rgba(255,0,0,0.4)' }}>({this.state.description.length}/300)</span>
                            <div><TextareaAutosize
                                error={this.state.description.length < 1 ? true : false}
                                maxLength={300}
                                name="description"
                                placeholder="Nhập mô tả về sản phẩm"
                                value={this.state.description}
                                onChange={this.handleChange}
                                className='txtArea'
                                type='text' /></div>
                        </div>
                        <div>
                            Năm sản xuất
                    <div><TextField
                                name="year"
                                style={{ 'width': '40%' }}
                                value={this.state.year}
                                onChange={this.handleChange}
                                className='input'
                                type='number' /></div>
                        </div>
                        <div>
                            Giá tiền
                    <div><TextField
                                name="price"
                                style={{ 'width': '40%' }}
                                value={this.state.price}
                                onChange={this.handleChange}
                                className='input'
                                type='number' /> VND</div>
                        </div>
                        <div>
                            <div>Chọn ảnh sản phẩm</div>
                            <div>
                                <input
                                    accept="image/*"
                                    placeholder="Chọn ảnh sản phẩm"
                                    type='file' onChange={this.handleChangeImageInput} />
                            </div>
                            <div>
                                {this.state.image !== null ?
                                    <img
                                        src={this.state.preview} />
                                    :
                                    <h3>Không có ảnh nào được chọn</h3>
                                }
                            </div>
                        </div>
                    </div >
                    <div
                        className='add-phone-accept-btn'
                        onClick={() => { this.addPhone() }}>Thêm sản phẩm</div>
                </>
                :
                <div id="add-phone-container" className='add-phone-container'>
                    <div>
                        <Loader
                            type="Oval"
                            color="black"
                            height={60}
                            width={60}
                            timeout={10000}
                        />
                        <h3>Đang thêm sản phẩm mới vào hệ thống. Vui lòng đợi chút...</h3>
                    </div>
                </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createNewPhone: (payload) => { dispatch(actions.createNewPhone(payload)) },
        dispatch,
    }
}

function mapStateToProps(state) {
    return {
        createNewPhoneProcess: state.createNewPhone,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPhone);