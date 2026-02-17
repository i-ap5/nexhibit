
import React from 'react';

const Invitation: React.FC = () => {
  const [formState, setFormState] = React.useState({
    name: '',
    email: '',
    organization: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormState({ name: '', email: '', organization: '', message: '' });
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
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
                <span className="type-label text-[#F58220]/60 mb-2 block">Studio Line</span>
                <p className="text-2xl font-light">+999 99 999 9999</p>
              </div>
              <div>
                <span className="type-label text-[#F58220]/60 mb-2 block">Headquarters</span>
                <p className="text-lg font-light text-black/60">Riyadh</p>
              </div>
            </div>
          </div>

          {/* Right: Modern Form */}
          <div className="relative">
            <form onSubmit={handleSubmit} className="flex flex-col gap-10 pt-10">

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
                <label className="absolute left-0 top-4 text-black/30 text-lg font-light transition-all duration-300 pointer-events-none peer-focus:-translate-y-8 peer-focus:text-[10px] peer-focus:font-light peer-focus:text-[#F58220] peer-[:not(:placeholder-shown)]:-translate-y-8 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-widest peer-[:not(:placeholder-shown)]:font-bold peer-[:not(:placeholder-shown)]:text-[#F58220]">
                  Your Name
                </label>
              </div>

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
                <label className="absolute left-0 top-4 text-black/30 text-lg font-light transition-all duration-300 pointer-events-none peer-focus:-translate-y-8 peer-focus:text-[10px] peer-focus:font-light peer-focus:text-[#F58220] peer-[:not(:placeholder-shown)]:-translate-y-8 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-widest peer-[:not(:placeholder-shown)]:font-bold peer-[:not(:placeholder-shown)]:text-[#F58220]">
                  Email Address
                </label>
              </div>

              <div className="group relative">
                <input
                  type="text"
                  name="organization"
                  value={formState.organization}
                  onChange={handleChange}
                  placeholder=" "
                  className="peer w-full bg-transparent border-b border-black/10 py-4 text-xl font-light focus:outline-none focus:border-[#F58220] transition-colors"
                />
                <label className="absolute left-0 top-4 text-black/30 text-lg font-light transition-all duration-300 pointer-events-none peer-focus:-translate-y-8 peer-focus:text-[10px] peer-focus:font-light peer-focus:text-[#F58220] peer-[:not(:placeholder-shown)]:-translate-y-8 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-widest peer-[:not(:placeholder-shown)]:font-bold peer-[:not(:placeholder-shown)]:text-[#F58220]">
                  Company / Organization
                </label>
              </div>

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
                <label className="absolute left-0 top-4 text-black/30 text-lg font-light transition-all duration-300 pointer-events-none peer-focus:-translate-y-8 peer-focus:text-[10px] peer-focus:font-light peer-focus:text-[#F58220] peer-[:not(:placeholder-shown)]:-translate-y-8 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-widest peer-[:not(:placeholder-shown)]:font-bold peer-[:not(:placeholder-shown)]:text-[#F58220]">
                  Tell us about your project
                </label>
              </div>

              <div className="pt-8">
                <button
                  disabled={isSubmitting}
                  className="group relative w-full md:w-auto px-10 py-4.5 bg-[#1c1c1b] text-white rounded-full overflow-hidden disabled:opacity-50 transition-all duration-500 hover:bg-[#F58220]"
                >
                  <div className="relative z-10 flex items-center justify-center gap-4">
                    <span className="type-label text-[11px] tracking-[0.3em] font-bold">
                      {isSubmitting ? 'Sending...' : isSuccess ? 'Message Sent' : 'Send Inquiry'}
                    </span>
                    {!isSubmitting && !isSuccess && (
                      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-[2.5] transition-transform duration-500 group-hover:translate-x-1">
                        <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                    {isSuccess && (
                      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-[2.5]">
                        <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
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
