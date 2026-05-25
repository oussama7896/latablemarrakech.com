import { useState } from "react";
import { motion, AnimatePresence, easeOut } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { CheckCircle, X, Star, ArrowRight } from "lucide-react";
import { useSEO, breadcrumbSchema } from "@/lib/seo";
import { debugTracking, getAttributionContext, trackBookingSubmit } from "@/lib/analytics";
import { createWhatsAppUrl, getWhatsAppUrl } from "@/lib/whatsapp";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } } };

const reservationSchema = z.object({
  name: z.string().min(2, "Le nom doit faire au moins 2 caractères"),
  whatsapp: z.string().min(6, "Le numéro WhatsApp est requis"),
  guests: z.number({ coerce: true }).min(1).max(50),
  date: z.string().min(1, "La date est requise"),
  message: z.string().optional(),
});

type ReservationFormValues = z.infer<typeof reservationSchema>;

function MoroccanOrnament({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="40,4 50,20 68,20 55,32 60,50 40,40 20,50 25,32 12,20 30,20" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.6"/>
      <circle cx="40" cy="40" r="10" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.4"/>
      <polygon points="40,14 46,26 60,26 50,34 54,46 40,38 26,46 30,34 20,26 34,26" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.3"/>
      <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.2" strokeDasharray="4 4"/>
    </svg>
  );
}

