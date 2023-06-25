import React from 'react';
import { connect } from 'react-redux';
import { createStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamCreate extends React.Component {
    // This function will be passed as props to the StreamForm component
    onSubmit = formValues => {
        this.props.createStream(formValues);
    };

    render() {
        // console.log(this.props);
        return (
            <div>
                <h3>Create a Stream</h3>
                {/* Pass the onSubmit function as props */}
                <StreamForm onSubmit={this.onSubmit} />
            </div>
        );
    }
}

export default connect(null, { createStream })(StreamCreate);
