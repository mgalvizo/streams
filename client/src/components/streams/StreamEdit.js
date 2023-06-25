import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamEdit extends React.Component {
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }

    // This function will be passed as props to the StreamForm component
    onSubmit = formValues => {
        this.props.editStream(this.props.match.params.id, formValues);
    };

    render() {
        // console.log(this.props); // All of the props come from the react-router-dom
        // inside match.params.id we will find the stream id since we define it with a :id
        if (!this.props.stream) {
            return (
                <div className="ui active medium text inline loader">
                    Loading...
                </div>
            );
        }

        return (
            <div>
                <h3 className="ui header">Edit a Stream</h3>
                {/* Pass the onSubmit function and initialValues (special property in redux-form) as props */}
                <StreamForm
                    // This will be used as initial values inside of the form itself, the object keys has to match the names of the <Field>
                    // components, we use _.pick to only pass the properties that we want to edit, to avoid changes to other properties, _.pick
                    // returns a new object.
                    initialValues={_.pick(
                        this.props.stream,
                        'title',
                        'description'
                    )}
                    onSubmit={this.onSubmit}
                />
            </div>
        );
    }
}

// Get the relevant data from redux state
const mapStateToProps = (state, ownProps) => {
    // console.log(ownProps); // is the props object that shows inside of our component
    return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream, editStream })(
    StreamEdit
);
