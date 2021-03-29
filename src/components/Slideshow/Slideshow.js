import React from 'react';
import './style/style.css';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner'
import * as actions from '../../action/index';

class Slideshow extends React.Component {
    constructor() {
        super();
        this.state = {
            currentSlide: 0,
        }
    }
    autoPlay = () => {
        if (this.props.data && this.props.data.length > 0) {
            if (this.state.currentSlide === this.props.data.length - 1) {
                this.setState({ currentSlide: 0 });
            } else {
                this.setState({ currentSlide: this.state.currentSlide + 1 });
            }
        };
    }
    componentDidMount() {
        this.props.getSlideshowData();
        setInterval(() => {
            this.autoPlay();
        }, 5000);
    }
    changeSlide = (i) => {
        this.setState({ currentSlide: i });
    }
    render() {
        let dots = null;
        if (this.props.data && this.props.data.length > 0) {
            dots = this.props.data.map((img, i) => {
                if (this.state.currentSlide === i) {
                    return (
                        <div onClick={() => { this.changeSlide(i) }} style={{ 'background': 'rgba(255,255,255,0.9)', 'borderRadius': '50%', 'width': '1.8vh', 'height': '1.8vh' }}>
                        </div>
                    )
                } else {
                    return (
                        <div onClick={() => { this.changeSlide(i) }} style={{ 'background': 'rgba(255,255,255,0.4)', 'borderRadius': '50%', 'width': '1.5vh', 'height': '1.5vh' }}>
                        </div>
                    )
                }
            });
        };
        return (
            (!this.props.loading && this.props.data && this.props.data.length > 0) ?
                <div id="slideshow" style={{ 'background': `url("${this.props.data[this.state.currentSlide]}")` }}>
                    <center>
                        <div className="dots">
                            {dots}
                        </div>
                    </center>
                </div> :
                <div id="slideshow">
                    <center>
                        <Loader
                            type="ThreeDots"
                            color="black"
                            height={30}
                            width={30}
                            timeout={10000}
                        />
                    </center>
                </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        data: state.getSlideshowData.data,
        loading: state.getSlideshowData.loading,
        error: state.getSlideshowData.error
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getSlideshowData: () => { dispatch(actions.getSlideshowData()) },
        dispatch,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Slideshow);