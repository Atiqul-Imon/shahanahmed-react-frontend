export default function ErrorMessage({ message }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center p-8 bg-red-50 rounded-lg max-w-md">
        <h3 className="text-red-600 text-xl font-medium mb-4">Error occurred</h3>
        <p className="text-red-700 mb-4">{message}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}