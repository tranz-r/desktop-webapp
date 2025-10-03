export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Tranzr Group
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Building Tomorrow's Mobility Solutions
          </p>
          <div className="bg-gray-100 rounded-lg p-8">
            <h2 className="text-2xl font-semibold mb-4">Coming Soon</h2>
            <p className="text-gray-700">
              We're working on something amazing. Stay tuned for updates.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
