import { useState } from 'react';
import { FaFacebookF, FaWhatsapp } from 'react-icons/fa';
import { Mail, MessageSquare, Share2, ChevronLeft, ChevronRight } from 'lucide-react';

function FloatingActions() {
  const [isOpen, setIsOpen] = useState(true);
  const actions = [
    {
      id: 'facebook',
      icon: <FaFacebookF className="w-5 h-5" />, 
      bg: 'bg-gradient-to-r from-[#3B5998] to-[#4c70ba]',
      glow: 'shadow-blue-600/30',
      label: 'Facebook Page',
      link: 'https://facebook.com/yourpage'
    },
    {
      id: 'whatsapp',
      icon: <FaWhatsapp className="w-5 h-5" />, 
      bg: 'bg-gradient-to-r from-[#25D366] to-[#34e075]',
      glow: 'shadow-green-500/30',
      label: 'Chat on WhatsApp',
      link: 'https://wa.me/+918127918160'
    },
    {
      id: 'email',
      icon: <Mail className="w-5 h-5" />,
      bg: 'bg-gradient-to-r from-slate-600 to-slate-500',
      glow: 'shadow-slate-500/30',
      label: 'Send Email',
      link: 'mailto:pujaprinters@gmail.com'
    },
    {
      id: 'sms',
      icon: <MessageSquare className="w-5 h-5" />,
      bg: 'bg-gradient-to-r from-amber-500 to-amber-400 text-slate-900',
      glow: 'shadow-amber-500/30 text-slate-900',
      label: 'Send SMS',
      link: 'sms:+918127918160?body=Hello%20Puja%20Printers'
    },
    {
      id: 'share',
      icon: <Share2 className="w-5 h-5" />,
      bg: 'bg-gradient-to-r from-emerald-500 to-emerald-400',
      glow: 'shadow-emerald-500/30',
      label: 'Share Website',
      link: '#'
    }
  ];
  return (
    <div 
      className={`fixed left-0 top-1/2 -translate-y-1/2 z-50 flex items-center transition-all duration-500 ease-out ${
        isOpen ? 'translate-x-0' : '-translate-x-13.25'
      }`}
    >
      <div className="flex flex-col gap-1.5 p-2 bg-white/80 backdrop-blur-md rounded-r-2xl border-y border-r border-slate-200 shadow-2xl">
        {actions.map((action) => (
          <a key={action.id} href={action.link} target={action.link.startsWith('http') ?'_blank': '_self'} rel="noopener noreferrer" className={`${action.bg} text-white w-11 h-11 flex items-center justify-center rounded-xl transition-all duration-300 shadow-md hover:shadow-xl ${action.glow} hover:-translate-y-0.5 hover:translate-x-1 group relative`}
          >
            <div className="relative z-10 transition-transform duration-300 group-hover:scale-110">
              {action.icon}
            </div>
            <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 hidden md:flex items-center">
              <div className="w-0 h-0 border-y-4 border-y-transparent border-r-4 border-r-slate-900/90"></div>
              <span className="bg-slate-900/90 backdrop-blur-sm text-white text-xs font-semibold py-1.5 px-3 rounded-lg shadow-xl whitespace-nowrap tracking-wide">
                {action.label}
              </span>
            </div>
          </a>
        ))}
      </div>
      <button onClick={() => setIsOpen(!isOpen)} className="bg-white text-slate-700 border border-l-0 border-slate-200 h-10 w-4.5 rounded-r-md flex items-center justify-center shadow-md hover:bg-slate-50 transition-colors cursor-pointer group"
        title={isOpen ? "Hide Toolbar" : "Show Toolbar"}>
        {isOpen ? (
          <ChevronLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
        ) : (
          <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        )}
      </button>
    </div>
  );
}

export default FloatingActions;