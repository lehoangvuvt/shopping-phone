import React from 'react';
import './style/style.css';

class Footer extends React.Component {
    render() {
        return (
            <div className="footer-container">
                <div>
                    <div>
                        <div>
                            <i class="fa fa-location-arrow"></i>
                        </div>
                        <div>
                            Lô E2a-7, Đường D1, Khu Công Nghệ Cao, Quận 9 <br />Hồ Chí Minh City, Vietnam
                        </div>
                    </div>
                    <div>
                        <div>
                            <i class="fa fa-phone"></i>
                        </div>
                        <div>
                            <span style={{ 'fontSize': '2.8vh' }}>+84 949661867</span>
                        </div>
                    </div>
                    <div>
                        <div>
                            <i class="fa fa-envelope"></i>
                        </div>
                        <div>
                            <span style={{ 'color': '#1ab7ea','fontSize': '2vh' }}>
                                support@wephone.com
                            </span>
                        </div>
                    </div>
                </div>
                <div>
                    <div></div>
                </div>
            </div>
        )
    }
}

export default Footer;