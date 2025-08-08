const BenefitCard = ({ icon, title, desc, color }) => (
  <div className={`text-center bg-${color}-50 p-6 rounded-2xl border border-${color}-200 hover:shadow-lg transition-shadow duration-300`}>
    <div className={`w-16 h-16 bg-gradient-to-r from-${color}-500 to-${color}-400 text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl`}>
      {icon}
    </div>
    <h3 className={`font-heading text-lg font-bold text-${color}-700 mb-3 tracking-tight`}>{title}</h3>
    <p className="text-gray-700 text-sm font-medium leading-relaxed">{desc}</p>
  </div>
);

export default BenefitCard;