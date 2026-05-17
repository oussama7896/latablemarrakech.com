import { useState } from "react";
import { motion, AnimatePresence, easeOut, easeInOut, backOut } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { CheckCircle, X } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
};

const reservationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  whatsapp: z.string().min(6, "WhatsApp number is required"),
  country: z.string().min(2, "Country is required"),
  guests: z.number({ coerce: true }).min(1).max(50),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  location: z.string().min(3, "Location in Marrakech is required"),
  experienceType: z.enum([
    "not_sure",
    "romantic_dinner",
    "villa_chef",
    "rooftop_dinner",
    "family_dining",
    "luxury_breakfast",
    "birthday_event",
    "moroccan_experience",
    "cooking_class",
    "desert_dining",
    "event_catering",
  ]),
  dietaryPreferences: z.string().optional(),
  message: z.string().optional(),
});

type ReservationFormValues = z.infer<typeof reservationSchema>;

const experienceOptions = [
  { value: "not_sure", label: "Not sure — help me pick" },
  { value: "romantic_dinner", label: "Romantic Dinner" },
  { value: "villa_chef", label: "Villa Private Chef" },
  { value: "rooftop_dinner", label: "Rooftop Dinner" },
  { value: "family_dining", label: "Family Dining" },
  { value: "luxury_breakfast", label: "Luxury Breakfast" },
  { value: "birthday_event", label: "Birthday Event" },
  { value: "moroccan_experience", label: "Moroccan Traditional Experience" },
  { value: "cooking_class", label: "Cooking Class" },
  { value: "desert_dining", label: "Desert Dining Experience" },
  { value: "event_catering", label: "Event Catering" },
];

