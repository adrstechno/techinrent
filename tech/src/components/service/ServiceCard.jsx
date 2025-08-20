import { Check } from 'lucide-react';

const ServiceCard = ({ icon, title, description, features, color }) => {
  return (
    <div className={`bg-${color}-50 p-8 rounded-2xl border border-${color}-200 hover:shadow-lg transition-shadow duration-300`}>
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-12 h-12 bg-${color}-100 rounded-full flex items-center justify-center`}>
          {icon}
        </div>
        <h3 className={`font-heading text-xl font-bold text-${color}-700 tracking-tight`}>{title}</h3>
      </div>
      <p className="text-gray-700 mb-6 font-medium leading-relaxed">{description}</p>
      <ul className="text-gray-700 space-y-3 font-medium">
        {features.map((item, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <Check className={`w-5 h-5 text-${color}-600 flex-shrink-0`} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceCard;