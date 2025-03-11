"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import type { z } from "zod"
import { toast } from "sonner"
import { Github, Linkedin, Mail, MapPin, Phone, Send } from "lucide-react"

import { sendContactForm } from "@/app/actions"
import { contactFormSchema } from "@/lib/validations"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  })

  async function onSubmit(values: z.infer<typeof contactFormSchema>) {
    setIsSubmitting(true)
    try {
      const response = await sendContactForm(values)

      if (response.success) {
        toast.success("Message sent successfully! I will get back to you soon.")
        form.reset()
      } else {
        toast.error(response.error.message || "Something went wrong. Please try again.")
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again later.")
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/90"></div>
      <div className="absolute inset-0 grid-pattern"></div>
      <div className="absolute inset-0 noise-bg"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-5xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-1 text-blue-400 border-blue-400/30">
              Contact
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gradient">Get In Touch</h2>
            <div className="h-1 w-20 bg-blue-500 mx-auto rounded-full"></div>
            <p className="mt-6 text-muted-foreground max-w-xl mx-auto text-lg">
              Feel free to reach out if you have any questions or would like to discuss potential collaborations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div variants={itemVariants}>
              <Card className="h-full glass-card">
                <CardContent className="p-8 flex flex-col h-full">
                  <h3 className="text-xl font-bold mb-8 text-blue-400">Contact Information</h3>

                  <div className="space-y-6 mb-10">
                    <div className="flex items-start">
                      <div className="p-3 rounded-full bg-blue-500/10 text-blue-400 mr-4">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">Location</p>
                        <p className="text-muted-foreground mt-1">50 Corney Road, London, W4 2RA</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="p-3 rounded-full bg-blue-500/10 text-blue-400 mr-4">
                        <Mail className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">Email</p>
                        <a
                          href="mailto:patrickloughran121@outlook.com"
                          className="text-muted-foreground hover:text-blue-400 transition-colors"
                        >
                          patrickloughran121@outlook.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="p-3 rounded-full bg-blue-500/10 text-blue-400 mr-4">
                        <Phone className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">Phone</p>
                        <a
                          href="tel:+447429706255"
                          className="text-muted-foreground hover:text-blue-400 transition-colors"
                        >
                          +44 7429 706255
                        </a>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-6 text-blue-400">Connect</h3>
                  <div className="flex space-x-4">
                    <a
                      href="https://github.com/PhatDot1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 transition-colors"
                      aria-label="GitHub"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/patrick-loughran-8b033b238/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 transition-colors"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a
                      href="mailto:patrickloughran121@outlook.com"
                      className="p-3 rounded-full bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 transition-colors"
                      aria-label="Email"
                    >
                      <Mail className="h-5 w-5" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="glass-card">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-8 text-blue-400">Send Me a Message</h3>

                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your name" className="glass-card" {...field} />
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
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="Your email address" className="glass-card" {...field} />
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
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Your message" className="min-h-[120px] glass-card" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        className="w-full h-12 text-base font-medium relative overflow-hidden group"
                        disabled={isSubmitting}
                      >
                        <span className="relative z-10 flex items-center">
                          <Send className="mr-2 h-5 w-5" />
                          {isSubmitting ? "Sending..." : "Send Message"}
                        </span>
                        <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

