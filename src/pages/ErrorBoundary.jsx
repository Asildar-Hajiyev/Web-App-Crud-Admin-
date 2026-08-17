import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error, errorInfo) {
    console.log("Error:", error);
    console.log("Error Info:", errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-red-500">
              Oops! 😕
            </h1>

            <p className="mt-3 text-gray-600">
              Gözlənilməz xəta baş verdi.
            </p>

            <button
              onClick={() => window.location.reload()}
              className="mt-5 px-5 py-2 bg-blue-500 text-white rounded"
            >
              Yenidən cəhd et
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;