export default function ContactFR() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const attribution = getAttributionContext();
  const form = useForm<ReservationFormValues>({
    resolver: zodResolver(reservationSchema),
    defaultValues: { name: "", whatsapp: "", guests: 2, date: "", message: "" },
  });

  const onSubmit = (values: ReservationFormValues) => {
    if (bookingSubmitted) {
      debugTracking("duplicate booking form submit suppressed", { form_name: "reservation" });
      return;
    }
    setBookingSubmitted(true);

    const whatsappMessage = `
Nouvelle demande de réservation :
Nom : ${values.name}
WhatsApp : ${values.whatsapp}
Invités : ${values.guests}
Date : ${values.date}
${values.message ? `\nNote : ${values.message}` : ''}
     `.trim();

    const bookingPayload = {
      guest_count: values.guests,
      date: values.date,
      form_submission_channel: "whatsapp_prefill",
    };

    window.open(createWhatsAppUrl(whatsappMessage), '_blank');
    trackBookingSubmit("reservation", bookingPayload);
    debugTracking("form submission success", bookingPayload);

    setShowSuccess(true);
    form.reset();
  };

  const onInvalid = () => {
    debugTracking("form submission failure", { form_name: "reservation", errors: form.formState.errors });
  };

  useSEO({
    title: "Réservez un chef privé à Marrakech — La Table Marrakech",
    description: "Réservez un chef privé pour votre villa, riad ou rooftop à Marrakech. WhatsApp +212 721 354 757 — réponse en moins d'une heure, en français ou en anglais.",
    canonical: "https://latablemarrakech.com/fr/contact",
    jsonLd: breadcrumbSchema([
      { name: "Accueil", url: "https://latablemarrakech.com/" },
      { name: "Contact", url: "https://latablemarrakech.com/fr/contact" },
    ]),
  });

  return (
    <>
      <section className="relative pt-40 md:pt-52 pb-20 md:pb-24 bg-gradient-to-b from-stone-50 via-background to-stone-50 overflow-hidden">
        <div className="absolute -top-20 -right-24 w-80 h-80 text-amber-600/[0.07] pointer-events-none"><MoroccanOrnament className="w-full h-full" /></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 text-amber-600/[0.06] pointer-events-none rotate-45"><MoroccanOrnament className="w-full h-full" /></div>

        <div className="relative container mx-auto px-6">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center max-w-4xl mx-auto">
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.9 }} className="text-xs md:text-sm tracking-[0.4em] uppercase text-amber-700 mb-6">Réservez votre soirée</motion.p>
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.35, duration: 0.7, ease: easeOut }} className="flex items-center justify-center gap-3 mb-8">
              <div className="w-16 h-px bg-amber-600/40" />
              <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
              <div className="w-16 h-px bg-amber-600/40" />
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 1, ease: easeOut }} className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-foreground">
              On vous cuisine <span className="italic text-amber-700">le dîner.</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.9 }} className="text-base md:text-lg text-muted-foreground mt-8 max-w-2xl mx-auto leading-relaxed italic">
              Deux façons de réserver — WhatsApp est le plus rapide (réponse en moins d'une heure). Ou remplissez le formulaire ci-dessous, on vous revient dans la journée.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="relative bg-zinc-950 text-white py-14 md:py-16 overflow-hidden">
        <div className="absolute -top-16 -right-16 w-72 h-72 text-amber-500/[0.06] pointer-events-none"><MoroccanOrnament className="w-full h-full" /></div>
        <div className="absolute -bottom-16 -left-16 w-72 h-72 text-amber-500/[0.06] pointer-events-none -rotate-12"><MoroccanOrnament className="w-full h-full" /></div>
        <div className="container mx-auto px-6 max-w-5xl relative">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="md:flex-1 md:pr-10">
              <p className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-amber-400 mb-3">Le plus rapide</p>
              <h2 className="font-serif text-2xl md:text-3xl leading-tight mb-3">Écrivez-nous sur <span className="italic text-amber-200">WhatsApp.</span></h2>
              <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-xl">Dites-nous la date, combien vous êtes, et où vous logez. On répond généralement en moins d'une heure.</p>
            </div>
            <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" data-testid="contact-whatsapp-band" data-cta-label="Request a quote on WhatsApp" data-cta-position="contact_fr_fast_path" className="group shrink-0 inline-flex items-center justify-center gap-3 px-10 py-4 bg-amber-600 hover:bg-amber-500 text-white uppercase tracking-[0.22em] text-xs md:text-sm transition-colors">
              Demandez sur WhatsApp <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      <section className="relative py-24 md:py-28 bg-gradient-to-b from-stone-50 via-background to-stone-50 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 text-amber-600/5 pointer-events-none"><MoroccanOrnament className="w-full h-full" /></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 text-amber-600/5 pointer-events-none rotate-45"><MoroccanOrnament className="w-full h-full" /></div>

        <div className="container mx-auto px-6 max-w-5xl relative">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            <div className="md:col-span-1">
              <p className="text-xs tracking-[0.4em] uppercase text-amber-700 mb-4">Nous joindre</p>
              <h2 className="font-serif text-3xl md:text-4xl leading-tight mb-3">Quelques <span className="italic text-amber-700">autres façons.</span></h2>
              <div className="w-12 h-px bg-amber-600/40 mb-10" />
              <div className="space-y-7 text-sm text-muted-foreground">
                <div>
                  <p className="text-foreground font-medium mb-1.5 uppercase tracking-[0.25em] text-[10px]">WhatsApp — réponse &lt; 1h</p>
                  <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" data-cta-label="Request a quote on WhatsApp" data-cta-position="contact_fr_info" className="text-amber-700 hover:text-amber-600 transition-colors">Ouvrir WhatsApp →</a>
                </div>
                <div>
                  <p className="text-foreground font-medium mb-1.5 uppercase tracking-[0.25em] text-[10px]">Si vous préférez l'email</p>
                  <a href="mailto:reservations@latablemarrakech.com" className="hover:text-amber-700 transition-colors break-words">reservations@latablemarrakech.com</a>
                </div>
                <div>
                  <p className="text-foreground font-medium mb-1.5 uppercase tracking-[0.25em] text-[10px]">Où on cuisine</p>
                  <p className="leading-relaxed">On vient à vous — votre villa, riad, rooftop, ou le désert.</p>
                </div>
                <div>
                  <p className="text-foreground font-medium mb-1.5 uppercase tracking-[0.25em] text-[10px]">Temps de réponse</p>
                  <p className="leading-relaxed">Dans la journée, tous les jours. En français, anglais ou arabe.</p>
                </div>
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="bg-white border border-stone-200/80 p-8 md:p-10 shadow-sm">
                <div className="mb-8">
                  <p className="text-xs tracking-[0.4em] uppercase text-amber-700 mb-3">Préférez l'écrit</p>
                  <h2 className="font-serif text-2xl md:text-3xl leading-tight mb-3">Juste l'<span className="italic text-amber-700">essentiel.</span></h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">Quatre champs rapides et on prend le reste sur WhatsApp. On répond dans la journée.</p>
                </div>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit, onInvalid)} className="space-y-6" data-testid="reservation-form">
                    <input type="hidden" name="utm_source" defaultValue={attribution.utm_source || ""} />
                    <input type="hidden" name="utm_medium" defaultValue={attribution.utm_medium || ""} />
                    <input type="hidden" name="utm_campaign" defaultValue={attribution.utm_campaign || ""} />
                    <input type="hidden" name="utm_term" defaultValue={attribution.utm_term || ""} />
                    <input type="hidden" name="utm_content" defaultValue={attribution.utm_content || ""} />
                    <input type="hidden" name="landing_page" defaultValue={attribution.landing_page || ""} />
                    <input type="hidden" name="referrer" defaultValue={attribution.referrer || ""} />
                    <input type="hidden" name="first_visit_timestamp" defaultValue={attribution.first_visit_timestamp || ""} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <FormField control={form.control} name="name" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="uppercase tracking-[0.2em] text-[10px] text-foreground/70">Votre nom</FormLabel>
                          <FormControl><Input {...field} placeholder="Sophie & Marc" data-testid="input-name" /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="whatsapp" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="uppercase tracking-[0.2em] text-[10px] text-foreground/70">WhatsApp</FormLabel>
                          <FormControl><Input {...field} placeholder="+33 6 12 34 56 78" data-testid="input-whatsapp" /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="date" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="uppercase tracking-[0.2em] text-[10px] text-foreground/70">Date souhaitée</FormLabel>
                          <FormControl><Input {...field} type="date" data-testid="input-date" /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="guests" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="uppercase tracking-[0.2em] text-[10px] text-foreground/70">Vous êtes combien ?</FormLabel>
                          <FormControl><Input {...field} type="number" min={1} max={50} placeholder="2" data-testid="input-guests" /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>

                    <FormField control={form.control} name="message" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="uppercase tracking-[0.2em] text-[10px] text-foreground/70">Autre chose ? <span className="lowercase tracking-normal text-muted-foreground normal-case text-[10px] ml-1">facultatif</span></FormLabel>
                        <FormControl><Textarea {...field} rows={4} placeholder="Où vous logez, l'occasion, les régimes alimentaires — tout ce qui peut aider." data-testid="input-message" /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <button type="submit" data-testid="button-submit" disabled={bookingSubmitted} className="group w-full inline-flex items-center justify-center gap-3 py-5 bg-amber-600 hover:bg-amber-500 disabled:opacity-60 text-white uppercase tracking-[0.22em] text-xs md:text-sm transition-colors">
                      Envoyer & continuer sur WhatsApp <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <p className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground text-center pt-1">Pas d'acompte avant que vous confirmiez le menu</p>
                  </form>
                </Form>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {showSuccess && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-6" onClick={() => setShowSuccess(false)}>
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} transition={{ duration: 0.4, ease: easeOut }} onClick={(e) => e.stopPropagation()} className="relative bg-background border border-amber-600/30 max-w-md w-full p-10 md:p-12 text-center shadow-2xl" data-testid="success-modal">
              <button onClick={() => setShowSuccess(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground" aria-label="Fermer"><X className="w-5 h-5" /></button>
              <CheckCircle className="w-12 h-12 text-amber-600 mx-auto mb-6" strokeWidth={1.5} />
              <p className="text-xs tracking-[0.4em] uppercase text-amber-700 mb-3">Presque là</p>
              <h2 className="font-serif text-3xl mb-4">C'est noté.</h2>
              <div className="w-10 h-px bg-amber-600/40 mx-auto mb-6" />
              <p className="text-muted-foreground leading-relaxed mb-8 text-sm">
                On a ouvert WhatsApp avec votre demande. Envoyez-la et on répond dans l'heure. Si vous avez fermé l'onglet WhatsApp, <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" data-cta-label="Request a quote on WhatsApp" data-cta-position="contact_fr_success_modal" className="text-amber-700 hover:underline">écrivez-nous ici</a>.
              </p>
              <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground">À très vite.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-zinc-950 p-4 border-t border-zinc-800">
        <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" data-cta-label="Request a quote on WhatsApp" data-cta-position="contact_fr_mobile_sticky" className="block w-full text-center py-4 bg-amber-600 hover:bg-amber-500 text-white uppercase tracking-[0.2em] text-sm transition-colors">
          Demandez sur WhatsApp
        </a>
      </div>
    </>
  );
}
