import React from 'react';
import Modal from '../Modal';
import history from '../../history';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStream, deleteStream } from '../../actions/';

class StreamDelete extends React.Component {
    componentDidMount() {
        // console.log(this.props);
        this.props.fetchStream(this.props.match.params.id);
    }

    renderActions() {
        const { id } = this.props.match.params;
        return (
            <React.Fragment>
                {/* Return to the stream list  */}
                <Link to="/" className="ui button">
                    Cancel
                </Link>
                <button
                    onClick={() => this.props.deleteStream(id)}
                    className="ui negative button"
                >
                    Delete
                </button>
            </React.Fragment>
        );
    }

    renderContent() {
        if (!this.props.stream) {
            return <p>Are you sure you want to delete this stream?</p>;
        }

        return (
            <React.Fragment>
                <p>Are you sure you want to delete this stream with title:</p>
                <strong>{this.props.stream.title}</strong>
            </React.Fragment>
        );
    }

    render() {
        return (
            <Modal
                title="Delete Stream"
                content={this.renderContent()}
                actions={this.renderActions()}
                // Return to the stream list when clicking on the background
                onDismiss={() => history.push('/')}
            />
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream, deleteStream })(
    StreamDelete
);
