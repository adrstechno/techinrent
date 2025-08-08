const ProcessStep = ({ step, title, icon, desc, color }) => (
  <div className="text-center group">
    <div
      className={`w-20 h-20 bg-gradient-to-r from-${color}-500 to-${color}-400 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold group-hover:scale-110 transition-transform duration-300`}
    >
      {step}
    </div>
    <h3
      className={`flex items-center justify-center gap-2 font-heading text-xl font-bold text-${color}-700 mb-4 tracking-tight`}
    >
      {icon} {title}
    </h3>
    <p className="text-gray-700 font-medium leading-relaxed">{desc}</p>
  </div>
);

export default ProcessStep;
