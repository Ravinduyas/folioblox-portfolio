export default function TestComponent() {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-10 py-16">
      <div className="rounded-[2rem] border border-white/10 bg-white/5 p-10 text-center">
        <p className="text-[#f25c27] font-mono uppercase tracking-[0.20em] text-sm mb-4">
          Demo component
        </p>
        <h2 className="font-display text-3xl md:text-4xl font-semibold text-white mb-3">
          Test Component
        </h2>
        <p className="mx-auto max-w-2xl text-white/70 leading-relaxed">
          This component is added for integration testing or experimentation. It can be used as a placeholder for page content, feature previews, or layout validation.
        </p>
      </div>
    </section>
  );
}
