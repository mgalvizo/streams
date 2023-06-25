/*
// Warning: The Google Sign-In JavaScript platform library for Web is deprecated, and unavailable for download after March 31, 2023. 
// Use instead the new Google Identity Services for Web solution to quickly and easily sign users into your app using their Google accounts.
// By default, new client IDs are now blocked from using the older platform library; existing client IDs are unaffected. New client IDs created 
// before July 29th, 2022 may set the plugin_name to enable use of the legacy Google platform library. 
*/

import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions/index';

const CLIENT_ID =
    '997197267942-6vi2n7m1oq17f3oaj1nvj9sdkbslp1f0.apps.googleusercontent.com';

class GoogleAuth extends React.Component {
    // Initialize the client portion of the gapi library just one time
    componentDidMount() {
        window.gapi.load('client:auth2', async () => {
            // After the library was loaded the following function will be called
            // Async client initialization that returns a promise
            try {
                await window.gapi.client.init({
                    clientId: CLIENT_ID,
                    scope: 'email',
                    // Arbitrary plugin name so deprecated api still works
                    plugin_name: 'streamy',
                });

                // Get reference to auth object
                this.auth = window.gapi.auth2.getAuthInstance();
                // Check if the user is signed in
                this.onAuthChange(this.auth.isSignedIn.get());
                // Listen for an event of auth change
                this.auth.isSignedIn.listen(this.onAuthChange);
            } catch (err) {
                console.log(err);
            }
        });
    }

    // This will be called any time that our authentication status changes according to the GoogleAPI
    // Gets called with a boolean argument of either true or false to indicate whether or not the user is signed in
    onAuthChange = isSignedIn => {
        if (isSignedIn) {
            // Pass the current signed in user google id to the action creator.
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
    };

    // Run the gapi instance's sign in method
    onSignInClick = () => {
        this.auth.signIn();
    };

    // Run the gapi instance's sign out method
    onSignOutClick = () => {
        this.auth.signOut();
    };

    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return null;
        } else if (this.props.isSignedIn) {
            return (
                <button
                    onClick={this.onSignOutClick}
                    className="ui red google button"
                >
                    <i className="google icon" />
                    Sign Out
                </button>
            );
        } else {
            return (
                <button
                    onClick={this.onSignInClick}
                    className="ui red google button"
                >
                    <i className="google icon" />
                    Sign In with Google
                </button>
            );
        }
    }

    render() {
        return <div>{this.renderAuthButton()}</div>;
    }
}

const mapStateToProps = state => {
    return {
        isSignedIn: state.auth.isSignedIn,
    };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
