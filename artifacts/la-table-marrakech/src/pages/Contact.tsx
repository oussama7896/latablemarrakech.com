import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCreateReservation } from "@workspace/api-client-react";
import { CheckCircle, X } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
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
  const createReservation = useCreateReservation();

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
    createReservation.mutate(
      {
        data: {
          name: values.name,
          email: values.email,
          whatsapp: values.whatsapp,
          country: values.country,
          guests: values.guests,
          date: values.date,
          time: values.time,
          location: values.location,
          experienceType: values.experienceType,
          dietaryPreferences: values.dietaryPreferences || undefined,
          message: values.message || undefined,
        },
      },
      {
        onSuccess: () => {
          setShowSuccess(true);
          form.reset();
        },
      }
    );
  };

  return (
    <>
      <title>Reserve Your Experience — La Table Marrakech</title>
      <meta name="description" content="Book your private chef experience in Marrakech. Romantic dinners, villa dining, cooking classes, and more. Fill out the reservation form and we will confirm within 24 hours." />

      {/* Hero */}
      <section className="relative h-72 flex items-end justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1920&q=80"
          alt="Elegant restaurant interior"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 pb-12 text-center text-white">
          <p className="text-xs tracking-[0.4em] uppercase text-amber-300 mb-3">Begin Your Experience</p>
          <h1 className="font-serif text-4xl md:text-6xl">Reserve Your Table</h1>
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
              <h2 className="font-serif text-2xl mb-8">Get in Touch</h2>
              <div className="space-y-6 text-sm text-muted-foreground">
                <div>
                  <p className="text-foreground font-medium mb-1 uppercase tracking-wider text-xs">WhatsApp</p>
                  <a href="https://wa.me/212600000000" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                    +212 600 000 000
                  </a>
                </div>
                <div>
                  <p className="text-foreground font-medium mb-1 uppercase tracking-wider text-xs">Email</p>
                  <a href="mailto:reservations@latablemarrakech.com" className="hover:text-primary transition-colors">
                    reservations@latablemarrakech.com
                  </a>
                </div>
                <div>
                  <p className="text-foreground font-medium mb-1 uppercase tracking-wider text-xs">Location</p>
                  <p>Marrakech, Morocco</p>
                  <p className="text-xs mt-1">We come to you — villa, riad, rooftop, desert camp</p>
                </div>
                <div>
                  <p className="text-foreground font-medium mb-1 uppercase tracking-wider text-xs">Response Time</p>
                  <p>Within 24 hours</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="md:col-span-2">
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
                          <FormLabel className="uppercase tracking-wider text-xs">Full Name</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Your full name" data-testid="input-name" />
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
                            <Input {...field} type="email" placeholder="your@email.com" data-testid="input-email" />
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
                          <FormLabel className="uppercase tracking-wider text-xs">WhatsApp Number</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="+1 234 567 8900" data-testid="input-whatsapp" />
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
                          <FormLabel className="uppercase tracking-wider text-xs">Country</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Your country" data-testid="input-country" />
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
                          <FormLabel className="uppercase tracking-wider text-xs">Number of Guests</FormLabel>
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
                          <FormLabel className="uppercase tracking-wider text-xs">Preferred Time</FormLabel>
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
                          <FormLabel className="uppercase tracking-wider text-xs">Experience Type</FormLabel>
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
                        <FormLabel className="uppercase tracking-wider text-xs">Your Location in Marrakech</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Villa name, Riad address, or neighbourhood" data-testid="input-location" />
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
                        <FormLabel className="uppercase tracking-wider text-xs">Dietary Preferences (optional)</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Vegetarian, no shellfish, gluten-free..." data-testid="input-dietary" />
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
                        <FormLabel className="uppercase tracking-wider text-xs">Additional Message (optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            rows={4}
                            placeholder="Special occasion, specific requests, or anything else you would like us to know..."
                            data-testid="input-message"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <button
                    type="submit"
                    disabled={createReservation.isPending}
                    data-testid="button-submit"
                    className="w-full py-5 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-60 uppercase tracking-[0.2em] text-sm transition-colors"
                  >
                    {createReservation.isPending ? "Sending..." : "Send Reservation Request"}
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
              transition={{ duration: 0.4, ease: "easeOut" }}
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
              <h2 className="font-serif text-3xl mb-4">Reservation Received</h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Thank you for choosing La Table Marrakech. We will reach out personally within 24 hours to confirm every detail of your experience.
              </p>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">A pleasure awaits you.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky Mobile Button */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-zinc-950 p-4 border-t border-zinc-800">
        <a
          href="https://wa.me/212600000000"
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
