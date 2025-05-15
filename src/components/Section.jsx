export function Section({ title, children }) {
    return (
        <section className="mb-12 bg-white p-6 shadow-lg border border-gray-200 rounded-lg">
            <h2>{title}</h2>
            {children}                
        </section>
    )
}