import React from 'react';
import { connect } from 'react-redux';
import flv from 'flv.js';
import { fetchStream } from '../../actions';

class StreamShow extends React.Component {
    constructor(props) {
        super(props);
        this.videoRef = React.createRef();
    }

    componentDidMount() {
        // console.log(this.props);
        const { id } = this.props.match.params;
        this.props.fetchStream(id);
        this.buildPlayer();
    }

    // Call the buildPlayer method again after we successfully fetched the stream
    componentDidUpdate() {
        this.buildPlayer();
    }

    // To cleanup the resources that were being used by our component
    // Stop attempting to stream video and detach itself from the video element
    componentWillUnmount() {
        this.player.destroy();
    }

    buildPlayer() {
        // This is to avoud the null videoRef error when reloading the page
        if (this.player || !this.props.stream) {
            return;
        }

        const { id } = this.props.match.params;

        this.player = flv.createPlayer({
            type: 'flv',
            // Pass the id of the stream to the url
            url: `http://localhost:8000/live/${id}.flv`,
        });
        // Pass the ref we created to the method
        this.player.attachMediaElement(this.videoRef.current);
        this.player.load();
    }

    render() {
        if (!this.props.stream) {
            return (
                <div className="ui active medium text inline loader">
                    Loading...
                </div>
            );
        }

        const { title, description } = this.props.stream;
        return (
            <div>
                <video ref={this.videoRef} style={{ width: '100%' }} controls />
                <h1 className="ui header">{title}</h1>
                <p>{description}</p>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream })(StreamShow);
