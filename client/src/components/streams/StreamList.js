import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStreams } from '../../actions';

class StreamList extends React.Component {
    // Check the result with Redux DevTools
    componentDidMount() {
        this.props.fetchStreams();
    }

    // Render the buttons to modify own streams
    renderAdmin(stream) {
        if (stream.userId === this.props.currentUserId) {
            return (
                <div className="right floated content">
                    <Link
                        to={`/streams/edit/${stream.id}`}
                        className="ui button primary"
                    >
                        Edit
                    </Link>
                    <Link
                        to={`/streams/delete/${stream.id}`}
                        className="ui button negative"
                    >
                        Delete
                    </Link>
                </div>
            );
        }
    }

    renderList() {
        if (!this.props.streams) {
            return (
                <div className="ui active medium text inline loader">
                    Loading...
                </div>
            );
        }

        return this.props.streams.map(stream => {
            return (
                <div className="item" key={stream.id}>
                    {this.renderAdmin(stream)}
                    <i className="large middle aligned icon camera" />
                    <div className="content">
                        <h3 className="ui header">
                            <Link to={`/streams/${stream.id}`}>
                                {stream.title}
                            </Link>
                        </h3>

                        <div className="description">{stream.description}</div>
                    </div>
                </div>
            );
        });
    }

    // Render a create stream button if the user is logged in
    renderCreate() {
        if (this.props.isSignedIn) {
            return (
                <div style={{ textAlign: 'right' }}>
                    <Link to="/streams/new" className="ui button primary">
                        Create Stream
                    </Link>
                </div>
            );
        }
    }

    render() {
        // console.log(this.props.streams);
        return (
            <div>
                <h2 className="ui header">Streams</h2>
                <div className="ui celled list">{this.renderList()}</div>
                {this.renderCreate()}
            </div>
        );
    }
}

// Turn the object into an array since mapStateToProps is used for component rendering
const mapStateToProps = state => {
    // Create an array with only the values of the streams object
    return {
        streams: Object.values(state.streams),
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn,
    };
};

export default connect(mapStateToProps, { fetchStreams })(StreamList);
