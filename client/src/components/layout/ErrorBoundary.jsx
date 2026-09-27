import { Component } from "react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import EmptyState from "../ui/EmptyState";
import Button from "../ui/Button";

export default class ErrorBoundary extends Component {
    state = { error: null };

    static getDerivedStateFromError(error) {
        return { error };
    }

    componentDidUpdate(prevProps) {
        // Navigating away clears the error.
        if (this.state.error && prevProps.resetKey !== this.props.resetKey) {
            this.setState({ error: null });
        }
    }

    render() {
        if (!this.state.error) return this.props.children;
        return (
            <div className="shell pt-10">
                <EmptyState
                    as="h1"
                    icon={ExclamationTriangleIcon}
                    title="Something went wrong"
                    actions={<Button onClick={() => window.location.reload()}>Reload the page</Button>}
                >
                    An unexpected error stopped this page from loading. Reloading usually fixes it.
                </EmptyState>
            </div>
        );
    }
}
