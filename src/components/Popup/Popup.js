import React from 'react';
import './style/style.css';

class Popup extends React.Component {
    closePopup() {
        const popup = document.getElementById('popup-container');
        popup.style.display = 'none';
        localStorage.setItem("popup", true);
    }
    render() {
        return (
            <div id="popup-container">
                <div>
                    <div>
                    </div>
                    <div>
                        <div>
                            Chúc Mừng Năm Mới 2020
                        </div>
                        <div>
                            Nhân dịp năm mới 2020, Weshop chúc quý khách hàng có một năm đầy vạn sự như ý và đạt nhiều thành công trong công việc. Cảm ơn quý khách đã đồng hành cùng chúng tôi trong suốt thời gian qua.<span style={{ 'color': '#bd081c', 'marginTop': '-20px', 'fontSize': '1.5vw' }} >Xin trân trọng cảm ơn</span>
                        </div>
                    </div>
                    <div>
                        <div>
                            <i onClick={() => { this.closePopup() }} class="fa fa-times"></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Popup;