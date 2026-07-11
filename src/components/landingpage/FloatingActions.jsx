import { useState } from 'react';
import { FaFacebookF, FaWhatsapp } from 'react-icons/fa';
import { Mail, MessageSquare, ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';

function FloatingActions() {
  const [isOpen, setIsOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(true);

  const actions = [
    {
      id: 'facebook',
      icon: <FaFacebookF className="w-5 h-5" />, 
      bg: 'bg-gradient-to-r from-[#3B5998] to-[#4c70ba]',
      glow: 'shadow-blue-600/30',
      label: 'Facebook Page',
      link: 'https://www.facebook.com/sharer.php?t=Pujaprinters&u=https%3A%2F%2Fpujaprinters.com%2F'
    },
    {
      id: 'whatsapp',
      icon: <FaWhatsapp className="w-5 h-5" />, 
      bg: 'bg-gradient-to-r from-[#25D366] to-[#34e075]',
      glow: 'shadow-green-500/30',
      label: 'Chat on WhatsApp',
      link: 'https://wa.me/918127918160?text=Hello%20Puja%20Printers'
    },
    {
      id: "email",
      icon: <Mail className="w-5 h-5" />,
      bg: 'bg-gradient-to-r from-slate-600 to-slate-500',
      glow: 'shadow-slate-500/30',
      label: 'Send Email',
      link: 'mailto:Pujaprinters75@gmail.com'
    },
    {
      id: "sms",
      icon: <MessageSquare className="w-5 h-5" />,
      bg: 'bg-gradient-to-r from-amber-500 to-amber-400 text-slate-900',
      glow: 'shadow-amber-500/30 text-slate-900',
      label: 'Send SMS',
      link: 'sms:+918127918160?body=Hello%20Puja%20Printers'
    }
  ];

  return (
    <>
      <div
        className={`hidden md:flex fixed left-0 top-1/2 -translate-y-1/2 z-50 items-center transition-all duration-500 ease-out ${
          isOpen ? "translate-x-0" : "-translate-x-13.25"
        }`}
      >
        <div className="flex flex-col gap-1.5 p-2 bg-white/80 backdrop-blur-md rounded-r-2xl border-y border-r border-slate-200 shadow-2xl">
          {actions.map((action) => (
            <a
              key={action.id}
              href={action.link}
              target={action.link.startsWith("http") ? "_blank" : "_self"}
              rel="noopener noreferrer"
              className={`${action.bg} text-white w-11 h-11 flex items-center justify-center rounded-xl transition-all duration-300 shadow-md hover:shadow-xl ${action.glow} hover:-translate-y-0.5 hover:translate-x-1 group relative`}
            >
              <div className="relative z-10 transition-transform duration-300 group-hover:scale-110">
                {action.icon}
              </div>

              <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 hidden md:flex items-center">
                <div className="w-0 h-0 border-y-4 border-y-transparent border-r-4 border-r-slate-900/90"></div>
                <span className="bg-slate-900/90 text-white text-xs font-semibold py-1.5 px-3 rounded-lg whitespace-nowrap">
                  {action.label}
                </span>
              </div>
            </a>
          ))}
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-white text-slate-700 border border-l-0 border-slate-200 h-10 w-5 rounded-r-md flex items-center justify-center shadow-md hover:bg-slate-50 transition-colors cursor-pointer"
        >
          {isOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>
      </div>

      <div className="md:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="mb-2 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-lg flex items-center justify-center cursor-pointer transition-transform duration-200 active:scale-90"
        >
          {mobileOpen ? (
            <ChevronDown className="w-5 h-5 text-slate-700" />
          ) : (
            <ChevronUp className="w-5 h-5 text-slate-700" />
          )}
        </button>

        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            mobileOpen
              ? "opacity-100 translate-y-0 max-h-[80px]" 
              : "opacity-0 translate-y-5 max-h-0"
          }`}
        >
          <div className="flex items-center gap-2 px-3 py-2 bg-white/80 backdrop-blur-xl rounded-full border border-slate-200 shadow-2xl">
            {actions.map((action) => (
              <a
                key={action.id}
                href={action.link}
                target={action.link.startsWith("http") ? "_blank" : "_self"}
                rel="noopener noreferrer"
                className={`${action.bg} w-11 h-11 rounded-full flex items-center justify-center text-white shadow-md active:scale-95 transition-transform`}
              >
                {action.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default FloatingActions;
