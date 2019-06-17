import React, { Component } from 'react';

class ErrorBoundary extends Component {
    state = {
        hasError: false
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return (
                <h2>Oops, there was a problem displaying the {this.props.appSection}. Please try again later.</h2>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;