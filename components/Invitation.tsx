import React from 'react';
import { submitContactForm } from '../src/services/contact';

const Invitation: React.FC = () => {
  const [formState, setFormState] = React.useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [error, setError] = React.useState('');

  const validateForm = () => {
    if (!formState.name.trim()) return "Name is required";
    if (!formState.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) return "Please enter a valid email";
    if (!formState.phone.match(/^\+?[\d\s-]{8,}$/)) return "Please enter a valid phone number with country code";
    if (!formState.message.trim()) return "Message is required";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);

    try {
      await submitContactForm({
        name: formState.name,
        email: formState.email,
        phone: formState.phone,
        organization: formState.organization,
        message: formState.message
      });

      setIsSubmitting(false);
      setIsSuccess(true);
      setFormState({ name: '', email: '', phone: '', organization: '', message: '' });

      // Reset success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);

    } catch (err) {
      setIsSubmitting(false);
      setError("Something went wrong. Please try again.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  return (
    <section id="contact" className="relative py-32 bg-white overflow-hidden">
      <div className="absolute inset-0 bg-blueprint opacity-[0.05] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32">

          {/* Left: Text & Details */}
          <div>
            <div className="max-w-2xl mb-12">
              <span className="type-label text-[#F58220] block mb-3 uppercase tracking-widest font-black text-[8px]">Inquiry</span>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-[#1c1c1b] leading-[0.85]">
                Let's build <br /> <span className="text-black/10">your vision.</span>
              </h2>
            </div>

            <p className="text-lg text-black/60 font-light leading-relaxed max-w-md mb-16">
              Discuss your upcoming exhibition or brand environment. Our team of architects and strategists is ready to translate your objectives into spatial reality.
            </p>

            <div className="flex flex-col gap-10 border-l border-black/10 pl-8">
              <div>
                <span className="type-label text-[#F58220]/60 mb-2 block">Direct Contact</span>
                <a href="mailto:info@nexhibitarabia.com" className="text-2xl font-light hover:text-[#F58220] transition-colors">info@nexhibitarabia.com</a>
              </div>
              <div>
                <span className="type-label text-[#F58220]/60 mb-2 block">Headquarters</span>
                <p className="text-lg font-light text-black/60">Riyadh, Saudi Arabia</p>
              </div>
            </div>
          </div>

          {/* Right: Modern Form */}
          <div className="relative">
            <form onSubmit={handleSubmit} className="flex flex-col gap-10 pt-10">

              {/* Name */}
              <div className="group relative">
                <input
                  type="text"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  required
                  placeholder=" "
                  className="peer w-full bg-transparent border-b border-black/10 py-4 text-xl font-light focus:outline-none focus:border-[#F58220] transition-colors"
                />
                <label className="absolute left-0 top-4 text-black/30 text-lg font-light transition-all duration-300 pointer-events-none peer-focus:-translate-y-8 peer-focus:text-[10px] peer-focus:font-light peer-focus:text-[#F58220] peer-[:not(:placeholder-shown)]:-translate-y-8 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]: peer-[:not(:placeholder-shown)]:tracking-widest peer-[:not(:placeholder-shown)]:font-bold peer-[:not(:placeholder-shown)]:text-[#F58220]">
                  Your Name
                </label>
              </div>

              {/* Email */}
              <div className="group relative">
                <input
                  type="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                  placeholder=" "
                  className="peer w-full bg-transparent border-b border-black/10 py-4 text-xl font-light focus:outline-none focus:border-[#F58220] transition-colors"
                />
                <label className="absolute left-0 top-4 text-black/30 text-lg font-light transition-all duration-300 pointer-events-none peer-focus:-translate-y-8 peer-focus:text-[10px] peer-focus:font-light peer-focus:text-[#F58220] peer-[:not(:placeholder-shown)]:-translate-y-8 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]: peer-[:not(:placeholder-shown)]:tracking-widest peer-[:not(:placeholder-shown)]:font-bold peer-[:not(:placeholder-shown)]:text-[#F58220]">
                  Email Address
                </label>
              </div>

              {/* Phone with Country Code */}
              <div className="group relative">
                <input
                  type="tel"
                  name="phone"
                  value={formState.phone}
                  onChange={handleChange}
                  required
                  placeholder=" "
                  className="peer w-full bg-transparent border-b border-black/10 py-4 text-xl font-light focus:outline-none focus:border-[#F58220] transition-colors"
                />
                <label className="absolute left-0 top-4 text-black/30 text-lg font-light transition-all duration-300 pointer-events-none peer-focus:-translate-y-8 peer-focus:text-[10px] peer-focus:font-light peer-focus:text-[#F58220] peer-[:not(:placeholder-shown)]:-translate-y-8 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]: peer-[:not(:placeholder-shown)]:tracking-widest peer-[:not(:placeholder-shown)]:font-bold peer-[:not(:placeholder-shown)]:text-[#F58220]">
                  Phone Number (e.g. +966...)
                </label>
              </div>

              {/* Organization */}
              <div className="group relative">
                <input
                  type="text"
                  name="organization"
                  value={formState.organization}
                  onChange={handleChange}
                  placeholder=" "
                  className="peer w-full bg-transparent border-b border-black/10 py-4 text-xl font-light focus:outline-none focus:border-[#F58220] transition-colors"
                />
                <label className="absolute left-0 top-4 text-black/30 text-lg font-light transition-all duration-300 pointer-events-none peer-focus:-translate-y-8 peer-focus:text-[10px] peer-focus:font-light peer-focus:text-[#F58220] peer-[:not(:placeholder-shown)]:-translate-y-8 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]: peer-[:not(:placeholder-shown)]:tracking-widest peer-[:not(:placeholder-shown)]:font-bold peer-[:not(:placeholder-shown)]:text-[#F58220]">
                  Company / Organization
                </label>
              </div>

              {/* Message */}
              <div className="group relative">
                <textarea
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  placeholder=" "
                  rows={1}
                  className="peer w-full bg-transparent border-b border-black/10 py-4 text-xl font-light focus:outline-none focus:border-[#F58220] transition-colors resize-none min-h-[60px]"
                />
                <label className="absolute left-0 top-4 text-black/30 text-lg font-light transition-all duration-300 pointer-events-none peer-focus:-translate-y-8 peer-focus:text-[10px] peer-focus:font-light peer-focus:text-[#F58220] peer-[:not(:placeholder-shown)]:-translate-y-8 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]: peer-[:not(:placeholder-shown)]:tracking-widest peer-[:not(:placeholder-shown)]:font-bold peer-[:not(:placeholder-shown)]:text-[#F58220]">
                  Tell us about your project
                </label>
              </div>

              {/* Error Message */}
              {error && (
                <div className="text-red-500 text-sm font-medium tracking-wide">
                  {error}
                </div>
              )}

              {/* Success Message Overlay */}
              {isSuccess && (
                <div className="absolute inset-0 bg-white/95 backdrop-blur-sm z-20 flex flex-col items-center justify-center text-center animate-in fade-in duration-500">
                  <div className="w-16 h-16 bg-[#F58220] rounded-full flex items-center justify-center mb-6 shadow-lg shadow-[#F58220]/30">
                    <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-white fill-none stroke-[2.5]">
                      <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-black text-[#1c1c1b] mb-2 tracking-tight">Message Sent</h3>
                  <p className="text-black/50 text-sm font-light">We'll get back to you shortly.</p>
                </div>
              )}

              <div className="pt-8">
                <button
                  disabled={isSubmitting}
                  className="group relative w-full md:w-auto px-10 py-4.5 bg-[#1c1c1b] text-white rounded-full overflow-hidden disabled:opacity-50 transition-all duration-500 hover:bg-[#F58220]"
                >
                  <div className="relative z-10 flex items-center justify-center gap-4">
                    <span className="type-label text-[11px] tracking-[0.3em] font-bold">
                      {isSubmitting ? 'Sending...' : 'Send Inquiry'}
                    </span>
                    {!isSubmitting && (
                      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-[2.5] transition-transform duration-500 group-hover:translate-x-1">
                        <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                </button>
              </div>

            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Invitation;