export default function Contact() {
   const [showSuccess, setShowSuccess] = useState(false);
   const form = useForm<ReservationFormValues>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      name: "",
      email: "",
      whatsapp: "",
      country: "",
      guests: 2,
      date: "",
      time: "",
      location: "",
      experienceType: "romantic_dinner",
      dietaryPreferences: "",
      message: "",
    },
  });

   const onSubmit = (values: ReservationFormValues) => {
     // Format reservation data for WhatsApp message
     const whatsappMessage = `
New Reservation Request:
Name: ${values.name}
Email: ${values.email}
WhatsApp: ${values.whatsapp}
Country: ${values.country}
Guests: ${values.guests}
Date: ${values.date}
Time: ${values.time}
Location: ${values.location}
Experience Type: ${values.experienceType}
Dietary Preferences: ${values.dietaryPreferences || 'None'}
Message: ${values.message || 'None'}
     `.trim();
     
     // Encode the message for URL
     const encodedMessage = encodeURIComponent(whatsappMessage);
     
     // Open WhatsApp with the pre-filled message
     window.open(`https://wa.me/212721354757?text=${encodedMessage}`, '_blank');
     
     // Show success message
     setShowSuccess(true);
     form.reset();
   };

  return (
    <>
      <title>Reserve A Private Chef In Marrakech — La Table Marrakech</title>
      <meta name="description" content="Book a private chef for your villa, riad, or rooftop in Marrakech. WhatsApp +212 721 354 757 — usually under an hour to reply, in English or French." />

      {/* Hero */}
      <section className="relative h-72 flex items-end justify-center overflow-hidden">
        <img
          src="https://images.pexels.com/photos/29125650/pexels-photo-29125650.jpeg?auto=compress&cs=tinysrgb&w=1920&q=90"
          alt="Elegant restaurant interior"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 pb-12 text-center text-white px-6">
          <p className="text-xs tracking-[0.4em] uppercase text-amber-300 mb-3">Let's Cook You Dinner</p>
          <h1 className="font-serif text-4xl md:text-6xl mb-3">Reserve your evening.</h1>
          <p className="text-white/70 max-w-xl mx-auto text-sm md:text-base">Two ways: message us on WhatsApp (fastest), or fill in the form and we'll come back to you within the day.</p>
        </div>
      </section>

      {/* WhatsApp Fast-Path Band */}
      <section className="bg-zinc-950 text-white py-12 border-b border-zinc-800">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="md:flex-1 md:pr-8">
              <h2 className="font-serif text-2xl md:text-3xl leading-tight mb-2">The fastest way to book is WhatsApp.</h2>
              <p className="text-zinc-400 text-sm md:text-base leading-relaxed">Tell us the date, how many of you, and where you're staying. We usually reply in under an hour.</p>
            </div>
            <a
              href="https://wa.me/212721354757"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="contact-whatsapp-band"
              className="shrink-0 inline-block text-center px-8 py-4 bg-amber-600 hover:bg-amber-500 text-white uppercase tracking-[0.2em] text-xs md:text-sm transition-colors"
            >
              WhatsApp +212 721 354 757
            </a>
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="grid grid-cols-1 md:grid-cols-3 gap-16"
          >
            {/* Contact Info */}
            <div className="md:col-span-1">
              <h2 className="font-serif text-2xl mb-8">Get In Touch</h2>
              <div className="space-y-6 text-sm text-muted-foreground">
                <div>
                  <p className="text-foreground font-medium mb-1 uppercase tracking-wider text-xs">WhatsApp — usually under an hour</p>
                  <a href="https://wa.me/212721354757" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                    +212 721 354 757
                  </a>
                </div>
                <div>
                  <p className="text-foreground font-medium mb-1 uppercase tracking-wider text-xs">If you prefer email</p>
                  <a href="mailto:reservations@latablemarrakech.com" className="hover:text-primary transition-colors">
                    reservations@latablemarrakech.com
                  </a>
                </div>
                <div>
                  <p className="text-foreground font-medium mb-1 uppercase tracking-wider text-xs">Where we cook</p>
                  <p>We come to you — your villa, riad, rooftop, or the desert.</p>
                </div>
                <div>
                  <p className="text-foreground font-medium mb-1 uppercase tracking-wider text-xs">Response time</p>
                  <p>Within the day, every day.</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="md:col-span-2">
              <div className="mb-8">
                <h2 className="font-serif text-2xl mb-2">Prefer to write it all out?</h2>
                <p className="text-sm text-muted-foreground">Fill this in and we'll reply with a menu suggestion, a price, and a confirmation — usually within the day.</p>
              </div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                  data-testid="reservation-form"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="uppercase tracking-wider text-xs">Your Name</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Sophie & Marc" data-testid="input-name" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="uppercase tracking-wider text-xs">Email</FormLabel>
                          <FormControl>
                            <Input {...field} type="email" placeholder="Where we'll send your confirmation" data-testid="input-email" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="whatsapp"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="uppercase tracking-wider text-xs">WhatsApp</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="+33 6 12 34 56 78" data-testid="input-whatsapp" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="uppercase tracking-wider text-xs">Where You're Travelling From</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="France" data-testid="input-country" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="guests"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="uppercase tracking-wider text-xs">How Many Of You?</FormLabel>
                          <FormControl>
                            <Input {...field} type="number" min={1} max={50} placeholder="2" data-testid="input-guests" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="uppercase tracking-wider text-xs">Preferred Date</FormLabel>
                          <FormControl>
                            <Input {...field} type="date" data-testid="input-date" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="time"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="uppercase tracking-wider text-xs">Preferred Time <span className="lowercase tracking-normal text-muted-foreground normal-case text-[10px] ml-1">most dinners start at 19:30</span></FormLabel>
                          <FormControl>
                            <Input {...field} type="time" data-testid="input-time" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="experienceType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="uppercase tracking-wider text-xs">Which Experience?</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-experience">
                                <SelectValue placeholder="Select experience" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {experienceOptions.map((opt) => (
                                <SelectItem key={opt.value} value={opt.value}>
                                  {opt.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="uppercase tracking-wider text-xs">Where Are You Staying?</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Riad name, villa, or neighbourhood" data-testid="input-location" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dietaryPreferences"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="uppercase tracking-wider text-xs">Anything We Should Know? (optional)</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Vegetarian, no shellfish, peanut allergy…" data-testid="input-dietary" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="uppercase tracking-wider text-xs">Tell Us About The Evening (optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            rows={4}
                            placeholder="Anniversary? Surprise? First night in Marrakech? Anything helps."
                            data-testid="input-message"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                   <button
                     type="submit"
                     data-testid="button-submit"
                     className="w-full py-5 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-60 uppercase tracking-[0.2em] text-sm transition-colors"
                   >
                     Send & Continue On WhatsApp →
                   </button>
                </form>
              </Form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-6"
            onClick={() => setShowSuccess(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: easeOut }}
              onClick={(e) => e.stopPropagation()}
              className="bg-background max-w-md w-full p-12 text-center relative"
              data-testid="success-modal"
            >
              <button
                onClick={() => setShowSuccess(false)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
              <CheckCircle className="w-12 h-12 text-primary mx-auto mb-6" />
              <h2 className="font-serif text-3xl mb-4">Got it.</h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                We've opened WhatsApp with your request. Send it through and we'll reply within the hour. If you closed the WhatsApp tab, message us directly: <a href="https://wa.me/212721354757" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">+212 721 354 757</a>.
              </p>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">A pleasure awaits.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky Mobile Button */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-zinc-950 p-4 border-t border-zinc-800">
        <a
          href="https://wa.me/212721354757"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center py-4 bg-green-600 text-white uppercase tracking-[0.2em] text-sm"
        >
          Message on WhatsApp
        </a>
      </div>
    </>
  );
}




