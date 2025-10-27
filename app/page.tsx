export default function Page() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        fontFamily: "system-ui, -apple-system, sans-serif",
        backgroundColor: "#f9fafb",
        textAlign: "center",
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          backgroundColor: "white",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            color: "#1eaf73",
            marginBottom: "1rem",
          }}
        >
          Empowering the Nation
        </h1>
        <h2
          style={{
            fontSize: "1.25rem",
            color: "#111827",
            marginBottom: "1.5rem",
          }}
        >
          Website Available
        </h2>
        <p
          style={{
            fontSize: "1rem",
            color: "#4b5563",
            lineHeight: "1.6",
            marginBottom: "1.5rem",
          }}
        >
          Your standalone HTML, CSS, and JavaScript website is available in the <strong>public</strong> folder and can
          be accessed directly in your browser.
        </p>
        <div
          style={{
            backgroundColor: "#dbeafe",
            padding: "1rem",
            borderRadius: "8px",
            borderLeft: "4px solid #1eaf73",
            marginBottom: "1rem",
          }}
        >
          <p
            style={{
              fontSize: "0.875rem",
              color: "#1e40af",
              margin: 0,
            }}
          >
            <strong>To view the website:</strong> Open <code>public/index.html</code> in any web browser, or when you
            build this Expo app for web, the website will be served automatically.
          </p>
        </div>
        <p
          style={{
            fontSize: "0.875rem",
            color: "#6b7280",
            marginTop: "1rem",
          }}
        >
          The website includes all features: Home, Courses, Fee Calculator, and Contact pages with full functionality
          matching your mobile app.
        </p>
      </div>
    </div>
  )
}
